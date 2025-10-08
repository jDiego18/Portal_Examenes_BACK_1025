const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
};

export default errorHandler;
