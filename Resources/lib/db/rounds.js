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
				
		if (yc.replacedb === true) {
			db.execute('DROP TABLE IF EXISTS Rounds');
			Ti.API.debug('Dropping Tables');
		}				
				
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
		 					+ ' trace INTEGER,'
		 					+ ' score INTEGER,'
		 					+ ' createdPlatform TEXT,'
		 					+ ' createdId INTEGER,'
		 					+ ' fairwayHit REAL,'
		 					+ ' greenHit REAL'
		 					+ ')';
		 					
		 	// Execute the Create statements
		 	db.execute(createRoundsTable);	
		 	Ti.API.debug('Creating Table Rounds: '+createRoundsTable);	 
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
			str = 'UPDATE Rounds SET'
				+ ' course=?'
				+ ' desc=?'
				+ ' lon=?'
				+ ' lat=?'
				+ ' fsid=?'
				+ ' date=?'
				+ ' trace=?'
				+ ' score=?'
				+ ' createdPlatform=?'
				+ ' createdId=?'
				+ ' fairwayHit=?'
				+ ' greenHit=?'
			+ ' WHERE id=?';
			
			db.execute(str, _r.course, _r.desc, _r.lon, _r.lat, _r.fsid, _r.date, _r.trace, _r.score, _r.createdPlatform, _r.createdid, _r.fairwayHit, _r.greenHit, _r.id);			
		} else {		// Insert
			str = 'INSERT INTO Rounds (course, desc, lon, lat, fsid, date, trace, score, createdPlatform, createdId, fairwayHit, greenHit)'
			+ ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';	
			
			db.execute(str, _r.course, _r.desc, _r.lon, _r.lat, _r.fsid, _r.date, _r.trace, _r.score, _r.createdPlatform, _r.createdid, _r.fairwayHit, _r.greenHit);
		}
		
		Ti.API.debug(str);
		success = true;	
	} catch (err) {
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
		success = false;
	} finally {
		db.close();
		return success;
	}	
};

/**
 * listRounds is called to return a list of all the rounds in the database that 
 * are valid in relation to the where clause
 * @param {Object} where
 * @return {Rounds[]} rounds 
 */
Database.prototype.listRounds = function(where) {
	var str, resultSet;
	var success = [];
	var db = Ti.Database.open(this.dbname);
	var Round = require('/models/RoundModel');	
		
	try {
		str = 'SELECT * FROM Rounds';
		
		if (where) {
			str += ' WHERE ' + where;		
		}
		
		str += ' ORDER BY id DESC';
		
	 	resultSet = db.execute(str);		// Execute the Create statements
	 	Ti.API.debug(str);
	 	
	 	// Create array of Rounds
	 	while (resultSet.isValidRow()) {
	 		
	 		success.push(new Round({
	 			id: resultSet.fieldByName('id'),
				course: resultSet.fieldByName('course'),
				desc: resultSet.fieldByName('desc'),
				lon: resultSet.fieldByName('lon'),
				lat: resultSet.fieldByName('lat'),
				fsid: resultSet.fieldByName('fsid'),
				date: resultSet.fieldByName('date'),
				trace: resultSet.fieldByName('trace'),
				score: resultSet.fieldByName('score'),		
				createdPlatform: resultSet.fieldByName('createdPlatform'),
				createdId: resultSet.fieldByName('createdId'),
				fairwayHit: resultSet.fieldByName('fairwayHit'),
				greenHit: resultSet.fieldByName('greenHit') 			
	 		}));
	 		
	 		resultSet.next();
	 	}	 
	} catch (err) {		
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
	} finally {
	 	//Close the DB
	 	db.close();	
	 	return success;	 	
	}	
};

/**
 * listRounds is called to return a list of all the rounds in the database that 
 * are valid in relation to the where clause
 * @param {Object} where
 * @return {ListItemData} rounds - to be used specifically with ListViews
 */
Database.prototype.listDataItemRounds = function(where) {
	var str, resultSet;
	var success = [];
	var db = Ti.Database.open(this.dbname);
	var Round = require('/models/RoundModel');	
		
	try {
		str = 'SELECT id, course, desc, date, trace, score, fairwayHit, greenHit FROM Rounds';
		
		if (where) {
			str += ' WHERE ' + where;		
		}
		
	 	resultSet = db.execute(str);		// Execute the Create statements
	 	Ti.API.debug(str);
	 	
	 	// Create array of Rounds
	 	while (resultSet.isValidRow()) {	 		
	 		success.push({
				course: { text: resultSet.fieldByName('course') },
				desc: { text: resultSet.fieldByName('desc') },
				date: { text: 'Date: ' + resultSet.fieldByName('date') },
				trace: { image: '/images/istrace_'+resultSet.fieldByName('trace')+'.png' },
				score: { text: (resultSet.fieldByName('score') === -99) ? 'NA' : resultSet.fieldByName('score') },						
				fairwayHit: { text: 'FH: ' + (resultSet.fieldByName('fairwayHit') === -1) ? 'NA' : resultSet.fieldByName('fairwayHit')*100 + '%' },
				greenHit: { text: 'GIR: ' + (resultSet.fieldByName('greenHit') === -99) ? 'NA' : resultSet.fieldByName('greenHit')*100 + '%' },
				properties: {
					roundId: resultSet.fieldByName('id'),
					accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
	 		});
	 		
	 		resultSet.next();
	 	}	 
	} catch (err) {		
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
	} finally {
	 	//Close the DB
	 	db.close();	
	 	return success;	 	
	}	
};

/**
 * deleteRound takes an ID and removes it
 * @param {Integer} id 
 */
Database.prototype.deleteRound = function(id) {
	var str, success = null;
	var db = Ti.Database.open(this.dbname);
	
	try {
		str = 'DELETE FROM Rounds WHERE id=?';
		success = db.execute(str,id);
		Ti.API.debug(str);
	} catch (err) {
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
	} finally {
		db.close();
		return success;
	}
};
