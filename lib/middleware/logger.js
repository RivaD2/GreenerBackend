'use strict';

function loggingMiddleware(req,res,next) {
  console.log(`path ${req.path} method: ${req.method} time: ${req.requestTimeStamp}`);
  next();
};

module.exports = loggingMiddleware;