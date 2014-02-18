// UI.JS is used to create required layout views
// Currently the only view is the stackView.  Allows new Views to be pushed and popped to and from the stack
(function(){
	
	// Create the yc.ui namespace, will contain all the create*Window and create*View functions
	yc.ui = {};
	yc.ui.viewids = {
		newsfeed: 1,
		profile: 2,
		social: 3,
		startround: 4,
		listrounds: 5,
		mapround: 6,
		mapviewround: 7,
		settings: 8,
		maponly: 9,
		about: 10
	};
	
	// Create a default separator
	yc.ui.separator = function(){
		return Ti.UI.createView({
			width: Ti.UI.FILL, height: 1,
			backgroundColor: yc.style.colors.lowlightColor,
			opacity: 0.4
		});
	};
		
	// Create status indicator with specified text
	yc.ui.createActivityStatus = function(text) {
		var statusView = Ti.UI.createView(yc.combine($$.stretch, {
			backgroundImage: '/images/backgrounds/fullWindowBg.png',
			zIndex: 99
		}));
		
		var indy = Ti.UI.createLabel({
			text: text,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			color: 'white',
			font: {
				fontSize: yc.style.fontsize.largetext,
				fontFamily: yc.style.fonts.buttonFont
			}
		});
		
		statusView.add(indy);
		return statusView;
	};	
	
	// Header View
	yc.ui.headerView = require('/common/headerView');
	
	// createStackView is used to maintain all other views
	yc.ui.createStackView = function(/*Object*/ _args) {
		var header = new yc.ui.headerView({
			title: 'yoCaddy Mobile'
		});
		var stack = Ti.UI.createView(_args.props);
		stack.add(header);			// stack.children[0]
		stack.currentIndex = _args.currentIndex || 0;	
		
		// Populate stack
		for (var i = 0; i < _args.views.length; i++) {
			var w = _args.views[i];
			
			if (i == stack.currentIndex) {
				w.setVisible(true);
			} else {
				w.setVisible(false);
			}
			
			stack.add(w);
		}
		
		stack.currentIndex++;
		
		// Hide all views except the new current
		stack.addEventListener('changeIndex', function(e) {
			for (var j = 1;j < _args.views.length;j++) {
				if (j == e.idx) {
					stack.children[j].setVisible(true);
					stack.currentIndex = j;
				} else {
					stack.children[j].setVisible(false);
				}
			}
		});
		
		// Remove a vew from the top of the stack
		stack.addEventListener('popView', function(e){
			if (stack.currentIndex > 1) {				
				stack.remove(stack.children[stack.currentIndex]);
				stack.currentIndex--;
				stack.children[stack.currentIndex].setVisible(true);
			} else {
				// What to do when we attempt to pop the last view
				// Possibly exit the application
				var closeDialog = new yc.ui.alert(
					'Exit yoCaddy?',
					'Are you sure you want to exit yoCaddy?',
					['Exit', 'Cancel']
				);
				
				closeDialog.addEventListener('click', function(e){
					yc.app.alertShown = false;
					yc.app.applicationWindow.remove(closeDialog);
				    if (e.source.title === 'Exit'){
				    	yc.app.applicationWindow.close();
				    } 		
				});
				
				yc.app.alertShown = true;
				yc.app.applicationWindow.add(closeDialog);
			}
		});
		
		// Add a view to the top of the stack
		stack.addEventListener('pushView', function(e){		
			var v;
			var indicator = yc.ui.createActivityStatus('Loading Screen...');
			yc.app.applicationWindow.add(indicator);
			
			switch(e.viewIdx) {
				case yc.ui.viewids.startround:
					if (yc.app.currentRound === undefined) {
						v = yc.ui.createStartRoundView();
					} else {
						v = yc.ui.createRoundMapView();
					}	
					break;
				case yc.ui.viewids.listrounds:
					v = yc.ui.createListRoundsView();
					break;
				case yc.ui.viewids.mapround:
					stack.fireEvent('popView', {});
					v = yc.ui.createRoundMapView();
					break;
				case yc.ui.viewids.mapviewround:
					break;
				case yc.ui.viewids.maponly:
					v = yc.ui.createMapOnlyView();				
					break;					
				case yc.ui.viewids.settings:
					v = yc.ui.createSettingsView();
					break;
				case yc.ui.viewids.about:
					v = yc.ui.createInformationView();
					break;					
			}

			if (v)
				stack.add(v);

			for (var k = 1; k <= stack.currentIndex; k++) {
				stack.children[k].setVisible(false);
			}
			
			stack.currentIndex++;
			yc.app.applicationWindow.remove(indicator);
		});
		
		return stack;
	};
	
	// Alert Dialog
	yc.ui.alert = function(/*String*/ _title, /*String*/ _message, /*Object*/ _buttons) {
		var modalView = Ti.UI.createView(yc.combine($$.stretch, {
			backgroundImage: '/images/backgrounds/fullWindowBg.png',
			zIndex: 99
		}));
		
		var container = Ti.UI.createView(yc.combine({
			width: 300, height: Ti.UI.SIZE,
			layout: 'vertical',
			backgroundImage: '/images/backgrounds/modalBodyBg.png',
			borderColor: yc.style.colors.black,
			borderRadius: 5,
			borderWidth: 1
		},{}));
		modalView.add(container);
		
		container.add(Ti.UI.createLabel({
			width: '95%', top: 10,
			color: yc.style.colors.black,
			text: _title,
			font: {
				fontSize: yc.style.fontsize.largetext,
				fontFamily: yc.style.fonts.buttonFont
			}
		}));
		container.add(new yc.ui.separator());
		
		container.add(Ti.UI.createLabel({
			width: '95%', top: 5,
			text: _message,
			color: yc.style.colors.black,
			font: {
				fontSize: yc.style.fontsize.normaltext,
				fontFamily: yc.style.fonts.optionFont
			}
		}));
		
		for (var i=0; i<_buttons.length; i++) {
			container.add(Ti.UI.createButton(yc.combine($$.modalButton, {
				top: 5, width: '80%',
				title: _buttons[i]
			})));
		}
		
		container.add(Ti.UI.createView({
			height: 10
		}));
		
		return modalView;
	};	
})();

(function(){
	
	// Model time
	yc.models = {};
	
	yc.models.Round = require('/models/RoundModel');
})();

// Include all major UI components
// Minor componetns are added by commonJS
Ti.include(
	'/ui/startRoundView.js',
	'/ui/roundMapView.js',
	'/ui/listRoundsView.js',
	'/ui/mapOnlyView.js',
	'/ui/informationView.js',
	'/ui/settingsView.js',
	'/ui/newsfeedView.js',
	'/ui/appMenuView.js'
);

if(yc.checkTablet()) {
	Ti.API.debug('Loading Tablet Layout');
	Ti.include('/ui/tablet/applicationWindow.js');
} else {
	Ti.API.debug('Loading Handheld Layout');
	Ti.include('/ui/applicationWindow.js');
}
