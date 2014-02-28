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
		 					+ ' token TEXT,'
		 					+ ')';	 					
		 					
		 	// Execute the Create statements
		 	db.execute(createSocialTable);	
		 	Ti.API.debug('Creating Table Social: '+createRoundsTable);	 
		} catch (err) {		
			Ti.API.error('Datbase Error: ' + JSON.stringify(err));
		} finally {
		 	//Close the DB
		 	db.close();		 	
		}
	}		
};

module.exports = SocialDatabase;
