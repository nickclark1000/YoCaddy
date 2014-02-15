/**
 * roundScorer allows the user to quickly track their round score and basic information.
 * @param {Integer} roundid 
 */

var RoundScorer = function(_round, _args) {
	///// Private instance variables
	var roundinfo = [];
	var currRoundId = _round.id;
	var currRoundHole = _round.hole || 1;
	var parValues = [3,4,5], paridx = -1;
	var scoreValues = [1,2,3,4,5,6,7,8,9,10], scoreidx = -1;
	var fhValues = ['No', 'Yes'], fhidx = -1;
	var girValues = ['No', 'Yes'], giridx = -1;
	
	var buttonClicked = function(e) {
		switch(e.source) {
			case parButton:
				if (paridx === 2) { paridx=0; }
				else { paridx++; }
				parButton.setTitle(parValues[paridx].toString());
				break;
			case scoreButton:
				if (scoreidx === 9) { scoreidx=0; }
				else { scoreidx++; }
				scoreButton.setTitle(scoreValues[scoreidx].toString());			
				break;
			case fhButton:
				if (fhidx === 1) { fhidx=0; }
				else { fhidx++; }
				fhButton.setTitle(fhValues[fhidx]);			
				break;
			case girButton:
				if (giridx === 1) { giridx=0; }
				else { giridx++; }
				girButton.setTitle(girValues[giridx]);			
				break;
		}
	};
	
	///// Private UI Elements
	var view = Ti.UI.createView(yc.combine(_args, {
		backgroundImage: '/images/backgrounds/modalBodyBg.png',
		borderWidth: 1,
		borderColor: yc.style.colors.zebraColor,
		borderRadius: 10,
		layout: 'horizontal'
	}));
	
	// Par View
	var parView = Ti.UI.createView({
		width: '24%', height: Ti.UI.FILL
	});
	
	// Score View
	var scoreView = Ti.UI.createView({
		width: '24%', height: Ti.UI.FILL
	});	
	
	// Fairway hit View
	var fhView = Ti.UI.createView({
		width: '24%', height: Ti.UI.FILL
	});

	// Green in Regulation View
	var girView = Ti.UI.createView({
		width: '24%', height: Ti.UI.FILL
	});
			
	view.add(parView);
	view.add(scoreView);
	view.add(fhView);
	view.add(girView);	
	
	var parLabel = Ti.UI.createLabel({
		bottom: 0,
		text: 'Par',
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.tinytext,
			fontFamily: yc.style.fonts.infoFont
		}
	});
	
	var parButton = Ti.UI.createButton({
		width: Ti.UI.FILL, height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		}		
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
		}
	});
	
	var scoreButton = Ti.UI.createButton({
		width: Ti.UI.FILL, height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		}		
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
		}
	});
	
	var fhButton = Ti.UI.createButton({
		width: Ti.UI.FILL, height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		}		
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
		}
	});
	
	var girButton = Ti.UI.createButton({
		width: Ti.UI.FILL, height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.xlargetext,
			fontFamily: yc.style.fonts.buttonFont
		}		
	});		
	
	girView.add(girLabel);
	girView.add(girButton);
	
	parButton.addEventListener('click', buttonClicked);
	scoreButton.addEventListener('click', buttonClicked);
	fhButton.addEventListener('click', buttonClicked);
	girButton.addEventListener('click', buttonClicked);
	
	///// Public Instance Methods
	this.setScores = function(){
		if (roundinfo[currRoundHole] === undefined) {
			parButton.setTitle('-'); paridx = -1;
			scoreButton.setTitle('-'); scoreidx = -1;
			fhButton.setTitle('-'); fhidx = -1;
			girButton.setTitle('-'); giridx = -1;
		} else {
			parButton.setTitle(roundinfo[currRoundHole].par);
			scoreButton.setTitle(roundinfo[currRoundHole].score);
			fhButton.setTitle(roundinfo[currRoundHole].fairway);
			girButton.setTitle(roundinfo[currRoundHole].gir);
		}
	};
	
	// public function to change hole number
	this.holeUp = function() {
		Ti.API.debug(JSON.stringify(roundinfo[currRoundHole]));
		if (roundinfo[currRoundHole] === undefined) {
			roundinfo.push({
				par: parValues[paridx],
				score: scoreValues[scoreidx],
				fairway: fhValues[fhidx],
				gir: girValues[giridx]				
			});			
		} else {
			roundinfo[currRoundHole] = {
				par: parValues[paridx],
				score: scoreValues[scoreidx],
				fairway: fhValues[fhidx],
				gir: girValues[giridx]	
			};
		}
		
		if (currRoundHole === 18) {
			currRoundHole = 1;
		} else {
			currRoundHole++;
		}
		
		this.setScores();
	};
	
	// Public function to change hole number
	this.holeDown = function() {
		Ti.API.debug(JSON.stringify(roundinfo[currRoundHole]));
		if (roundinfo[currRoundHole] === undefined) {
			roundinfo.push({
				par: parValues[paridx],
				score: scoreValues[scoreidx],
				fairway: fhValues[fhidx],
				gir: girValues[giridx]				
			});			
		} else {
			roundinfo[currRoundHole] = {
				par: parValues[paridx],
				score: scoreValues[scoreidx],
				fairway: fhValues[fhidx],
				gir: girValues[giridx]	
			};
		}
				
		if (currRoundHole === 1) {
			currRoundHole = 18;
		} else {
			currRoundHole--;
		}
		
		this.setScores();		
	};
	
	this.getView = function() {
		return view;
	};
	
	this.setScores();
};

module.exports = RoundScorer;
