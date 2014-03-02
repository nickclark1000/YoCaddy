/**
 * APPID: 1390847327851939
 * APPSECRET: 631f6e585ec7606bfcd10b664b00d5c3 
 */

var Facebook = function(_tok) {
	var webcallback;
	var fb = require('facebook');
 	fb.appid = '1390847327851939';
	fb.permissions = ['basic_info', 'publish_stream', 'offline_access'];
 	fb.forceDialogAuth = true;
 	
 	var token = (_tok === fb.getAccessToken()) ? fb.getAccessToken() : undefined;
 	
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
 	 * 
 	 */
 	var logoutCallback = function(e) {
 		var result = {};
 		
 		Ti.API.debug(JSON.stringify(e));
 		
	    if (e.source.loggedIn === false) {
	    	token = e.source.accessToken;
	        result = {
	        	success: true,
	        	action: 'logout',
	        	access_token: e.source.accessToken
	        };	     
	    } else if (e.error) {
	        result = {
	        	success: false,
	        	action: 'logout',
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
		
		var imageView = Ti.UI.createImageView({
			touchEnabled: false,
			right: 10, height: 50,
			image: '/images/social/icon_facebook.png'
		});
		
		var imageLabel = Ti.UI.createLabel({
			touchEnabled: false,
			left: 10,
			text: (token) ? 'Disconnect Facebook' : 'Connect to Facebook',
			color: 'white',
			font: {
				fontFamily: props.fontFamily,
				fontSize: 18
			}
		});
		
		imageButton.addEventListener('click', function(e){
			fb.addEventListener('login', authorizeCallback);
			fb.addEventListener('logout', logoutCallback);
		
			if (fb.loggedIn) {
				Ti.API.debug('logging out');
				fb.logout();
			} else {
				Ti.API.debug('logging in');
				fb.authorize();
			}
		});		
		
		fbview.add(imageButton);
		fbview.add(imageView);
		fbview.add(imageLabel);
		
		fbview.addEventListener('setText', function(e){
			imageLabel.setText(e.text);
		});
		
		return fbview;
	};	 
	
	/**
	 * 
	 */
	this.dialog = function(data) {
		fb.dialog("status", data, function(e) {
		    if(e.success && e.result) {
				Ti.API.debug('Facebook Dialog: '+JSON.stringify(e));
		    }
		});			
	};
};

module.exports = Facebook;
