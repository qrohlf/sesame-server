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
app.set('views', './views')
app.set('view engine', 'jade')
io = require("socket.io")(server)

# ==== express routes =====

app.get '/', (req, res) ->
  res.render('index')

app.post "/", (req, res) ->
  if openSesame(req.body.secret)
    res.redirect "/"
  else
    res.send "oops - authentication invalid"

# ==== socket management stuff =====
io.on "connection", (socket) ->
  log "connected!"

  socket.on "door status", (data) ->
    log "[DOOR STATUS]: " + data

  socket.on "log info", (data) ->
    log "[LOG]: " + data

# ==== helpers =====
openSesame = (secret) ->
  if process.env.SECRET is secret
    io.emit "door-command", "toggle"
    true
  else
    false

log = (msg) ->
  console.log(msg)
  io.emit('log message', msg)

# ==== start the app ====
port = process.env.PORT or 3000
server.listen port, ->
  console.log "listening on port " + port
  return