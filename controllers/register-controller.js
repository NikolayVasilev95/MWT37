var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../DatabaseConnection');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function(req,res){
  var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
  var code = req.body.code.toUpperCase();

  if (code === "MWT37") {
    var users = {
      "name":req.body.name,
      "email":req.body.email,
      "password":encryptedString,
      "created_at":today,
      "updated_at":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
          status:false,
          message:'there are some error with query'
        })
      }else{
        res.redirect('/home');
      }
    });
  }else {
    res.redirect('/errors/code');
  }
}
