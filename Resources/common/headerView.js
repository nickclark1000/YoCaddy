// Build the yc.ui.createHeaderView function
// Param @Object includes /*String*/ title, /*Object*/ leftbutton { show, callback }

function headerView(_args) {
	var header = Ti.UI.createView($$.header);
	var margin = 5;
	
	var rightbutton = _args.rightbutton || {};
	var leftbutton = _args.leftbutton || {};		
	
	if (leftbutton.callback && leftbutton.show === true) {
		if (_args.leftbutton.image === undefined) {
			_args.leftbutton.image = '/images/button_back.png';
		}
		
		var hbutton = Ti.UI.createButton({
			left: margin,
			width: 32, height: 32,
			backgroundImage: _args.leftbutton.image,
			backgroundColor: 'transparent',
			backgroundSelectedColor: yc.style.colors.highlightColor,
			borderRadius: 5
		});
		
		hbutton.addEventListener('click', _args.leftbutton.callback);
		
		header.add(hbutton);
	}		
	
	var hlabel = Ti.UI.createLabel(yc.combine($$.hlabel, {
		text: _args.title
	}));
	
	header.add(hlabel);
	
	for(var i=0; i<rightbutton.length; i++) {
		if (rightbutton[i].callback && rightbutton[i].show === true) {
			var hrbutton = Ti.UI.createButton({
				right: margin,
				width: 30, height: 30,
				backgroundColor: 'transparent',
				backgroundSelectedColor: yc.style.colors.highlightColor,
				backgroundImage: rightbutton[i].image,
				borderRadius: 5
			});
			
			hrbutton.addEventListener('click', rightbutton[i].callback);
			header.add(hrbutton);
		}
		
		margin += 30;
	}

	return header;
}

module.exports = headerView;
