import { login } from '../userApi';
import { AxiosError } from 'axios';

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
}

type AuthCallBack = ({
  loggedIn,
  errorMessage,
}: {
  loggedIn: boolean;
  errorMessage?: string;
}) => void;

class Auth {
  accessToken: string = '';

  loginSubscribers: AuthCallBack[] = [];
  logoutSubscribers: AuthCallBack[] = [];

  addLoginSubscribers(subscriber: AuthCallBack) {
    this.loginSubscribers.push(subscriber);
  }

  addLogoutSubscribers(subscriber: AuthCallBack) {
    this.logoutSubscribers.push(subscriber);
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return localStorage.getItem('authRefreshToken');
  }

  localLogin(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    localStorage.setItem('authRefreshToken', refreshToken);
  }

  localLogout() {
    this.accessToken = '';
    localStorage.removeItem('authRefreshToken');
  }

  login({ email, password }: LoginParams) {
    // retrieve jwt from server
    login({ email, password })
      .then((data) => {
        const { accessToken, refreshToken } = data as LoginResponse;
        this.localLogin(accessToken, refreshToken);

        this.loginSubscribers.forEach((subscriber) => {
          subscriber({ loggedIn: true });
        });
      })
      .catch((error: AxiosError) => {
        this.loginSubscribers.forEach((subscriber) => {
          subscriber({ loggedIn: false, errorMessage: error.response?.data });
        });
      });
  }

  logout() {
    this.localLogout();
    this.logoutSubscribers.forEach((subscriber) => {
      subscriber({ loggedIn: false });
    });
  }

  isAuthenticated() {
    return localStorage.getItem('authRefreshToken') ? true : false;
  }
}

const auth = new Auth();

export default auth;
