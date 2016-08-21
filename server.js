/*
This server functions as a proxy to recevie a message from the client, and to forward that message to Logentries.
Only the server knows the log token so it can't be discovered by users or man in the middle attacks between the client and server.
Requires: Node version 0.10+
*/
"use strict";  //strict mode is required when using ES5 variable designations.

var express = require('express');
var parser = require('body-parser');
var fs = require('fs');
var le = require('le_node');

//creates the webserver
var token = '';
var logger;

//checks for the existence of the token.json.
//If it finds token.json, it loads the token file.
//Finally, it creates the Logentries logging library with the loaded token
try{
    fs.statSync('token.json');
    token = JSON.parse(fs.readFileSync('token.json')).token;
    logger = new le({
        token:token,
        console: true
    });
}catch (e){
    console.error (e.toString());
    process.exit()
}

//create the webserver, load files from the app directory, and parse all incoming form data
var app = express();
app.use(express.static('app'));
app.use(parser.urlencoded({extended:false}));

//add a route on the server called "log"
//data sent to this endpoint is forwarded to Logentries
app.post('/log', function (req, res) {
  try{
    var vals = req.body;
    var msg = vals.msg;

    logger[vals.type](msg);
    res.sendStatus(200);

  }catch (e){
    logger.err(e);
    res.status(400).send(e.message);
  }
});

//The server is loaded and starts listening on port 3000
app.listen(3000, function () {
  console.log('Server started on port 3000');
});
