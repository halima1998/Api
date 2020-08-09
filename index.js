const express = require('express');
var bodyParser=require('body-parser');
var route = require('./route/router.js');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/' , route)

app.listen(3000, () => {
  
    console.log("server is running")
})
