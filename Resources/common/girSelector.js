/**
 * GirSelector should eventually be moved to a Module 
 */
var GirSelector = function(startVal, style) {
	var girIdx = -1;
	var girValues = ['Yes', 'No'];
	
	var girButton = Ti.UI.createButton(yc.combine(style, {
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderRadius: 5,
		color: yc.style.colors.greyTextColor,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.infoFont
		},
		title: (startVal) ? startVal : '-'
	}));	
	
	girButton.addEventListener('click', function(e){
		if (girIdx === 1) { girIdx = 0; }
		else { girIdx++; }
		girButton.setTitle(girValues[girIdx]);			
	});	
	
	return girButton;
};

module.exports = GirSelector;