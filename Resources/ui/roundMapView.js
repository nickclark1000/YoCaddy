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
			headerString = (yc.app.currentRound.course.length > headerLength) ? yc.app.currentRound.course.substring(0,headerLength)+'...' : yc.app.currentRound.course;
		}
		
		Ti.API.debug('Starting Map for Round: ' + JSON.stringify(yc.app.currentRound));
		
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
							var busy = yc.ui.createActivityStatus('Saving Scores...');
							var scoresSaved, gameUpdated;
							
							yc.app.applicationWindow.add(busy);
							
							// Do some saving and calculation stuff
							scoresSaved = yc.db.rounds.saveRoundScores(yc.app.currentRound.id, toSave);
							yc.app.currentRound.par = scorer.getTotalPar();
							yc.app.currentRound.score = scorer.getTotalScore();
							yc.app.currentRound.fairwayHit = scorer.getFairwayPercent();
							yc.app.currentRound.greenHit = scorer.getGIRPercent();
							yc.db.rounds.saveRound(yc.app.currentRound);
							
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
			props: $$.bodyNoScrollView
		});
		view.add(map);
		
		if (!map.valid) {
			return view;
		}
		
		///////////////////////////////// Scoring View /////////////////////////////
		var RoundScorer = require('/common/roundScorer');
		var scorer = new RoundScorer({
			id: yc.app.currentRound.id,
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
