const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const querystring = require('querystring');
const nodeCache = require('node-cache');
const myCache = new nodeCache({stdTTL: 200, checkperiod: 0});  //stdTTL:過期時間
const conn = require('../mysql.js');

const router = express.Router();

router.get('/products/all',(request, response) => {
    var x = 0;
    var y = 0;
    var z = 0;
    var h = 0;
   
    if(!request.query.paging || request.query.paging == 1){
    	var offset = 0;
    }else{
    	var offset = (parseInt(request.query.paging) -1) * 6;
    }

    conn.query('select count(id) as count from product',(err, result) => {
    	var pageMax = Math.ceil((result[0].count)/6);
    	var paging = request.query.paging;
    	if(paging > pageMax){
    		response.send('No more products!!');
    	}else{
    		console.log('Product have '+ pageMax +' pages!');
    	}
	});

    
	conn.query('select product.id from product order by product.id limit 6 offset ?',offset,(err, result) => {
		
		if(err) throw err;
		let loaded=0;
		let temp=[];
		var api = {
			paging: request.query.paging,
			data: []
		};

		var id_t = [];
		for(var i=0; i < result.length; i++){
        	id_t[i] = result[i].id;
      
		if(id_t.length <= result.length) {
			var id = id_t[x];
			x = x + 1;
		};
		
		conn.query('select product.id,product.category,product.title,product.description,product.price,product.texture,product.wash,product.place,product.note,product.story,product.main_image from product where product.id = ? ',id,(err1, product) => {
			
			
		    let all_products = {
		    	id: product[0].id,
		    	category:product[0].category,
		    	title:product[0].title,
		    	description:product[0].description,
		    	price:product[0].price,
		    	texture:product[0].texture,
		    	wash:product[0].wash,
		    	place:product[0].place,
		    	note:product[0].note,
		    	story:product[0].story,
		    	colors: [],
				sizes: [],
				variants: [],
				main_image: product[0].main_image,
				images: []
		    };
		   	
			if(id_t.length <= result.length) {			
				id = id_t[y];
				y = y + 1;
				
			};

			conn.query('select colors.* from productdetail inner join colors on colors.code = productdetail.colors_code where productdetail.product_id = ? ',id,(err2, colors) => {
				
				if(id_t.length <= result.length) {			
					id = id_t[z];
					z = z + 1;
				};
				conn.query('select productdetail.size from productdetail where productdetail.product_id = ?',id,(err3, size) => {
					
					var sizes = [];
					
					for(i=0; i <size.length; i++ ){
						sizes.push(size[i].size);
					}
				
					if(id_t.length <= result.length) {			
						id = id_t[h];
						h = h + 1;
					};
					conn.query('select productdetail.colors_code, productdetail.size, productdetail.stock from productdetail where productdetail.product_id = ?',id,(err4, variants) => {
				        
				        var variants = variants;


				        conn.query('select product.image0,product.image1 from product where product.id = ?',id,(err5, image) => {
					        
					        var images = [image[0].image0,image[0].image1];

					  		all_products.colors = colors;
					  		all_products.sizes = sizes;
					  		all_products.variants = variants;
					  		all_products.images = images;
					  		temp.push(all_products);
					  		api.data = temp;
					        loaded++;
					        if(loaded===result.length){
					        	
					        	response.json(api);
					        	
					        }					        
		            	});
				    });

				});
			
			});		
			
		});

	}
	});
});


