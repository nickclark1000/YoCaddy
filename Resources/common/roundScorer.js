/**
 * roundScorer allows the user to quickly track their round score and basic information.
 * @param {Integer} roundid 
 */

var RoundScorer = function(_round, _args) {
	///// Private instance variables
	var currRoundId = _round.id;
	var currRoundHole = _round.hole || 1;	
	var roundinfo = [];
	var parIdx = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	var scoreIdx = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	var fhIdx = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	var girIdx = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	var parValues = [3,4,5];
	var scoreValues = [1,2,3,4,5,6,7,8,9,10];
	var fhValues = ['No', 'Yes'];
	var girValues = ['No', 'Yes'];

	// Error and return a message view if there is no Round id passed in.
	if (currRoundId === undefined) {
		return Ti.UI.createLabel({
			color: 'red',
			text: 'Error: RoundId is required',
			font: {
				fontSize: yc.style.fontsize.largetext,
				fontFamily: yc.style.fonts.buttonFont
			}
		});
	}
	
	// Grab the scores from the DB
	roundinfo = yc.db.rounds.getRoundScores(currRoundId);
	Ti.API.debug(JSON.stringify(roundinfo));

	// Event Listener for button clicks on this View
	var buttonClicked = function(e) {
		var arrIdx = currRoundHole - 1;	
			
		switch(e.source) {
			case parButton:
				if (parIdx[arrIdx] === 2) { parIdx[arrIdx]=0; }
				else { parIdx[arrIdx]++; }
				parButton.setTitle(parValues[parIdx[arrIdx]].toString());
				break;
			case scoreButton:
				if (scoreIdx[arrIdx] === 9) { scoreIdx[arrIdx]=0; }
				else { scoreIdx[arrIdx]++; }
				scoreButton.setTitle(scoreValues[scoreIdx[arrIdx]].toString());			
				break;
			case fhButton:
				if (fhIdx[arrIdx] === 1) { fhIdx[arrIdx]=0; }
				else { fhIdx[arrIdx]++; }
				fhButton.setTitle(fhValues[fhIdx[arrIdx]]);			
				break;
			case girButton:
				if (girIdx[arrIdx] === 1) { girIdx[arrIdx]=0; }
				else { girIdx[arrIdx]++; }
				girButton.setTitle(girValues[girIdx[arrIdx]]);			
				break;
			case prevButton:
				holeDown();
				break;
			case nextButton:
				holeUp();
				break;
		}
	};
	
	//// Private UI Elements
	var view = Ti.UI.createView(yc.combine(_args, {
		layout: 'vertical',
		height: Ti.UI.SIZE
	}));
	
	var mainView = Ti.UI.createView(yc.combine({
		backgroundImage: '/images/backgrounds/modalBodyBg.png',
		borderWidth: 1,
		borderColor: yc.style.colors.zebraColor,
		borderRadius: 10,		
		width: Ti.UI.FILL, height: _args.height || 50,
		layout: 'horizontal'
	},{}));
	
	view.add(mainView);
	
	// Par View
	var parView = Ti.UI.createView({
		width: '24%', height: Ti.UI.FILL,
		touchEnabled: false
	});
	
	// Score View
	var scoreView = Ti.UI.createView({
		width: '24%', height: Ti.UI.FILL,
		touchEnabled: false
	});	
	
	// Fairway hit View
	var fhView = Ti.UI.createView({
		width: '24%', height: Ti.UI.FILL,
		touchEnabled: false
	});

	// Green in Regulation View
	var girView = Ti.UI.createView({
		width: '24%', height: Ti.UI.FILL,
		touchEnabled: false
	});
			
	mainView.add(parView);
	mainView.add(scoreView);
	mainView.add(fhView);
	mainView.add(girView);	
	
	var parLabel = Ti.UI.createLabel({
		bottom: 0,
		text: 'Par',
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.tinytext,
			fontFamily: yc.style.fonts.infoFont
		},
		touchEnabled: false
	});
	
	var parButton = Ti.UI.createButton({
		width: Ti.UI.FILL, height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		},
		bubbleParent: false
	});
	
	parView.add(parLabel);
	parView.add(parButton);
	
	var scoreLabel = Ti.UI.createLabel({
		bottom: 0,
		text: 'Score',
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.tinytext,
			fontFamily: yc.style.fonts.infoFont
		},
		touchEnabled: false
	});
	
	var scoreButton = Ti.UI.createButton({
		width: Ti.UI.FILL, height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		},
		bubbleParent: false
	});	
	
	scoreView.add(scoreLabel);
	scoreView.add(scoreButton);
	
	var fhLabel = Ti.UI.createLabel({
		bottom: 0,
		text: 'Fairway',
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.tinytext,
			fontFamily: yc.style.fonts.infoFont
		},
		touchEnabled: false
	});
	
	var fhButton = Ti.UI.createButton({
		width: Ti.UI.FILL, height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		},
		bubbleParent: false
	});		
	
	fhView.add(fhLabel);
	fhView.add(fhButton);

	var girLabel = Ti.UI.createLabel({
		bottom: 0,
		text: 'Green',
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.tinytext,
			fontFamily: yc.style.fonts.infoFont
		},
		touchEnabled: false
	});
	
	var girButton = Ti.UI.createButton({
		width: Ti.UI.FILL, height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		},
		bubbleParent: false	
	});		
	
	girView.add(girLabel);
	girView.add(girButton);
	
	//// Control View
	var controlView = Ti.UI.createView(yc.combine({
		width: Ti.UI.SIZE, height: Ti.UI.SIZE,
		backgroundImage: '/images/backgrounds/modalBodyBg.png',
		borderWidth: 1,
		borderColor: yc.style.colors.zebraColor,
		borderRadius: 5,		
		layout: 'horizontal',
		top: 5
	},{}));
	
	view.add(controlView);
	
	var prevButton = Ti.UI.createButton(yc.combine($$.modalButton,{
		title: '<<'
	}));
	
	var holeNumber = Ti.UI.createLabel({
		width: 120, left: 5,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		}			
	});
	
	var nextButton = Ti.UI.createButton(yc.combine($$.modalButton,{
		title: '>>', left: 5
	}));	
	
	controlView.add(prevButton);
	controlView.add(holeNumber);
	controlView.add(nextButton);	
	
	parButton.addEventListener('click', buttonClicked);
	scoreButton.addEventListener('click', buttonClicked);
	fhButton.addEventListener('click', buttonClicked);
	girButton.addEventListener('click', buttonClicked);
	prevButton.addEventListener('click', buttonClicked);
	nextButton.addEventListener('click', buttonClicked);	
	
	///// Public Instance Methods
	var setScores = function(){
		var arrIdx = currRoundHole-1;
		
		if (roundinfo[arrIdx] === undefined) {
			parButton.setTitle('-'); parIdx[arrIdx] = -1;
			scoreButton.setTitle('-'); scoreIdx[arrIdx] = -1;
			fhButton.setTitle('-'); fhIdx[arrIdx] = -1;
			girButton.setTitle('-'); girIdx[arrIdx] = -1;
		} else {
			parButton.setTitle(roundinfo[arrIdx].par.toString());
			scoreButton.setTitle(roundinfo[arrIdx].score.toString());
			fhButton.setTitle(roundinfo[arrIdx].fairway);
			girButton.setTitle(roundinfo[arrIdx].gir);
		}
		
		holeNumber.setText('Hole ' + currRoundHole.toString());
	};
	
	// public function to change hole number
	var holeUp = function() {
		var arrIdx = currRoundHole-1;

		roundinfo[arrIdx] = {
			roundId: currRoundId,
			hole: currRoundHole,
			par: (parIdx[arrIdx] === -1) ? '-' : parValues[parIdx[arrIdx]],
			score: (scoreIdx[arrIdx] === -1) ? '-' : scoreValues[scoreIdx[arrIdx]],
			fairway: (fhIdx[arrIdx] === -1) ? '-' : fhValues[fhIdx[arrIdx]],
			gir: (girIdx[arrIdx] === -1) ? '-' : girValues[girIdx[arrIdx]]				
		};			
		
		if (currRoundHole === 18) {
			currRoundHole = 1;
		} else {
			currRoundHole++;
		}
		
		setScores();
	};
	
	// Public function to change hole number
	var holeDown = function() {
		var arrIdx = currRoundHole-1;

		roundinfo[arrIdx] = {
			roundId: currRoundId,
			hole: currRoundHole,
			par: (parIdx[arrIdx] === -1) ? '-' : parValues[parIdx[arrIdx]],
			score: (scoreIdx[arrIdx] === -1) ? '-' : scoreValues[scoreIdx[arrIdx]],
			fairway: (fhIdx[arrIdx] === -1) ? '-' : fhValues[fhIdx[arrIdx]],
			gir: (girIdx[arrIdx] === -1) ? '-' : girValues[girIdx[arrIdx]]					
		};	
				
		if (currRoundHole === 1) {
			currRoundHole = 18;
		} else {
			currRoundHole--;
		}
		
		setScores();		
	};
	
	/**
	 * Return the view for display purposes 
	 */
	this.getView = function() {
		return view;
	};
	
	/**
	 * getScores returns the full roundinfo array 
	 */
	this.getScores = function() {
		for(var i = currRoundHole; i < 19; i++) { 
			holeUp();
		}	
		
		return roundinfo;
	};
	
	/**
	 * 
	 */
	this.getTotalPar = function() {
		var total = 0;
		for (var i=0, j=roundinfo.length; i<j; i++) {
			if (roundinfo[i].par != '-') {
				total += roundinfo[i].par;
			}
		}
		return total;
	};
	
	/**
	 * 
	 */
	this.getTotalScore = function() {
		var total = 0;
		for (var i=0, j=roundinfo.length; i<j; i++) {
			if (roundinfo[i].score != '-') {
				total += roundinfo[i].score;
			}
		}
		return total;		
	};
	
	/**
	 * 
	 */
	this.getFairwayPercent = function() {
		var validHoles = 0, total = 0;
		for (var i=0, j=roundinfo.length; i<j; i++) {
			if (roundinfo[i].fairway != '-' && roundinfo[i].par != 3) {
				validHoles++;
				
				if (roundinfo[i].fairway === 'Yes') {
					total++;
				}
			}
		}		
		return (total/validHoles).toFixed(2);		
	};
	
	/**
	 * 
	 */
	this.getGIRPercent = function() {
		var validHoles = 0, total = 0;
		for (var i=0, j=roundinfo.length; i<j; i++) {
			if (roundinfo[i].gir != '-') {
				validHoles++;
				
				if (roundinfo[i].gir === 'Yes') {
					total++;
				}
			}
		}		
		return (total/validHoles).toFixed(2);			
	};
	
	this.save = function() {
		var update = this.getScores();
		yc.db.rounds.saveRoundScores(update);
	};
	
	/**
	 * 
	 */
	this.update = function(){
		roundinfo = yc.db.rounds.getRoundScores(currRoundId);
		setScores();
	};
	
	// Set the scores for the first time
	setScores();
};

module.exports = RoundScorer;
