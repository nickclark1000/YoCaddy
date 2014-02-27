var ParSelector = function(startValue, style) {
	var parIdx = -1;
	var parValues = [3,4,5];
	
	var parButton = Ti.UI.createButton(yc.combine(style,{
		backgroundColor: 'transparent',
		borderWidth: 0,
		color: 'black',
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.infoFont
		},
		title: (startValue) ? startValue.toString(): '-'
	}));	
	
	parButton.addEventListener('click', function(e){
		if (parIdx === 2) { parIdx=0; }
		else { parIdx++; }
		parButton.setTitle(parValues[parIdx].toString());		
	});	

	return parButton;
};

module.exports = ParSelector;