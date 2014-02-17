// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createMapOnlyView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		
		var header = new yc.ui.headerView({
			title: 'Map Only',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			}
		});
		view.add(header);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		var yoMap = require('/common/mapView');
		map = new yoMap({
			userlocation: true,
			zoomcontrols: true,
			props: {
				top: 55, bottom: 5,
				left: 5, right: 5,
				borderWidth: 1,
				borderColor: '#E0E0E0',				
			}
		});
		view.add(map);
		
		return view;
	};
	
})();
