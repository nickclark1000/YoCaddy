// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	var createRoundRow = function(round) {
		var row = Ti.UI.createView({
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		
		var courselabel = Ti.UI.createLabel({
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			text: round.course,
			font: {
				fontSize: yc.style.fontsize.normaltext,
				fontFamily: yc.style.fonts.buttonFont
			}
		});
		
		var descrlabel = Ti.UI.createLabel({
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			text: round.course,
			font: {
				fontSize: yc.style.fontsize.smalltext,
				fontFamily: yc.style.fonts.optionFont
			}
		});
		
		var datelabel = Ti.UI.createLabel({
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			text: round.course,
			font: {
				fontSize: yc.style.fontsize.smalltext,
				fontFamily: yc.style.fonts.optionFont
			}
		});
		
		row.add(courselabel);
		row.add(desclabel);
		row.add(datelabel);
		
		var iconview = Ti.UI.createView({
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'horizontal'			
		});
		
		if (course.trace) {
			iconview.add(Ti.UI.createImageView({
				image: '/images/annotations/walkinganno-N.png',
				width: 30, height: 30
			}));
		}
		
		if (course.trace) {
			iconview.add(Ti.UI.createImageView({
				image: '/images/annotations/walkinganno-N.png',
				width: 30, height: 30
			}));
		}		
		
		return row;
	};
	
	// create the main application window
	yc.ui.createListRoundsView = function(_args) {
		
		// Create the layout view elements
		var view = Ti.UI.createView($$.stretch);
		
		var header = new yc.ui.headerView({
			title: 'Saved Rounds',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			}
		});
		view.add(header);
		
		var body = Ti.UI.createView(yc.combine($$.bodyNoScrollView,{
			backgroundImage: '/images/backgrounds/modalBodyBg.png',
			borderWidth: 1,
			borderColor: '#E0E0E0',
			borderRadius: 5,			
		}));		
	
		var scrollList = Ti.UI.createScrollableView(yc.combine($$.stretch, {
			showPagingControl: true
		}));
		
		body.add(scrollList);
		view.add(body);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////
		
		var roundsList = yc.db.listRounds();
		Ti.API.debug(JSON.stringify(roundsList));
		
		var pages = Math.ceil(roundsList.length / 10);
		var pageViews = [];
		
		for (var p=0; p < pages; p++) {
			var pagestart = p * 10;
			
			var newView = Ti.UI.createScrollView(yc.combine($$.stretch, {
				contentWidth: Ti.UI.FILL,
				contentHeight: 'auto',
				scrollType: 'vertical'
			}));
			
			for (var j=pagestart; j < pagestart+10; j++) {
				newView.add(createRoundRow(roundsList[j]));
			}
			
			pageViews.push(newView);
		}
		
		scrollList.setViews(pageViews);
		
		return view;
	};
	
})();
