// Instantiate the Round Model

var RoundModel = function(_args) {
	this.id = undefined;
	this.course = _args.course;
	this.desc = _args.desc;
	this.lon = _args.lon;
	this.lat = _args.lat;
	this.fsid = _args.fsid;
	this.date = _args.date;
};

module.exports = RoundModel;
