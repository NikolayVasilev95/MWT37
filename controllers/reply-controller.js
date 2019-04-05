var express = require("express");
var connection = require('./../DatabaseConnection');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.reply = function(req,res){

    var today = new Date();
    var postid = req.body.postid;
    var name = req.body.name;
    var message = req.body.message;
    var created_at = today;

    if (postid && name && message) {
      connection.query(
        `INSERT INTO reply (id_post, name, message, created_at)
        VALUES ($1, $2, $3, $4);`,
        [postid, name, message, created_at],
        function (error, results, fields) {
          if (error) {
            throw err;
          }else{
            res.redirect('/home');
          }
        });
    } else {
      connection.query("SELECT * FROM post", function (error, results, fields){
        if (error) {
          throw err;
        } else {
          connection.query("SELECT * FROM reply", function (error, results1, fields){
            if (error) {
              throw err;
            } else {
              var replies = results1.rows;
              var posts = results.rows;
              res.render('pages/home', {
                headIcon: "./img/37.png",
                headTitle: "MWT | Home",
                myCSS: "../css/mycss.css",
                chatCSS: "",
                m1: "active",
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
                Posts: posts,
                Replies: replies,
                alert_danger: "alert alert-danger",
                error: "Empty reply!"
              });
            }
          });
        }
      });
  }

}
