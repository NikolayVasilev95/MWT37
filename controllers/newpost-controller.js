var express = require("express");
var connection = require('./../DatabaseConnection');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.newpost = function(req,res){

    var today = new Date();
    var title = req.body.title;
    var name = req.body.name;
    var message = req.body.message;
    var created_at = today;

    if (title && name && message) {
      connection.query(
        `INSERT INTO post (title, name, message, created_at)
        VALUES ($1, $2, $3, $4);`,
        [title, name, message, created_at],
        function (error, results, fields) {
          if (error) {
            throw err;
          }else{
            res.redirect('/home');
          }
        });
    } else {
    res.render('pages/newPost',{
      headIcon: "../img/37.png",
      headTitle: "MWT | New Post",
      myCSS: "../css/mycss.css",
      chatCSS: "",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "",
      m6: "",
      m7: "",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      brand: "../img/37.png",
      user: sess.username,
      alert_danger: "alert alert-danger",
      error: "Empty post!"
    });
  }

}
