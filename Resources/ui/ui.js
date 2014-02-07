// UI.JS is used to create required layout views
// Currently the only view is the stackView.  Allows new Views to be pushed and popped to and from the stack
(function(){
	
	// Create the yc.ui namespace, will contain all the create*Window and create*View functions
	yc.ui = {};
	
	// createStackView is used to maintain all other views
	yc.ui.createStackView = function(/*Object*/ _args) {
		var stack = Ti.UI.createView(yc.combine($$.stretch,_args.props||{}));
		stack.currentIndex = _args.currentIndex||0;	
		
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
		
		stack.addEventListener('changeIndex', function(e) {
			for (var j = 0;j < _args.views.length;j++) {
				if (j == e.idx) {
					_args.views[j].setVisible(true);
					stack.currentIndex = j;
				} else {
					_args.views[j].setVisible(false);
				}
			}
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
	'/ui/headerView.js',
	'/ui/settingsView.js',
	'/ui/applicationWindow.js'
);
