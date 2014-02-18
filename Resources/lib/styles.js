// Self calling function populates the yc namespace
(function(){
	yc.style = {};
	
	yc.style.colors = yc.combine(yc.settings.app.propvalues[yc.settings.app.propids.theme][yc.settings.app.selected[yc.settings.app.propids.theme]].value, {
		textColor:	'#000000',
		greyTextColor:	'#4B4B4B',		
		black: '#000000',
		white: '#FFFFFF',		
	});
		
	yc.style.fonts = {
		headerFont: yc.os({
			iphone: 'Playball Regular',
			android: 'Playball-Regular'
		}),
		buttonFont: yc.os({
			iphone: 'Exo2 SemiBoldItalic',
			android: 'Exo2-SemiBoldItalic'
		}),
		sectionFont: yc.os({
			iphone: 'Exo2 SemiBold',
			android: 'Exo2-SemiBold'
		}),
		infoFont: yc.os({
			iphone: 'Exo2 LightItalic',
			android: 'Exo2-LightItalic'
		}),
		optionFont: yc.os({
			iphone: 'Exo2 Italic',
			android: 'Exo2-Italic'
		}) 
	};
	
	yc.style.fontsize = {
		tinytext: 10,
		normaltext: 16,
		smalltext: 12,
		largetext:20,
		xlargetext:24,
		titletext: 32
	};
	
	var longerSide, shorterSide;
	if (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) {
		longerSide = Ti.Platform.displayCaps.platformWidth;
		shorterSide = Ti.Platform.displayCaps.platformHeight;
	} else {
		longerSide = Ti.Platform.displayCaps.platformHeight;
		shorterSide = Ti.Platform.displayCaps.platformWidth;	
	}
	
	yc.style.platform = {
		// Tablets are always horizontal and handhelds are always vertical
		// Grab the width and height accordingly
		// Do some funky math for handhelds, not sure why its needed but fixes the size issue
		width: yc.os({
			iphone: Ti.Platform.displayCaps.platformWidth,
			android: (yc.checkTablet()) ? yc.pixelstodp(longerSide) : yc.pixelstodp(shorterSide)
		}),
		height: yc.os({
			iphone: Ti.Platform.displayCaps.platformHeight,
			android: (yc.checkTablet()) ? yc.pixelstodp(shorterSide)/1.03 : yc.pixelstodp(longerSide)/1.035 
		})			
	};
		
	// create sub-namespace for view properties
	yc.style.properties = {

		// Common View/Window based Style Properties
		stretch: { top: 0, bottom: 0, left: 0, right: 0 },
		
		screensize: { 
			width: yc.style.platform.width, 
			height: yc.style.platform.height
		},
		
		Window: {
			backgroundColor: yc.style.colors.mainColor,
			backgroundImage: '/images/backgrounds/fairwaybg2.png',
			navBarHidden: true,
			softInputMode:(Ti.UI.Android) ? Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE : ''
		},
		
		// Common header properties
		header: {
			top: 0, left: 0,
			width: Ti.UI.FILL, height: 50,
			backgroundColor: yc.style.colors.mainColor,
			backgroundImage: '/images/buttonBackground.png'			
		},		
		hlabel: {
			color: yc.style.colors.white,
			font: {
				fontSize: 34,
				fontFamily: yc.style.fonts.headerFont
			}			
		},		
		
		// Common body properties
		bodyScrollView: {
			top: 50, bottom: 0,
			left: 0, right: 0,
			layout: 'vertical',
			backgroundColor: 'transparent',
			contentWidth: Ti.UI.FILL,
			contentHeight: 'auto',
			scrollType: 'vertical'		
		},
		
		bodyNoScrollView: {
			backgroundImage: '/images/backgrounds/modalBodyBg.png',
			top: 55, bottom: 5,
			left: 5, right: 5,	
			backgroundColor: 'transparent',
			borderWidth: 1,
			borderColor: '#E0E0E0',
			borderRadius: 5,				
		},
		
		bodyView: {
			top: 50, bottom: 0,
			left: 0, right: 0,
			backgroundColor: 'transparent'		
		},		
		
		bodyContent: {
			backgroundImage: '/images/backgrounds/modalBodyBg.png',
			top: 5,
			left: 5, right: 5,
			height: Ti.UI.SIZE,
			borderWidth: 1,
			borderColor: '#E0E0E0',
			borderRadius: 5,
			layout: 'vertical'
		},	
		
		bodyScrollContent: {
			top: 0, bottom: 0,
			left: 0, right: 0,
			contentWidth: Ti.UI.FILL,
			contentHeight: 'auto',
			scrollType: 'vertical',			
			layout: 'vertical'
		},			
		
		// Common footer properties
		footerView: {
			bottom: 0, left: 0,
			width: Ti.UI.FILL, height: 60,
			backgroundColor: 'transparent',			
		},
		
		// Common Modal Buttons
		// Modal buttons are displayed within the footer, width varies depending on number of buttons
		modalButton: {
			height: 40,
			color: yc.style.colors.white,
			borderRadius: 5,
			backgroundColor: yc.style.colors.highlightColor,
			backgroundSelectedColor: yc.style.colors.mainColor,
			backgroundImage: '/images/buttonBackground.png',
			font: {
				fontSize: yc.style.fontsize.normal,
				fontFamily: yc.style.fonts.buttonFont
			}
		},
		
		// Common Menu Buttons
		menubutton: {
			top: 0, bottom: 0,
			left: 0, right: 0,
			color: 'transparent',
			backgroundColor: 'transparent',
			backgroundImage: '/images/MenuItemBg.png',
			backgroundSelectedColor: yc.style.colors.lowlightColor		
		},
		
		menulabel: {
			color: '#5A5A5A',
			touchEnabled: false,
			font: {
				fontSize: 16,
				fontFamily: yc.style.fonts.optionFont
			}			
		},
		
		// Common Content Styles
		sectionTitle: {
			color: yc.style.colors.black,
			font: {
				fontSize: 18,
				fontFamily: yc.style.fonts.sectionFont
			}			
		},
		
		infoText: {
			color: yc.style.colors.greyTextColor,
			font: {
				fontSize: 14,
				fontFamily: yc.style.fonts.infoFont
			}			
		},
		
		textfield: {
			top: '10dp', width: '95%', height: 40,
			maxLength: 80,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType:Titanium.UI.RETURNKEY_DONE,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			enableReturnKey: true,
			color: '#000',
			backgroundColor: '#FFF',
			borderWidth: 1,
			borderRadius: 5,
			borderColor: yc.style.colors.lowlightColor,
			font: {
				fontSize: 16,
				fontFamily: yc.style.fonts.infoFont
			}	
		},
		
		textarea: {
			
		}
	};
})();

//global shortcut for UI properties, since these get used A LOT. polluting the global
//namespace, but for a good cause (saving keystrokes)
var $$ = yc.style.properties;
