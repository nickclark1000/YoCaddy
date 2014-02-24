
var ScoreSelector = function(startValue, style) {
	var scoreIdx = -1;
	var scoreValues = [1,2,3,4,5,6,7,8,9,10];

	var scoreButton = Ti.UI.createButton(yc.combine(style,{
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.infoFont
		},
		title: (startValue) ? startValue.toString(): '-'
	}));	
	
	scoreButton.addEventListener('click', function(e){
		if (scoreIdx === 9) { scoreIdx=0; }
		else { scoreIdx++; }
		scoreButton.setTitle(scoreValues[scoreIdx].toString());			
	});

	this.getView = function() {
		return scoreButton;
	};		
};

module.exports = ScoreSelector;