const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  auth : function(req,res,next){
    const token = req.headers.token;
    const secret = process.env.JWT_SECRET;
    jwt.verify(token,secret,function(err, decoded) {
      if(err){
        res.status(401).json({
          msg : 'you are not authorized'
        });
      }
      else{
        User.findOne({
          email : decoded.email
        })
        .then(data=>{
          req.userData = decoded;
          next();
        })
        .catch(err=>{
          res.status(401).json({
            msg : 'you are not authenticated'
          });
        });

      }
    });
  }
};