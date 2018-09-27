const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name:{
        type: String
    },
    username : {
        type: String,
        unique : true
    },
    email:{
        type: String,
        unique : true
    },
    password : {
        type : String
    },
    tweets : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Tweet'
    }],
    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
},{
    timestamps: true
});

userSchema.pre('save', function(next) {
  if(this.password){
      let salt = bcrypt.genSaltSync(10);
      this.password  = bcrypt.hashSync(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;