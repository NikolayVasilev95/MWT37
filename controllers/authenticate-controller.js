var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
var connection = require('./../DatabaseConnection');

module.exports.authenticate=function(req,res){

  var email=req.body.email;
  var password=req.body.password;

  connection.query("SELECT password, id, email FROM users WHERE email = $1", [email], function (error, results, fields) {
    if (error) {
      throw err;
    }else{
      if(typeof results !== 'undefined'){
        decryptedString = cryptr.decrypt(results.rows[0].password);
        if(password==decryptedString){
          res.redirect('/home');
        }else{
          res.json({
            status:false,
            message:"Email and password does not match"
          });
        }
      }
      else{
        res.json({
          status:false,
          message:"Email does not exits"
        });
      }
    }
  });

}
