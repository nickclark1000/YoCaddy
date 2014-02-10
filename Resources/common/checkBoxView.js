/**
 * Checkbox view used for options with only two options 
 */

var checkBox = function(_args) {
	
	// Private Arguments
	var _args = arguments[0] || {};
	var viewText = _args.text || '';
	var viewTop = _args.top || null;
	var viewBottom = _args.bottom || null;
	var viewRight = _args.right || null;
	var viewLeft = _args.left || null;
	var viewWidth = _args.width || '95%';
	var viewHeight = _args.height || '100%';
	
	
	// Font options
	var viewFontSize = 20;	
	var viewFontFamily = yc.style.fonts.optionFont;	
		
	// Public functions	
	this.checked = _args.checked;
	var viewTitle = (this.checked === true) ? '\u2713' : '';
		
	// Private functions
	var clicked = function(){
		if (viewTitle === '') {
			viewTitle = '\u2713';
			this.checked = true;
		} else {
			viewTitle = '';
			this.checked = false;
		}
		
		checkboxButton.setTitle(viewTitle);
	};
	
	//////////////////////////// View Creation /////////////////////////////////
	var checkbox = Ti.UI.createView({
		top: viewTop, bottom: viewBottom,
		left: viewLeft, right: viewRight,
		width: viewWidth, height: viewHeight		
	});
	
	var checkboxLabel = Ti.UI.createLabel({
		left: '5dp', width: '80%',
		text: viewText,
		color: '#000',
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.buttonFont
		}			
	});
	
	var checkboxButton = Ti.UI.createButton({
		right: '0dp',
		width: '50dp', 
		height: '100%',
		title: viewTitle,
		borderWidth: '1dp',
		borderRadius: 5,
		borderColor: yc.style.colors.lowlightColor,
		color: '#000',
		backgroundColor: 'white',
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: yc.style.fonts.buttonFont
		}			
	});
	
	checkbox.addEventListener('click', clicked);
	checkbox.add(checkboxLabel);
	checkbox.add(checkboxButton);
	
	this.view = checkbox;
};

checkBox.prototype.isChecked = function() {
	return this.checked;	
};

checkBox.prototype.getView = function() {
	return this.view;
};

module.exports = checkBox;
