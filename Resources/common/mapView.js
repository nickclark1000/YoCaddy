///
/// Google Play Signing information
/// Debug: debug.keystore Alias: yocaddydebug Password: yocaddydebug
/// Release: youcaddy.keystore Alias:yocaddyprod Password: y0c4ddy2014
/// Dev: 
///
/// Debug Key: AIzaSyCulq5JaVCkS52LH5wysNlmeZo0zdqI1is
/// Release Key: AIzaSyCDB8XZ1CKvJkNDm74p5fmGQwjU0FWcRwY
/// Dev Key: AIzaSyA4h4GSJjUILHDHGKXbAI-kXjHg-W2d7B0
///

var mapView = function(_args, cb) {
	var holder, view, messageLabel;
	var playAvailable;
	var saveTrace = _args.saveTrace;
	var showTrace = _args.showTrace;
	var roundId = _args.roundId;
	var deltaLon = 0.002, deltaLat = 0.002;
	var mapCallback = cb ||  function(e) {};
	
	var holder = Ti.UI.createView(_args.props);
	
	var gpsP = Ti.Geolocation.PROVIDER_GPS;
	var gpsD = yc.settings.app.propvalues[yc.settings.app.propids.gpsDistance][yc.settings.app.selected[yc.settings.app.propids.gpsDistance]].value;
	//var autoShotTime = yc.settings.app.propvalues[yc.settings.app.propids.autoshot][yc.settings.app.selected[yc.settings.app.propids.autoshot]].value;
	var GeoLoc = require('lib/geolocation');
	var Geo = new GeoLoc(gpsP, gpsD);
	
	////////////////// Create and Add the map to the View
	var MapModule = require('ti.map');	
	playAvailable = MapModule.isGooglePlayServicesAvailable();		// Confirm that Google Play Services are available		
	switch (playAvailable && roundId) {
	    case MapModule.SUCCESS:
	    	Ti.API.debug('Google Play services are available; creating MapView');
	        view = MapModule.createView(yc.combine({},{
	        	width: Ti.UI.FILL, height: Ti.UI.FILL,
			    userLocation: false,
			    enableZoomControls: false,
			    mapType: MapModule.SATELLITE_TYPE,
			    animate: false			 
		    }));
		    
		    if (_args.zoomcontrols) {
		    	view.setEnableZoomControls(true);
		    }
		    
		    if (_args.userlocation) {
		    	view.setUserLocation(true);
		    	view.setUserLocationButton(true);
		    }
		    
	        break;
	    case MapModule.SERVICE_MISSING:
	        Ti.API.debug('Google Play services are missing. Please install Google Play services from the Google Play store.');
	        messageLabel = Ti.UI.createLabel(yc.combine($$.mapErrorText, {
	        	text: 'Google Play services is missing. Please install Google Play services from the Google Play store.'
	        }));
	        break;
	    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
	        Ti.API.debug('Google Play services are out of date. Please update Google Play services.');
	        messageLabel = Ti.UI.createLabel(yc.combine($$.mapErrorText, {
	        	text: 'Google Play services is out of date. Please update Google Play services.'
	        }));
	        break;
	    case MapModule.SERVICE_DISABLED:
	        Ti.API.debug('Google Play services are disabled. Please enable Google Play services.');   
	        messageLabel = Ti.UI.createLabel(yc.combine($$.mapErrorText, {
	        	text: 'Google Play services is disabled. Please enable Google Play services.'
	        }));
	        break;
	    case MapModule.SERVICE_INVALID:
	        Ti.API.debug('Google Play services cannot be authenticated. Reinstall Google Play services.');
	        messageLabel = Ti.UI.createLabel(yc.combine($$.mapErrorText, {
	        	text: 'Google Play services cannot be authenticated. Reinstall Google Play services.'
	        }));
	        break;
	    default:
	        Ti.API.debug('Unknown error.');	          
	        messageLabel = Ti.UI.createLabel(yc.combine($$.mapErrorText, {
	        	text: 'Unknown error while attempting to create Map.'
	        }));
	        break;
	}	
	
	// Update the mapview with an error if no Google PLay services are available
	if (messageLabel) {
		view = 	Ti.UI.createView(yc.combine($$.bodyScrollView, {
			backgroundColor: 'transparent'
		}));
		view.add(messageLabel);
		view.valid = false;
	} else {
		view.valid = true;
	}	
	holder.add(view);
	
	// Return the View
	this.getView = function() {
		return holder;
	};
	
	/**
	 * Function passed into the Geolocation services 
 	 * @param {Object} e
	 */
	//var lastPoint = undefined;
	/**var mapCallback = function(e) {
		var newAnno;
		
		view.setRegion({
			latitude: e.coords.latitude,
			longitude: e.coords.longitude,
			latitudeDelta: deltaLat,
			longitudeDelta: deltaLon
		});
		
		if (lastPoint === undefined) { // if we don't have a last point, save the current point and contineu
			lastPoint = e.coords;
			return;
		}
		
		// Check the update time of the two points, diff > autoshot = flag, otherwise steps
		if ((e.coords.timestamp - lastPoint.timestamp) > autoShotTime) {
			Ti.API.debug('Autoshot Timer');
		} else {
			Ti.API.debug('Walking');
		}
		
		Ti.API.debug(JSON.stringify(lastPoint));
	};**/
	
	/**
	 * Start mapping 
	 */
	this.startMapping = function() {
		Geo.setLocationCallback(mapCallback);	
	};
	
	/**
	 * Public function to stop mapping 
	 */
	this.stopMapping = function(){
		Geo.removeLocationCallback(mapCallback);
	};
};

module.exports = mapView;
