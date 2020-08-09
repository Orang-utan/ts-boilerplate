const errorHandler = (
  res: any,
  errorMessage: string,
  errorCode?: string
): Response => {
  if (errorCode === 'invalidToken' || errorCode === 'refreshExpired') {
    return res.status(401).send({
      success: false,
      message: errorMessage,
      code: errorCode,
    });
  }
  return res.status(400).send({
    success: false,
    message: errorMessage,
  });
};

export default errorHandler;
