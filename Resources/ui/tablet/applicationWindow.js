//Use the UI namespace for all UI component creation. A few common components will be defined in this file,
//but the bigger ones get their own file (along with styles)

(function(){
	
	// create the main application window
	yc.ui.createApplicationWindow = function(_args) {
		
		var win = Ti.UI.createWindow(yc.combine($$.Window,{
			exitOnClose: true,
			orientationModes:[Ti.UI.LANDSCAPE_LEFT]
		}));
		
		var menu = yc.ui.createAppMenuView({
			shadowWidth: 0,
			props: { 
				top: 0, left: 0,
				width: '25%',
				height: yc.style.platform.height
			}
		});
		var viewStack = yc.ui.createStackView({
			views: [yc.ui.createNewsFeedView()],
			props: {
				top: 0, right: 0,
				width: '75%',
				height: yc.style.platform.height
			}
		});
						
		win.add(viewStack);	
		win.add(menu);	
		
		win.addEventListener('addview', function(e){
			menu.fireEvent('checkCurrentRound', e);
			viewStack.fireEvent('changeIndex', e);
		});
		
		win.addEventListener('androidback', function(e){
			menu.fireEvent('checkCurrentRound', e);
			
			if (yc.app.menushown) {
				win.fireEvent('hidemenu', {});				
			} else if (yc.app.alertShown) {
				// Do nothing
			} else {
				viewStack.fireEvent('changeIndex', {});
			}
		});
		
		yc.app.menushown = false;				
		return win;
	};
	
})();

