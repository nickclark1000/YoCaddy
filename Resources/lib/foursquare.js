/**
 * FourSquareAPI is used by the app to interact with the Four Square API
 *  Owner Kenneth Davidson
 *  Client id NLOW2IPVJFVONCJFEVWAFQ24YW0HT2XW4CDMTCC0W045A4YR
 *  Client secret TD04XNNIZYWBXEGRUFGIFDRWPYDUAD1QXZWZUJWR4MZHLZ5C
 */

function FourSquare(_token) {
	this.config = {
		apiKey: 'XXXXXXXXXXXXXX',
		authUrl: 'https://foursquare.com/',
		apiUrl: 'https://api.foursquare.com/',
		clientId: 'NLOW2IPVJFVONCJFEVWAFQ24YW0HT2XW4CDMTCC0W045A4YR',
		clientSecret: 'TD04XNNIZYWBXEGRUFGIFDRWPYDUAD1QXZWZUJWR4MZHLZ5C'	
	};
	
	this.token = _token;
	
	/**
	 * Authenticate - used to authenticate the user with FourSquare 
	 * @param {Object} _args
	 * @return {Object} token
	 */
	this.authenticateUser = function(_args) {
		
	};
	
	/**
	 * checkIn checks in under the logged in users name
	 * @param {Object} _args 
	 */
	this.checkIn = function(_args) {
		
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