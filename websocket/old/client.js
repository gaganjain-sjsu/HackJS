
var wss = new WebSocket("ws://localhost:8080");

var logInFlag = true;
var breakdown;

if(logInFlag) {
  wss.onopen = function() {
    log('Please wait while the connection is being established...');
  };
}


wss.onerror = function (event) {
  log('Error: ' + JSON.stringify(event));
};

wss.onmessage = function (event) {
var serverObject = JSON.parse(event.data);
console.log(serverObject.systolic);
var text=serverObject.systolic + serverObject.diastolic;

};

document.querySelector('#close').addEventListener('click', function(event) {
  logInFlag=false;
    //wss.close();
  log('Closed connection!!!');
  setTimeout(10000);
});

var list = document.querySelector('#log');
var log = function(text) {
  list.innerHTML = text;
}

window.addEventListener('beforeunload', function() {
  wss.close();
});

// Tune in again
document.querySelector('#send').addEventListener('click', function(event) {
  if (logInFlag == true) {
    alert("Already tuned in!!!")
  }
  else {
    log('Please wait while the connection is being established...');
    wss.onopen = function() {
      log('Please wait while the connection is being established...');
    };
    logInFlag=true;
  }
});
