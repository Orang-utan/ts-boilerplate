import axios, { AxiosError, AxiosResponse } from 'axios';
import { ENDPOINT } from '../utils/config';
import { getRefreshToken } from '../utils/authUtil';

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
      return refreshTokenAndReattemptRequest(error);
    }

    return Promise.reject(error);
  }
);

function isTokenExpiredError(error: AxiosResponse) {
  return error.status === 401;
}

async function refreshTokenAndReattemptRequest(error: AxiosError) {
  try {
    const { response: errorResponse } = error;
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return Promise.reject(error);
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
        data: JSON.stringify({ refreshToken: refreshToken }),
      });

      if (!response.data) {
        return Promise.reject(error);
      }
      const newAccessToken = response.data.accessToken;
      localStorage.setItem('authAccessToken', newAccessToken);

      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(newAccessToken);
    }
    return retryOriginalRequest;
  } catch (err) {
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
