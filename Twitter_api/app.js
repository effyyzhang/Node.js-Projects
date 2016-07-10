var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Twitter = require('twitter');

server.listen(3000);

//Serve index.html when some make a request of the server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Import Twitter and J5 modules
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: '3vgHe95VaU4n13M5I7Q1tMxls',
    consumer_secret: 'pSImHvJmLxxQLik9NWTK6qX2twbcKRZdXvmfjxgKpZoJb70XXP',
    access_token_key: '374970741-pOxNojcMys1HmZAoZir2rFdGLXpYdfpkAEy6iuKD',
    access_token_secret: 'r4OQ5ucXuJZ2k0l4JL3baRBXlIv34MbZzCvNwdZaFzqic'
})

io.on('connection', function(){
  var stream = client.stream('statuses/filter', {track: 'blacklivesmatter'});
  stream.on('data', function(tweet) {
    //console.log(tweet.text);
    io.sockets.emit('stream',tweet.text);
  });
  stream.on('error', function(error) {
    throw error;
  });
});
