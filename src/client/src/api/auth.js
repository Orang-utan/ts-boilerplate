/** Global object tracking authentication, access and refresh tokens. */

import axios from 'axios';

class Auth {
  accessToken = null;

  fetchingAccessToken = false;
  subscribers = [];

  get refreshToken() {
    return localStorage.getItem('authRefreshToken');
  }

  get isAuthenticated() {
    return this.refreshToken != null;
  }

  /** Retrieve JWT from server. */
  async login(email, password) {
    const resp = await axios.post('/api/users/login', { email, password });
    const { accessToken, refreshToken } = resp.data;
    this.accessToken = accessToken;
    localStorage.setItem('authRefreshToken', refreshToken);
  }

  /** Logout from account. */
  async logout() {
    this.accessToken = null;
    localStorage.removeItem('authRefreshToken');
  }

  /** Refresh access token using saved refresh token. */
  async refresh() {
    try {
      const refreshToken = this.refreshToken;
      if (!refreshToken) {
        throw new Error('Invalid refresh token');
      }
      if (!this.fetchingAccessToken) {
        this.fetchingAccessToken = true;
        const { data } = await axios.post('/api/users/refreshToken', {
          refreshToken,
        });
        if (!data || data.success === false) {
          throw new Error('Failed to fetch refresh token');
        }
        this.accessToken = data.accessToken;
        this.fetchingAccessToken = false;
        this.subscribers.forEach((callback) => callback(this.accessToken));
        this.subscribers = [];
        return this.accessToken;
      } else {
        return new Promise((resolve) => {
          this.subscribers.push(resolve);
        });
      }
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}

const auth = new Auth();

export default auth;
