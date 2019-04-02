var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
var connection = require('./../DatabaseConnection');

module.exports.authenticate=function(req,res){

  var email=req.body.email;
  var password=req.body.password;

  if (email && password) {
    connection.query("SELECT password, id, email, name FROM users WHERE email = $1", [email], function (error, results, fields) {
      if (error) {
        throw err;
      }else{
        if(results.rowCount > 0){
          decryptedString = cryptr.decrypt(results.rows[0].password);
          if(password==decryptedString){
            sess = req.session;
            sess.email = req.body.email;
            sess.username = results.rows[0].name;
            console.log(sess);
            res.redirect('/home');
          }else{
            res.render('pages/login',{
              m1: "active",
              m2: "",
              brand: "../img/37.png",
              alert_danger: "alert alert-danger",
              error: "Email and password does not match"
            });
          }
        }
        else{
          res.render('pages/login',{
            m1: "active",
            m2: "",
            brand: "../img/37.png",
            alert_danger: "alert alert-danger",
            error: "Email does not exits"
          });
        }
      }
    });
  } else {
    res.redirect('/login');
  }


}
