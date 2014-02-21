/**
 * ScoreTable creates a table view for a rounds scores 
 * @param {Object} _args {props: Main View properties, RoundId}
 */

var ParSelector = function() {
	var parIdx = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	var parValues = [3,4,5];
	
};

var ScoreSelector = function() {
	var scoreIdx = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	var scoreValues = [1,2,3,4,5,6,7,8,9,10];
		
};

var FairwaySelector = function() {
	var fhIdx = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	var fhValues = ['No', 'Yes'];
	
};

var GirSelector = function() {
	var girIdx = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	var girValues = ['No', 'Yes'];
	
};

var ScoreTable = function(_args) {
	var scores = yc.db.rounds.getRoundScores(_args.roundId);
	var scoreRows = [];
	
	///// specific styles for this module
	var titleRowStyle = {
		width: '20%', height: 50,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_CENTER,
		color: yc.style.colors.black,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.optionFont
		}	
	};
	
	var scoreRowStyle = {
		width: '20%', height: 50,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_CENTER,
		color: yc.style.colors.greyTextColor,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.infoFont
		}				
	};
	
	var labelStyle = {
		width: '95%', bottom: 5,
		color: yc.style.colors.black,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.optionFont
		}	
	};
	
	
	// Create the main view
	var view = Ti.UI.createScrollView(yc.combine(_args.props, {
		layout: 'vertical'
	}));
	
	/// Create the header view
	var roundInfoView = Ti.UI.createView({
		top: 10, left: 0,
		width: '95%', height: Ti.UI.SIZE,
		layout: 'vertical'
	});
	view.add(roundInfoView);
	
	roundInfoView.add(Ti.UI.createLabel(yc.combine(labelStyle, {text: 'Course Name:'})));
	var courseText = Ti.UI.createTextField(yc.combine($$.textfield,{
		text: yc.app.editviewRound.course
	}));
	roundInfoView.add(courseText);
	
	roundInfoView.add(Ti.UI.createLabel(yc.combine(labelStyle, {text: 'Course Description:'})));
	var courseDescText = Ti.UI.createTextField(yc.combine($$.textfield,{
		text: yc.app.editviewRound.desc,
		height: 80, 
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		maxLength: 200,
		horizontalWrap: true,
		enableReturnKey: true,
		suppressReturn:false,
		textAlign: 'left'
	}));
	roundInfoView.add(courseDescText);
	
	
		
	////// Create the Header Table
	////// Table header has the Column headings as text
	var titleRow = Ti.UI.createView({
		width: '98%', height: 50,
		layout: 'horizontal'		
	});
	view.add(titleRow);
	view.add(new yc.ui.separator());

	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: 'Hole #'
	})));
	
	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: 'Par'
	})));
	
	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: 'Score'
	})));
	
	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: 'Fairway'
	})));

	titleRow.add(Ti.UI.createLabel(yc.combine(titleRowStyle, {
		text: 'GIR'
	})));
	
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
		
		scoreRows[i].add(Ti.UI.createTextField(yc.combine(scoreRowStyle, {
			value: '5'
		})));
		
		scoreRows[i].add(Ti.UI.createTextField(yc.combine(scoreRowStyle, {
			value: '5'
		})));
		
		scoreRows[i].add(Ti.UI.createTextField(yc.combine(scoreRowStyle, {
			value: 'No'
		})));
	
		scoreRows[i].add(Ti.UI.createTextField(yc.combine(scoreRowStyle, {
			value: 'YES'
		})));
		
		view.add(scoreRows[i]);		
	}
	
	////// End of Table Header
	
	return view;
};

/**
 * getRoundScores will return the list of rounds scores from the table 
 */
ScoreTable.prototype.getRoundScores = function() {
	
};

module.exports = ScoreTable;
