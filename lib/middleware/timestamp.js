'use strict';

function timeStamp(req, res, next) {
  req.requestTimeStamp = new Date();
  let month = req.requestTimeStamp.getMonth() + 1;
  let day = req.requestTimeStamp.getDate();
  let output = req.requestTimeStamp.getFullYear() + '/' +
  (month < 10? '0' : '') + month + '/' +
  (day < 10? '0' : '') + day;
  next();
}

module.exports = timeStamp;