const express = require('express');
var router = express.Router();
var session = require('express-session');
var socket = require('socket.io');
var connection = require('./DatabaseConnection');
var bodyParser = require('body-parser');
var path = require('path');

//Controllers setup
var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');
var newPostController = require('./controllers/newpost-controller');
var replyPostController = require('./controllers/reply-controller');


//Static files
router.use(session({
  secret: 'awdawd',
  resave: false,
  saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var sess;


// route to handle entry point
router.get('/', function(req, res){
  res.render('pages/index',{
    m1: "",
    m2: "",
    brand: "../img/37.png"
  });
});

// route to handle Registration form
router.get('/registration', function(req, res){
  res.render('pages/registration', {
    m1: "",
    m2: "active",
    brand: "../img/37.png",
    alert_danger: "",
    error: ""
  });
});

// route to handle login form
router.get('/login', function(req, res){
  res.render('pages/login',{
    m1: "active",
    m2: "",
    brand: "../img/37.png",
    alert_danger: "",
    error: ""
  });
});

// route to handle login and registration controllers
router.post('/controllers/register-controller', registerController.register);
router.post('/controllers/authenticate-controller', authenticateController.authenticate);
// route to handle new post controllers
router.post('/controllers/newpost-controller', newPostController.newpost);
router.post('/controllers/reply-controller', replyPostController.reply);

// route to handle adminpanel
router.get('/admin', function(req, res){
  sess = req.session;
  if (sess.level == 1){
    res.render('pages/adminpanel', {
      headIcon: "./img/37.png",
      headTitle: "MWT | Admin panel",
      myCSS: "./css/mycss.css",
      m1: "active",
      m2: "",
      brand: "../img/37.png",
      user: sess.username
    });
  } else {
    res.redirect('/login');
  }
});

// route to handle adminpanel all users
router.get('/adminUsers', function(req, res){
  sess = req.session;
  if (sess.level == 1){
    connection.query("SELECT * FROM users", function (error, results, fields){
      if (error) {
        throw err;
      } else {
        res.render('pages/adminUsers', {
          headIcon: "./img/37.png",
          headTitle: "MWT | Admin panel",
          myCSS: "./css/mycss.css",
          m1: "",
          m2: "active",
          brand: "../img/37.png",
          user: sess.username,
          UsersTable: results.rows
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});

// route to handle Home
router.get('/home', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
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
              myCSS: "./css/mycss.css",
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
              alert_danger: "",
              error: ""
            });
          }
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});

// route to handle New Post
router.get('/newPost', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
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
      alert_danger: "",
      error: ""
    });
  } else {
    res.redirect('/login');
  }
});

// route to handle Node.js folder
router.get('/node/code', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/node/NodeCode',{
      headIcon: "../img/37.png",
      headTitle: "MWT | Node Code",
      myCSS: "../css/mycss.css",
      chatCSS: "",
      m1: "",
      m2: "active",
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
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/node/video', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/node/NodeVideo',{
      headIcon: "../img/37.png",
      headTitle: "MWT | Node Video",
      myCSS: "../css/mycss.css",
      chatCSS: "",
      m1: "",
      m2: "",
      m3: "active",
      m4: "",
      m5: "",
      m6: "",
      m7: "",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      brand: "../img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/node/live_chat', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/node/NodeLiveChat',{
      headIcon: "../img/37.png",
      headTitle: "MWT | Node Live Chat",
      myCSS: "../css/mycss.css",
      chatCSS: "../css/Chat.css",
      m1: "",
      m2: "",
      m3: "",
      m4: "active",
      m5: "",
      m6: "",
      m7: "",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      brand: "../img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});

// route to handle SEO folder
router.get('/seo/code', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/seo/SEOCode',{
      headIcon: "../img/37.png",
      headTitle: "MWT | SEO Code",
      myCSS: "../css/mycss.css",
      chatCSS: "",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "active",
      m6: "",
      m7: "",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      brand: "../img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/seo/video', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/seo/SEOVideo',{
      headIcon: "../img/37.png",
      headTitle: "MWT | SEO Video",
      myCSS: "../css/mycss.css",
      chatCSS: "",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "",
      m6: "active",
      m7: "",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      brand: "../img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/seo/live_chat', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/seo/SEOLiveChat',{
      headIcon: "../img/37.png",
      headTitle: "MWT | SEO Live Chat",
      myCSS: "../css/mycss.css",
      chatCSS: "../css/Chat.css",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "",
      m6: "",
      m7: "active",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      brand: "../img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});

// route to handle SEO folder
router.get('/cordova/code', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/cordova/CordovaCode',{
      headIcon: "../img/37.png",
      headTitle: "MWT | Cordova Code",
      myCSS: "../css/mycss.css",
      chatCSS: "",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "",
      m6: "",
      m7: "",
      m8: "active",
      m9: "",
      m10: "",
      m11: "",
      brand: "../img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/cordova/video', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/cordova/CordovaVideo',{
      headIcon: "../img/37.png",
      headTitle: "MWT | Cordova Video",
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
      m9: "active",
      m10: "",
      m11: "",
      brand: "../img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/cordova/live_chat', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/cordova/CordovaLiveChat',{
      headIcon: "../img/37.png",
      headTitle: "MWT | Cordova Live Chat",
      myCSS: "../css/mycss.css",
      chatCSS: "../css/Chat.css",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "",
      m6: "",
      m7: "",
      m8: "",
      m9: "",
      m10: "active",
      m11: "",
      brand: "../img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});

// route to handle About
router.get('/about', function(req, res){
  sess = req.session;
  if (sess.level == 3) {
    res.render('pages/about',{
      headIcon: "../img/37.png",
      headTitle: "MWT | About",
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
      m11: "active",
      brand: "./img/37.png",
    });
  } else {
    res.redirect('/login');
  }
});

// route to handle logout
router.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
      console.log(req.session);
    }
  });
});

// route to handle error
router.get('/errors/code', function(req, res){
  res.render('pages/errors/CodeError');
});

module.exports = router;
