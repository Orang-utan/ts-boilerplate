import axios from 'axios';
import auth from './auth';

/**
 * `api` provides a secure axios object that adds authentication.
 *
 * It wraps the API with interceptors that automatically add an access token to
 * every request, in the Authorization: `Bearer X` header. It also detects when
 * an invalid token (401) response is received, and uses the refresh token to
 * automatically obtain a new access token.
 *
 * Example of use (from a component):
 *
 * ```
 * import api from "../api";
 *
 * const resp = await api.get('/api/users');
 * console.log(resp.data);
 * ```
 */
const api = axios.create();

api.interceptors.request.use(async (config) => {
  if (auth.isAuthenticated) {
    if (!auth.accessToken) {
      await auth.refresh();
    }
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const accessToken = await auth.refresh();
      const config = error.response.config;
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(config);
    } else {
      throw error;
    }
  }
);

export default api;
