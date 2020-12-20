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

    update(object, id){
        return this.model.findByIdAndUpdate(id, object, {new: true})
      }

    get(object){
        if(object._id){
            console.log(object)
            return this.model.findOne(object);
        }
        else if(object.name){
            console.log('i')
            return this.model.findOne({"name": object.name})
        }
        else{
            console.log('all')
            console.log('i made it');
            return this.model.find({});
        }
    }

}

module.exports = UserMongo;