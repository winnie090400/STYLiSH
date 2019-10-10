const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const crypto = require('crypto');
const req = require('request');
const https = require('https');
const router = express.Router();
const conn = require('../mysql.js');

router.post('/signup', function(request, response) {
  
  var email = request.body.email;
  conn.query('select email from user where email = ? and provider = "native"', email , function (err,result) {
	    
	    if (err) throw err;
	    
	    if (!result.length){
	    	
	    	const hash = crypto.createHash('sha256');
	    	hash.update(crypto.randomBytes(48));
	    	
	        var userInsert = {
	            provider:"native",
	            name:request.body.name,
	            email:request.body.email,
	            password:request.body.password,
	            token:hash.digest('hex'),
	            token_expired:Date.now()+ 1800000,  //半小時過期
	            picture:"temp.jpg",

	        }

	        conn.query('insert into user set ?',userInsert,function (err,result) {
	            if (err) throw err;
	            console.log('Add user info into DB');

				conn.query('select * from user where email = ?',email,function (err,result) {
		            var user = {};
		            user.id = result[0].id;
		            user.provider = result[0].provider;
		            user.name = result[0].name;
		            user.email = result[0].email;
		            user.picture = result[0].picture;

		            var data = {};
		            data.access_token = result[0].token;
		            data.access_expired = result[0].token_expired;
		            
		            data.user = user;

		            var signup_response = {"data":data};

		            response.send(signup_response);
	 			});


	        });
	        
            
	    }else{
	    	//duplicate email address, change xhr state to error 404
	    	const err = new Error('Invalid token.');
                   err.status = 404;
                   response.status(err.status);
                   response.send({ error: "Invalid token." });
	    }
    });   

});


router.post('/signin', function(request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var password = request.body.password;
  var provider = request.body.provider;

  if(provider == "native"){
  	conn.query('select id from user where name = ? and email = ? and password = ? and provider = "native"', [name,email,password] , function (err,result) {

	    if (!result.length){
	        
            response.status(404);
            response.send({ error: "Invalid token." });
            
	    }else{
	    	
	    	var hash = crypto.createHash('sha256');
	    	hash.update(crypto.randomBytes(48));
	        var token = hash.digest('hex');
	        var token_expired = Date.now()+ 1800000;  //半小時過期
	        var id = result[0].id;
	
	        conn.query('UPDATE user SET token = ?, token_expired = ? WHERE id = ?',[token,token_expired,id], function (err,result) {
	            if (err) throw err;
	            console.log('Rows affected:', result.affectedRows);

	            conn.query('select * from user where id = ?', id ,function (err,result) {
		            var user = {};
		            user.id = result[0].id;
		            user.provider = result[0].provider;
		            user.name = result[0].name;
		            user.email = result[0].email;
		            user.picture = result[0].picture;

		            var data = {};
		            data.access_token = result[0].token;
		            data.access_expired = result[0].token_expired;
		            
		            data.user = user;

		            var signin_response = {"data":data};

		            response.send(signin_response);
	 			});

	        });
	    	
	    	
	    }
    });

    }else if(provider == "facebook"){
    	var fbToken = request.body.token;
    	//從header request取得fb token
    	req('https://graph.facebook.com/v3.3/me?&fields=name,email&access_token=' + fbToken, (error, resp, body) => {
    	    
    		var fbbody = JSON.parse(body);
    		var name = fbbody.name;
    		var email = fbbody.email;

	    	//判斷email 在DB內有沒有資料
	    	conn.query('select id from user where name = ? and email = ? and provider = "facebook"', [name,email] , function (err,result) {
	    		if(!result.length){
		    	const hash = crypto.createHash('sha256');
		    	hash.update(crypto.randomBytes(48));
		        var userInsert = {
		            provider:"facebook",
		            name:name,
		            email:email,
		            password:0,
		            token:hash.digest('hex'),
		            token_expired:Date.now()+ 1800000,  //半小時過期
		            picture:"temp.jpg",

		        }

		        conn.query('insert into user set ?',userInsert,function (err,result) {
		            if (err) throw err;
		            console.log('Add fb user info into DB');
		        });
		    	
		    	}else{
		    		var hash = crypto.createHash('sha256');
			    	hash.update(crypto.randomBytes(48));
			        var token = hash.digest('hex');
			        var token_expired = Date.now()+ 1800000;  //半小時過期
			        var id = result[0].id;
			
			        conn.query('UPDATE user SET token = ?, token_expired = ? WHERE id = ?',[token,token_expired,id], function (err,result) {
			            if (err) throw err;
			            console.log('Rows affected:', result.affectedRows);
				        
				        conn.query('select * from user where id = ?', id ,function (err,result) {
				            var user = {};
				            user.id = result[0].id;
				            user.provider = result[0].provider;
				            user.name = result[0].name;
				            user.email = result[0].email;
				            user.picture = result[0].picture;

				            var data = {};
				            data.access_token = result[0].token;
				            data.access_expired = result[0].token_expired;
				            
				            data.user = user;

				            var fbsignin_response = {"data":data};
				            response.send(fbsignin_response);
			 			});

			        });
			        
		    	}

	    	});
		});
  
    }   

});

router.get('/profile', function(request, response) {
  	
	//get bearer token
	var header = request.header("authorization").split(" ");
	var authorization = header[1];

  	//抓出db的token_expired time
  	conn.query('select * from user where token = ?',authorization,function (err,result) {
  		var token_expired = result[0].token_expired;
		//確認 expired or not
		  	if(token_expired - Date.now() <= 0){
				//token過期 > redirect to singn in page
				// response.redirect('/signin.html');
				response.send({error:"Invalid token."});

		  	}else{
				//token有效 > send profile data
				var userProfile = {};
				var data = {};
	            data.id = result[0].id;
	            data.provider = result[0].provider;
	            data.name = result[0].name;
	            data.email = result[0].email;
	            data.picture = result[0].picture;
	            userProfile.data = data;
				response.send(userProfile);
		  	}

	});

});

module.exports = router;