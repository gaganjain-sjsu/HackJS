'use strict';

var mysql      = require('mysql');
var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

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

  var mysql = require('mysql');

  var con = mysql.createConnection({
    host     : 'aws.cbmuqc9mcupo.us-east-1.rds.amazonaws.com',
    user     : 'clouduser',
    password : 'cloud123',
    database: "patient_monitoring"
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM patient", function (err, result) {
    if (err) 
      throw err;
    res.json(result);
    //console.log(result);
  });
  });

  res.header('Access-Control-Allow-Origin', '*');
  //res.json({ systolic:systolic, diastolic: diastolic });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate(req.params.taskId, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
