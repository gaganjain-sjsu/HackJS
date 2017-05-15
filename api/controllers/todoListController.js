'use strict';
var mysql = require('mysql');
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'aws.cbmuqc9mcupo.us-east-1.rds.amazonaws.com',
    user     : 'clouduser',
    password : 'cloud123',
    database: "patient_monitoring",
    debug    :  false
});

exports.check_login = function(req, res) {

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);    
  var userid = req.query.userid;
  var userpassword = req.query.password;
  pool.getConnection(function(err,connection){
    if (err){
        connection.release();
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
    }
    connection.query("SELECT password FROM login where userid=?", userid, function (err, result){
            //
      if(!err) {
          console.log(result[0]["password"]);
          var dbpass = result[0]["password"];
          console.log(userpassword + " + " + dbpass);
          if (userpassword!=dbpass) {
            console.log("Passwords don't match"); 
            res.json(JSON.stringify({Status : 'False'}));
          }
          else{
            console.log("Passwords match");
          connection.query("select hospital_id, hospital_name, city, state, country, zip, latitude, longitude from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id=?)", userid, function (err, r) {
          if (err) 
            throw err;
          console.log(r);
          res.json(r);
          })
          }
        }
      })
    connection.release(); 
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
  console.log(req.query);    
  var doctor_id = req.query.doctor_id;
  var hospital_id = req.query.hospital_id;
    pool.getConnection(function(err,connection){
    if (err){
        connection.release();
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
    }
    connection.query("select * from patient, doctor where doctor_id=? and patient_id in (select patient_id from patient natural join patient_doctor where doctor_id =? and patient_id in (select patient_id from patient where hospital_id=?))", [doctor_id, doctor_id, hospital_id], function(err, result){    
    if (err) 
      throw err;
    console.log(result);
    res.json(result);
    })
     connection.release();
  });
};
