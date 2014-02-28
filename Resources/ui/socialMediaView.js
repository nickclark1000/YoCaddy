// Create the Social media view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createSocialMediaView = function(_args) {
		var FourSquare = require('/lib/foursquare');
		var Facebook = require('/lib/facebooklib');
		
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
		
		////// Foursquare Link Section
		
		var fsSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Link Foursquare'
		}));
		
		var fsText = 'Allow YoCaddy to check you in and share your rounds with your Foursqare friends.  Todo - view Foursquare friend comments on courses you are planning to play, or have already played.';
		var fsInfo = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: fsText, width: '95%'
		}));
		
		content.add(fsSection);
		content.add(fsInfo);
		
		var FSAccount = yc.db.social.getAccount('foursquare');
		
		var FS = new FourSquare(FSAccount.token);
		var FSButton = FS.createFSButton({
			width: 300, 
			height: 40,
			backgroundColor: yc.style.colors.highlightColor,
			backgroundSelectedColor: yc.style.colors.mainColor,
			fontFamily: yc.os({
				android: 'Montserrat-Bold',
				iphone: 'Montserrat Bold'
			})	
		}, function(e) {
			Ti.API.debug(JSON.stringify(e));
			
			if (e.success && e.action ==='login') {
				yc.db.social.saveAccount({
					account: 'foursquare',
					token: e.access_token
				});
			}
		});
		content.add(yc.ui.vSpacer(20));
		content.add(FSButton);
		content.add(yc.ui.vSpacer(20));
		
		///// Facebook Link Section

		var fbSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Link Facebook'
		}));
		
		var fbText = 'Share information about courses, scores and even shot specific images to your Facebook wall and friends by linking YoCaddy with your Facebook profile.';
		var fbInfo = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: fbText, width: '95%'
		}));
		
		content.add(fbSection);
		content.add(fbInfo);
		
		var FBAccount = yc.db.social.getAccount('foursquare');
		
		var FB = new Facebook(FBAccount.token);
		var FBButton = FB.createFBButton({
			width: 300, 
			height: 40,
			backgroundColor: yc.style.colors.highlightColor,
			backgroundSelectedColor: yc.style.colors.mainColor,
			fontFamily: yc.os({
				android: 'Montserrat-Bold',
				iphone: 'Montserrat Bold'
			})	
		}, function(e) {
			if (e.success && e.action ==='login') {
				yc.db.social.saveAccount({
					account: 'facebook',
					token: e.access_token
				});
			}
		});
		
		content.add(yc.ui.vSpacer(20));
		content.add(FBButton);
		content.add(yc.ui.vSpacer(20));		

		/**
		 * Back callback 
		 */
		view.addEventListener('closing', function(e){
			yc.app.applicationWindow.fireEvent('appback', {});	
		});
		
		return view;
	};
		
})();
