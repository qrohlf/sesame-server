$(document).ready(function() {
  $('#button').click(function() {
    $.post('/', {secret: "7Yu67PegPulgAD5QlKXxcux3y9lQ2LWpB03i3nQAvR9v98TgaqVKIahnyTsGBqzH"});
  });
});

var socket = io();
socket.on('log message', function(msg){
  log(msg);
});

function log(msg) {
  console.log(msg);
  $('#log').prepend($('<p>').text(msg));
}