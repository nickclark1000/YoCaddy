// Instantiate the Round Model

var RoundModel = function(_args) {
	// Round Specific Details
	this.id = _args.id || undefined;
	this.course = _args.course;
	this.desc = _args.desc || '';
	this.lon = _args.lon || 0;
	this.lat = _args.lat || 0;
	this.fsid = _args.fsid || '';
	this.date = _args.date || yc.getCurrentDate('mm/dd/yyyy');
	this.trace = _args.trace || false;
	this.score = _args.score || -99;
	
	// Creation / sync related details
	// When syncs happen, we need to determine if the platform is 'web' or 'mobile'
	// then do the appropriate work to sync them
	this.createdPlatform = _args.createPlatform || 'mobile';
	this.createdId = _args.createId || -1;
};

module.exports = RoundModel;

/**
 * Example in syncing:
 *  
 */
