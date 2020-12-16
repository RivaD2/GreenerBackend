'use strict';

const bcrypt = require('bcrypt')

class UserMongo{
    constructor(model){
        this.model = model;
    }

    save(object){
        const user = new this.model(object);
        return user.save();
    }

    find(object){
        return this.model.find(object);
    }

}

module.exports = UserMongo;