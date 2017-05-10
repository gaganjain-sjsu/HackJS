'use strict';

//var mysql      = require('mysql');
var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'aws.cbmuqc9mcupo.us-east-1.rds.amazonaws.com',
  user     : 'clouduser',
  password : 'cloud123',
  database: "patient_monitoring"
});

exports.check_login = function(req, res) {
  
  res.header('Access-Control-Allow-Origin', '*');
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM patient", function (err, result) {
    if (err) 
      throw err;
    res.json(result);
    //console.log(result);
  })
  });
}

exports.list_all_tasks = function(req, res) {
  var input = 0;
  var sysMin = 40, sysMax = 120;
  var diaMin = 60, diaMax = 200;
  var systolic=parseInt(Math.random()*(sysMax-sysMin)+sysMin);
  var diastolic=parseInt(Math.random()*(diaMax-diaMin)+diaMin);
  res.header('Access-Control-Allow-Origin', '*');
  res.json({ systolic:systolic, diastolic: diastolic });
};

exports.list_all_patients = function(req, res) {
  
  res.header('Access-Control-Allow-Origin', '*');
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM patient", function (err, result) {
    if (err) 
      throw err;
    res.json(result);
    //console.log(result);
  })
  });

};


