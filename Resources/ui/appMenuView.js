// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createAppMenuView = function(_args) {
		
		// Create the app menu
		var view = Ti.UI.createView(yc.combine(_args.props, {
			zIndex: 99,
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
			left: 0, top: 0, bottom: 0, right: _args.shadowWidth,
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
			width: Ti.UI.FILL, height: 51,
			backgroundColor: yc.style.colors.highlightColor,
			backgroundSelectedColor: yc.style.colors.mainColor,
			backgroundImage: '/images/buttonBackground.png',
		});
		
		var logo = Ti.UI.createImageView({
			left: 5,
			width: 35, height: 35,
			image: '/images/appicon.png'
		});
		
		var sig = Ti.UI.createLabel({
			right: 20, top: -10,
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

		var profileItem = new item({
			touchEnabled: false,
			image: '/images/button_person_dark.png',
			text: 'Player Profile',
			callback: function() { Ti.API.debug('Profile'); }
		});
		menuHolder.add(profileItem.getView());		
	 	menuHolder.add(new yc.ui.separator());
	 	
	 	var socialItem = new item({
	 		touchEnabled: false,
			image: '/images/button_social_dark.png',
			text: 'Link to Social Media',
			callback: function() { Ti.API.debug('Profile'); }
		});
		menuHolder.add(socialItem.getView());		
	 	menuHolder.add(new yc.ui.separator());	 	

		var addroundItem = new item({
			touchEnabled: false,
			image: '/images/button_newround_dark.png',
			text: 'Start New Round',
			callback: function() { 
				yc.app.applicationWindow.fireEvent('addview', { 
					viewIdx: (yc.app.currentRound) ? yc.ui.viewids.mapround : yc.ui.viewids.startround 
				});
			}
		});
		menuHolder.add(addroundItem.getView());		
	 	menuHolder.add(new yc.ui.separator());
	 	
	 	var listroundsItem = new item({
	 		touchEnabled: false,
			image: '/images/button_save_dark.png',
			text: 'View Saved Rounds',
			callback: function() { 
				yc.app.applicationWindow.fireEvent('addview', { 
					viewIdx: (yc.app.editviewRound) ? yc.ui.viewids.editviewround : yc.ui.viewids.listrounds 
				});
			}
		});
		menuHolder.add(listroundsItem.getView());		
	 	menuHolder.add(new yc.ui.separator());
	 	
	 	var webroundsItem = new item({
	 		touchEnabled: false,
			image: '/images/button_web_dark.png',
			text: 'View Web Rounds',
			callback: function() { Ti.API.debug('Web Rounds'); }
		});
	 	menuHolder.add(webroundsItem.getView());		
	 	menuHolder.add(new yc.ui.separator());
	
		var maponlyItem = new item({
			touchEnabled: false,
			image: '/images/button_map_dark.png',
			text: 'Show Map Only',
			callback: function() { 
				yc.app.applicationWindow.fireEvent('addview', { viewIdx: yc.ui.viewids.maponly }); 
			}
		});
		menuHolder.add(maponlyItem.getView());
		menuHolder.add(new yc.ui.separator());
		
		var settingsItem = new item({
			touchEnabled: false,
			image: '/images/button_settings_dark.png',
			text: 'Settings',
			callback: function() { 
				yc.app.applicationWindow.fireEvent('addview', { viewIdx: yc.ui.viewids.settings }); 
			}
		});
		menuHolder.add(settingsItem.getView());
		menuHolder.add(new yc.ui.separator());
		
		var aboutItem = new item({
			touchEnabled: false,
			image: '/images/button_about_dark.png',
			text: 'About yoCaddy',
			callback: function() { 
				yc.app.applicationWindow.fireEvent('addview', { viewIdx: yc.ui.viewids.about }); 
			}
		});		 
		menuHolder.add(aboutItem.getView());		
		
		// Check if there is a live round and update menu selections
		view.addEventListener('checkCurrentRound', function(e){
			if (yc.app.currentRound === undefined) {
				addroundItem.changeText('Start New Round');
			} else if (yc.app.currentRound) {
				addroundItem.changeText('Continue Current Round');
			}
			
			if (yc.app.editviewRound === undefined) {
				listroundsItem.changeText('View Saved Rounds');
			} else if (yc.app.editviewRound) {
				listroundsItem.changeText('Continue Editing Round');
			}			
		});			
		
		return view;
	};
	
})();
		