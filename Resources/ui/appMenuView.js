// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createAppMenuView = function(_args) {
		
		var origLeft = (yc.style.platform.width * -1) + 10;
		
		// Create the app menu
		var view = Ti.UI.createView(yc.combine($$.screensize, {
			zIndex: 99,
			left: origLeft,
			backgroundGradient: {
		        type: 'linear',
		        startPoint: { x: '50%', y: '50%' },
		        endPoint: { x: '100%', y: '50%' },
		        colors: [ { color: 'black', offset: 0.0}, { color: 'transparent', offset: 0.65 } ],
		    }	
		}));
		view.addEventListener('click', function(e) { yc.app.applicationWindow.fireEvent('hidemenu', {}); });
		view.addEventListener('swipe', function(e){
			if (e.direction === 'right')
				yc.app.applicationWindow.fireEvent('showmenu', {});
			else if (e.direction === 'left')
				yc.app.applicationWindow.fireEvent('hidemenu', {});
		});
		
		var dropshadow = Ti.UI.createView({
			left: 0, top: 0, bottom: 0, right: '20%',
			backgroundColor: '#696969',			
		});			
		view.add(dropshadow);

		var menuHolder = Ti.UI.createScrollView({
			left: 0, top: 0, bottom: 0, right: 1,
			backgroundColor: 'white',
			layout: 'vertical',
			contentWidth: Ti.UI.FILL,
			contentHeight: 'auto',
			scrollType: 'vertical'
		});
		dropshadow.add(menuHolder);
		
		////////////////////////////// Menu Header //////////////////////////////
		
		var menuHead = Ti.UI.createView({
			width: Ti.UI.FILL, height: 50,
			backgroundColor: yc.style.colors.lowlightColor,
			backgroundImage: '/images/MenuItemBg.png'
		});
		
		var logo = Ti.UI.createImageView({
			left: 5,
			width: 35, height: 35,
			image: '/images/appicon.png'
		});
		
		var sig = Ti.UI.createLabel({
			right: 20, top: 10,
			color: 'black',
			text: 'Username123',
			font: {
				fontSize: 25,
				fontFamily: yc.os({
					iphone: 'Meddon',
					android: 'Meddon'
				})
			}
		});
		
		menuHead.add(logo);
		menuHead.add(sig);		
		menuHolder.add(menuHead);
		menuHolder.add(new yc.ui.separator());
		
		////////////////////////////// Menu Items ///////////////////////////////
		
		var item = require('/common/appMenuItemView');

		menuHolder.add(new item({
			image: '/images/button_person_dark.png',
			text: 'Player Profile',
			callback: function() { Ti.API.debug('Profile'); }
		}));		
	 	menuHolder.add(new yc.ui.separator());
	 	
		menuHolder.add(new item({
			image: '/images/button_social_dark.png',
			text: 'Link to Social Media',
			callback: function() { Ti.API.debug('Profile'); }
		}));		
	 	menuHolder.add(new yc.ui.separator());	 	

		menuHolder.add(new item({
			image: '/images/button_newround_dark.png',
			text: 'Start New Round',
			callback: function() { 
				yc.app.applicationWindow.fireEvent('addview', { viewIdx: yc.ui.viewids.startround });
			}
		}));		
	 	menuHolder.add(new yc.ui.separator());
	 	
		menuHolder.add(new item({
			image: '/images/button_save_dark.png',
			text: 'View Saved Rounds',
			callback: function() { Ti.API.debug('Saved Rounds'); }
		}));		
	 	menuHolder.add(new yc.ui.separator());
	 	
	 	menuHolder.add(new item({
			image: '/images/button_web_dark.png',
			text: 'View Web Rounds',
			callback: function() { Ti.API.debug('Web Rounds'); }
		}));		
	 	menuHolder.add(new yc.ui.separator());
	
		menuHolder.add(new item({
			image: '/images/button_map_dark.png',
			text: 'Show Map Only',
			callback: function() { 
				yc.app.applicationWindow.fireEvent('addview', { viewIdx: yc.ui.viewids.maponly }); 
			}
		}));
		menuHolder.add(new yc.ui.separator());
		
		menuHolder.add(new item({
			image: '/images/button_settings_dark.png',
			text: 'Settings',
			callback: function() { 
				yc.app.applicationWindow.fireEvent('addview', { viewIdx: yc.ui.viewids.settings }); 
			}
		}));
		menuHolder.add(new yc.ui.separator());
		
		menuHolder.add(new item({
			image: '/images/button_about_dark.png',
			text: 'About yoCaddy',
			callback: function() { Ti.API.debug('Help and About'); }
		}));				
		
		return view;
	};
	
})();
		