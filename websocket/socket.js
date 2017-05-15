var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bpMed = 0, tempMed = 0, hydMed = 0, gluMed = 0;
var medicine = { bpMed:0, tempMed:0, hydMed:0, gluMed: 0};

//--POST ENDPOINT FOR MEDICINE INPUT--//

 app.post("/medicine", function(req, res) {          
    io.sockets.emit("foo", req.body);
    console.log("A client sent us this dumb message:" + req.body);    
 });

var broadcast = function(medicine) {
        var sysMin = 40, sysMax = 120;
        var diaMin = 60, diaMax = 200;
        var tempMin = 97, tempMax = 106;
        var hydMin = 50, hydMax = 180;
        var gluMin = 40, gluMax = 400;

        var systolic= parseInt(Math.random()*(sysMax-sysMin)*(1-medicine.bpMed/200)+sysMin);
        var diastolic= parseInt(Math.random()*(diaMax-diaMin)*(1-medicine.bpMed/200)+diaMin);
        var temperature = parseInt(Math.random()*(tempMax-tempMin)+tempMin)*(1-medicine.tempMed/200);
        var hydration = parseInt(Math.random()*(hydMax-diaMin)*(1-medicine.hydMed/200)+hydMin);
        var glucose = parseInt(Math.random()*(gluMax-diaMin)*(1-medicine.gluMed/200)+gluMin);

        json = JSON.stringify({temperature: temperature, systolic: systolic, diastolic: diastolic, hydration: hydration, glucose: glucose})
        return json;
 }


io.on('connection', function(socket) {
    console.log("Sending data----" + medicine);
    setInterval( function(){ socket.emit('announcements', broadcast(medicine))}, 500);
});


server.listen(8081);