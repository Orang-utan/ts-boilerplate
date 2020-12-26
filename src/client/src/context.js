/** Context definitions for global React state. */

import { createContext } from 'react';

/** Context storing authentication information and login/logout callbacks. */
export const AuthContext = createContext({
  isAuthenticated: false,
  login: (email, password) => null,
  logout: () => null,
});
