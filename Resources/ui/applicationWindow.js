//Use the UI namespace for all UI component creation. A few common components will be defined in this file,
//but the bigger ones get their own file (along with styles)

(function(){
	
	// create the main application window
	yc.ui.createApplicationWindow = function(_args) {
		
		var win = Ti.UI.createWindow(yc.combine($$.Window,{
			exitOnClose: true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var header = yc.ui.createHeaderView({
			title: 'yoCaddy',
			leftbutton: {
				show: true,
				callback: function() { Ti.API.info('left button clicked'); }
			}
		});

		win.add(header);
		
		// Body view creation
		var body = Ti.UI.createScrollView(yc.combine($$.bodyView, {
			contentWidth: Ti.UI.FILL,
			contentHeight: 'auto',
			scrollType: 'vertical',
			layout: 'vertical'			
		}));	
		
		var content1 = Ti.UI.createView(yc.combine($$.bodyContent,{
			height: 100
		}));
		
		var content2 = Ti.UI.createView(yc.combine($$.bodyContent,{
			height: 100
		}));		

		var content3 = Ti.UI.createView(yc.combine($$.bodyContent,{
			height: 100
		}));
			
		//body.add(content1);
		//body.add(content2);
		//body.add(content3);
		//win.add(body);
		
		var settingsView = yc.ui.createSettingsView();
		win.add(settingsView);
				
		return win;
	};
	
})();

