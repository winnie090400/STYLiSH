const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer  = require('multer');
const querystring = require('querystring');
const url = require('url');
const req = require('request');
const https = require('https');
const nodeCache = require('node-cache');
const myCache = new nodeCache({stdTTL: 200, checkperiod: 0});  //stdTTL:過期時間
const fs = require('fs');
const multerS3 = require('multer-s3');
const router = express.Router();
const s3 = require('../s3.js');
const conn = require('../mysql.js');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'kelolooo',
     //    metadata: function (req, file, cb) {
	    //   cb(null, {fieldName: file.fieldname});
	    // },
        key: function (req, file, cb) {
            var imageUrl = Date.now() + file.originalname;
            cb(null, imageUrl);
        }
    })
});

//set storage for product
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {   //圖片儲存位置
// 		cb(null, 'public/upload/');
// 	},
// 	filename: function (req, file, cb) {
// 		var imageUrl = Date.now() + file.originalname;  //圖片名稱設定
// 		cb(null, imageUrl);
// 	}
// });
// const upload = multer({ storage: storage });

//set storage for campaign
const storageCampaign = multer.diskStorage({
	destination: function (req, file, cb) {   //圖片儲存位置
		cb(null, 'public/campaign/');
	},
	filename: function (req, file, cb) {
		var imageUrl = Date.now() + file.originalname;  //圖片名稱設定
		cb(null, imageUrl);
	}
});
const uploadCampaign = multer({ storage:storageCampaign }).single('picture');


router.post('/product/add', upload.array('file',3) ,(request, response,next) => {

	if (!request.files) {
		console.log("No file received");
	}else{
		var imageArray = [];
		for(var i=0; i<3; i++){
			imageArray.push(request.files[i].location);
		}
		var data = {
			id:request.body.id,
			category:request.body.category,
			title:request.body.title,
			description:request.body.description, 
			price:request.body.price,
			texture:request.body.texture,
			wash:request.body.wash,
			place:request.body.place,
			note:request.body.note,
			story:request.body.story,
			main_image: imageArray[0],
			image0: imageArray[1],
			image1: imageArray[2],
		};
		conn.query('INSERT INTO product SET ?',data,(err, results) => {
	    	if(err) throw err;
		});
		
		response.send('New Product and images added!!');
		}
	});

router.post('/product/addDetail',(request, response) => {
	console.log(request.body);
		if(!request.body.id){
			console.log("No detail received");
		}else{
		var data = {
			product_id:request.body.id,
			colors_code:request.body.color,
			size:request.body.size,
			stock:request.body.stock,
		};

		conn.query('INSERT INTO productdetail SET ?',data,(err, results) => {
	    	if(err) throw err;
		});
		
		response.send('Product drtails added!!');
		}
	});

router.post('/product/addColor',(request, response) => {
		if(!request.body.code){
			console.log("No color received");
		}else{
		var data = {
			code:request.body.code,
			name:request.body.name,
		};

		conn.query('INSERT INTO colors SET ?',data,(err, results) => {
	    	if(err) throw err;
		});
		
		response.send('Color added!!');
		}
	});


router.post('/campaign/add', uploadCampaign ,(request, response,next) => {
	
	var id = request.body.product_id;
	var data={
          product_id:request.body.product_id,
          picture:request.file.filename,
          story:request.body.story
    };


    conn.query('select product.id from product where product.id like ?',id,(err, results) => {
    	if(err) throw err;
		
		if(results.length == 0){
			response.send('No product existing please add new product!!');

		}else{

			conn.query('insert into campaign set ?',data,(err, results) => {
				if(err) throw err;
			});

			myCache.del( "campaign_cache", function( err, count ){
			  if( !err ){
			    console.log('the number of deleted entries: '+ count ); 
			    
			  }
			});
			
			response.send('New campaign added!!');
		}
	
	});
});



router.post('/checkout', function(request, response) {
	//接前端 header token資料
	
	if(!request.header("authorization")){
		var authorization = '0';
	}else{
		var header = request.header("authorization").split(" ");
		var authorization = header[1];
	}
	

	//接前端 body json的資料
	var prime = request.body.prime;
	var order = request.body.order;
	var recipient = order.recipient;
	var list = order.list;
	
	var shipping = order.shipping;
	var payment = order.payment;
	var subtotal = order.subtotal;
	var freight = order.freight;
	var total = order.total;
    var name = recipient.name;
    var phone = recipient.phone;
    var email = recipient.email;
    var address = recipient.address;
    var time = recipient.time;

    var id = list[0].id;
    var name = list[0].name;
    var price = list[0].price;
    var color = list[0].color;
    var color_code = color.code;
    var color_name = color.name;
    var size = list[0].size;
    var qty = list[0].qty
    
	//加入DB
	conn.query('select * from user where token = ?', authorization ,function (err,result) {
		
		if(!result.length){
			var user = "1";     //資料庫user為int值所以取 1 代表 guest身分

		}else{
			var user = result[0].id;   //用戶有登入，取得user id
		}
		
		var table = {						
			prime:request.body.prime,
			user_id:user,
			shipping:order.shipping,
			payment:order.payment,
			subtotal:order.subtotal,
			freight:order.freight,
			total:order.total,
			name:recipient.name,
			phone:recipient.phone,
			email:recipient.email,
			address:recipient.address,
			time:recipient.time
		}

		
		//資料存入 order table ，取得 table id 後將剩餘 product list 依照 table id 存入 list table
		conn.query('INSERT INTO order_table SET ?',table,(err, results) => {
	    	if(err) throw err;

		    conn.query('select id from order_table where prime = ?',prime,(err, results) => {
		    	if(err) throw err;

		    	var list = {

					order_table_id:results[0].id,
					product_id:id,
					name:name,
					price:price,
					color_code:color_name,
					color_name:color_name,
					size:size,
					qty:qty
				}

				conn.query('INSERT INTO order_list SET ?',list,(err, results) => {
		    	if(err) throw err;

				});
			});

		});


	});

	//pay by prime(http post request所需內容)
	const post_data = {
	    // prime from front-end
	    "prime": prime,
	    "partner_key": "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
	    "merchant_id": "AppWorksSchool_CTBC",
	    "details":"TapPay Test",
		"amount": 100,
		"cardholder": {
		    "phone_number": "+886923456789",
		    "name": "王小明",
		    "email": "LittleMing@Wang.com",
		    "zip_code": "100",
		    "address": "台北市天龍區芝麻街1號1樓",
		    "national_id": "A123456789"
		},
		  "remember": true
		
	}

	const post_options = {
	    host: 'sandbox.tappaysdk.com',
	    port: 443,
	    path: '/tpc/payment/pay-by-prime',
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	        'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG'
	    }
	}
	
	const post_req = https.request(post_options, function(response) {
        response.setEncoding('utf8');
        response.on('data', function (body) {

            var body = JSON.parse(body);
            var msg = body.msg;           
            sendMessage(msg);			//回傳成功訊息 from tappay
        });
    });

	post_req.write(JSON.stringify(post_data));
    post_req.end();

    // msg 回傳 success 時，回傳 order number 到前端
    function sendMessage(msg){
    	if(msg == 'Success'){
    		conn.query('select id from order_table where prime = ?',prime,(err, results) => {
    			
    			response.send({data:{number:results[0].id}});
    		});
    		
    	}else{
    		response.send({error:"Invalid token."});
    	}
    }


});

module.exports = router;