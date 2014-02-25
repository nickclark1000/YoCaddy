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

var mapView = function(_args) {
	var holder, view, messageLabel;
	var playAvailable;
	var round = yc.db.rounds.getRound(_args.roundId);
	
	
	var holder = Ti.UI.createView(_args.props);
	
	////////////////// Create and Add the map to the View
	var tiMapView = require('ti.map');	
	playAvailable = tiMapView.isGooglePlayServicesAvailable();		// Confirm that Google Play Services are available			
	switch (playAvailable) {
	    case tiMapView.SUCCESS:
	    	Ti.API.debug('Google Play services are available; creating MapView');
	        view = tiMapView.createView(yc.combine({},{
	        	width: Ti.UI.FILL, height: Ti.UI.FILL,
			    userLocation: false,
			    enableZoomControls: false,
			    mapType: tiMapView.SATELLITE_TYPE,
			    animate: true			 
		    }));
		    
		    if (_args.zoomcontrols) {
		    	view.setEnableZoomControls(true);
		    }
		    
		    if (_args.userlocation) {
		    	view.setUserLocation(true);
		    	view.setUserLocationButton(true);
		    }
		    
	        break;
	    case tiMapView.SERVICE_MISSING:
	        Ti.API.debug('Google Play services are missing. Please install Google Play services from the Google Play store.');
	        messageLabel = Ti.UI.createLabel(yc.combine($$.mapErrorText, {
	        	text: 'Google Play services is missing. Please install Google Play services from the Google Play store.'
	        }));
	        break;
	    case tiMapView.SERVICE_VERSION_UPDATE_REQUIRED:
	        Ti.API.debug('Google Play services are out of date. Please update Google Play services.');
	        messageLabel = Ti.UI.createLabel(yc.combine($$.mapErrorText, {
	        	text: 'Google Play services is out of date. Please update Google Play services.'
	        }));
	        break;
	    case tiMapView.SERVICE_DISABLED:
	        Ti.API.debug('Google Play services are disabled. Please enable Google Play services.');   
	        messageLabel = Ti.UI.createLabel(yc.combine($$.mapErrorText, {
	        	text: 'Google Play services is disabled. Please enable Google Play services.'
	        }));
	        break;
	    case tiMapView.SERVICE_INVALID:
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
	
	///////////////////////////////// Scoring View /////////////////////////////
	var RoundScorer = require('/common/roundScorer');
	
	if (round) {
		var scorer = new RoundScorer({
			id: round.id,
			hole: 1
		}, {
			top: 5, left: 5, right: 5,
			height: 50
		});
		
		holder.add(scorer.getView());	
	}
	
	return holder;
};

module.exports = mapView;
