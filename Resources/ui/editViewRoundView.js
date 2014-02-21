// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createEditViewRoundView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		view.viewid = yc.ui.viewids.mapround;
		
		var headerString;
		var headerLength = (yc.checkTablet()) ? 25 : 15;
		
		if (yc.app.editviewRound === undefined) {
			headerString = 'Invalid Round';
			view.add(new yc.ui.headerView({
				title:  headerString,
				leftbutton: {
					show: true,
					callback: function() { 
						yc.app.applicationWindow.fireEvent('androidback', {}); 
					}
				}
			}));
			return view;
		} else {
			headerString = (yc.app.editviewRound.course.length > headerLength) ? yc.app.editviewRound.course.substring(0,headerLength)+'...' : yc.app.editviewRound.course;
		}
		
		Ti.API.debug('Starting Map for Round: ' + JSON.stringify(yc.app.editviewRound));
		
		var header = new yc.ui.headerView({
			title:  headerString,
			leftbutton: {
				show: true,
				callback: function() {
					var confirm = new yc.ui.alert(
						'Close Round Edit',
						'Would you like to save round data before closing?  This will overwrite Round, Score and Trace information.',
						['Save & Close', 'Close']
					);
					
					// Add a listener for any event on the Alert window
					confirm.addEventListener('click', function(e){
						yc.app.alertShown = false;
						yc.app.applicationWindow.remove(confirm);
						if (e.source.title === 'Save & Close') {
							var toSave = scorer.getScores();
							var busy = yc.ui.createActivityStatus('Saving Scores...');
							var scoresSaved, gameUpdated;
							
							yc.app.applicationWindow.add(busy);
							
							// Do some saving and calculation stuff
							scoresSaved = yc.db.rounds.saveRoundScores(yc.app.editviewRound.id, toSave);
							
							// Update from new scoring
							yc.db.rounds.saveRound(yc.app.editviewRound);
							
							yc.app.applicationWindow.remove(busy);						
						} 
						
						// Exit regardless of what is pressed
						yc.app.editviewRound = undefined;
						yc.app.applicationWindow.fireEvent('androidback', {});						
	
					});
					
					yc.app.alertShown = true;
					yc.app.applicationWindow.add(confirm);
				}
			},
			rightbutton: {
				show: true,
				image: '/images/button_save.png',
				callback: function() {
					var confirm = new yc.ui.alert(
						'Close Round Edit',
						'Would you like to save round data before closing?  This will overwrite Round, Score and Trace information.',
						['Save & Close', 'Close']
					);
					
					// Add a listener for any event on the Alert window
					confirm.addEventListener('click', function(e){
						yc.app.alertShown = false;
						yc.app.applicationWindow.remove(confirm);
						if (e.source.title === 'Save & Close') {
							var toSave = scorer.getScores();
							var busy = yc.ui.createActivityStatus('Saving Scores...');
							var scoresSaved, gameUpdated;
							
							yc.app.applicationWindow.add(busy);
							
							// Do some saving and calculation stuff
							scoresSaved = yc.db.rounds.saveRoundScores(yc.app.editviewRound.id, toSave);
							
							// Update from new scoring
							yc.db.rounds.saveRound(yc.app.editviewRound);
							
							yc.app.applicationWindow.remove(busy);						
						} 
						
						// Exit regardless of what is pressed
						yc.app.editviewRound = undefined;
						yc.app.applicationWindow.fireEvent('androidback', {});						
	
					});
					
					yc.app.alertShown = true;
					yc.app.applicationWindow.add(confirm);
				}
			}
		});
		view.add(header);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		var yoMap = require('/common/mapView');
		map = new yoMap({
			userlocation: false,
			zoomcontrols: false,
			props: $$.bodyScrollView
		});
		//view.add(map);
		
		if (!map.valid) {
			return view;
		}	
		
		////////////////////////////////////// Map is loaded or not, do the rest /////////////////////////////////////
		
		var ScoreTable = require('/common/scoreTable');
		var scores = new ScoreTable({
			props: $$.bodyScrollView,
			roundId: yc.app.editviewRound
		});
		
		view.add(scores);
			
		return view;
	};
	
})();
