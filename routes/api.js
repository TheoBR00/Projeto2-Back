//var axios = require('axios');
var express = require('express');
//const { default: Cardbacks } = require('../../projeto2-react/src/cardbacks');
var router = express.Router();

//GET cardbacks
router.get('/cardbacklist', function(req, res) {
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

router.get('/cardlist', function(req,res) {
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

router.get('/singlecard',function(req,res){
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
router.get('/cardset/', function(req,res,next){
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



module.exports = router;