/**
 * FourSquareAPI is used by the app to interact with the Four Square API
 *  Owner Kenneth Davidson
 *  Client id NLOW2IPVJFVONCJFEVWAFQ24YW0HT2XW4CDMTCC0W045A4YR
 *  Client secret TD04XNNIZYWBXEGRUFGIFDRWPYDUAD1QXZWZUJWR4MZHLZ5C
 */

function FourSquare(_token) {
	var config = {
		apiKey: 'XXXXXXXXXXXXXX',
		authUrl: 'https://foursquare.com/oauth2/authenticate?response_type=token',
		apiUrl: 'https://api.foursquare.com/',
		clientId: '&client_id=NLOW2IPVJFVONCJFEVWAFQ24YW0HT2XW4CDMTCC0W045A4YR',				// Yo Caddy Client ID
		clientSecret: 'TD04XNNIZYWBXEGRUFGIFDRWPYDUAD1QXZWZUJWR4MZHLZ5C',						// Yo caddy Secret Key
		redirectUrl: '&redirect_uri=http://www.foursquare.com'
	};
	
	var token = _token || undefined;
	var fsLoginUrl = config.authUrl + config.clientId + config.redirectUrl;
	var win, webView;
	var webcallback;
	
	this.createFSButton = function(cb) {
		webcallback = cb;
		
		var fsview = Ti.UI.createView({
			width: 300, height: 40,
			borderRadius: 10
		});
		
		var imageButton = Ti.UI.createButton({
			width: Ti.UI.FILL, height: Ti.UI.FILL,
			backgroundColor: '#0072b1',
			backgroundSelectedColor: '#ff7900',
			backgroundImage: '/images/buttonBackground.png'
		});
		imageButton.addEventListener('click', showAuthorizeUI);
		
		var imageView = Ti.UI.createImageView({
			touchEnabled: false,
			right: 5, height: 60,
			image: '/images/social/Foursquare-One-icon.png'
		});
		
		var imageLabel = Ti.UI.createLabel({
				touchEnabled: false,
				left: 10,
				text: 'Connect to Foursquare',
				color: 'white',
				font: {
					fontFamily: 'Helvetica',
					fontSize: 20
				}
			});
		
		fsview.add(imageButton);
		fsview.add(imageView);
		fsview.add(imageLabel);
		return fsview;
	};
	
	/**
	 *  
	 */
	var updateToket = function(_tok) {
		token = _tok || undefined;
	};
	
	/**
	 * Authenticate - used to authenticate the user with FourSquare 
	 * @param {Object} _args
	 * @return {Object} token
	 */
	var showAuthorizeUI = function() {
		// Create and show the window
		// Add WebView to the window
		Ti.API.debug('Foursquare - open OAuth window');
		win = Ti.UI.createWindow({
			navBarHidden: true			
		});
		win.open();
		
		webView = Ti.UI.createWebView({
			height: '90%',
			width: '90%',
			url: fsLoginUrl,
			autoDetect: [Ti.UI.AUTODETECT_NONE],
			borderWidth: 2,
			borderRadius: 5
		});		
		
		webView.addEventListener('load', function(e) {
			var result;
			 
			if (e.url.indexOf('#access_token') != -1) {
				var tok = e.url.split("=")[1];
				token = tok;
				result = {
					success: true,
					action: 'login',
					access_token: token
				};
				webcallback(result);
				destroyAuthorizeUI();
			} else if ('http://foursquare.com/' == e.url) {
				result = {
					success: false,
					action: 'login'
				};
				destroyAuthorizeUI();			
			} else if (e.url.indexOf('#error=access_denied') != -1) {
				result = {
					success: false,
					action: 'login'
				};
				destroyAuthorizeUI();				
			} else {
				// Wait for it
			}
		});
		
		win.add(webView);
	};
	
	/**
	 * Destroy the window after removing the appropriate handlers
	 */
	var destroyAuthorizeUI = function() {
		Ti.API.debug('Foursquare - destroy OAuth window');
		
		if (win == null) {
			return;			
		}
		
		try {
			webView.removeEventListener('load', webcallback);
			win.close();
			win = null;
		} catch(ex) {
			Ti.API.debug('Foursquare - cannot destroy the UI.');
		}		
	};
	
	/**
	 *  FindNearbyCourses - used to return a list of nearby courses based on the user current location
	 * @param {Object} longitude
	 * @param {Object} latitude
	 * @return {Object} courses
	 */
	this.findNearbyCourses = function(longitude, latitude, callback) {
		if (this.token) {		// Use the user token if one was submitted
			
		} else {				// Use the default login
			
			/**
			 * Building the string:
			 * https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD 
			 */			
			var venueUrl = this.config.apiUrl + 'v2/venues/search?ll=' 
				+ latitude +','+ longitude 
				+ '&client_id=' + this.config.clientId
				+ '&client_secret=' + this.config.clientSecret
				+ '&query=golf'
				+ '&categoryId=4bf58dd8d48988d1e6941735'			// golfcourses = 4bf58dd8d48988d1e6941735
				+ '&radius=8000&limit=15'
				+ '&v=' + yc.getCurrentDate('yyyymmdd');
			
			Titanium.API.debug(venueUrl);
			var https = Titanium.Network.createHTTPClient({
				onload: function(res) {
					var responseData = JSON.parse(this.responseText);
					var courseList = [];
					
					for(var i = 0; i < responseData.response.venues.length; i++) {
						courseList.push({
							fsid: responseData.response.venues[i].id,
							name: responseData.response.venues[i].name,
							lon: responseData.response.venues[i].location.lng,
							lat: responseData.response.venues[i].location.lat							
						});
					}
					
					Titanium.API.debug(JSON.stringify(courseList));
					callback(courseList);
				},
				onerror: function(res) {
					// If we don't get a response, no biggy
					Ti.UI.createAlertDialog({
						title: 'No Courses Found',
						message: 'No golf courses were found nearby.  Ensure your GPS is turned on and attempt to search again.',
						ok: 'Ok'
					}).show();					
				},
				timeout: 5000,
				validatesSecureCertificate: true
			});
			
			https.open('GET', venueUrl);
			https.send();
		}
	};
};

module.exports = FourSquare;