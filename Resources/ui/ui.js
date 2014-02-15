// UI.JS is used to create required layout views
// Currently the only view is the stackView.  Allows new Views to be pushed and popped to and from the stack
(function(){
	
	// Create the yc.ui namespace, will contain all the create*Window and create*View functions
	yc.ui = {};
	yc.ui.viewids = {
		startround: 1,
		listrounds: 2,
		mapround: 3,
		mapviewround: 4,
		settings: 5,
		maponly: 6,
		about: 7
	};
	
	// Header View
	yc.ui.headerView = require('/common/headerView');
	
	// createStackView is used to maintain all other views
	yc.ui.createStackView = function(/*Object*/ _args) {
		var header = new yc.ui.headerView({
			title: 'yoCaddy Mobile'
		});
		var stack = Ti.UI.createView(yc.combine($$.stretch,_args.props||{}));
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
				var closeDialog = Ti.UI.createAlertDialog({
					title: 'Exit yoCaddy?',
					message: 'Are you sure you want to exit yoCaddy?',
					buttonNames: ['No', 'Yes'],
					cancel: 0
				});
				
				closeDialog.addEventListener('click', function(e){
				    if (e.index === e.source.cancel){
				    	return;
				    } else {
				    	yc.app.applicationWindow.close();
				    }		
				});
				
				closeDialog.show();
			}
		});
		
		// Add a view to the top of the stack
		stack.addEventListener('pushView', function(e){		
			var v;
			switch(e.viewIdx) {
				case yc.ui.viewids.startround:
					Ti.API.info('Adding View: Start Round');
					v = yc.ui.createStartRoundView();
					break;
				case yc.ui.viewids.listrounds:
					Ti.API.info('Adding View: List Rounds');
					v = yc.ui.createListRoundsView();
					break;
				case yc.ui.viewids.mapround:
					Ti.API.info('Adding View: MapRound');
					v = yc.ui.createRoundMapView();
					break;
				case yc.ui.viewids.mapviewround:
					break;
				case yc.ui.viewids.maponly:
					Ti.API.info('Adding View: Map Only');
					v = yc.ui.createMapOnlyView();				
					break;					
				case yc.ui.viewids.settings:
					Ti.API.info('Adding View: Settings');
					v = yc.ui.createSettingsView();
					break;
				case yc.ui.viewids.about:
					Ti.API.info('Adding View: About');
					v = yc.ui.createInformationView();
					break;					
			}

			if (v)
				stack.add(v);

			for (var k = 1; k <= stack.currentIndex; k++) {
				stack.children[k].setVisible(false);
			}
			
			stack.currentIndex++;
		});
		
		return stack;
	};
	
	// Alert Dialog
	yc.ui.alert = function(/*String*/ _title, /*String*/ _message) {
		Ti.UI.createAlertDialog({
			title:_title,
			message:_message
		}).show();
	};	
	
	yc.ui.separator = function(){
		return Ti.UI.createView({
			width: Ti.UI.FILL, height: 1,
			backgroundColor: yc.style.colors.lowlightColor,
			opacity: 0.4
		});
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
	'/ui/listRoundsView.js',
	'/ui/mapOnlyView.js',
	'/ui/informationView.js',
	'/ui/settingsView.js',
	'/ui/newsfeedView.js',
	'/ui/appMenuView.js',
	'/ui/applicationWindow.js'
);
