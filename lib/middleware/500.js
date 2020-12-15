'use strict';

function serverError(req,res,err) {
  res.send(500).json({error:err})
  next();
}

module.exports = serverError;