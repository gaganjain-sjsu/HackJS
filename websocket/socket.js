var http = require('http');
var express = require('express');

var WebSocket = require('ws')

var app = express().use(express.static('client'));
var server = http.createServer(app);
var clients = [];

server.listen(8080, '127.0.0.1', function() {
  var sse = new WebSocket.Server({server});

  sse.on('connection', function connection(stream) {
    clients.push(stream);
    console.log('Connection Opened');

    var json = JSON.stringify({ Status: 'Connected' });
    stream.send(json);
    console.log('Sent: ' + json);

    stream.on('close', function() {
      clients.splice(clients.indexOf(stream), 1);
      console.log('Connection Closed');
    });
  });
});

var broadcast = function() {
  var input = 0;
  var sysMin = 40, sysMax = 120;
  var diaMin = 60, diaMax = 200;
  var systolic=parseInt(Math.random()*(sysMax-sysMin)+sysMin);
  var diastolic=parseInt(Math.random()*(diaMax-diaMin)+diaMin);
  var json = JSON.stringify({ systolic:systolic, diastolic: diastolic});

  clients.forEach(function(stream) {
    stream.send(json);
    console.log('Sent: ' + json);
  });

}
setInterval(broadcast, 2000)
