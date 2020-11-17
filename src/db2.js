const mongoose = require('mongoose');

const uri = process.env.MONGO_CONNECTION
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, options)
    .then(() => console.log("Connected successfully to MongoDB URI: " + uri))
    .catch(err => {
        console.log("Failed to connect to MongoDB - ", err)
        process.exit(1)
    })

var userSchema = new mongoose.Schema({
        name: String,
        type: String,
        text: String
    }, {collection: 'usercolletion'}
);