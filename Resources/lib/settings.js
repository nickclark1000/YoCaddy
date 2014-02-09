// Self calling function populates the yc namespace
(function(){
	yc.settings = {};
	
	yc.settings.settingNames = {
		distanceSettings: { name: 'distanceSetting', desc: 'Map Distance Units'},
		autoshotSettings: { name: 'autoshotSetting', desc: 'Auto Shot Timer'},
		gpsdistSettings: { name: 'gpsdistSetting', desc: 'GPS Min Distance'},
		syncnetSettings: { name: 'syncnetSetting', desc: 'Sync Network'},
		syncdataSettings: { name: 'syncdataSetting', desc: 'Sync Data Master'},
		themeSettings: { name: 'themeSetting', desc: 'Application Theme'}
	};
	
	yc.settings.settingOptions = {
		distanceSettings: [
			{ text: 'Yards', value: 'yards' },
			{ text: 'Meters', value: 'meters' },
			{ text: 'Feet', value: 'feet' }
		],
		
		autoshotSettings: [
			{ text: 'Disabled', value: -1 },
			{ text: '15s', value: 15 },
			{ text: '30s', value: 30 },
			{ text: '45s', value: 45 },
			{ text: '60s', value: 60 },
			{ text: '120s', value: 120 }
		],
		
		gpsdistSettings: [
			{ text: '5m', value: 5 },
			{ text: '10m', value: 10 },
			{ text: '20m', value: 20 }			
		],
		
		syncnetSettings: [
			{ text: 'No Sync', value: 'off' },
			{ text: 'Wifi Only', value: 'wifi' },
			{ text: 'Network Only', value: 'network' },
			{ text: 'Both', value: 'both' }			
		],
		
		syncdataSettings: [
			{ text: 'Web', value: 'web' },
			{ text: 'Mobile', value: 'mobile' },
			{ text: 'Desktop', value: 'desktop' }				
		],
		
		themeSettings: [
			{ text: 'Blue', value: {
				mainColor:	'#0000AA',
				highlightColor:	'#007FFF',
				lowlightColor: '#AAD4FF',
			 	}},
			{ text: 'Orange', value: {
				mainColor:	'#FF2B00',
				highlightColor:	'#FF7F00',
				lowlightColor: '#FFD47F',
			 	}},
			{ text: 'Black', value: {
				mainColor:	'#0F0F0F',
				highlightColor:	'#5A5A5A',
				lowlightColor: '#C3C3C3',
			 	}},
			{ text: 'Pink', value: {
				mainColor:	'#FF00D4',
				highlightColor:	'#FF55FF',
				lowlightColor: '#FFD4FF',
			 	}}			 				 	
		]
	};
	
	yc.settings.settingsSaved = {
		distanceSettings: Ti.App.Properties.getInt(yc.settings.settingNames.distanceSettings.name, 0),
		autoshotSettings: Ti.App.Properties.getInt(yc.settings.settingNames.autoshotSettings.name, 0),
		gpsdistSettings: Ti.App.Properties.getInt(yc.settings.settingNames.gpsdistSettings.name, 0),
		syncnetSettings: Ti.App.Properties.getInt(yc.settings.settingNames.syncnetSettings.name, 0),
		syncdataSettings: Ti.App.Properties.getInt(yc.settings.settingNames.syncdataSettings.name, 0),
		themeSettings: Ti.App.Properties.getInt(yc.settings.settingNames.themeSettings.name, 0)
	};
	
	yc.settings.refreshSettings = function(){
		yc.settings.settingsSaved.distanceSettings = Ti.App.Properties.getInt(yc.settings.settingNames.distanceSettings.name, 0);
		yc.settings.settingsSaved.autoshotSettings = Ti.App.Properties.getInt(yc.settings.settingNames.autoshotSettings.name, 0);
		yc.settings.settingsSaved.gpsdistSettings = Ti.App.Properties.getInt(yc.settings.settingNames.gpsdistSettings.name, 0);
		yc.settings.settingsSaved.syncnetSettings = Ti.App.Properties.getInt(yc.settings.settingNames.syncnetSettings.name, 0);
		yc.settings.settingsSaved.syncdataSettings = Ti.App.Properties.getInt(yc.settings.settingNames.syncdataSettings.name, 0);
		yc.settings.settingsSaved.themeSettings = Ti.App.Properties.getInt(yc.settings.settingNames.themeSettings.name, 0);		
	};	
})();
