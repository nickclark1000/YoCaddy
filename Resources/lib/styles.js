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
			iphone: 'Playball Regular',
			android: 'Playball-Regular'
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
		tinytext: 12,
		smalltext: 14,
		normaltext: 16,
		largetext:18,
		xlargetext:20,
		sectiontext: 22,
		titletext: 30
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
			android: (yc.checkTablet()) ? yc.pixelstodp(shorterSide)/1.03 : yc.pixelstodp(longerSide)/1.034 
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
				fontSize: yc.style.fontsize.titletext,
				fontFamily: yc.style.fonts.sectionFont
			}			
		},		
		
		// Common body properties
		bodyScrollView: {
			backgroundImage: '/images/backgrounds/modalBodyBg.png',
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
			top: 50, bottom: 0,
			left: 0, right: 0		
		},		
		
		bodyNoScrollMarginView: {
			backgroundImage: '/images/backgrounds/modalBodyBg.png',
			top: 50, bottom: 0,
			left: 5, right: 5		
		},		

		bodyContent: {
			top: 5, bottom: 5,
			left: 5, right: 5,
			height: Ti.UI.SIZE,
			layout: 'vertical'
		},		
		
		bodyNoMarginContent: {
			top: 0, bottom: 0,
			left: 0, right: 0,
			height: Ti.UI.SIZE,
			layout: 'vertical',
			scrollType: 'vertical'
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
			borderColor: yc.style.colors.highlightColor,
			borderWidth: 1,
			backgroundColor: yc.style.colors.highlightColor,
			backgroundSelectedColor: yc.style.colors.mainColor,
			backgroundImage: '/images/buttonBackground.png',
			font: {
				fontSize: yc.style.fontsize.largetext,
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
				fontSize: yc.style.fontsize.xlargetext,
				fontFamily: yc.style.fonts.sectionFont
			}			
		},
		
		// Common Content Styles
		sectionTitle: {
			width: '98%', top: 5,
			color: yc.style.colors.black,
			font: {
				fontSize: yc.style.fontsize.sectiontext,
				fontFamily: yc.style.fonts.sectionFont
			}			
		},
		
		infoText: {
			color: yc.style.colors.greyTextColor,
			font: {
				fontSize: yc.style.fontsize.smalltext,
				fontFamily: yc.style.fonts.infoFont
			}			
		},
		
		mapErrorText: {
			width: '95%',
			color: yc.style.colors.black,
			font: {
				fontSize: yc.style.fontsize.xlargetext,
				fontFamily: yc.style.fonts.buttonFont
			}			
		},
		
		textfield: {
			top: 5, width: '95%', height: 40,
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
		
		labelfield: {
			top: 5, width: '95%', height: Ti.UI.SIZE,
			color: '#000',
			font: {
				fontSize: 16,
				fontFamily: yc.style.fonts.infoFont
			}				
		}
	};
})();

//global shortcut for UI properties, since these get used A LOT. polluting the global
//namespace, but for a good cause (saving keystrokes)
var $$ = yc.style.properties;
