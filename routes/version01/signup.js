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
   * Need to add check for email, phone number, username and password
   */
  var attributeList = [];
  var dataEmail = {
    Name: 'email',
    Value: req.body.email_addr
  }; 
  var dataPhoneNumber = { 
    Name: 'phone_number',
    Value: req.body.phone_number
  };
  var dataName = {
    Name: 'name',
    Value: req.body.name
  };

  var attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);
  var attributePhoneNumber = new AWSCognito.CognitoUserAttribute(dataPhoneNumber);
  var attributeName = new AWSCognito.CognitoUserAttribute(dataName); 

  attributeList.push(attributeEmail); 
  attributeList.push(attributePhoneNumber); 
  attributeList.push(attributeName); 

  userPool.signUp(req.body.username, req.body.password, attributeList, null, function(err, result){
	if(err) {
		res.send('{ "Response": "error", "Message": "' + err + '" }');
	}
	cognitoUser = result.user; 
	res.send('{ "Response": "success", "user": "' + cognitoUser.username + '" }');
  });
});

module.exports = router;
