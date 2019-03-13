const express = require('express');
var router = express.Router();
var socket = require('socket.io');
var connection = require('./DatabaseConnection');
var bodyParser = require('body-parser');
var path = require('path');

//Controllers setup
var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');


//Static files
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// route to handle entry point
router.get('/', function(req, res){
  res.render('pages/index');
});

// route to handle Registration form
router.get('/registration', function(req, res){
  res.render('pages/registration');
});

// route to handle login form
router.get('/login', function(req, res){
  res.render('pages/login');
});

// route to handle login and registration controllers
router.post('/controllers/register-controller', registerController.register);
router.post('/controllers/authenticate-controller', authenticateController.authenticate);

// route to handle Home
router.get('/home', function(req, res){
  res.render('pages/home');
});

// route to handle Node.js folder
router.get('/node/code', function(req, res){
  res.render('pages/node/NodeCode');
});
router.get('/node/video', function(req, res){
  res.render('pages/node/NodeVideo');
});
router.get('/node/live_chat', function(req, res){
  res.render('pages/node/NodeLiveChat');
});

// route to handle SEO folder
router.get('/seo/code', function(req, res){
  res.render('pages/seo/SEOCode');
});
router.get('/seo/video', function(req, res){
  res.render('pages/seo/SEOVideo');
});
router.get('/seo/live_chat', function(req, res){
  res.render('pages/seo/SEOLiveChat');
});

// route to handle SEO folder
router.get('/cordova/code', function(req, res){
  res.render('pages/cordova/CordovaCode');
});
router.get('/cordova/video', function(req, res){
  res.render('pages/cordova/CordovaVideo');
});
router.get('/cordova/live_chat', function(req, res){
  res.render('pages/cordova/CordovaLiveChat');
});

// route to handle About
router.get('/about', function(req, res){
  res.render('pages/about');
});

// route to handle error
router.get('/errors/code', function(req, res){
  res.render('pages/errors/CodeError');
});

module.exports = router;
