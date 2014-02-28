/**
 * APPID: 1390847327851939
 * APPSECRET: 631f6e585ec7606bfcd10b664b00d5c3 
 */

var Facebook = function(_tok) {
	var token = _tok || undefined;
	var webcallback;
	var fb = require('facebook');
 	fb.appid = '1390847327851939';
	fb.permissions = ['publish_stream'];
 	fb.forceDialogAuth = true;
 	
 	/**
 	 * AuthorizeCallback - used for FB Authorize 'login' callback
 	 */
 	var authorizeCallback = function(e) {
 		var result;
 		
 		Ti.API.debug(JSON.stringify(e));
 		
	    if (e.success) {
	    	token = e.source.accessToken;
	        result = {
	        	success: true,
	        	action: 'login',
	        	access_token: e.source.accessToken
	        };	     
	    } else if (e.error) {
	        result = {
	        	success: false,
	        	action: 'login',
	        	access_token: undefined
	        };	
	    } else if (e.cancelled) {
	        result = {
	        	success: true,
	        	action: 'cancelled',
	        	access_token: undefined
	        };	
	    }	 
	    
	    webcallback(result);		
 	};
 	
	/**
	 * CreateFBButton - returns the button for the FB Module
	 * @param {Object} props
	 * @param {Function} cb - callback for successful or failure 
	 */
	this.createFBButton = function(props, cb) {
		webcallback = cb;
		
		var fbview = Ti.UI.createView({
			width: props.width || '80%', 
			height: props.height || 40,
			borderRadius: 10
		});
		
		var imageButton = Ti.UI.createButton({
			width: Ti.UI.FILL, height: Ti.UI.FILL,
			backgroundColor: props.backgroundColor || '#0072b1',
			backgroundSelectedColor: props.backgroundSelectedColor || '#d1d4d3',
			backgroundImage: '/images/buttonBackground.png'
		});
		imageButton.addEventListener('click', function(e){
			fb.addEventListener('login', authorizeCallback);
			fb.authorize();
		});
		
		var imageView = Ti.UI.createImageView({
			touchEnabled: false,
			right: 5, height: 50,
			image: '/images/social/icon_facebook.png'
		});
		
		var imageLabel = Ti.UI.createLabel({
				touchEnabled: false,
				left: 10,
				text: (token === undefined) ? 'Connect to Facebook' : 'Connected to Facebook',
				color: 'white',
				font: {
					fontFamily: props.fontFamily,
					fontSize: 18
				}
			});
		
		fbview.add(imageButton);
		fbview.add(imageView);
		fbview.add(imageLabel);
		return fbview;
	};	 	
};

module.exports = Facebook;
