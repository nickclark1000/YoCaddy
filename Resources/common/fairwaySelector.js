
var FairwaySelector = function(startVal, style) {
	var fhIdx = 0;
	var fhValues = ['-', 'Yes', 'No'];
	
	var fhButton = Ti.UI.createButton(yc.combine(style, {
		backgroundColor: 'transparent',
		borderWidth: 0,
		color:  yc.style.colors.greyTextColor,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.infoFont
		},
		title: (startVal) ? startVal : '-'
	}));	
	
	fhButton.addEventListener('click', function(e){
		if (fhIdx === 2) { fhIdx = 0; }
		else { fhIdx++; }
		fhButton.setTitle(fhValues[fhIdx]);			
	});	
	
	this.getView = function() {
		return fhButton;
	};	
};

module.exports = FairwaySelector;