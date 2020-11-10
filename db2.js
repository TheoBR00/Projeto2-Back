require('dotenv').config();
const aws = require('aws-sdk');
let s3 = new aws.S3({mongo_connect: process.env.mongo_connect});
var mongoose = require('mongoose');
mongoose.connect(s3.config.mongo_connect);

var userSchema = new mongoose.Schema({
    name: String,
    type: String, 
    text: String
}, {collection: 'usercollection'}
);

module.exports = { Mongoose:mongoose, userSchema}