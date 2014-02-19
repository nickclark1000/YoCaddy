
/**
 * SettingsOption simulates an object of SettingsOption 
 */
var OptionView = function(_args) {
	// Private instance Variables
	var oOptions = [];
	var oSelected = _args.selected;	
	var oDesc = _args.desc;
	var oParent = _args.parent;
	
	for (var i=0; i < _args.options.length; i++) {
		oOptions.push(_args.options[i]);
	}
	
	var oLen = oOptions.length;
	
	// Private View
	var optionView = Ti.UI.createView({
		top: _args.top, bottom: _args.bottom,
		width: '95%', height: _args.height,
		options: oOptions,
		selected: oSelected
	});
	// Private Name
	var optionName = Ti.UI.createLabel({
		touchEnabled: false,
		left: '5dp', width: '60%',
		text:  oDesc,
		color: '#000',
		font: {
			fontSize: '16dp',
			fontFamily: yc.style.fonts.optionFont
		}		
	});
	
	// Private Value
	var optionValue = Ti.UI.createLabel({
		touchEnabled: false,
		right: '0dp',
		width: '40%', height: '75%',
		borderWidth: '1dp',
		borderRadius: 5,
		color: '#000',
		text:  oOptions[oSelected].text,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		borderColor: yc.style.colors.lowlightColor,
		backgroundColor: yc.style.colors.white,
		font: {
			fontSize: '14dp',
			fontFamily: yc.style.fonts.buttonFont
		}			
	});
	
	optionView.add(optionName);
	optionView.add(optionValue);

	// Private Methods
	//////////////////////////////////////////////////////////////////////////
	var setSelected = function() {
		optionValue.setText(oOptions[oSelected].text);
	};

	// Event handler for when the View is clicked, will rotate through options
	var rotateOption = function(e) {
		oSelected++;		
		oSelected = (oSelected == oLen) ? 0 : oSelected;
		Ti.API.debug(oSelected + ' - ' + JSON.stringify(oOptions[oSelected]));
		setSelected();
	};
	
	optionView.addEventListener('click', rotateOption);
	
	// Public Instance Variables and Methods
	//////////////////////////////////////////////////////////////////////////
	
	// Public Instance Method - getSelectedValue
	this.getSelectedValue = function() {
		for (var i=0, j=oLen; i<j; i++) {
			if (i== oSelected) {
				return oOptions[i].value;
			}
		} 
		
		return null;	
	};	
	
	// Public Instance Method - getSelectedIndex
	this.getSelectedIndex = function() {
		return  oSelected;
	};	
	
	// Public Instance Method - getView
	this.getView = function() { 
		return optionView;
	};
};

// Return the 'Object' definition
module.exports = OptionView;
