// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createMapOnlyView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		
		var header = new yc.ui.headerView({
			title: 'yoRound',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			},
			rightbutton: {
				show: true,
				callback: function() { Ti.API.info('Exit Round'); },
				image: '/images/button_cancel.png'
			}
		});
		view.add(header);
		
		var body = Ti.UI.createView($$.bodyNoScrollView);		
		var content = Ti.UI.createView(yc.combine($$.stretch, {
			borderWidth: 1,
			borderColor: '#E0E0E0'
		}))	;
		body.add(content);
		view.add(body);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		var yoMap = require('/common/mapView');
		map = new yoMap();
		
		content.add(map);
		return view;
	};
	
})();
