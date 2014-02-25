
var RoundInfo = function(_args) {
	var round = yc.db.rounds.getRound(_args.roundId);
	
	/// Create the header view
	var roundInfoView = Ti.UI.createScrollView(yc.combine($$.bodyNoMarginContent,{
		width: Ti.UI.FILL, height: Ti.UI.SIZE,
		layout: 'vertical'
	}));
	
	/// Course Name and Foursquare information
	var courseFSId = (round.fsid === 'undefined') ? 'N/A' : round.fsid;
	var courseLon = (round.lon != 0) ? round.lon : 'N/A';
	var courseLat = (round.lat != 0) ? round.lat : 'N/A';
	var courseName = round.course;
	var courseDate = round.date;
	
	var LabelText = require('/common/labelTextField');
	
	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.sectionTitle, {
		text: 'Course Information'
	})));

	var course = new LabelText({
		width: '95%',
		text: 'Course:',
		value: round.course,
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(course);

	var date = new LabelText({
		width: '95%',
		text: 'Date:',
		value: round.date,
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(date);
	
	var fsid = new LabelText({
		width: '95%',
		text: 'FS Id:',
		value: courseFSId,
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(fsid);
	
	var lon = new LabelText({
		width: '95%',
		text: 'Lon:',
		value: courseLon,
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(lon);
	
	var lat = new LabelText({
		width: '95%',
		text: 'Lat:',
		value: courseLat,
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(lat);			
	
	/// Course Description	
	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.sectionTitle, {
		text: 'Round Details'
	})));
	var courseDescText = Ti.UI.createTextField(yc.combine($$.textfield,{
		value: round.desc,
		height: 80, 
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		maxLength: 200,
		horizontalWrap: true,
		enableReturnKey: false,
		suppressReturn:false,
		textAlign: 'left',
		lines: 3,
		horizontallyScrolling: false
	}));
	roundInfoView.add(courseDescText);
	
	// Score Overview Information
	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.sectionTitle, {
		text: 'Score Overview'
	})));
	
	var par = new LabelText({
		width: '95%',
		text: 'Par:',
		value: round.par,
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(par);	

	var score = new LabelText({
		width: '95%',
		text: 'Score:',
		value: round.score,
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(score);
	
	var fairway = new LabelText({
		width: '95%',
		text: 'Fairways:',
		value: (round.fairwayHit === -1) ? 'N/A' : (round.fairwayHit*100)+'%',
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(fairway);	
	
	var green = new LabelText({
		width: '95%',
		text: 'Greens:',
		value: (round.greenHit === -1) ? 'N/A' : (round.greenHit*100)+'%',
		labelFont: yc.style.fonts.infoFont,
		textFont: yc.style.fonts.optionFont
	});
	roundInfoView.add(green);				
	
	this.updateRound = function(_r){
		round = _r;
		
		// Update with provided round
		par.fireEvent('update', { text: round.par });
		score.fireEvent('update', { text: round.score });
		fairway.fireEvent('update', { text: (round.farwayHit === -1) ? 'N/A' : (round.fairwayHit*100)+'%' });
		green.fireEvent('update', { text: (round.greenHit === -1) ? 'N/A' : (round.greenHit*100)+'%' });
	};
		
	/**
	 * 
	 */
	this.getView = function() {
		return roundInfoView;
	};
	
	/**
	 * 
	 */
	this.getRound = function() {
		round.desc = courseDescText.getValue();
		return round;
	};	
};

module.exports = RoundInfo;