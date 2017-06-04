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
   * Ensure that the confirmation field is not null  
   */
  var userData = {
    Username: req.body.username, 
    Pool: userPool
  }; 

  var cognitoUser = new AWSCognito.CognitoUser(userData); 
  cognitoUser.confirmRegistration(req.body.confirmation_code, true, function(err, result) {
	if(err) {
		res.send('{ "Response": "error", "Message": "' + err + '" }');
	}
	res.send('{ "Response": "success", "Message": "' + result + '" }');
  });
});

module.exports = router;
