
// appMenuItemView creates menu items to be placed in the menu list
// Parameters for menu items include:
// @size - large or small in height
// @image - image to be displayed to the left of the text
// @text - text to be displayed
// @callback - function to be called when pressed

var appMainMenuView = function(_args) {
	var image = _args.image || undefined;
	var text = _args.text || undefined;
	var cb = _args.callback || undefined;
	var margin = 5;
	
	var view = Ti.UI.createView({
		width: Ti.UI.FILL, height: 40,
	});
	
	var button = Ti.UI.createButton($$.menubutton);
	button.addEventListener('click', cb);
	view.add(button);
	
	// Add the image if one was provided
	if (image) {
		var iv = Ti.UI.createImageView({
			touchEnabled: false,
			left: margin, height: 25, width: 25,
			image: image, touchEnabled: false
		});
		
		view.add(iv);
		margin = 40;
	}
	
	// Add the text (which should be provided)
	if (text) {
		var l = Ti.UI.createLabel(yc.combine($$.menulabel, {
			text: text,
			left: margin
		}));
		view.add(l);
	}

	return view;
};

module.exports = appMainMenuView;
