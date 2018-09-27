const Tweet = require('../models/tweet');
const User = require('../models/user');

module.exports = {
  create : function(req,res){
    const data = {
      tweet : req.body.tweet,
      user : req.userData.id
    }

    Tweet.create(data)
    .then(data=>{
      User.updateOne({
        _id : req.userData.id
      },{$push : {tweets:data._id}})
      .then(response=>{
        res.status(200).json({
          msg : "success creating tweet",
          data : data
        });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed creating tweet",
          err : err
        });
      })
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed creating tweet",
        err : err
      });
    });
  },

  remove : function(req,res){
    Tweet.deleteOne({
      _id : req.params.id,
      user : req.userData.id
    })
    .then(data=>{
      res.status( 200 ).json({
        msg : `success deleting tweet by id ${req.params.id}`,
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting tweet",
        err : err
      });
    });
  },

  update : function(req,res){
    Tweet.findOne({
      _id : req.params.id,
      user : req.userData.id
    })
    .then(data=>{
      Tweet.updateOne({
        _id : req.params.id
      },{$set: {
        tweet : req.body.name || data.name
      }})
      .then(data=>{
        res.status( 200 ).json({
        msg : `success updating user by id ${req.params.id}`,
        data : data
      });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed updating user",
          err : err
        });
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed updating user",
        err : err
      });
    });
  },

  findAll : function(req,res){
    Tweet.find({})
    .sort({createdAt: 'descending'})
    .populate('user')
    .then(data=>{
        res.status( 200 ).json({
        msg : `success finding tweets`,
        data : data
      });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed finding tweets",
          err : err
        });
      });
    },

    findOne : function(req,res){
      Tweet.findOne({
        _id : req.params.id
      })
      .then(data=>{
          res.status( 200 ).json({
          msg : `success finding tweet`,
          data : data
        });
        })
        .catch(err=>{
          res.status(500).json({
            msg : "failed finding tweet",
            err : err
          });
        });
      },

      search : function(req,res){
        Tweet.find({tweet : { $regex: req.body.keyword, $options: "i" }})
       .exec(function(err, docs) {
        res.send(docs)
       });
      }
};