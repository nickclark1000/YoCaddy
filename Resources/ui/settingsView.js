// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createSettingsView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		
		var header = new yc.ui.headerView({
			title: 'yoSettings',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			},
			rightbutton: {
				show: true,
				callback: saveSettings,
				image: '/images/button_save.png'
			}
		});
		view.add(header);
		
		var body = Ti.UI.createScrollView($$.bodyScrollView);			
		var content = Ti.UI.createView($$.bodyContent);

		body.add(content);
		view.add(body);
							
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		// Create Headers and Section titles
		var appLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			top: 5, left: 10, right: 10,
			text: 'Changing applications settings could affect battery life, if settings are increased to their maximum accuracy option.'
		}));
		
		var appSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			top: '5dp', left: '5dp',
			text: 'Application Settings'
		}));
		
		var syncLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			top: 5, left: 10, right: 10,
			text: 'Changing synchronization settings could increase wireless usage.  On limited wireless plans only sync over wifi.'
		}));
				
		var syncSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			top: 10, left: 5, botton: 5,
			text: 'Sync Settings'
		}));
		
		var themeLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			top: 5, left: 10, right: 10,
			text: 'Application requires a restart before theme changes will take affect.'
		}));
				
		var themeSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			top: 10, left: 5, botton: 5,
			text: 'Theme Settings'
		}));		
		
		// Create setting views
		var optionView = require('/common/optionView');
		
		var distOptions = [
			{ text: 'Yards', value: 'yards' },
			{ text: 'Meters', value: 'meters' },
			{ text: 'Feet', value: 'feet' }
		];
		var distanceSetting = new optionView({
			desc: 'Distance Units',
			selected: 0,
			options: distOptions,
			parent: view,
			top: '0dp', height: '40dp'
		});	
		
		var autoOptions = [
			{ text: 'Disabled', value: -1 },
			{ text: '15s', value: 15 },
			{ text: '30s', value: 30 },
			{ text: '45s', value: 45 },
			{ text: '60s', value: 60 },
			{ text: '120s', value: 120 }			
		];
		var autoshotSetting = new optionView({
			desc: 'Auto Shot Timer',
			selected: 0,
			options: autoOptions,
			parent: view,
			top: '0dp', height: '40dp'
		});	
				
		var gpsOptions = [
			{ text: '5m', value: 5 },
			{ text: '10m', value: 10 },
			{ text: '20m', value: 20 }
		];				
		var gpsdistanceSetting = new optionView({
			desc: 'GPS Min Distance',
			selected: 0,
			options: gpsOptions,
			parent: view,
			top: '0dp', height: '40dp'
		});	
							
		var themeOptions = [
			{ text: 'Blue', value: 'blue' },
			{ text: 'Grey', value: 'grey' },
			{ text: 'Orange', value: 'orange' },
			{ text: 'Pink', value: 'pink' }
		];										
		var themeSetting = new optionView({
			desc: 'Application Theme',
			selected: 0,
			options: themeOptions,
			parent: view,
			top: '0dp', height: '40dp'
		});			

		var syncNetOptions = [
			{ text: 'Off', value: 'off' },
			{ text: 'Wifi Only', value: 'wifi' },
			{ text: 'Wireless', value: 'wireless' },
			{ text: 'Both', value: 'Both' }
		];	
		var syncNetSetting = new optionView({
			desc: 'Sync Network',
			selected: 0,
			options: syncNetOptions,
			parent: view,
			top: '0dp', height: '40dp'
		});		

		var syncOptions = [
			{ text: 'Off', value: 'off' },
			{ text: 'Mobile', value: 'mobile' },
			{ text: 'Desktop', value: 'desktop' },
			{ text: 'Web', value: 'web' }
		];	
		var syncSetting = new optionView({
			desc: 'Sync Data Override',
			selected: 0,
			options: syncOptions,
			parent: view,
			top: '0dp', height: '40dp'
		});			
		
		// Setting information
		content.add(appSection);
		content.add(appLabel);		
		content.add(distanceSetting.getView());
		content.add(autoshotSetting.getView());
		content.add(gpsdistanceSetting.getView());
		
		// Sync section
		content.add(syncSection);	
		content.add(syncLabel);	
		content.add(syncNetSetting.getView());
		content.add(syncSetting.getView());
		
		// Theme section
		content.add(themeSection);
		content.add(themeLabel);
		content.add(themeSetting.getView());	
		
		// Save Button Event handler
		// Will save selected items back to the Ti.App.Properties
		function saveSettings() {
			Ti.API.info(distanceSetting.getSelectedValue());
			Ti.API.info(autoshotSetting.getSelectedValue());
			Ti.API.info(gpsdistanceSetting.getSelectedValue());
			Ti.API.info(themeSetting.getSelectedValue());
			Ti.API.info(syncNetSetting.getSelectedValue());
			Ti.API.info(syncSetting.getSelectedValue());
		}
		
		return view;
	};
	
})();
