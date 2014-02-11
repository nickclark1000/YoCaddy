/**
 * Database object creation 
 * @param {Object} _args
 */

var Database = function(_name) {
	this.dbname = _name;	
	databaseInit(this.dbname);
	
	/**
	 * Private Functions 
	 */	
	function databaseInit(_db) {
		var db = Ti.Database.open(_db);
		
		if (yc.osname === 'iphone') { db.file.setRemoteBackup(false); }
				
		try {
			// Create the table creation statements
			var createRoundsTable = 'CREATE TABLE IF NOT EXISTS Rounds'
		 					+ ' (id INTEGER PRIMARY KEY,'
		 					+ ' course TEXT NOT NULL,' 	 		
		 					+ ' desc TEXT,'
		 					+ ' lon REAL,'
		 					+ ' lat REAL,'
		 					+ ' fsid TEXT,'
		 					+ ' date TEXT NOT NULL,'
		 					+ ' createdPlatform TEXT,'
		 					+ ' createdId INTEGER'
		 					+ ')';
		 					
		 	// Execute the Create statements
		 	db.execute(createRoundsTable);		 
		} catch (err) {		
			Ti.API.error('Datbase Error: ' + JSON.stringify(err));
		} finally {
		 	//Close the DB
		 	db.close();		 	
		}
	}	
};

module.exports = Database;

/**
 * saveRound
 * @param {Object} _r
 */
Database.prototype.saveRound = function(/*Round Object*/ _r) {
	var str;
	var success;
	var db = Ti.Database.open(this.dbname);	
	
	try {

		if (_r.id) {	// Update
			str = "UPDATE Rounds SET";
				if (_r.course) str += " course='"+ _r.course+"'";
				if (_r.desc) str += " desc='"+ _r.desc+"'";
				if (_r.lon) str += " lon="+ _r.lon;
				if (_r.lat) str += " lat="+ _r.lat;
				if (_r.fsid) str += " fsid='"+ _r.fsid+"'";
				if (_r.date) str += " date='"+ _r.date+"'";
				if (_r.createPlatform) str += " createdPlatform='"+ _r.createdPlatform+"'";
				if (_r.createId) str += " createdId="+ _r.createdId;
			str += " WHERE id="+_r.id;
		} else {		// Insert
			str = "INSERT INTO Rounds (";
				if (_r.course) str += "course";
				if (_r.desc) str += ",desc";
				if (_r.lon) str += " ,lon";
				if (_r.lat) str += " ,lat";
				if (_r.fsid) str += ",fsid";
				if (_r.date) str += ",date";
				if (_r.createPlatform) str += ",createdPlatform";
				if (_r.createId) str += ",createdId";
			str += ") VALUES (";
				if (_r.course) str += "'"+_r.course+"'";
				if (_r.desc) str += ",'"+ _r.desc+"'";
				if (_r.lon) str += ","+ _r.lon;
				if (_r.lat) str += ","+ _r.lat;
				if (_r.fsid) str += ",'"+ _r.fsid+"'";
				if (_r.date) str += ",'"+ _r.date+"'";
				if (_r.createPlatform) str += ",'"+ _r.createdPlatform+"'";
				if (_r.createId) str += ","+ _r.createdId;			
			str += ")";	
		}
		
		Ti.API.debug('Execute: ' + str);
		db.execute(str);
		success = true;	
	} catch (err) {
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
		success = false;
	} finally {
		db.close();
		return success;
	}	
};
