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
			db.execute('DROP TABLE IF EXISTS Scores');
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
		 					+ ' par INTEGER,'
		 					+ ' createdPlatform TEXT,'
		 					+ ' createdId INTEGER,'
		 					+ ' fairwayHit REAL,'
		 					+ ' greenHit REAL'
		 					+ ')';
		 					
			var createScoresTable = 'CREATE TABLE IF NOT EXISTS Scores'
		 					+ ' (id INTEGER PRIMARY KEY,'
		 					+ ' roundId INTEGER NOT NULL,' 	 		
		 					+ ' holeNumber INTEGER NOT NULL,'
		 					+ ' par INTEGER,'
		 					+ ' score INTEGER,'
		 					+ ' fairway TEXT,'
		 					+ ' gir TEXT'
		 					+ ')';		 					
		 					
		 	// Execute the Create statements
		 	db.execute(createRoundsTable);
		 	db.execute(createScoresTable);		
		 	Ti.API.debug('Creating Table Rounds: '+createRoundsTable);
		 	Ti.API.debug('Creating Table Scores: '+createScoresTable);	 
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
	var success = _r;
	var db = Ti.Database.open(this.dbname);	
	
	try {

		if (_r.id) {	// Update
			Ti.API.debug('Updating Round: '+ JSON.stringify(_r));
			str = 'UPDATE Rounds SET'
				+ ' course=?,'
				+ ' desc=?,'
				+ ' lon=?,'
				+ ' lat=?,'
				+ ' fsid=?,'
				+ ' date=?,'
				+ ' trace=?,'
				+ ' score=?,'
				+ ' par=?,'
				+ ' createdPlatform=?,'
				+ ' createdId=?,'
				+ ' fairwayHit=?,'
				+ ' greenHit=?'
			+ ' WHERE id=?';
			
			db.execute(str, _r.course, _r.desc, _r.lon, _r.lat, _r.fsid, _r.date, _r.trace, _r.score, _r.par, _r.createdPlatform, _r.createdid, _r.fairwayHit, _r.greenHit, _r.id);			
		} else {		// Insert
			Ti.API.debug('Inserting Round: '+ JSON.stringify(_r));
			str = 'INSERT INTO Rounds (course, desc, lon, lat, fsid, date, trace, score, par, createdPlatform, createdId, fairwayHit, greenHit)'
			+ ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';	
			
			db.execute(str, _r.course, _r.desc, _r.lon, _r.lat, _r.fsid, _r.date, _r.trace, _r.score, _r.par, _r.createdPlatform, _r.createdid, _r.fairwayHit, _r.greenHit);
			success.id = db.lastInsertRowId;
		}
		
		Ti.API.debug(str);	
	} catch (err) {
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
		success = undefined;
	} finally {
		db.close();
		return success;
	}	
};

/**
 * getRound is called to get one specific round by id 
 * are valid in relation to the where clause
 * @param {Integer} where - round id
 * @return {Rounds} round
 */
Database.prototype.getRound = function(where) {
	var str, resultSet;
	var success = undefined;
	var db = Ti.Database.open(this.dbname);
	var Round = require('/models/RoundModel');	
	
	str = 'SELECT * FROM Rounds WHERE id=?';
	Ti.API.debug('GetRound:' + str + '('+where+')');
		
	try {
	 	resultSet = db.execute(str, where);		// Execute the Create statements
	 	
	 	// Create array of Rounds
	 	if (resultSet.isValidRow()) {
	 		
	 		success = new Round({
	 			id: resultSet.fieldByName('id'),
				course: resultSet.fieldByName('course'),
				desc: resultSet.fieldByName('desc'),
				lon: resultSet.fieldByName('lon'),
				lat: resultSet.fieldByName('lat'),
				fsid: resultSet.fieldByName('fsid'),
				date: resultSet.fieldByName('date'),
				trace: resultSet.fieldByName('trace'),
				score: resultSet.fieldByName('score'),	
				par: resultSet.fieldByName('par'),	
				createdPlatform: resultSet.fieldByName('createdPlatform'),
				createdId: resultSet.fieldByName('createdId'),
				fairwayHit: resultSet.fieldByName('fairwayHit'),
				greenHit: resultSet.fieldByName('greenHit') 			
	 		});
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
				par: resultSet.fieldByName('par'),	
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
		
		str = 'DELETE FROM Scores WHERE roundId=?';
		success = db.execute(str,id);
		Ti.API.debug(str);
	} catch (err) {
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
	} finally {
		db.close();
		return success;
	}
};

/**
 * saveRoundScores
 * @param {Integer} rId - round id
 * @param {Array} rScores - round scores
 */
Database.prototype.saveRoundScores = function(rScores) {
	var str;
	var success = false;
	
	if (!rScores || rScores.length < 18) {
		return success;
	}
	
	Ti.API.debug('rScores:'+JSON.stringify(rScores));
	var db = Ti.Database.open(this.dbname);
	
	try {
		// First delete all current round scores
		// Lazy but faster than updating all scores
		str = 'DELETE FROM Scores WHERE roundId=?';
		db.execute(str,rScores[0].roundId);
		
		// Create the transaction to install all the scores
		db.execute('BEGIN IMMEDIATE TRANSACTION');
		
		for (var s=0; s < rScores.length; s++) {
			Ti.API.debug('Insert Score: ' + JSON.stringify(rScores[s]));
			var par = (rScores[s].par === '-') ? 0 : rScores[s].par;
 			var score = (rScores[s].score === '-') ? 0 : rScores[s].score;
 			str = 'INSERT INTO Scores (roundId, holeNumber, par, score, fairway, gir) VALUES (?,?,?,?,?,?)';
			db.execute(str, rScores[s].roundId, rScores[s].hole, par, score, rScores[s].fairway, rScores[s].gir);
		}
		
		db.execute('COMMIT TRANSACTION');

		success = true;
	} catch (err) {
		db.execute('ROLLBACK');
		Ti.API.error('Datbase Error: ' + err);
	} finally {
		db.close();
		return success;
	}	
};

/**
 * getRoundScores returns an array of all the scores for a specific round
 * @param {Integer} roundId
 * @return {Array} roundScores
 */
Database.prototype.getRoundScores = function(rId) {
	var str, resultSet;
	var success = [];
	var db = Ti.Database.open(this.dbname);
	
	if (rId === undefined)
		return null;
	
	try {
		str = 'SELECT * FROM Scores WHERE roundId=?';		
	 	resultSet = db.execute(str, rId);		// Execute the Create statements
	 	
	 	// Create array of Rounds
	 	while (resultSet.isValidRow()) {
	 		success.push({
	 			roundId: resultSet.fieldByName('roundId'),
	 			hole: resultSet.fieldByName('holeNumber'),
	 			par: resultSet.fieldByName('par'),
	 			score: resultSet.fieldByName('score'),
	 			fairway: resultSet.fieldByName('fairway'),
	 			gir: resultSet.fieldByName('gir')
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
