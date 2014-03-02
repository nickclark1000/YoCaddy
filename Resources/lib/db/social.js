/**
 * 
 * @param {Object} _args
 */

var SocialDatabase = function(_name){
	this.dbname = _name;	
	databaseInit(this.dbname);
	
	/**
	 * Private Functions 
	 */	
	function databaseInit(_db) {
		var db = Ti.Database.open(_db);
		
		if (yc.osname === 'iphone') { db.file.setRemoteBackup(false); }
				
		if (yc.replacedb === true) {
			db.execute('DROP TABLE IF EXISTS Social');
			Ti.API.debug('Dropping Tables');
		}				
				
		try {
			// Create the table creation statements
			var createSocialTable = 'CREATE TABLE IF NOT EXISTS Social'
		 					+ ' (id INTEGER PRIMARY KEY,'
		 					+ ' account TEXT NOT NULL,' 	 		
		 					+ ' email TEXT,'
		 					+ ' login TEXT,'
		 					+ ' password TEXT,'
		 					+ ' token TEXT'
		 					+ ')';	 					
		 					
		 	// Execute the Create statements
		 	Ti.API.debug('Creating Table Social: '+createSocialTable);	 
		 	db.execute(createSocialTable);			 	
		} catch (err) {		
			Ti.API.error('Datbase Error: ' + JSON.stringify(err));
		} finally {
		 	//Close the DB
		 	db.close();		 	
		}
	}		
};

/**
 * SaveAccount
 * @param {Object} social object
 */
SocialDatabase.prototype.saveAccount = function(social){
	var str;
	var success = social;
	var db = Ti.Database.open(this.dbname);	
	
	try {

		// Delete the current entry
		str = 'DELETE FROM Social WHERE account=?';
		db.execute(str, social.account);

		// Insert
		Ti.API.debug('Inserting Social Link: '+ JSON.stringify(social));
		str = 'INSERT INTO Social (account, email, login, password, token)'
		+ ' VALUES (?, ?, ?, ?, ?)';	
		
		db.execute(str, social.account, social.email || null, social.login || null, social.password || null, social.token || null);
		success.id = db.lastInsertRowId;
		
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
 * GetAccount 
 * @param {Object} toGet
 */
SocialDatabase.prototype.getAccount = function(where) {
	var str, resultSet;
	var success = {};
	var db = Ti.Database.open(this.dbname);
	
	str = 'SELECT * FROM Social WHERE account=?';
	Ti.API.debug('Get Social: ' + str + ' ('+where+')');
		
	try {
	 	resultSet = db.execute(str, where);		// Execute the Create statements
	 	
	 	Ti.API.debug('length: ' + resultSet.length);
	 	
	 	// Create array of Rounds
	 	if (resultSet.isValidRow()) {
	 		
	 		success = {
	 			id: resultSet.fieldByName('id'),
				account: resultSet.fieldByName('account'),
				email: resultSet.fieldByName('email'),
				login: resultSet.fieldByName('login'),
				password: resultSet.fieldByName('password'),
				token: resultSet.fieldByName('token') 			
	 		};
	 	}	 
	} catch (err) {		
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
	} finally {
	 	//Close the DB
	 	db.close();	
	 	return success;	 	
	}		
};

SocialDatabase.prototype.getAccountTokens = function() {
	var str, resultSet;
	var results = {};
	var db = Ti.Database.open(this.dbname);
	
	str = 'SELECT account, token FROM Social';
	Ti.API.debug('Get Social: ' + str);
		
	try {
	 	resultSet = db.execute(str);		// Execute the Create statements
		
		var i=0;
		while (resultSet.isValidRow()) {
		    results[resultSet.fieldByName('account')] = resultSet.fieldByName('token');		
		    resultSet.next();
		}; 
	} catch (err) {		
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
	} finally {
	 	//Close the DB
	 	db.close();	
	 	return results;	 	
	}		
};

/**
 * DeleteAccount by name
 * @param {Object} social
 */
SocialDatabase.prototype.deleteAccount = function(where) {
	var str, resultSet;
	var success = false;
	var db = Ti.Database.open(this.dbname);
	
	str = 'DELETE FROM Social WHERE account=?';
	Ti.API.debug('Delete Social: ' + str + ' ('+where.account+')');
		
	try {
	 	resultSet = db.execute(str, where.account);		// Execute the Create statements
	 	success = true; 
	} catch (err) {		
		Ti.API.error('Datbase Error: ' + JSON.stringify(err));
	} finally {
	 	//Close the DB
	 	db.close();	
	 	return success;	 	
	}	
};

module.exports = SocialDatabase;
