// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// create the main application window
	yc.ui.createNewsFeedView = function(_args) {
		
		var view = Ti.UI.createView($$.stretch);
		
		var header = new yc.ui.headerView({
			title: 'yoCaddy Home',
			leftbutton: {
				show: true,
				callback: function(){ yc.app.applicationWindow.fireEvent('addView', { viewIdx: yc.ui.viewids.settings }); },
				image: '/images/button_menu.png'
			}
		});

		view.add(header);
		
		// Body view creation
		var body = Ti.UI.createScrollView($$.bodyScrollView);	
				
		var content1 = Ti.UI.createView(yc.combine($$.bodyContent, { }));
		var content2 = Ti.UI.createView(yc.combine($$.bodyContent, { }));
		var content3 = Ti.UI.createView(yc.combine($$.bodyContent, { }));
		
		var label1 = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: 'This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content.',	
			top: 5, bottom: 5, left: 5, right: 5
		}));
		
		var label2 = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: 'This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content.',	
			top: 5, bottom: 5, left: 5, right: 5	
		}));
						
		var label3 = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: 'This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content. This is sample text for a content.',	
			top: 5, bottom: 5, left: 5, right: 5	
		}));
		
		content1.add(label1);
		content2.add(label2);
		content3.add(label3);
		
		body.add(content1);
		body.add(content2);
		body.add(content3);
		
		view.add(body);
		
		return view;
	};
})();
