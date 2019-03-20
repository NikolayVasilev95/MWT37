var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../DatabaseConnection');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function(req,res){
  var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
  var code = req.body.code.toUpperCase();

  if (code === "MWT37") {
    var name = req.body.name;
    var email = req.body.email;
    var password = encryptedString;
    var created_at = today;
    var updated_at = today;
    connection.query(
      `INSERT INTO users (name, email, password, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5);`,
      [name, email, password, created_at, updated_at],
      function (error, results, fields) {
        if (error) {
          throw err;
        }else{
          res.redirect('/home');
        }
      });
  }else {
    res.redirect('/errors/code');
  }
}
