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

    get(object){
        if(object._id){
            console.log(object)
            return this.model.findOne(object);
        }
        else{
            console.log('i made it');
            return this.model.find({});
        }
    }

}

module.exports = UserMongo;