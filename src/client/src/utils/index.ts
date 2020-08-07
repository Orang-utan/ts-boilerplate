const isLoggedIn = () => {
  return (
    localStorage.getItem('authAccessToken') &&
    localStorage.getItem('authRefreshToken')
  );
};

export { isLoggedIn };
