// Self calling function populates the yc namespace
(function(){
	yc.settings = {};
	yc.settings.app = {};
	yc.settings.sync = {};
	yc.settings.social = {};
	
	/// Setting Names and Descriptions by group
	yc.settings.app.propids = {
		distanceUnit: 0,
		autoshot: 1,
		gpsDistance: 2,
		theme: 3,
		scoredisplay: 4
	};
	
	yc.settings.app.propnames = [
		{ name: 'app.distanceunit', desc: 'Map Distance Units'},
		{ name: 'app.autoshot', desc: 'Auto Shot Timer'},
		{ name: 'app.gpsdistance', desc: 'GPS Min Distance'},
		{ name: 'app.theme', desc: 'Application Theme'},
		{ name: 'app.scoredisplay', desc: 'Score Display Format'}
	];
	
	yc.settings.sync.propids = {
		network: 0,
		datamaster: 1
	};
	
	yc.settings.sync.propnames = [
		{ name: 'sync.network', desc: 'Sync Network'},
		{ name: 'sync.datamaster', desc: 'Sync Data Master'}
	];	
	
	/// Setting values by group
	yc.settings.app.propvalues = [
		[
			{ text: 'Yards', value: 'yards' },
			{ text: 'Meters', value: 'meters' },
			{ text: 'Feet', value: 'feet' }
		],
		
		[
			{ text: 'Disabled', value: -1 },
			{ text: '15s', value: 15 },
			{ text: '30s', value: 30 },
			{ text: '45s', value: 45 },
			{ text: '60s', value: 60 },
			{ text: '120s', value: 120 }
		],
		
		[
			{ text: '5m', value: 5 },
			{ text: '10m', value: 10 },
			{ text: '20m', value: 20 }			
		],
		
		[
			{ text: 'Blue', value: {
				mainColor:	'#0000AA',
				highlightColor:	'#007FFF',
				lowlightColor: '#AAD4FF',
				zebraColor: '#D4D4FF'
			 }},
			{ text: 'Orange', value: {
				mainColor:	'#FF2B00',
				highlightColor:	'#FF7F00',
				lowlightColor: '#FFD47F',
				zebraColor: '#FFD4AA'
			 }},
			{ text: 'Black', value: {
				mainColor:	'#0F0F0F',
				highlightColor:	'#5A5A5A',
				lowlightColor: '#C3C3C3',
				zebraColor: '#E1E1E1'
			 }},
			{ text: 'Pink', value: {
				mainColor:	'#FF00D4',
				highlightColor:	'#FF55FF',
				lowlightColor: '#FFD4FF',
				zebraColor: '#FFD4FF'
			 }}			 				 	
		],
		[
			{ text: 'Score (Par)', value: 1 },
			{ text: '+/- (Par)', value: 2 },
			{ text: 'Score (+/-)', value: 3 }			
		],		
	];
	
	yc.settings.sync.propvalues = [
		[
			{ text: 'No Sync', value: 'off' },
			{ text: 'Wifi Only', value: 'wifi' },
			{ text: 'Network Only', value: 'network' },
			{ text: 'Both', value: 'both' }			
		],
		
		[
			{ text: 'Web', value: 'web' },
			{ text: 'Mobile', value: 'mobile' },
			{ text: 'Desktop', value: 'desktop' }				
		]
	];	
	
	/// Setting selected Values by group
	yc.settings.app.selected = [
		Ti.App.Properties.getInt(yc.settings.app.propnames[yc.settings.app.propids.distanceUnit].name, 0),
		Ti.App.Properties.getInt(yc.settings.app.propnames[yc.settings.app.propids.autoshot].name, 0),
		Ti.App.Properties.getInt(yc.settings.app.propnames[yc.settings.app.propids.gpsDistance].name, 0),
		Ti.App.Properties.getInt(yc.settings.app.propnames[yc.settings.app.propids.theme].name, 0),
		Ti.App.Properties.getInt(yc.settings.app.propnames[yc.settings.app.propids.scoredisplay].name, 0)
	];	
	
	yc.settings.sync.selected = [
		Ti.App.Properties.getInt(yc.settings.sync.propnames[yc.settings.sync.propids.network].name, 0),
		Ti.App.Properties.getInt(yc.settings.sync.propnames[yc.settings.sync.propids.datamaster].name, 0)
	];		
	
})();
