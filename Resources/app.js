/*
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 */

// yoCaddy Application Namespace
var yc = {};
yc.replacedb = false;

// Setup application variables for the namespace
// Variables and functions will be used throughtou the application
yc.app = {};
yc.empty = {};
yc.db = {};
yc.dbname = 'yocaddydb';

// Include important updates
Ti.include(
	'/lib/settings.js',
	'/lib/utility.js',
	'/lib/styles.js'
);

// Include yc.ui namespace
Ti.include(
	'/ui/ui.js'
);

// This is a single context application with multiple windows in a stack
(function() {
	Ti.API.info(Ti.Platform.displayCaps.platformWidth);
	Ti.API.info(Ti.Platform.displayCaps.platformHeight);
	Ti.API.info(yc.style.platform.width);
	Ti.API.info(yc.style.platform.height);
	Ti.API.info(Ti.Platform.displayCaps.logicalDensityFactor);
	Ti.API.info(Ti.Platform.displayCaps.density);
	Ti.API.info(Ti.Platform.displayCaps.dpi);
			
	// Create and check the database
	var Database = require('/lib/db/rounds'); 
	yc.db.rounds = new Database(yc.dbname);
			
	// Create and start the main application
	yc.app.loadingScreen = yc.ui.createActivityStatus('Loading Screen...');
	yc.app.applicationWindow = yc.ui.createApplicationWindow();
	yc.app.currentRound = undefined;
	yc.app.applicationWindow.open();
})();
