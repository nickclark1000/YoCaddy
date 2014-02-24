/**
 * ScoreTable creates a table view for a rounds scores 
 * @param {Object} _args {props: Main View properties, RoundId}
 */

var ScoreTable = function(_args) {
	var scores = yc.db.rounds.getRoundScores(_args.roundId);
	var scoreRows = [];
	
	///// specific styles for this module
	var titleRowStyle = {
		width: (yc.checkTablet()) ? '20%' : '19%', 
		height: 40,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_CENTER,
		color: yc.style.colors.black,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.optionFont
		}	
	};
	
	var scoreRowStyle = {
		width: (yc.checkTablet()) ? '20%' : '19%', 
		height: 40,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_CENTER,
		color: yc.style.colors.greyTextColor,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.infoFont
		}				
	};
	
	// Create the main view
	var view = Ti.UI.createScrollView(yc.combine(_args.props, {
		layout: 'vertical'
	}));
	
	////// Create the Header Table
	////// Table header has the Column headings as text
	view.add(new yc.ui.vSpacer(10));
	var titleRow = Ti.UI.createView({
		width: '98%', height: 50,
		layout: 'horizontal'		
	});
	view.add(titleRow);
	view.add(new yc.ui.separator('98%'));

	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: 'Hole'
	})));
	
	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: 'Par'
	})));
	
	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: 'Score'
	})));
	
	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: (yc.checkTablet()) ? 'Fairway' : 'FH'
	})));

	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: (yc.checkTablet()) ? 'Greens' : 'GIR'
	})));
	
	var FairwaySelector = require('/common/fairwaySelector');
	var GirSelector = require('/common/girSelector');
	var ParSelector = require('/common/parSelector');
	var ScoreSelector = require('/common/scoreSelector');
		
	// Populate the Hole by hole scorecard	
	for (var i=0; i < 18; i++) {
		var hole = (i+1).toString();
		var zebra = (Math.ceil(i % 2) > 0) ? yc.style.colors.zebraColor : 'transparent';
		
		scoreRows[i] = Ti.UI.createView({
			width: '98%', height: 50,
			layout: 'horizontal',
			backgroundColor: zebra				
		});
		
		scoreRows[i].add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
			text: hole
		})));
		
		var par, score, fairwayHit, greenHit;
		if (scores[i]) {
			par = scores[i].par;
			score = scores[i].score; 
			fairwayHit = scores[i].fairway; 
			greenHit = scores[i].gir;		
		} else {
			par = undefined;
			score = undefined; 
			fairwayHit = undefined; 
			greenHit = undefined;	
		}
			
		scoreRows[i].add(new ParSelector(par, {width: '20%'}).getView());
		scoreRows[i].add(new ScoreSelector(score, {width: '20%'}).getView());
		scoreRows[i].add(new FairwaySelector(fairwayHit, {width: '19%'}).getView());
		scoreRows[i].add(new GirSelector(greenHit, {width: '20%'}).getView());
		
		view.add(scoreRows[i]);	
	}

	view.add(yc.ui.vSpacer(5));
	
	/**
	 * 
	 */
	this.getView = function() {
		return view;
	};
	
	/**
	 * 
	 */
	this.getScores = function() {
		var scoreinfo = [];
		
		for (var i=0; i < 18; i++) {
			scoreinfo.push({
				hole: scoreRows[i].children[0].getText(),
				par: scoreRows[i].children[1].getTitle(),
				score: scoreRows[i].children[2].getTitle(),
				fairway: scoreRows[i].children[3].getTitle(),
				gir: scoreRows[i].children[4].getTitle()
			});
		}
		
		return scoreinfo;
	};	
};

module.exports = ScoreTable;
