const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose   = require('mongoose');
const port = process.env.PORT;
// const users = require('./routes/users');

//Required
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routing
// app.use('/users',users);

//Mongoose
let url = `mongodb://${process.env.USER_MLAB}:${process.env.PASSWORD}@ds163918.mlab.com:63918/final-live-code`;

//*In case of mlab error
// let url = `mongodb://localhost:27017/final-live-code`;

mongoose.connect(url,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to the database');
});

app.listen(port,()=>{
  console.log(`application is on port:${port}`);
});

module.exports = app;