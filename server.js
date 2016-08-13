"use strict";

const express = require('express');
const parser = require('body-parser');
const fs = require('fs');
const le = require('le_node');

let app = express();
let token = '';

if (fs.statSync('token.json')){
    token = JSON.parse(fs.readFileSync('token.json')).token;
}

const logger = new le({
  token:token,
  console: true
});

app.use(express.static('app'));
app.use(parser.urlencoded({extended:false}));

app.post('/log', function (req, res) {
  try{
    let vals = req.body;
    let msg = vals.msg;

    logger[vals.type](msg);
    res.sendStatus(200);
  }catch (e){
    logger.err(e);
    res.sendStatus(400);
  }

});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
