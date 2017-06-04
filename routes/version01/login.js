var express = require('express');
var router = express.Router();

/**
 * Initiate the Cognito Strategy for 
 * Login of Dhanjo
 */
// var AmazonCognitoIdentity = require('aws-sdk/clients/cognitoidentity');
// var CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider');
var AWSCognito = require('amazon-cognito-identity-js');
var CognitoUserPool = AWSCognito.CognitoUserPool;

var poolData = { 
  UserPoolId: 'us-west-2_VOxqkVzlh',
  ClientId:  '35iv5ri622b4o6agrul7mrpkhs'
};
// var userPool = new CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var userPool = new AWSCognito.CognitoUserPool(poolData);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  /** Todo tasks
   * 
   * Check for empty username and password
   */
  var authenticationData = {
    Username: req.body.username, 
    Password: req.body.password
  }

  var authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
  var userData = {
    Username: req.body.username, 
    Pool: userPool
  }; 

  var cognitoUser = new AWSCognito.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) { 
      res.send('{ "Response": "success", "AccessToken": "' + result.getAccessToken().getJwtToken() + '" }');
    },
    onFailure: function(err) { 
	res.send('{ "Response": "error", "Message": "' + err + '" }');
    }
  });
});

module.exports = router;
