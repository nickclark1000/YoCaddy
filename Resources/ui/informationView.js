// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createInformationView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		view.viewid = yc.ui.viewids.about;
		
		var header = new yc.ui.headerView({
			title: 'About yoCaddy',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			}
		});
		view.add(header);
		
		var body = Ti.UI.createScrollView($$.bodyScrollView);	
		var content = Ti.UI.createScrollView(yc.combine($$.bodyContent, {
			bottom: 5
		}));
		
		body.add(content);
		view.add(body);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////

		var startRoundSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Starting a Round'
		}));
		var startRoundTextVal = 'After selecting the menu item Start New Round, you will be asked to enter round information.'
				+ '  The first option is to manually enter the Course Name and Course Description.  The second is to click'
				+ ' the Select a Course/Clear Selection button, which will open a list of nearby courses to select from (GPS must be turned on).'
				+ '  There are a number of other course options available:'
				+ '\n- Save Walking Trace will store your movements around the course'
				+ '\n- Show Walking Trace will display your movments on the screen'
				+ '\n\nOnce you\'ve entered the appropriate information, you will click the continue (check mark) button on the application bar.';
		var startRoundText = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: startRoundTextVal,
			bottom: 5, width: '95%'
		}));
		content.add(startRoundSection);
		content.add(startRoundText);
		
		var mapRoundSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Mapping a Round'
		}));
		var mapRoundTextVal = 'While mapping your round you have are able to:'
				+ '\n- Update hole scores as you play'
				+ '\n- Use the course map to determine hole distances'
				+ '\n- Log course selections for shots'
				+ '\n\nUse the score tracker to log basic information for your round: hole par, score, fairways hit and greens hit.'
				+ '\n\nIf tracing was enabled during round creation your walking path will display throughout the round.'
				+ '\n\nManual distance and shot calcualtion can be used by clicking the Mark icon and selecting a location no the map.'
				+ ' With the mobile app you can lookup distances to dogleg/fairway points as well as green/hole placement.'
				+ '\n\nOnce complete, use the close button on the application bar to save and end the round.';
		var mapRoundText = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: mapRoundTextVal,
			bottom: 5, width: '95%'
		}));
		content.add(mapRoundSection);
		content.add(mapRoundText);	

		var listRoundSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Viewing Saved Rounds'
		}));
		var editRoundTextVal = 'After selecting View Saved Rounds, you will be updated with the currently saved rounds on your mobile device.'
				+ ' The rounds list can be updated by clicking the Refresh icon on the application bar.  The roudn search method can be updated'
				+ ' by selecting clicking the Search icon on the application bar, then selecting the search method (currently not supported on Android).'
				+ '\n\Editing a round - to edit a round click the round once in the list.'
				+ '\n\nDeleting a round - to delete a round and the related score information, press and hold the selected round item, then click the'
				+ 'Delete button when it is displayed.';
		var listRoundText = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: mapRoundTextVal,
			bottom: 5, width: '95%'
		}));
		content.add(listRoundSection);
		content.add(listRoundText);	
		
		
		
		return view;	
	};
})();
