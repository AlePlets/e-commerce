export function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
  