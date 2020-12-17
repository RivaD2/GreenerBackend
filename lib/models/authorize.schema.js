'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  currency: {type: Number, required: true},
  role: { type: String, required: true, enum: ['user', 'admin']}
});

userSchema.statics.capabilities = {
  admin: ['read', 'create', 'update', 'delete'],
  user: ['read'],
};

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.authenticateBasic = function(user, pass) {
    return this.findOne({ "name" : user})
    .then(results => {
      return this.comparePassword(pass, results.password, results)
    })
  }

userSchema.statics.generateToken = function(userName){
  let token = jwt.sign({ "username": userName, role: this.capabilities[this.role] }, 'SECRET_STRING');
    return token;
}

userSchema.statics.validateToken = async function(token){
  let validation = await jwt.verify(token, 'SECRET_STRING');
  if(validation){
    return validation;
  }
  else{
    return Promise.reject('false');
  }
}

userSchema.statics.comparePassword = function(pass, pass2, object){
  return bcrypt.compare(pass, pass2)
    .then(results => {
      if(results){
          return object;
      }
      else{
          return null;
      }
    })
}

module.exports = mongoose.model('Users', userSchema);