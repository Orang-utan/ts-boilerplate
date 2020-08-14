import axios, { AxiosError, AxiosResponse } from 'axios';
import { ENDPOINT } from '../utils/config';
import auth from './auth';

let isAlreadyFetchingAccessToken = false;
let subscribers: ((accessToken: string) => void)[] = [];

const secureAxios = axios.create({
  baseURL: ENDPOINT,
});

secureAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    const errorResponse = error.response;

    if (errorResponse && isTokenExpiredError(errorResponse)) {
      return refreshTokenAndReattemptRequest(errorResponse);
    }

    return Promise.reject(error);
  }
);

function isTokenExpiredError(error: AxiosResponse) {
  return error.status === 401;
}

async function refreshTokenAndReattemptRequest(
  errorResponse: AxiosResponse<any>
) {
  try {
    const refreshToken = auth.getRefreshToken();
    if (!refreshToken) {
      return Promise.reject(new Error('Invalid refresh token'));
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((accessToken: string) => {
        errorResponse!.config.headers.Authorization = `Bearer ${accessToken}`;
        resolve(axios(errorResponse!.config));
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await axios({
        method: 'POST',
        url: `${ENDPOINT}/api/users/refreshToken`,
        timeout: 0,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ refreshToken }),
      });

      if (!response.data) {
        return Promise.reject(new Error('Failed to fetch refresh token'));
      }
      const newAccessToken = response.data.accessToken;
      auth.setAccessToken(newAccessToken);

      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(auth.getAccessToken());
    }
    return retryOriginalRequest;
  } catch (err) {
    auth.logout();
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(accessToken: string) {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
}

function addSubscriber(callback: (accessToken: string) => void) {
  subscribers.push(callback);
}

export default secureAxios;
