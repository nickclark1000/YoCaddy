// Create the Social media view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createSocialMediaView = function(_args) {
		var FourSquare = require('/lib/foursquare');
		var Facebook = require('/lib/facebook');
		
		var view = Ti.UI.createView(yc.combine($$.stretch, {}));
		view.viewid = yc.ui.viewids.social;
		
		var header = new yc.ui.headerView({
			title:  'Social Accounts',
			leftbutton: {
				show: true,
				callback: function() {
					yc.app.applicationWindow.fireEvent('appback', {});
				}
			}
		});
		view.add(header);
		
		var body = Ti.UI.createScrollView($$.bodyScrollView);	
		var content = Ti.UI.createScrollView(yc.combine($$.bodyContent, {
			bottom: 5
		}));
		
		body.add(content);
		view.add(body);
		
		/////////////////// End of basic window layout
		
		var fsSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Foursquare'
		}));
		
		var fsText = 'To connect YoCaddy Mobile to Foursquare you must have a valid Foursquare account.  To login or create an account'
				+ ' click the Connect button below.  You must login to http://www.fourquare.com and disconnect the application through the Foursquare Connected Apps page.';
		var fsInfo = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: fsText, width: '95%'
		}));
		
		content.add(fsSection);
		content.add(fsInfo);
		
		//// Foursquare login
		
		var FS = new FourSquare();
		var FSButton = FS.createFSButton(function(e) {
			Ti.API.debug(JSON.stringify(e));
		});
		content.add(yc.ui.vSpacer(20));
		content.add(FSButton);

		/**
		 * Back callback 
		 */
		view.addEventListener('closing', function(e){
			yc.app.applicationWindow.fireEvent('appback', {});	
		});
		
		return view;
	};
		
})();
