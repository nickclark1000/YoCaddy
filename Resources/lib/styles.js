// Self calling function populates the yc namespace
(function(){
	yc.style = {};
	
	yc.style.colors = yc.combine({	
		// Will be replaced by properties later
		mainColor:	'#0000AA',
		highlightColor:	'#007FFF',
		lowlightColor: '#AAD4FF',
		}, {
		textColor:	'#000000',
		greyTextColor:	'#888888',		
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
		normaltext: 16,
		smalltext: 12,
		largetext:20,
		titletext: 32
	};
	
	yc.style.platform = {
		//grab platform dimensions only once to save a trip over the bridge
		width: yc.os({
			iphone: Ti.Platform.displayCaps.platformWidth,
			android:yc.pixelstodp(Ti.Platform.displayCaps.platformWidth)
		}),
		height: yc.os({
			iphone: Ti.Platform.displayCaps.platformHeight,
			android: yc.pixelstodp(Ti.Platform.displayCaps.platformHeight)/1.044
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
			width: yc.style.platform.width, height: 50,
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
			top: 55, bottom: 5,
			left: 5, right: 5,	
			backgroundColor: 'transparent'		
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
			//borderColor: yc.style.colors.lowlightColor,
			borderColor: '#E0E0E0',
			borderRadius: 10,
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
