// UI.JS is used to create required layout views
// Currently the only view is the stackView.  Allows new Views to be pushed and popped to and from the stack
(function(){
	
	// Create the yc.ui namespace, will contain all the create*Window and create*View functions
	yc.ui = {};
	yc.ui.viewids = {
		appheader: 0,
		newsfeed: 1,
		profile: 2,
		social: 3,
		startround: 4,
		listrounds: 5,
		mapround: 6,
		editviewround: 7,
		settings: 8,
		maponly: 9,
		about: 10,
		social: 11
	};
	
	// Create a default separator
	yc.ui.separator = function(w){
		var wid = (w) ? w : Ti.UI.FILL;
		
		return Ti.UI.createView({
			width: w, height: 1,
			backgroundColor: yc.style.colors.lowlightColor,
			opacity: 0.4
		});
	};
	
	yc.ui.vSpacer = function(h){
		return Ti.UI.createView({
			width: Ti.UI.FILL, height: h
		});
	};	
	
	yc.ui.hSpacer = function(w){
		return Ti.UI.createView({
			width: w, height: Ti.UI.FILL
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
		var stack = Ti.UI.createView(_args.props);
		stack.currentView = _args.viewIdx;
		var stackIds = [];
		var viewArray = [];
		
		// Create and add the Header (ViewId = 0)
		viewArray[yc.ui.viewids.appheader] = new yc.ui.headerView({
			title: '   Loading Screen ...'
		});
		stack.add(viewArray[yc.ui.viewids.appheader]);
		stackIds.push(yc.ui.viewids.appheader);
		
		// Populate Stack with the first view
		// This will let us use Settings to change the users default view
		switch (stack.currentView) {
			case yc.ui.viewids.newsfeed:
				viewArray[yc.ui.viewids.newsfeed] = yc.ui.createNewsFeedView();
				break;
		}
		stack.add(viewArray[stack.currentView]);
		
		stack.addEventListener('confirmback', function(e){
			Ti.API.debug('stack confirmback fired: '+JSON.stringify(viewArray[stack.currentView]));
			viewArray[stack.currentView].fireEvent('closing', {});
		});
		
		// Hide all views except the new current
		// e.viewIdx === undefined, we pop a view off the stack (out of view)
		// otherwise we pop the viewIdx on the stack into vewi
		stack.addEventListener('changeIndex', function(e) {
			var nextViewId = e.viewIdx || undefined;
			Ti.API.debug(JSON.stringify(stackIds) + ' current: ' + stack.currentView + ' next: ' + nextViewId);	
				
			if (nextViewId === undefined) {
				if (stackIds.length < 2) {
					// What to do when we attempt to pop the last view
					// Possibly exit the application
					var closeDialog = new yc.ui.alert(
						'Exit yoCaddy',
						'Are you sure you want to exit yoCaddy?  Exiting yoCaddy will forcefully end a current round.',
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
				} else {
					var oldViewId = stack.currentView;
					
					// This is a pop, we need to go backwards in the stackIds
					do {
						stack.currentView = stackIds.pop();		
					} while (viewArray[stack.currentView] === undefined);
					
					viewArray[stack.currentView].setVisible(true);
					viewArray[oldViewId].setVisible(false);
					
					if (oldViewId === yc.ui.viewids.editviewround && yc.app.editviewRound === undefined) { viewArray[yc.ui.viewids.editviewround] = undefined; }
					if (oldViewId === yc.ui.viewids.mapround && yc.app.currentRound === undefined) { viewArray[yc.ui.viewids.mapround] = undefined; }
					
					if (stack.currentView === yc.ui.viewids.listrounds) {
						viewArray[stack.currentView].fireEvent('updatelist', {});
					}									
				}	
			} else {
				if (stack.currentView === nextViewId) {
					return;
				}	
								
				// Make all the current children of Stack invisible
				for (var i=1,j=stack.children.length; i<j; i++) {
					stack.children[i].setVisible(false);
				}					
		
				if (viewArray[nextViewId]) {
					// View already exists push the old view and make this view the only visible
					viewArray[nextViewId].setVisible(true);
					
					// If the next View is the list, we need to update the list of rounds
					if (nextViewId === yc.ui.viewids.listrounds) {
						viewArray[nextViewId].fireEvent('updatelist', {});
					} else if (nextViewId === yc.ui.viewids.startround) {
						viewArray[nextViewId].fireEvent('clearscreen', {});
					}
				} else {
					// Display a loading screen
					if (nextViewId === yc.ui.viewids.editviewround)	{
						var busy = new yc.ui.createActivityStatus('Loading Round ...');
						yc.app.applicationWindow.add(busy);						
					}			
					
					// View doesn't exist, it must be created and added to the stack
					switch(nextViewId) {
						case yc.ui.viewids.startround:
							viewArray[nextViewId] = yc.ui.createStartRoundView();
							break;
						case yc.ui.viewids.listrounds:
							viewArray[nextViewId] = yc.ui.createListRoundsView();
							break;
						case yc.ui.viewids.mapround:
							viewArray[nextViewId] = yc.ui.createRoundMapView();
							break;
						case yc.ui.viewids.editviewround:
							viewArray[nextViewId] = yc.ui.createEditViewRoundView();
							break;
						case yc.ui.viewids.maponly:
							viewArray[nextViewId] = yc.ui.createMapOnlyView();				
							break;					
						case yc.ui.viewids.settings:
							viewArray[nextViewId] = yc.ui.createSettingsView();
							break;
						case yc.ui.viewids.about:
							viewArray[nextViewId] = yc.ui.createInformationView();
							break;		
						case yc.ui.viewids.social:
							viewArray[nextViewId] = yc.ui.createSocialMediaView();
							break;											
					}
					
					stack.add(viewArray[nextViewId]);	
					
					// Remove the loading screen
					if (nextViewId === yc.ui.viewids.editviewround)	{
						yc.app.applicationWindow.remove(busy);						
					}												
				}
				
				//yc.app.applicationWindow.remove(busy);
				
				if ( !(stack.currentView === yc.ui.viewids.startround && nextViewId === yc.ui.viewids.mapround)) {
					stackIds.push(stack.currentView);
				}
					
				stack.currentView = nextViewId;				
			}
		});
		
		return stack;
	};
	
	// Alert Dialog
	yc.ui.alert = function(/*String*/ _title, /*String*/ _message, /*Object*/ _buttons) {
		var modalView = Ti.UI.createView(yc.combine($$.stretch, {
			backgroundImage: '/images/backgrounds/fullWindowBg.png',
			touchEnabled: false,
			zIndex: 99
		}));
		
		var container = Ti.UI.createView(yc.combine({
			touchEnabled: false,
			width: 300, height: Ti.UI.SIZE,
			layout: 'vertical',
			backgroundImage: '/images/backgrounds/modalBodyBg.png',
			borderColor: yc.style.colors.black,
			borderRadius: 5,
			borderWidth: 1
		},{}));
		
		container.add(Ti.UI.createLabel({
			touchEnabled: false,
			width: '95%', top: 10,
			color: yc.style.colors.black,
			text: _title,
			font: {
				fontSize: yc.style.fontsize.largetext,
				fontFamily: yc.style.fonts.optionFont
			}
		}));
		container.add(new yc.ui.separator());
		
		container.add(Ti.UI.createLabel({
			touchEnabled: false,
			width: '95%', top: 5,
			text: _message,
			color: yc.style.colors.black,
			font: {
				fontSize: yc.style.fontsize.normaltext,
				fontFamily: yc.style.fonts.infoFont
			}
		}));
		
		for (var z=0; z<_buttons.length; z++) {
			container.add(Ti.UI.createButton(yc.combine($$.modalButton, {
				top: 10, width: '80%',
				title: _buttons[z]
			})));
		}
		
		container.add(Ti.UI.createView({
			height: 10
		}));
		
		modalView.add(container);
		return modalView;
	};	
})();

// Create and load the Models
(function(){
	
	// Model time
	yc.models = {};
	yc.models.Round = require('/models/RoundModel');
})();

// Include all major UI components
// Minor componetns are added by commonJS
Ti.include(
	'/ui/appMenuView.js',
	'/ui/newsfeedView.js'	
);
	
// Check to load tablet or Handheld applicationWindow ui file
if(yc.checkTablet()) {
	Ti.API.debug('Loading Tablet Layout');
	Ti.include('/ui/tablet/applicationWindow.js');
} else {
	Ti.API.debug('Loading Handheld Layout');
	Ti.include('/ui/applicationWindow.js');
}
