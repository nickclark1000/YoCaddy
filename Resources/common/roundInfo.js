
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
	
	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.sectionTitle, {
		text: 'Course Information:'
	})));
	var courseText = Ti.UI.createLabel(yc.combine($$.labelfield,{
		text: 'Course Name: ' + courseName
	}));
	roundInfoView.add(courseText);

	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.labelfield,{
		text: 'Date Played: '+ courseDate
	})));
	
	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.labelfield,{
		text: 'Foursquare ID: '+ courseFSId
	})));

	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.labelfield,{
		text: 'Longitude: '+ courseLon
	})));
	
	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.labelfield,{
		text: 'Latitude: '+ courseLat
	})));
	
	/// Course Description	
	roundInfoView.add(Ti.UI.createLabel(yc.combine($$.sectionTitle, {
		text: 'Round Description:'
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
		text: 'Score Overview:'
	})));
		
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