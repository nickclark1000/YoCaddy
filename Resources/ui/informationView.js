// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createInformationView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		view.viewid = yc.ui.viewids.about;
		
		var header = new yc.ui.headerView({
			title: 'About',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			}
		});
		view.add(header);
		
		var body = Ti.UI.createView($$.bodyNoScrollView);	
		var content = Ti.UI.createScrollView(yc.combine($$.bodyScrollContent, {}));
		
		body.add(content);
		view.add(body);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////

		var aboutSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			top: 5, left: 5,
			text: 'About yoCaddy'
		}));
		
		var linkSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			top: 5, left: 5,
			text: 'Links'
		}));		
		
		var aboutString = 'YoCaddy Mobile allows a user to track, during play, a number of round related details that can be stored and monitored locally:'
				+ '\n-Walking Paths'
				+ '\n-Club Selection and Distances'
				+ '\n-Round Scores'
				+ '\n-Basic Round Statistics'
				+ '\n-Sharing round information with friends via social media linking'
				+ '\n\nor can uploaded to YoCaddy Web (http://www.yocaddy.com), allowing finer round detail and statical information to be gathered and calculated:'
				+ '\n-Club and distance based accuracy'
				+ '\n-Course maintenance tracking'
				+ '\n-Etc.'
				+ '\n\nIntegration with YoCaddy Web requires a user account to be created.';
		
		var aboutText = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: aboutString,
			bottom: 5, width: '95%'
		}));

		var linkString = 'http://www.yocaddy.com/faq';
		
		var linkText = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: linkString,
			bottom: 5, width: '95%'
		}));
		
		content.add(aboutSection);		
		content.add(aboutText);
		content.add(linkSection);
		content.add(linkText);		
		
		return view;	
	};
})();
