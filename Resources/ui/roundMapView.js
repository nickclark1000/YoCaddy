// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createRoundMapView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		view.viewid = yc.ui.viewids.mapround;
		
		var headerString;
		var headerLength = (yc.checkTablet()) ? 25 : 15;
		
		if (yc.app.currentRound === undefined) {
			headerString = 'Invalid Round';
			view.add(new yc.ui.headerView({
				title:  headerString,
				leftbutton: {
					show: true,
					callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
				}
			}));
			return view;
		} else {
			headerString = (yc.app.currentRound.course.length > headerLength) ? yc.app.currentRound.course.substring(0,20)+'...' : yc.app.currentRound.course;
		}
		
		var header = new yc.ui.headerView({
			title:  headerString,
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			},
			rightbutton: {
				show: true,
				image: '/images/button_cancel.png',
				callback: function() {
					var confirm = new yc.ui.alert(
						'End round',
						'Are you sure you would like to end your round? Ending the round will save your scores.',
						['Yes', 'No']
					);
					
					confirm.addEventListener('click', function(e){
						yc.app.alertShown = false;
						yc.app.applicationWindow.remove(confirm);
						if (e.source.title === 'Yes') {
							var toSave = scorer.getScores();
							Ti.API.debug('currentROund' + JSON.stringify(yc.app.currentRound));
							
							var busy = yc.ui.createActivityStatus('Saving Scores...');
							yc.app.applicationWindow.add(busy);
							yc.db.rounds.saveRoundScores(yc.app.currentRound.id, toSave);
							yc.app.applicationWindow.remove(busy);
							
							yc.app.currentRound = undefined;
							yc.app.applicationWindow.fireEvent('androidback', {});
						}
	
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
			props: {
				top: 110, bottom: 5,
				left: 5, right: 5,
				borderWidth: 1,
				borderColor: '#E0E0E0',				
			}
		});
		view.add(map);
		
		if (!map.valid) {
			return view;
		}
		
		///////////////////////////////// Scoring View /////////////////////////////
		var RoundScorer = require('/common/roundScorer');
		var scorer = new RoundScorer({
			id: 1,
			hole: 1
		}, {
			top: 55, left: 5, right: 5,
			height: 50
		});
		
		view.add(scorer.getView());	
		///////////////////////////////// Round Scoring View /////////////////////////////////		
			
		return view;
	};
	
})();
