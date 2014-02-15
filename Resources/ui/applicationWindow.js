//Use the UI namespace for all UI component creation. A few common components will be defined in this file,
//but the bigger ones get their own file (along with styles)

(function(){
	
	// create the main application window
	yc.ui.createApplicationWindow = function(_args) {
		
		var win = Ti.UI.createWindow(yc.combine($$.Window,{
			exitOnClose: true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var menu = yc.ui.createAppMenuView();
		var viewStack = yc.ui.createStackView({
			views: [yc.ui.createNewsFeedView()]
		});
						
		win.add(viewStack);	
		win.add(menu);	
		
		win.addEventListener('addview', function(e){
			viewStack.fireEvent('pushView', e);
		});
		
		win.addEventListener('androidback', function(e){
			if (yc.app.menushown)
				win.fireEvent('hidemenu', {});
			else
				viewStack.fireEvent('popView', {});
		});
		
		win.addEventListener('showmenu', function(e){			
			if (!yc.app.menushown) {
				menu.animate({
					left: 0,
					duration: 200
				}, function() {
					// do nothing at this point
				});
				
				yc.app.menushown = true;
			}
		});
		
		win.addEventListener('hidemenu', function(e){
			if (yc.app.menushown) {
				var origLeft = (yc.style.platform.width * -1) + 10;
				
				menu.animate({
					left: origLeft,
					duration: 200
				}, function() {
					// do nothing at this point
				});
				
				yc.app.menushown = false;	
			}		
		});
		
		yc.app.menushown = false;				
		return win;
	};
	
})();

