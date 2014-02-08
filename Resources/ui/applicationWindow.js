//Use the UI namespace for all UI component creation. A few common components will be defined in this file,
//but the bigger ones get their own file (along with styles)

(function(){
	
	// create the main application window
	yc.ui.createApplicationWindow = function(_args) {
		
		var win = Ti.UI.createWindow(yc.combine($$.Window,{
			exitOnClose: true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var viewStack = yc.ui.createStackView({
			views: [yc.ui.createNewsFeedView()]
		});
		
		win.addEventListener('addView', function(e){
			Ti.API.info('Adding View: ' + JSON.stringify(e.viewIdx));
			viewStack.fireEvent('pushView', e);
		});
		
		win.addEventListener('androidback', function(e){
			viewStack.fireEvent('popView', {});
		});
		
		win.add(viewStack);		
				
		return win;
	};
	
})();

