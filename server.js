var dotenv = require('dotenv');
dotenv.load();
// var restify = require('restify');
// var server = restify.createServer();
// var io = require('socket.io').listen(server);
// server.use(restify.bodyParser({ mapParams: false })); //parse POST stuff

function openSesame(secret) {
  console.log('checking to see if '+secret)
   if (process.env.SECRET == secret) {
     io.emit('event', 'OPEN');
   } else {
     res.send({result: 'fail'});
   }
 };


// io.sockets.on('connection', function (socket) {
//     console.log('connected!')
// });
//
// server.listen(process.env.PORT || 8080, function() {
//   console.log('%s listening at %s', server.name, server.url);
// });

var app = require('express')();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.post('/', function(req, res){
  // console.log(req);
  openSesame(req.body.secret);
  res.send('O HAI');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
