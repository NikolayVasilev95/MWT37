var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../DatabaseConnection');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function(req,res){

  var code = req.body.code.toUpperCase();

  if (code === "MWT37") {

    var today = new Date();
    var encryptedString = cryptr.encrypt(req.body.password);
    var name = req.body.name;
    var email = req.body.email;
    var password = encryptedString;
    var created_at = today;
    var updated_at = today;
    var level = 3;

    if (name && email && password) {
      connection.query("SELECT * FROM users WHERE email = $1", [email], function (error, results, fields){
        if (error) {
          throw err;
        }else{
          if (results.rowCount > 0) {
            res.render('pages/registration',{
              m1: "",
              m2: "active",
              brand: "../img/37.png",
              alert_danger: "alert alert-danger",
              error: "Email exist"
            });
          } else {
            connection.query(
              `INSERT INTO users (name, email, password, created_at, updated_at, level)
              VALUES ($1, $2, $3, $4, $5, $6);`,
              [name, email, password, created_at, updated_at, level],
              function (error, results, fields) {
                if (error) {
                  throw err;
                }else{
                  res.redirect('/login');
                }
              });
          }
        }
      });
    }

  }else {
    res.render('pages/registration',{
      m1: "",
      m2: "active",
      brand: "../img/37.png",
      alert_danger: "alert alert-danger",
      error: "Wrong code!"
    });
  }
}