router.get('/products/women',(request, response) => {
    
    if(!request.query.paging || request.query.paging == 1){
    	var offset = 0;
    }else{
    	var offset = (parseInt(request.query.paging) -1) * 6;
    }

    conn.query('select count(id) as count from product where product.category="women"',(err, result) => {
    	var pageMax = Math.ceil((result[0].count)/6);
    	var paging = request.query.paging;
    	if(paging > pageMax){
    		response.send('No more products!!');
    	}else{
    		console.log('Product have '+ pageMax +' pages!');
    	}
	});

	conn.query('select product.id from product where product.category="women" order by product.id limit 6 offset ?',offset,(err, result) => {
		
		if(err) throw err;
		let loaded=0;
		let temp=[];
		var api = {
			paging: request.query.paging,
			data: []
		};

		for(var i=0; i < result.length; i++){
        	id = result[i].id;
       	

		conn.query('select product.id,product.category,product.title,product.description,product.price,product.texture,product.wash,product.place,product.note,product.story,product.main_image from product where product.id = ? ',id,(err1, product) => {
		    
		    let all_products = {
		    	id: product[0].id,
		    	title:product[0].title,
		    	description:product[0].description,
		    	price:product[0].price,
		    	texture:product[0].texture,
		    	wash:product[0].wash,
		    	place:product[0].place,
		    	note:product[0].note,
		    	story:product[0].story,
		    	colors: [],
				sizes: [],
				variants: [],
				main_image: product[0].main_image,
				images: []
		    };

			conn.query('select colors.* from productdetail inner join colors on colors.code = productdetail.colors_code where productdetail.product_id = ? ',id,(err2, colors) => {
				
				var colors = colors;

				conn.query('select productdetail.size from productdetail where productdetail.product_id = ?',id,(err3, size) => {
					
					var sizes = [];
					
					for(i=0; i <size.length; i++ ){
						sizes.push(size[i].size);
					}
					conn.query('select productdetail.colors_code, productdetail.size, productdetail.stock from productdetail where productdetail.product_id = ?',id,(err4, variants) => {
				        
				        var variants = variants;


				        conn.query('select product.image0,product.image1 from product where product.id = ?',id,(err5, image) => {
					        
					        var images = [image[0].image0,image[0].image1];

					  		all_products.colors = colors;
					  		all_products.sizes = sizes;
					  		all_products.variants = variants;
					  		all_products.images = images;
					  		temp.push(all_products);
					  		api.data = temp;
					        loaded++;
					        if(loaded===result.length){
					        	
					        	response.json(api);
					        	
					        }
		            	});
				    });

				});
			
			});
			
		});

	}
	});
});

router.get('/products/men',(request, response) => {
    
    if(!request.query.paging || request.query.paging == 1){
    	var offset = 0;
    }else{
    	var offset = (parseInt(request.query.paging) -1) * 6;
    }

    conn.query('select count(id) as count from product where product.category="men"',(err, result) => {
    	var pageMax = Math.ceil((result[0].count)/6);
    	var paging = request.query.paging;
    	if(paging > pageMax){
    		response.send('No more products!!');
    	}else{
    		console.log('Product have '+ pageMax +' pages!');
    	}
	});

	conn.query('select product.id from product where product.category="men" order by product.id limit 6 offset ?',offset,(err, result) => {
		
		if(err) throw err;
		let loaded=0;
		let temp=[];
		var api = {
			paging: request.query.paging,
			data: []
		};

		for(var i=0; i < result.length; i++){
        	id = result[i].id;
       	

		conn.query('select product.id,product.category,product.title,product.description,product.price,product.texture,product.wash,product.place,product.note,product.story,product.main_image from product where product.id = ? ',id,(err1, product) => {
		    
		    let all_products = {
		    	id: product[0].id,
		    	title:product[0].title,
		    	description:product[0].description,
		    	price:product[0].price,
		    	texture:product[0].texture,
		    	wash:product[0].wash,
		    	place:product[0].place,
		    	note:product[0].note,
		    	story:product[0].story,
		    	colors: [],
				sizes: [],
				variants: [],
				main_image: product[0].main_image,
				images: []
		    };

			conn.query('select colors.* from productdetail inner join colors on colors.code = productdetail.colors_code where productdetail.product_id = ? ',id,(err2, colors) => {
				
				var colors = colors;

				conn.query('select productdetail.size from productdetail where productdetail.product_id = ?',id,(err3, size) => {
					
					var sizes = [];
					
					for(i=0; i <size.length; i++ ){
						sizes.push(size[i].size);
					}
					conn.query('select productdetail.colors_code, productdetail.size, productdetail.stock from productdetail where productdetail.product_id = ?',id,(err4, variants) => {
				        
				        var variants = variants;


				        conn.query('select product.image0,product.image1 from product where product.id = ?',id,(err5, image) => {
					        
					        var images = [image[0].image0,image[0].image1];

					  		all_products.colors = colors;
					  		all_products.sizes = sizes;
					  		all_products.variants = variants;
					  		all_products.images = images;
					  		temp.push(all_products);
					  		api.data = temp;
					        loaded++;
					        if(loaded===result.length){
					        	
					        	response.json(api);
					        	
					        }
		            	});
				    });

				});
			
			});
			
		});

	}
	});
});

