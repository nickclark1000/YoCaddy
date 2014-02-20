// Instantiate the Round Model

var RoundModel = function(_args) {
	// DB saved related data
	this.id = _args.id || undefined;
	this.course = _args.course;
	this.desc = _args.desc || '';
	this.lon = _args.lon || 0;
	this.lat = _args.lat || 0;
	this.fsid = _args.fsid || '';
	this.date = _args.date || yc.getCurrentDate('mm/dd/yyyy');
	this.trace = _args.trace || 0;
	this.score = _args.score || -99;
	this.createdPlatform = _args.createPlatform || 'mobile';
	this.createdId = _args.createId || -1;
	this.fairwayHit = _args.fairwayHit || -1;
	this.greenHit = _args.greenHit || -1;
	this.par = _args.par || 0;
	
	// Instance/GUI related data (not saved to DB)
	this.showTrace = _args.showTrace || this.trace;
};

module.exports = RoundModel;

/**
 * Example in syncing:
 *  
 */
