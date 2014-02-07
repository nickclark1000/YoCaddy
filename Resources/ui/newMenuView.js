		// Create the app menu
		var menuHolder = Ti.UI.createView($$.stretch);
		var menuList = Ti.UI.createView({
			top: '50dp', right: '5dp',
			width: '160dp', height: Ti.UI.SIZE,
			layout: 'vertical',
			backgroundColor: yc.style.theme.lowlightColor
		});
		
		var profileButton = Ti.UI.createButton(yc.combine($$.menuButton, { title: 'Profile' }));
		var clubListButton = Ti.UI.createButton(yc.combine($$.menuButton, { title: 'Club List' }));
		var socialButton = Ti.UI.createButton(yc.combine($$.menuButton, { title: 'Social' }));		
		var settingsButton = Ti.UI.createButton(yc.combine($$.menuButton, { title: 'Settings' }));		
		var helpButton = Ti.UI.createButton(yc.combine($$.menuButton, { title: 'Help' }));
		
		menuList.add(profileButton);
		menuList.add(clubListButton);
		menuList.add(socialButton);
		menuList.add(settingsButton);
		menuList.add(helpButton);
		menuHolder.add(menuList);
		
		// Internal function to toggle menu list
		var menuShown = false;
		function toggleMenuList(e) {
			if (menuShown) {
				menuShown = false;
				appWin.remove(menuHolder);
			} else {
				menuShown = true;
				appWin.add(menuHolder);
			}
			
			switch (e.source.title) {
				case 'Profile':

					break;
				case 'Club List':

					break;
				case 'Social':

					break;
				case 'Settings':
					var settings = yc.ui.createSettingsWindow();
					settings.open();
					break;
				case 'Help':

					break;																				
			}			
		};
		
		// Event listeners specifc to the menu list
		appWinButton.addEventListener('click', toggleMenuList);
		menuHolder.addEventListener('click', toggleMenuList);
		