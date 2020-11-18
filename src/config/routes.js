const express = require('express')


module.exports = (server) => {

    const router = express.Router()
    server.use(router)
    router.get('/', (req, res, next) => res.status(200).json({message: "API funcionando /o/"}));

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
        newdeck.save(function (err) {
        if (err) {
            res.status(500).json({ error:err.message });
            res.end();
            return;
        }
        res.json(newdeck);
        res.end();
        });
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


        //GET cardbacks
    router.get('/api/cardbacklist', function(req, res) {
        console.log("AAAAAAAAAAA")
        var axios = require("axios").default;

        var options = {
            method: 'GET',
            url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks',
            headers: {
            'x-rapidapi-key': '9b116cd926msh4547d15bdc179dbp187562jsn0a60e822fafd',
            'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
            }
        };
        

        axios.request(options).then(function (response) {
            //console.log(response.data);
            res.send(response.data);
        }).catch(function (error) {
            console.error(error);
            return;
        });

    });

    router.get('/api/cardlist', function(req,res) {
        var axios = require("axios").default;

        var options = {
        method: 'GET',
        url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards',
        headers: {
            'x-rapidapi-key': '9b116cd926msh4547d15bdc179dbp187562jsn0a60e822fafd',
            'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
        };

        //console.log(req.body)

        axios.request(options).then(function (response) {
            console.log(response.data);
            res.send(response.data["Basic"]);
        }).catch(function (error) {
            console.error(error);
        });
    })

    router.get('/api/singlecard',function(req,res){
        var axios = require("axios").default;

        var options = {
        method: 'GET',
        url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/%7Bname%7D',
        headers: {
            'x-rapidapi-key': '9b116cd926msh4547d15bdc179dbp187562jsn0a60e822fafd',
            'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            res.send(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    })

    // GET CARD SET/ DECK
    router.get('/api/cardset/', function(req,res,next){
        var axios = require("axios").default;
        console.log("DDDDDDDDDD")
        console.log(req.query)

        

        var options = {
        method: 'GET',
        url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/'+req.query.set,
        headers: {
            'x-rapidapi-key': '9b116cd926msh4547d15bdc179dbp187562jsn0a60e822fafd',
            'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            res.send(response.data)
        }).catch(function (error) {
            console.error(error);
        });

    })
}