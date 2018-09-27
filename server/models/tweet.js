const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const tweetSchema = new Schema({
    tweet:{
        type: String
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps: true
});

tweetSchema.index({'$**': 'text'});

const Tweet = mongoose.model('Tweet', tweetSchema);
tweetSchema.pre('remove', function(next) {
    User.update({ _id: this.user }, { "$pull": { "tweets": this._id }},function(err, obj) {
        next();
    });
});

module.exports = Tweet;
