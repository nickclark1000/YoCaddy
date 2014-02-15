// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createSettingsView = function(_args) {
		
		///////////////////////////////////////  Start of Common Window Section ////////////////////////////////////////
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
		
		var body = Ti.UI.createScrollView($$.bodyNoScrollView);			
		var content = Ti.UI.createScrollView($$.bodyScrollContent);

		body.add(content);
		view.add(body);
							
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		var OptionView = require('/common/optionView');
		
		// Create Headers and Section titles
		var settingLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			top: 5, left: 10, right: 10,
			text: 'Application requires a restart before setting changes will take affect.'
		}));
		content.add(settingLabel);

		var appSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			top: '5dp', left: '5dp',
			text: 'Application Settings'
		}));
		content.add(appSection);
						
		var appLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			top: 5, left: 10, right: 10,
			text: 'Changing applications settings could affect battery life, if settings are increased to their maximum accuracy option.'
		}));
		content.add(appLabel);
		
		/// Loop through yc.settings.app.propnames
		/// Create all the check boxes dynamically
		var appSettings = [];
		for (var i=0,j=yc.settings.app.propnames.length; i<j; i++) {
			Ti.API.debug(yc.settings.app.propnames[i].name + ' ' + yc.settings.app.propnames[i].desc);
			
			appSettings.push(new OptionView({
				desc: yc.settings.app.propnames[i].desc,
				selected: yc.settings.app.selected[i],
				options: yc.settings.app.propvalues[i],
				parent: view,
				top: '0dp', height: '40dp'				
			}));
			
			content.add(appSettings[i].getView());
		}
			
		var syncSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			top: 10, left: 5, botton: 5,
			text: 'Sync Settings'
		}));
		content.add(syncSection);	
		
		var syncLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			top: 5, left: 10, right: 10,
			text: 'Changing synchronization settings could increase wireless usage.  On limited wireless plans only sync over wifi.'
		}));
		content.add(syncLabel);
		
		/// Loop through yc.settings.sync.propnames
		/// Create all the check boxes dynamically
		var syncSettings = [];
		for (var i=0,j=yc.settings.sync.propnames.length; i<j; i++) {
			Ti.API.debug(yc.settings.sync.propnames[i].name + ' ' + yc.settings.sync.propnames[i].desc);
			
			syncSettings.push(new OptionView({
				desc: yc.settings.sync.propnames[i].desc,
				selected: yc.settings.sync.selected[i],
				options: yc.settings.sync.propvalues[i],
				parent: view,
				top: '0dp', height: '40dp'				
			}));
			
			content.add(syncSettings[i].getView());
		}		
				
		// Save Button Event handler
		// Will save selected items back to the Ti.App.Properties
		function saveSettings() {
			
			// Save AppSettings Array
			for(var i=0, j=appSettings.length; i<j; i++) {
				Ti.App.Properties.setInt(yc.settings.app.propnames[i].name, appSettings[i].getSelectedIndex());
			}
			
			// Save syncSettings Array
			for(var i=0, j=syncSettings.length; i<j; i++) {
				Ti.App.Properties.setInt(yc.settings.sync.propnames[i].name, syncSettings[i].getSelectedIndex());
			}
						
			//yc.settings.refreshSettings();			
			yc.app.applicationWindow.fireEvent('androidback', {});
		}
		
		return view;
	};
	
})();
