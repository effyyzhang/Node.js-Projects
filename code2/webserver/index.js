//import express 
var express = require('express');
//create express object named app
var app = express();

//instantiate a server on port 8080
var server = app.listen(8080);
console.log('running server on "server"');

//expose the local public folder for inluding files js, css etc..
app.use(express.static('public'));

//on a request to / serve index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});