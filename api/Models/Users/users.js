const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Users =  new mongoose.Schema({
    email: {type: String, trim:true, lowercase:true, required:true, unique:true},
    password: {type:String, required:true},
},{
    timestamps: true
})

Users.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')){
        return next()
    }

    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err,hash)=>{
            if(err){
                return next(err);
            }

            user.password = hash;
            next();
        })
    })
})

Users.methods.comparePassword = function(enteredPassword) {

    const user = this;

    return new Promise((resolve, reject)=>{
        bcrypt.compare(enteredPassword, user.password, (err, isMatch)=>{
            
            if(err){
                return reject(err);
            }

            if(!isMatch){
                return reject(false);
            }

            resolve(true);
        })
    })
    
}



module.exports = mongoose.model('Users', Users);