var express = require('express');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const bodyParser = require('body-parser')
  
  const port = process.env.PORT || 3000
  const server = express()
  
  server.use(bodyParser.urlencoded({ extended: true}))
  server.use(bodyParser.json())
  
  server.listen(port, () => { console.log(`BACKEND is running on port ${port}.`)})
  
  require('../routes/index')(server)
