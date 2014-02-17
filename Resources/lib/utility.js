// Update yc namespace with utility functions
(function() {
	
	//Extend an object with the properties from another
	//(thanks Dojo - http://docs.dojocampus.org/dojo/mixin)
	function mixin(/*Object*/ target, /*Object*/ source){
		var name, s, i;
		for(name in source){
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in yc.empty) || yc.empty[name] !== s))){
				target[name] = s;
			}
		}
		return target; // Object
	};
	
	yc.mixin = function(/*Object*/ obj, /*Object...*/ props){
		if(!obj){ obj = {}; }
			for(var i=1, l=arguments.length; i<l; i++){
				mixin(obj, arguments[i]);
			}
		return obj; // Object
	};
	
	//create a new object, combining the properties of the passed objects with the last arguments having
	//priority over the first ones
	yc.combine = function(/*Object*/ obj, /*Object...*/ props) {
		var newObj = {};
		for(var i=0, l=arguments.length; i<l; i++){
			mixin(newObj, arguments[i]);
		}
		return newObj;
	};
	
	//OS, Locale, and Density specific branching helpers adapted from the Helium library
	//for Titanium: http://github.com/kwhinnery/Helium
	var locale = Ti.Platform.locale;
	var osname = Ti.Platform.osname;
	
	// Branching based on OS
	yc.os = function(/*Object*/ map) {
	    var def = map.def||null; //default function or value
	    if (map[osname]) {
	        if (typeof map[osname] == 'function') { return map[osname](); }
	        else { return map[osname]; }
	    }
	    else {
	        if (typeof def == 'function') { return def(); }
	        else { return def; }
	    }
	};
	
	// Banching based on Locale
	yc.locale = function(/*Object*/ map) {
		var def = map.def||null; //default function or value
		if (map[locale]) {
			if (typeof map[locale] == 'function') { return map[locale](); }
			else { return map[locale]; }
		} else {
			if (typeof def == 'function') { return def(); }
			else { return def; }
		}
	};
	
	// Converting DP to Pixels for the platform
	yc.pixelstodp = function(ThePixels) {
		var dpi = Ti.Platform.displayCaps.dpi;

	    if (dpi > 160)
	        return (ThePixels / (dpi / 160));
	    else 
	        return ThePixels;
	};
	
	// Converting Pixels to DP
	yc.dptopixels = function(TheDPUnits) {
	    if ( Titanium.Platform.displayCaps.dpi > 160 )
	          return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
	    else 
	        return TheDPUnits;
	};
		
	// Getting the current date
	yc.getCurrentDate = function(format) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		
		var yyyy = today.getFullYear();
		if(dd<10){ dd='0'+dd; } 
		if(mm<10){ mm='0'+mm; } 
		
		if (format == 'yyyymmdd') {
			today = yyyy +''+ mm +''+ dd;	
		} else if (format == 'mm/dd/yyyy') {
			today = mm+'/'+dd+'/'+yyyy;
		} else if (format == 'yyyy/mm/dd') {
			today = yyyy+'/'+mm+'/'+dd;
		}
		
		return today;	
	};	
	
	// Get whether this is a tablet
  	yc.checkTablet = function() {
    	var platform = Ti.Platform.osname;

    	switch (platform) {
      		case 'ipad':
    			return true;
  			case 'android':
        		var psc = Ti.Platform.Android.physicalSizeCategory;
        		var tiAndroid = Ti.Platform.Android;
        		return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
      		default:
        		return Math.min(
          			Ti.Platform.displayCaps.platformHeight,
          			Ti.Platform.displayCaps.platformWidth
        			) >= 400;
    	}		
  	};	
		
})();
