// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createRoundMapView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		var lastPage;
		view.viewid = yc.ui.viewids.mapround;
		
		var headerString;
		var headerLength = (yc.checkTablet()) ? 50 : 15;
		
		if (yc.app.currentRound === undefined) {
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
			headerString = (yc.app.currentRound.course.length > headerLength) ? yc.app.currentRound.course.substring(0,headerLength)+'...' : yc.app.currentRound.course;
		}
		
		Ti.API.debug('Starting Map for Round: ' + JSON.stringify(yc.app.currentRound));
		
		var header = new yc.ui.headerView({
			title:  headerString,
			leftbutton: {
				show: true,
				callback: function() {
					yc.app.applicationWindow.fireEvent('androidback', {});
				}
			},
			rightbutton: [{
				show: true,
				image: '/images/button_share.png',
				callback: function() {
					// do nothing for now
				}				
			}]
		});
		view.add(header);
		
		var body = Ti.UI.createView(yc.combine($$.bodyNoScrollView, {}));
		view.add(body);
		
		var viewHeadings = Ti.UI.createView(yc.combine({},{
			top: 0, left: 0,
			width: Ti.UI.FILL, height: 40
		}));
		body.add(viewHeadings);
		
		var buttonStyle = {
			color: yc.style.colors.white,
			borderColor: yc.style.colors.black,
			backgroundColor: yc.style.colors.highlightColor,
			backgroundSelectedColor: yc.style.colors.mainColor,
			backgroundImage: '/images/buttonBackground.png',
			font: {
				fontSize: yc.style.fontsize.normaltext,
				fontFamily: yc.style.fonts.buttonFont
			}			
		};
		
		var content = Ti.UI.createScrollableView(yc.combine({},{
			top: 40, left: 5,
			bottom: 0, right: 5,
			showPagingControl: false,
			scrollingEnabled: false
		}));	
		body.add(content);	
		
		var selectedHeading = Ti.UI.createView(yc.combine({},{
			zIndex: 50,
			width: '33%', height: 3,
			bottom: 0, left: 0,
			backgroundColor: yc.style.colors.mainColor
		}));	
		viewHeadings.add(selectedHeading);	
		
		var detailHeading = Ti.UI.createButton(yc.combine(buttonStyle,{
			left: 0, width: '33%',
			height: Ti.UI.FILL,
			title: 'Details'
		}));
		viewHeadings.add(detailHeading);

		var scoreHeading = Ti.UI.createButton(yc.combine(buttonStyle,{
			left: '33%', width: '34%',
			height: Ti.UI.FILL,
			title: 'Scorecard'
		}));
		viewHeadings.add(scoreHeading);
	
		var mapHeading = Ti.UI.createButton(yc.combine(buttonStyle,{
			left: '67%', width: '33%',
			height: Ti.UI.FILL,
			title: 'Map'
		}));
		viewHeadings.add(mapHeading);
								
		// ROund Info Button								
		var RoundInfo = require('/common/roundInfo');
		var detail = new RoundInfo({
			roundId: yc.app.currentRound.id
		});
		
		// Map Button
		var yoMap = require('/common/mapView');
		var map = new yoMap({
			userlocation: false,
			zoomcontrols: false,
			props: {},
			roundId: yc.app.currentRound.id
		});
			
		// Score Table Data	
		var ScoreTable = require('/common/scoreTable');
		var scores = new ScoreTable({
			props: {},
			roundId: yc.app.currentRound.id
		});	

		// Event handlers used to change scroll pages
		detailHeading.addEventListener('click', function(e){
			content.setCurrentPage(0);
			selectedHeading.animate({
				left: 0,
				duration: 100
			}, function(){});
		});
				
		scoreHeading.addEventListener('click', function(e){
			content.setCurrentPage(1);
			selectedHeading.animate({
				left: '33%',
				duration: 100
			}, function(){});			
		});
					
		mapHeading.addEventListener('click', function(e){
			content.setCurrentPage(2);
			selectedHeading.animate({
				left: '67%',
				duration: 100
			}, function(){});			
		});		
		
		content.addView(detail.getView());	
		content.addView(scores.getView());
		content.addView(map.getView());
		map.startMapping();	
		lastPage = 0;
		
		content.addEventListener('scrollend', function(e){
			Ti.API.debug('Scroll: '+ JSON.stringify(e.currentPage));
			
			switch (lastPage) {
				case 0: 		// Details				
					break;
				case 1:			// Scorecard
					scores.save();				
					break;
				case 2:			// Map
					break;
			}
			
			// Regardless we need to update the Details
			yc.app.currentRound.par = scores.getTotalPar();
			yc.app.currentRound.score = scores.getTotalScore();
			yc.app.currentRound.fairwayHit = scores.getFairwayPercent();
			yc.app.currentRound.greenHit = scores.getGreenPercent();			
			detail.updateRound(yc.app.currentRound);
			
			lastPage = e.currentPage;		
		});
		
		
		// Event listener for when teh back button is pressed.  Before removing the view
		// the UI controller will fire this event to each view, if it requires action that is available.
		view.addEventListener('closing', function(e){
			Ti.API.debug('entering closing');
			var confirm = new yc.ui.alert(
				'Close Round',
				'Would you like to save round data before closing?',
				['Save & Close', 'Close', 'Cancel']
			);
			
			// Add a listener for any event on the Alert window
			Ti.API.debug('About to add listener');
			confirm.addEventListener('click', function(e){
				yc.app.alertShown = false;
				yc.app.applicationWindow.remove(confirm);
				if (e.source.title === 'Save & Close') {
					var toSave = scores.getScores();						
					var busy = yc.ui.createActivityStatus('Saving Scores...');
					yc.app.applicationWindow.add(busy);
					yc.db.rounds.saveRoundScores(toSave);
					
					// Update from new scoring
					yc.app.currentRound = detail.getRound();
					yc.db.rounds.saveRound(yc.app.currentRound);
					
					// Exit regardless of what is pressed
					yc.app.applicationWindow.remove(busy);																		
					yc.app.currentRound = undefined;	
					map.stopMapping();
					yc.app.applicationWindow.fireEvent('appback', {});
				} else if (e.source.title == 'Close') {						
					// Exit regardless of what is pressed
					yc.app.currentRound = undefined;	
					map.stopMapping();
					yc.app.applicationWindow.fireEvent('appback', {});							
				} else {
					// Do nothing
				}
			});
			
			Ti.API.debug('And done');
			yc.app.alertShown = true;
			yc.app.applicationWindow.add(confirm);
		});	
					
		return view;
	};
	
})();
