var dotenv = require('dotenv');
dotenv.load();

// app config and middleware
var express = require('express');
var app = express();
var server = require('http').Server(app);
app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var io = require('socket.io')(server);

// ==== EXPRESS ROUTES =====

// app.get('/', function(req, res){
//   res.sendfile('index.html');
// });

app.post('/', function(req, res){
  if (openSesame(req.body.secret)) {
    res.redirect('/');
  } else {
    res.send('oops - authentication invalid');
  }
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("listening on port "+port);
});

// ==== SOCKET MANAGEMENT STUFF =====

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('door-status', function(data){
    console.log('door-status event recieved: '+data);
  });
});

// ==== HELPERS =====

function openSesame(secret) {
   if (process.env.SECRET == secret) {
     io.emit('door-command', 'toggle');
     return true;
   } else {
     return false;
   }
 }