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
		var appContent = Ti.UI.createView($$.bodyContent);
		var syncContent = Ti.UI.createView($$.bodyContent);
		var themeContent = Ti.UI.createView($$.bodyContent);

		body.add(appContent);
		body.add(syncContent);
		body.add(themeContent);
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
		
		var distanceSetting = new optionView({
			desc: yc.settings.settingNames.distanceSettings.desc,
			selected: yc.settings.settingsSaved.distanceSettings,
			options: yc.settings.settingOptions.distanceSettings,
			parent: view,
			top: '0dp', height: '40dp'
		});	
		
		var autoshotSetting = new optionView({
			desc: yc.settings.settingNames.autoshotSettings.desc,
			selected: yc.settings.settingsSaved.autoshotSettings,
			options: yc.settings.settingOptions.autoshotSettings,
			parent: view,
			top: '0dp', height: '40dp'
		});	
							
		var gpsdistanceSetting = new optionView({
			desc: yc.settings.settingNames.gpsdistSettings.desc,
			selected: yc.settings.settingsSaved.gpsdistSettings,
			options: yc.settings.settingOptions.gpsdistSettings,
			parent: view,
			top: '0dp', height: '40dp'
		});																

		var syncNetSetting = new optionView({
			desc: yc.settings.settingNames.syncnetSettings.desc,
			selected: yc.settings.settingsSaved.syncnetSettings,
			options: yc.settings.settingOptions.syncnetSettings,
			parent: view,
			top: '0dp', height: '40dp'
		});		

		var syncSetting = new optionView({
			desc: yc.settings.settingNames.syncdataSettings.desc,
			selected: yc.settings.settingsSaved.syncdataSettings,
			options: yc.settings.settingOptions.syncdataSettings,
			parent: view,
			top: '0dp', height: '40dp'
		});			
		
		var themeSetting = new optionView({
			desc: yc.settings.settingNames.themeSettings.desc,
			selected: yc.settings.settingsSaved.themeSettings,
			options: yc.settings.settingOptions.themeSettings,
			parent: view,
			top: '0dp', height: '40dp'
		});				
		
		// Setting information
		appContent.add(appSection);
		appContent.add(appLabel);		
		appContent.add(distanceSetting.getView());
		appContent.add(autoshotSetting.getView());
		appContent.add(gpsdistanceSetting.getView());
		
		// Sync section
		syncContent.add(syncSection);	
		syncContent.add(syncLabel);	
		syncContent.add(syncNetSetting.getView());
		syncContent.add(syncSetting.getView());
		
		// Theme section
		themeContent.add(themeSection);
		themeContent.add(themeLabel);
		themeContent.add(themeSetting.getView());	
		
		// Save Button Event handler
		// Will save selected items back to the Ti.App.Properties
		function saveSettings() {
			Ti.API.debug(distanceSetting.getSelectedIndex());
			Ti.API.debug(autoshotSetting.getSelectedIndex());
			Ti.API.debug(gpsdistanceSetting.getSelectedIndex());
			Ti.API.debug(syncNetSetting.getSelectedIndex());
			Ti.API.debug(syncSetting.getSelectedIndex());
			Ti.API.debug(themeSetting.getSelectedIndex());
						
			Ti.App.Properties.setInt(yc.settings.settingNames.distanceSettings.name, distanceSetting.getSelectedIndex());
			Ti.App.Properties.setInt(yc.settings.settingNames.autoshotSettings.name, autoshotSetting.getSelectedIndex());
			Ti.App.Properties.setInt(yc.settings.settingNames.gpsdistSettings.name, gpsdistanceSetting.getSelectedIndex());
			Ti.App.Properties.setInt(yc.settings.settingNames.syncnetSettings.name, syncNetSetting.getSelectedIndex());
			Ti.App.Properties.setInt(yc.settings.settingNames.syncdataSettings.name, syncSetting.getSelectedIndex());
			Ti.App.Properties.setInt(yc.settings.settingNames.themeSettings.name, themeSetting.getSelectedIndex());	
			
			yc.settings.refreshSettings();			
			yc.app.applicationWindow.fireEvent('androidback', {});
		}
		
		return view;
	};
	
})();