router.get('/products/accessories',(request, response) => {
    
    if(!request.query.paging || request.query.paging == 1){
    	var offset = 0;
    }else{
    	var offset = (parseInt(request.query.paging) -1) * 6;
    }

    conn.query('select count(id) as count from product where product.category="accessories"',(err, result) => {
    	var pageMax = Math.ceil((result[0].count)/6);
    	var paging = request.query.paging;
    	if(paging > pageMax){
    		response.send('No more products!!');
    	}else{
    		console.log('Product have '+ pageMax +' pages!');
    	}
	});

	conn.query('select product.id from product where product.category="accessories" order by product.id limit 6 offset ?',offset,(err, result) => {
		
		if(err) throw err;
		let loaded=0;
		let temp=[];
		var api = {
			paging: request.query.paging,
			data: []
		};

		for(var i=0; i < result.length; i++){
        	id = result[i].id;
       	

		conn.query('select product.id,product.category,product.title,product.description,product.price,product.texture,product.wash,product.place,product.note,product.story,product.main_image from product where product.id = ? ',id,(err1, product) => {
		    
		    let all_products = {
		    	id: product[0].id,
		    	title:product[0].title,
		    	description:product[0].description,
		    	price:product[0].price,
		    	texture:product[0].texture,
		    	wash:product[0].wash,
		    	place:product[0].place,
		    	note:product[0].note,
		    	story:product[0].story,
		    	colors: [],
				sizes: [],
				variants: [],
				main_image: product[0].main_image,
				images: []
		    };

			conn.query('select colors.* from productdetail inner join colors on colors.code = productdetail.colors_code where productdetail.product_id = ? ',id,(err2, colors) => {
				
				var colors = colors;

				conn.query('select productdetail.size from productdetail where productdetail.product_id = ?',id,(err3, size) => {
					
					var sizes = [];
					
					for(i=0; i <size.length; i++ ){
						sizes.push(size[i].size);
					}
					conn.query('select productdetail.colors_code, productdetail.size, productdetail.stock from productdetail where productdetail.product_id = ?',id,(err4, variants) => {
				        
				        var variants = variants;


				        conn.query('select product.image0,product.image1 from product where product.id = ?',id,(err5, image) => {
					        
					        var images = [image[0].image0,image[0].image1];

					  		all_products.colors = colors;
					  		all_products.sizes = sizes;
					  		all_products.variants = variants;
					  		all_products.images = images;
					  		temp.push(all_products);
					  		api.data = temp;
					        loaded++;
					        if(loaded===result.length){
					        	
					        	response.json(api);
					        	
					        }
		            	});
				    });

				});
			
			});
			
		});

	}
	});
});

router.get('/products/search',(request, response) => {

    var keyword= request.query.keyword;
    var keywordPass = "%"+keyword+"%";
    console.log(keywordPass);


	conn.query('select product.id from product where product.title like ? order by product.id',keywordPass,(err, result) => {
		
		if(err) throw err;

		if(!result.length){
			response.send('查無產品');
		}else{
			console.log('有值');
		}


		let loaded=0;
		let temp=[];
		var api = {
			paging: request.query.paging,
			data: []
		};

		for(var i=0; i < result.length; i++){
        	id = result[i].id;
       	

		conn.query('select product.id,product.category,product.title,product.description,product.price,product.texture,product.wash,product.place,product.note,product.story,product.main_image from product where product.id = ? ',id,(err1, product) => {
		    
		    let all_products = {
		    	id: product[0].id,
		    	title:product[0].title,
		    	description:product[0].description,
		    	price:product[0].price,
		    	texture:product[0].texture,
		    	wash:product[0].wash,
		    	place:product[0].place,
		    	note:product[0].note,
		    	story:product[0].story,
		    	colors: [],
				sizes: [],
				variants: [],
				main_image: product[0].main_image,
				images: []
		    };

			conn.query('select colors.* from productdetail inner join colors on colors.code = productdetail.colors_code where productdetail.product_id = ? ',id,(err2, colors) => {
				
				var colors = colors;

				conn.query('select productdetail.size from productdetail where productdetail.product_id = ?',id,(err3, size) => {
					
					var sizes = [];
					
					for(i=0; i <size.length; i++ ){
						sizes.push(size[i].size);
					}
					conn.query('select productdetail.colors_code, productdetail.size, productdetail.stock from productdetail where productdetail.product_id = ?',id,(err4, variants) => {
				        
				        var variants = variants;


				        conn.query('select product.image0,product.image1 from product where product.id = ?',id,(err5, image) => {
					        
					        var images = [image[0].image0,image[0].image1];

					  		all_products.colors = colors;
					  		all_products.sizes = sizes;
					  		all_products.variants = variants;
					  		all_products.images = images;
					  		temp.push(all_products);
					  		api.data = temp;
					        loaded++;
					        if(loaded===result.length){
					        	
					        	response.json(api);
					        	
					        }
		            	});
				    });

				});
			
			});
			
		});

	}
	});
});

