// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createSettingsView = function(_args) {
		
		///////////////////////////////////////  Start of Common Window Section ////////////////////////////////////////
		var view = Ti.UI.createView($$.stretch);
		view.viewid = yc.ui.viewids.settings;
		
		var header = new yc.ui.headerView({
			title: 'Settings',
			leftbutton: {
				show: true,
				callback: function() {
					yc.app.applicationWindow.fireEvent('androidback', { sourceView: yc.ui.viewids.settings });
				}
			},
			rightbutton: [{
				show: true,
				callback: saveSettings,
				image: '/images/button_save.png'
			}]
		});
		view.add(header);
		
		var body = Ti.UI.createScrollView($$.bodyScrollView);			
		var content = Ti.UI.createScrollView($$.bodyContent);

		body.add(content);
		view.add(body);
							
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		var OptionView = require('/common/optionView');
		
		// Create Headers and Section titles
		var settingLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			top: 5, left: 10, right: 10,
			text: 'Application requires a restart before setting changes will take affect.'
		}));

		var appSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Application Settings'
		}));
		content.add(appSection);
						
		var appLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			top: 5, left: 10, right: 10,
			text: 'Changing applications settings could affect battery life, if settings are increased to their maximum accuracy option.'
		}));
		content.add(appLabel);
		content.add(settingLabel);
		
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
			botton: 5,
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
				
		/**
		 * 
		 */				
		function confirmSave() {
			var confirm = new yc.ui.alert(
				'Save Settings?',
				'Would you like to save settings before closing?',
				['Save & Close', 'Close', 'Cancel']
			);
			
			// Add a listener for any event on the Alert window
			confirm.addEventListener('click', function(e){
				yc.app.alertShown = false;
				yc.app.applicationWindow.remove(confirm);
				
				if (e.source.title === 'Save & Close') {						
					var busy = yc.ui.createActivityStatus('Saving Settings...');
					yc.app.applicationWindow.add(busy);

					saveSettings();
	
					// Exit regardless of what is pressed
					yc.app.applicationWindow.remove(busy);	
					yc.app.applicationWindow.fireEvent('appback', {});																	
				} else if (e.source.title === 'Close'){
					yc.app.applicationWindow.fireEvent('appback', {});
				} else {
					// Do nothing
				}								
			});
			
			yc.app.alertShown = true;
			yc.app.applicationWindow.add(confirm);			
		}		
				
		/**
		 * 
		 */
		function saveSettings() {
			Ti.API.debug('Saving Settings');
			
			// Save AppSettings Array
			for(var i=0, j=appSettings.length; i<j; i++) {
				Ti.App.Properties.setInt(yc.settings.app.propnames[i].name, appSettings[i].getSelectedIndex());
			}
			
			// Save syncSettings Array
			for(var i=0, j=syncSettings.length; i<j; i++) {
				Ti.App.Properties.setInt(yc.settings.sync.propnames[i].name, syncSettings[i].getSelectedIndex());
			}						
		}
		
		view.addEventListener('closing', function(e){
			confirmSave();
		});		
				
		return view;
	};
	
})();
