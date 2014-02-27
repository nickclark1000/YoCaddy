
/**
 * LabelTextField is used to create a Label/TextField combination 
 * @param {Object} _args
 */
var LabelTextField = function(_args) {
	var view = Ti.UI.createView(yc.combine({},{
		width: _args.width || Ti.UI.FILL, height: Ti.UI.SIZE,
	}));
	
	var labelstyle = {
		left: 0, width: '30%', height: Ti.UI.SIZE,
		color: yc.style.colors.greyTextColor,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: _args.labelFont
		} 		
	};
	
	var label = Ti.UI.createLabel(yc.combine(labelstyle,{
		text: _args.text
	}));
	
	var noneditstyle = {
		editable: false,
		color: yc.style.colors.black,
		right: 0, width: '68%', height: Ti.UI.SIZE,
		borderWidth: 0,
		backgroundColor: 'transparent',
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: _args.textFont
		} 		
	};
	
	var editstyle = {
		editable: true,
		color: yc.style.colors.black,		
		right: 0, width: '80%', height: Ti.UI.SIZE,
		borderWidth: 0,
		backgroundColor: yc.style.colors.white,
		font: {
			fontSize: yc.style.fontsize.normaltext,
			fontFamily: _args.textFont	
		}
	}; 		
	
	var text = Ti.UI.createTextField(yc.combine(noneditstyle,{
		value: _args.value
	}));
	
	view.add(label);
	view.add(text);
	
	view.addEventListener('editable', function(e){
		text.applyProperties(editstyle);
	});
	
	view.addEventListener('noneditable', function(e){
		text.applyProperties(noneditstyle);
	});	
	
	view.addEventListener('update', function(e){
		text.setValue(e.text);
	});
	
	return view;
};

module.exports = LabelTextField;
