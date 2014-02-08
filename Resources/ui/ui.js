// UI.JS is used to create required layout views
// Currently the only view is the stackView.  Allows new Views to be pushed and popped to and from the stack
(function(){
	
	// Create the yc.ui namespace, will contain all the create*Window and create*View functions
	yc.ui = {};
	yc.ui.viewids = {
		addround: 1,
		viewrounds: 2,
		mapround: 3,
		mapviewround: 4,
		settings: 5
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
				Ti.UI.createAlertDialog({
					title: 'exiting',
					message: 'exiting',
					ok: 'OK'
				}).show();
			}
		});
		
		// Add a view to the top of the stack
		stack.addEventListener('pushView', function(e){		
			var v;
			switch(e.viewIdx) {
				case yc.ui.viewids.addround:
					break;
				case yc.ui.viewids.viewrounds:
					break;
				case yc.ui.viewids.mapround:
					break;
				case yc.ui.viewids.mapviewround:
					break;
				case yc.ui.viewids.settings:
					Ti.API.info('Adding View: Settings');
					v = yc.ui.createSettingsView();
					break;
			}

			for (var k = 0; k <= stack.currentIndex; k++) {
				stack.children[k].setVisible(false);
			}
			
			stack.add(v);
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
	
})();

// Include all major UI components
// Minor componetns are added by commonJS
Ti.include(
	'/ui/settingsView.js',
	'/ui/newsfeedView.js',
	'/ui/applicationWindow.js'
);