router.get('/products/details',(request, response) => {
    
	var id = request.query.id;
    myCache.get( `details_${id}`, function( err, value ){
    	if( !err ){
    		if(value == undefined){
    			// cache沒有值，新增資料到cache
			   
				conn.query('select product.id from product where product.id like ?',id,(err, result) => {
					
					if(err || !result.length) {
						response.send("Invalid token");
						return;
					}

					let temp=[];
					var api = {
						paging: request.query.paging,
						data: []
					};

					conn.query('select product.id,product.category,product.title,product.description,product.price,product.texture,product.wash,product.place,product.note,product.story,product.main_image from product where product.id = ? ',id,(err1, product) => {
					    
					    let all_products = {
					    	id: product[0].id,
					    	title:product[0].title,
					    	description:product[0].description,
					    	price:product[0].price,
					    	texture:product[0].texture,
					    	wash:product[0].wash,
					    	place:product[0].place,
					    	note:product[0].note,
					    	story:product[0].story,
					    	colors: [],
							sizes: [],
							variants: [],
							main_image: product[0].main_image,
							images: []
					    };

						conn.query('select colors.* from productdetail inner join colors on colors.code = productdetail.colors_code where productdetail.product_id = ? ',id,(err2, colors) => {
							
							var colors = colors;

							conn.query('select productdetail.size from productdetail where productdetail.product_id = ?',id,(err3, size) => {
								
								var sizes = [];
								
								for(i=0; i <size.length; i++ ){
									sizes.push(size[i].size);
								}
								conn.query('select productdetail.colors_code, productdetail.size, productdetail.stock from productdetail where productdetail.product_id = ?',id,(err4, variants) => {
							        
							        var variants = variants;


							        conn.query('select product.image0,product.image1 from product where product.id = ?',id,(err5, image) => {
								        
								        var images = [image[0].image0,image[0].image1];

								  		all_products.colors = colors;
								  		all_products.sizes = sizes;
								  		all_products.variants = variants;
								  		all_products.images = images;
								  		temp.push(all_products);
								  		api.data = temp;

								  		myCache.set( `details_${id}`, api, function( err, success ){
								            if( err ){
								                console.log("err"+ err );
								               
								            }else if( success ){
								            	console.log("set cache status "+ success);

								            }

							        	});

								        response.json(api);
					            	});
							    });

							});
						
						});
						
					});

				});
			}else{
				// console.log('get details data' + JSON.stringify(value));
				response.send(value);
			}

		}
	});
});


router.get('/marketing/campaigns',(request, response) => {
    myCache.get( "campaign_cache", function( err, value ){
    	if( !err ){
    		if(value == undefined){
    			//cache沒有值，新增資料到cache
    			conn.query('select * from campaign',(err, result) => {
				var api = { data:[] };
				api.data = result;

				myCache.set( "campaign_cache", api, function( err, success ){
		            if( err ){
		                console.log("err"+ err );
		               
		            }else if( success ){
		            	console.log("set cache status "+ success);

		            }

	        	});

				response.send(api);
			
				});

    		}else{
    			//有值，send出快取的值
				console.log('get campaign data' + JSON.stringify(value));
				response.send(value);
    		}
		
		}
	});
});

module.exports = router;