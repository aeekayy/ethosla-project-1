var express = require('express');
var router = express.Router();
var passport = require('passport');
var CognitoStrategy = require('passport-cognito');

/**
 * Initiate the Cognito Strategy for 
 * Login of Dhanjo
 */
passport.use(new CognitoStrategy({
	userPoolId: 'us-west-2_VOxqkVzlh',
	clientId: '35iv5ri622b4o6agrul7mrpkhs',
	region: 'us-west-2'
  }, 
  function(accessToken, idToken, refreshToken, user, cb) {
    process.nextTick(function() {
      return cb(null, user); 
    });
  }
));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  res.send(passport.authenticate('cognito', {
    successRedirect: '/',
    failureRedirect: '/api/v1/login'
  }));
});

module.exports = router;
