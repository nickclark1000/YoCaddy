/**
 * ScoreTable creates a table view for a rounds scores 
 * @param {Object} _args {props: Main View properties, RoundId}
 */

var ScoreTable = function(_args) {
	var roundid = _args.roundId;
	var scores = yc.db.rounds.getRoundScores(_args.roundId);
	var scoreRows = [];
	var parViews = [];
	var scoreViews = [];
	var fairwayViews = [];
	var greenViews = [];
	
	///// specific styles for this module
	var titleRowStyle = {
		width: (yc.checkTablet()) ? '20%' : '20%', 
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
		width: (yc.checkTablet()) ? '20%' : '20%', 
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
		text: (yc.checkTablet()) ? 'Fairway' : 'F.H'
	})));

	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: (yc.checkTablet()) ? 'Greens' : 'G.I.R'
	})));
	
	var FairwaySelector = require('/common/fairwaySelector');
	var GirSelector = require('/common/girSelector');
	var ParSelector = require('/common/parSelector');
	var ScoreSelector = require('/common/scoreSelector');
		
	// Populate the Hole by hole scorecard	
	var par, score, fairwayHit, greenHit;
	for (var i=0; i < 18; i++) {
		var hole = (i+1).toString();
		var zebra = (Math.ceil(i % 2) > 0) ? yc.style.colors.zebraColor : 'transparent';
		
		scoreRows[i] = Ti.UI.createView({
			width: '98%', height: Ti.UI.SIZE,
			layout: 'horizontal',
			backgroundColor: zebra				
		});
		
		scoreRows[i].add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
			text: hole
		})));
		
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
		
		parViews[i] = new ParSelector(par, {width: '20%'});
		scoreViews[i] = new ScoreSelector(score, {width: '20%'});
		fairwayViews[i] = new FairwaySelector(fairwayHit, {width: '19%'});
		greenViews[i] = new GirSelector(greenHit, {width: '20%'});
			
		scoreRows[i].add(parViews[i]);
		scoreRows[i].add(scoreViews[i]);
		scoreRows[i].add(fairwayViews[i]);
		scoreRows[i].add(greenViews[i]);
		
		view.add(scoreRows[i]);	
	}
	par = null;
	score = null;
	fairwayHit = null;
	greenHit = null;

	view.add(yc.ui.vSpacer(5));
	
	/**
	 * GetView - returns the view
	 * Required because we call custom functions
	 */
	this.getView = function() {
		return view;
	};
	
	/**
	 * GetScores - returns the full table of scores
	 * @return {Array} of Score objects
	 */
	this.getScores = function() {
		var scoreinfo = [];
		
		for (var i=0; i < 18; i++) {
			scoreinfo.push({
				roundId: roundid,
				hole: i+1,
				par: parViews[i].getTitle(),
				score: scoreViews[i].getTitle(),
				fairway: fairwayViews[i].getTitle(),
				gir: greenViews[i].getTitle()
			});
		}
		
		return scoreinfo;
	};	
	
	/**
	 * GetTotalPar - provides the total par value
	 * @return {Integer} Par
	 */
	this.getTotalPar = function() {
		var totalPar = 0;
		var parValue;
		
		for (var i = 0; i < 18; i++) {
			parValue = parViews[i].getTitle();
			totalPar += (parValue === '-') ? 0 : parseInt(parValue);
		}
		
		return totalPar;
	};
	
	/**
	 * GetTotalScore - provides the total score
	 * @return {Integer} Score
	 */
	this.getTotalScore = function() {
		var totalScore = 0;
		var scoreValue;
		
		for (var i = 0; i < 18; i++) {
			scoreValue = scoreViews[i].getTitle();
			totalScore += (scoreValue === '-') ? 0 : parseInt(scoreValue);
		}
		
		return totalScore;
	};	
	
	/**
	 * GetFairwayPercent - provides the percentage of fairways hit (as decimal)
	 * @return {Real} Fairways hit Percent
	 */
	this.getFairwayPercent = function() {
		var totalFairways = 0;
		var fairwaysHit = 0;
		var fairwayValue;
		
		for (var i = 0; i < 18; i++) {
			fairwayValue = fairwayViews[i].getTitle();
			
			if (fairwayValue === 'Yes' || fairwayValue === 'No') {
				totalFairways++;
			}
			
			if (fairwayValue === 'Yes') {
				fairwaysHit++;
			}
		}
		
		return (fairwaysHit/totalFairways).toFixed(2);
	};	

	/**
	 * GetGreenPercent - provides the percentage of greens returned (as decimal)
	 * @return {Real} Greens Hit Percent
	 */
	this.getGreenPercent = function() {
		var totalFairways = 0;
		var fairwaysHit = 0;
		var fairwayValue;
		
		for (var i = 0; i < 18; i++) {
			fairwayValue = greenViews[i].getTitle();
			
			if (fairwayValue === 'Yes' || fairwayValue === 'No') {
				totalFairways++;
			}
			
			if (fairwayValue === 'Yes') {
				fairwaysHit++;
			}
		}
		
		return (fairwaysHit/totalFairways).toFixed(2);
	};	
	
	/**
	 * Save - Writes the table values back to the database
	 */
	this.save = function() {
		var update = this.getScores();
		yc.db.rounds.saveRoundScores(update);
	};	
};

module.exports = ScoreTable;
