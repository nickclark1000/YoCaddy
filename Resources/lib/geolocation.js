/**
 * Geolocation Module allows the quick and easy use of the Geolocation service in Titianium.  Since the Geolocation service
 * is used for all requests, there are no true instances you need to ensure you remove the location call back when you're done
 * with the object, setting it to null.
 * @param {Object} _p - 'gps' or 'network'
 * @param {Object} _d - distnace in meters
 * 
 * Usage: var VARIABLE = new geolocation(provider)
 */
		
var geolocation = function(_p, _d) {	
	this.distance = _d;
	this.provider = _p;
	this.purpose = "yoCaddy requires access to GPS services";	 
	this.accuracy = Ti.Geolocation.ACCURACY_HIGH;		
};

geolocation.prototype.getCurrentLocation = function(callback) {
	if (Titanium.Geolocation.locationServicesEnabled) {
		if (Titanium.Platform.osname == 'android') { // Setup android related GPS listeners
			Titanium.API.debug('Configuring Geolocation for Android');
			Ti.Geolocation.preferredProvider = this.provider;		
			Ti.Geolocation.accuracy = this.accuracy;
			Ti.Geolocation.distanceFilter = this.distance; 
			Ti.Geolocation.Android.manualMode = false; 	 					
		} else if (Titanium.Platform.osname == 'iphone ' || Titanium.Platform.osname == 'ipad') { // Setup ipad and iphone related GPS listeners
			Titanium.API.debug('Configuring Geolocation for iOS');
			Ti.Geolocation.preferredProvider = this.provider;
			Ti.Geolocation.purpose = this.purpose;
		    Ti.Geolocation.accuracy = this.accuracy;
		    Ti.Geolocation.distanceFilter = this.distance;   	
		}	
	} else {
		Ti.UI.createAlertDialog({
			title: 'Location Service Error',
			message: 'Location services are not currently available.',
			ok: 'Ok'
		}).show();
	}
		
	Titanium.Geolocation.getCurrentPosition(callback);
};

geolocation.prototype.setLocationCallback = function(callback) {
	if (Titanium.Geolocation.locationServicesEnabled) {
		if (Titanium.Platform.osname == 'android') { // Setup android related GPS listeners
		if (Titanium.Platform.osname == 'android') { // Setup android related GPS listeners
			Titanium.API.debug('Configuring Geolocation for Android');
			Ti.Geolocation.preferredProvider = this.provider;		
			Ti.Geolocation.accuracy = this.accuracy;
			Ti.Geolocation.distanceFilter = this.distance; 
			Ti.Geolocation.Android.manualMode = false; 	 					
		} else if (Titanium.Platform.osname == 'iphone ' || Titanium.Platform.osname == 'ipad') { // Setup ipad and iphone related GPS listeners
			Titanium.API.debug('Configuring Geolocation for iOS');
			Ti.Geolocation.preferredProvider = this.provider;
			Ti.Geolocation.purpose = this.purpose;
		    Ti.Geolocation.accuracy = this.accuracy;
		    Ti.Geolocation.distanceFilter = this.distance;   	
		}  	
		}	
	} else {
		Ti.UI.createAlertDialog({
			title: 'Location Service Error',
			message: 'Location services are not currently available.',
			ok: 'Ok'
		}).show();
	}
		
	Titanium.Geolocation.addEventHandler('location', callback);
};

geolocation.prototype.removeLocationCallback = function(callback) {
	Titanium.Geolocation.removeEventHandler('location', callback);
};

module.exports = geolocation;
