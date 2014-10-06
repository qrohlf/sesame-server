dotenv = require("dotenv")
dotenv.load()

# app config and middleware
express = require("express")
app = express()
server = require("http").Server(app)
app.use express.static(__dirname + "/public")
bodyParser = require("body-parser")
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: true)
io = require("socket.io")(server)

# ==== express routes =====

# app.get('/', function(req, res){
#   res.sendfile('index.html');
# });

app.post "/", (req, res) ->
  if openSesame(req.body.secret)
    res.redirect "/"
  else
    res.send "oops - authentication invalid"

# ==== socket management stuff =====
io.on "connection", (socket) ->
  console.log "a user connected"

  socket.on "door-status", (data) ->
    console.log "door-status event recieved: " + data

# ==== helpers =====
openSesame = (secret) ->
  if process.env.SECRET is secret
    io.emit "door-command", "toggle"
    true
  else
    false

# ==== start the app ====
port = process.env.PORT or 3000
server.listen port, ->
  console.log "listening on port " + port
  return