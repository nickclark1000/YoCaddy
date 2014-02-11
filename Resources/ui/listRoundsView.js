// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createListRoundsView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		
		var header = new yc.ui.headerView({
			title: 'Saved Rounds',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			}
		});
		view.add(header);
		
		var body = Ti.UI.createView($$.bodyScrollView);		
		var appContent = Ti.UI.createView(yc.combine($$.bodyContent, {}));
		
		body.add(content);
		view.add(body);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		
		
		return view;
	};
	
})();
