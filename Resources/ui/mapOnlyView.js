// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createMapOnlyView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		view.viewid = yc.ui.viewids.maponly;
		
		var header = new yc.ui.headerView({
			title: 'Basic Map Tool',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('appback', {}); }
			}
		});
		view.add(header);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		var yoMap = require('/common/mapView');
		map = new yoMap({
			userlocation: true,
			zoomcontrols: true,
			props: $$.bodyNoScrollView
		});
		view.add(map);	
		
		view.addEventListener('closing', function(e){
			yc.app.applicationWindow.fireEvent('appback', { sourceView: yc.ui.viewids.about });
		});		
		
		return view;
	};
	
})();
