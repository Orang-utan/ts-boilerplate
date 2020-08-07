const isLoggedIn = (): boolean => {
  if (
    localStorage.getItem('authAccessToken') &&
    localStorage.getItem('authRefreshToken')
  )
    return true;

  return false;
};

const getAccessToken = () => localStorage.getItem('authAccessToken');
const getRefreshToken = () => localStorage.getItem('authRefreshToken');

export { isLoggedIn, getAccessToken, getRefreshToken };
