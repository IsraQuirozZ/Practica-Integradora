const errorHandler = (error, req, res, next) => {
  console.log(error.stack);
  return res.status(500).json({
    success: false,
    message: error.message,
  });
};

export default errorHandler;
