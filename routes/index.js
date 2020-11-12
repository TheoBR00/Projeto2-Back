var express = require('express');
var router = express.Router();

module.exports = (server) => {

  const router = express.Router()
  server.use(router)

  router.get('/', (req, res, next) => res.status(200).json({message: "API funcionando /o/"}));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET Userlist page. */
router.get('/decklist', function(req, res) {
  var db2 = require("../db2");
  var Decks = db2.Mongoose.model('usercollection', db2.userSchema,'usercollection');
  console.log("AAAAAAAAAAAAAA")
  console.log(Decks)
  Decks.find({}).lean().exec(
    function (e,docs) {
      //res.render('userlist', { 'userlist' : docs });
      console.log(docs)
      res.json(docs);
      res.end()
    }
  )
});

/* POST CARD */
router.post('/decks/', function(req, res,next) {
  var db2 = require("../db2");
  var Deck = db2.Mongoose.model('usercollection', db2.userSchema,'usercollection');
  console.log("BBBBBBBBBBB");
  console.log(req.body.name);
  var newdeck= new Deck({ name:req.body.name,type:req.body.type, text:req.body.text });
  console.log(newdeck);
  newdeck.save({function (err) {
    if (err) {
      res.status(500).json({ error:err.message });
      res.end();
      return;
    }
    res.json(newdeck);
    res.end();
  }});
});

/* DELETE CARD */

router.delete('/decks/:id', function(req, res, next){
  var db2 = require('../db2');
  var Deck = db2.Mongoose.model('usercollection', db2.UserSchema, 'usercollection');
  Deck.find({ _id: req.params.id }).remove(function(err) {
    if (err) {
      res.status(500).json({ error: err.message});
      res.end();
      return;
    }
    res.json({sucess: true});
    res.end();
  });
});




/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.userSchema,'usercollection');

  console.log("AAAAAAAAAAAAAA")
  console.log(Users)
  Users.find({}).lean().exec(
    function (e,docs) {
      //res.render('userlist', { 'userlist' : docs });
      res.json(docs);
      res.end()
    }
  )
});

/* POST ONE users page. */
router.post('/users/', function(req, res,next) {
  var db = require("../db");
  var User = db.Mongoose.model('usercollection', db.userSchema,'usercollection');
  console.log("AAAAAAAAAAAAAA");
  console.log(req.body.username);
  var newuser= new User({ username:req.body.username,email:'abc@insper.edu.br' });
  console.log(newuser);
  newuser.save({function (err) {
    if (err) {
      res.status(500).json({ error:err.message });
      res.end();
      return;
    }
    res.json(newuser);
    res.end();
  }});
});

router.get('/users/', function(req, res,next) {
  var db = require("../db");
  var User = db.Mongoose.model('usercollection', db.userSchema,'usercollection');
  console.log("AAAAAAAAAAAAAA");
  console.log(req.body.username);
  var newuser= new User({ username:req.body.username,email:'abc@insper.edu.br' });
  console.log(newuser);
  newuser.save({function (err) {
    if (err) {
      res.status(500).json({ error:err.message });
      res.end();
      return;
    }
    res.json(newuser);
    res.end();
  }});
});
}

module.exports = router;