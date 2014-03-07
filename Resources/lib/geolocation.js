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
	var distance = _d || 20;
	var provider = _p || PROVIDER_GPS;
	var purpose = "yoCaddy requires access to GPS services";	 
	var accuracy = Ti.Geolocation.ACCURACY_HIGH;
	
	/**
	 * Get the current location, this location is not updated, it is a cached entry 
	 * @param {Object} callback
	 */
	this.getCurrentLocation = function(callback) {
		try {	
			if (Titanium.Geolocation.locationServicesEnabled) {
				if (Titanium.Platform.osname == 'android') { // Setup android related GPS listeners
					Titanium.API.debug('Configuring Geolocation for Android');
					
					Ti.API.debug('GPS Distance: ' + distance);	
					var providerGps = Ti.Geolocation.Android.createLocationProvider({
					    name: provider,
					    minUpdateDistance: distance,
					    minUpdateTime: 10
					});
					Ti.Geolocation.Android.addLocationProvider(providerGps);
					Ti.Geolocation.Android.manualMode = true;
					
					//Ti.Geolocation.preferredProvider = this.provider;		
					//Ti.Geolocation.accuracy = this.accuracy;
					//Ti.Geolocation.distanceFilter = this.distance; 
					//Ti.Geolocation.Android.manualMode = false; 	 					
				} else if (Titanium.Platform.osname == 'iphone ' || Titanium.Platform.osname == 'ipad') { // Setup ipad and iphone related GPS listeners
					Titanium.API.debug('Configuring Geolocation for iOS');
					Ti.Geolocation.preferredProvider = provider;
					Ti.Geolocation.purpose = purpose;
				    Ti.Geolocation.accuracy = accuracy;
				    Ti.Geolocation.distanceFilter = distance;   	
				}	
			} else {
				Ti.UI.createAlertDialog({
					title: 'Location Service Error',
					message: 'Location services are not currently available.',
					ok: 'Ok'
				}).show();
			}
				
			Titanium.Geolocation.getCurrentPosition(callback);
		} catch (err) {
			throw('geoerr', {});
		}
	};
	
	/**
	 * Set the location callback is used to provide continual updating of locations 
	 * @param {Object} callback
	 */
	this.setLocationCallback = function(callback) {
		if (Titanium.Geolocation.locationServicesEnabled) {
			if (Titanium.Platform.osname == 'android') { // Setup android related GPS listeners
				Titanium.API.debug('Configuring Geolocation for Android');
				
				Ti.API.debug('GPS Distance: ' + distance);	
				var providerGps = Ti.Geolocation.Android.createLocationProvider({
				    name: provider,
				    minUpdateDistance: distance,
				    minUpdateTime: 0
				});
				Ti.Geolocation.Android.addLocationProvider(providerGps);
				Ti.Geolocation.Android.manualMode = true;
				
				//Ti.Geolocation.preferredProvider = this.provider;		
				//Ti.Geolocation.accuracy = this.accuracy;
				//Ti.Geolocation.distanceFilter = this.distance; 
				//Ti.Geolocation.Android.manualMode = false; 	 					
			} else if (Titanium.Platform.osname == 'iphone ' || Titanium.Platform.osname == 'ipad') { // Setup ipad and iphone related GPS listeners
				Titanium.API.debug('Configuring Geolocation for iOS');
				Ti.Geolocation.preferredProvider = provider;
				Ti.Geolocation.purpose = purpose;
			    Ti.Geolocation.accuracy = accuracy;
			    Ti.Geolocation.distanceFilter = distance;   	
			}	
		} else {
			Ti.UI.createAlertDialog({
				title: 'Location Service Error',
				message: 'Location services are not currently available.',
				ok: 'Ok'
			}).show();
		}
			
		Titanium.Geolocation.addEventListener('location', callback);
	};
	
	/**
	 * Remove the callback 
 	 * @param {Object} callback
	 */
	this.removeLocationCallback = function(callback) {
		Titanium.Geolocation.removeEventListener('location', callback);
	}; 	
};

module.exports = geolocation;
