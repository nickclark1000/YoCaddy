//Use the UI namespace for all UI component creation. A few common components will be defined in this file,
//but the bigger ones get their own file (along with styles)

(function(){
	
	// create the main application window
	yc.ui.createApplicationWindow = function(_args) {
		
		// Create the main window object
		var win = Ti.UI.createWindow(yc.combine($$.Window,{
			exitOnClose: true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		// Create and set the application Menu
		var origLeft = (yc.style.platform.width * -1) + 10;
		var menu = yc.ui.createAppMenuView({
			shadowWidth: '20%',
			props: { 
				width: yc.style.platform.width,
				height: yc.style.platform.height,
				left: origLeft
			}	
		});
		
		// Create the stack that Views will be placed onto
		var viewStack = yc.ui.createStackView({
			viewIdx: yc.ui.viewids.newsfeed,
			props: $$.stretch
		});						
		win.add(viewStack);	
		win.add(menu);	
		
		// Event Listener handling ADDVIEW events
		// Fired by Menus and Other views to add a view to the stack
		win.addEventListener('addview', function(e){		
			menu.fireEvent('checkCurrentRound', e);
			viewStack.fireEvent('changeIndex', e);
		});
		
		// Event Listener for handling the Android Back Button
		win.addEventListener('androidback', function(e){
			menu.fireEvent('checkCurrentRound', e);
			viewStack.fireEvent('confirmback', {});			
		});
		
		// Event Listener for handling the application back button
		win.addEventListener('appback', function(e){
			menu.fireEvent('checkCurrentRound', e);
			if (yc.app.menushown) {
				win.fireEvent('hidemenu', {});				
			} else if (yc.app.alertShown) {
				// Do nothing
			} else {
				viewStack.fireEvent('changeIndex', {});
			}						
		});
		
		// Event Listener for Sliding the menu into view
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
		
		// Event Listener for sliding the menu out of view
		win.addEventListener('hidemenu', function(e){
			if (yc.app.menushown) {
				
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

