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
})();
