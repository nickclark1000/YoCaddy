// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	/**
	 * Creation of the yc Namespace function to display the list of saved rounds to
	 * the user.
	 */
	yc.ui.createListRoundsView = function(_args) {
		
		///////////////////////////////////////  Start of Common Window Section ////////////////////////////////////////

		var view = Ti.UI.createView($$.stretch);
		
		var header = new yc.ui.headerView({
			title: 'Saved Rounds',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('androidback', {}); }
			}
		});
		view.add(header);
		
		var body = Ti.UI.createView(yc.combine($$.bodyNoScrollView, {}));		
		view.add(body);
		
		///////////////////////////////////////  End of Common Window Section ////////////////////////////////////////		
		
		/**
		 * CreateRoundList returns the full list of Rounds in TableViewRow form
 		 * @param {Object} roundList
		 */
		var createRoundData = function(roundList) {
			var roundsTableData = [];
			
			for (var i=0, j=roundList.length; i<j; i++) {
				var zebra = (Math.ceil(i % 2) === 0) ? 'transparent': yc.style.colors.zebraColor;
				
				var tableRow = Ti.UI.createTableViewRow({
					width: Ti.UI.FILL, height: Ti.UI.SIZE,
					backgroundColor: zebra,
					filterCourse: roundList[i].course,
					filterDate: roundList[i].date,
					filterDesc: roundList[i].desc,
					roundId: roundList[i].id					
				});
				var row = Ti.UI.createView({ 
					width: '95%', height: Ti.UI.SIZE,
					touchEnabled: false
				});
				tableRow.add(row);

				var rightSide = Ti.UI.createView({ 
					top: 0, left: 0, bottom: 0, width: '75%', 
					layout: 'vertical' ,
					touchEnabled: false
				});
				var leftSide = Ti.UI.createView({ 
					top: 0, right: 0, bottom: 0, width: '25%' ,
					touchEnabled: false
				});
				
				row.add(rightSide);
				row.add(leftSide);
				
				var courseLabel = Ti.UI.createLabel({ 
					width: Ti.UI.FILL, height: Ti.UI.SIZE,
					color: yc.style.colors.black,
					font: {
						fontSize: yc.style.fontsize.normaltext,
						fontFamily: yc.style.fonts.optionFont
					},
					text: roundList[i].course ,
					touchEnabled: false
				});
				
				var descLabel = Ti.UI.createLabel({ 
					width: Ti.UI.FILL, height: Ti.UI.SIZE,
					color: yc.style.colors.greyTextColor,
					font: {
						fontSize: yc.style.fontsize.smalltext,
						fontFamily: yc.style.fonts.infoFont
					},					
					text: roundList[i].desc ,
					touchEnabled: false
				});
				var dateLabel = Ti.UI.createLabel({ 
					width: Ti.UI.FILL, height: Ti.UI.SIZE,
					color: yc.style.colors.greyTextColor,
					font: {
						fontSize: yc.style.fontsize.smalltext,
						fontFamily: yc.style.fonts.infoFont
					},					
					text: roundList[i].date ,
					touchEnabled: false
				});
				
				rightSide.add(courseLabel);
				rightSide.add(descLabel);
				rightSide.add(dateLabel);
				
				var scoreLabel = Ti.UI.createLabel({ 
					color: yc.style.colors.black,
					font: {
						fontSize: yc.style.fontsize.xlargetext,
						fontFamily: yc.style.fonts.buttonFont
					},
					text: (roundList[i].score === -99) ? 'NA' :roundList[i].score,
					touchEnabled: false
				});
				var fairwayLabel = Ti.UI.createLabel({ 
					color: yc.style.colors.greyTextColor,
					font: {
						fontSize: yc.style.fontsize.smalltext,
						fontFamily: yc.style.fonts.infoFont
					},			
					top: 2,			
					text: (roundList[i].fairwayHit === -1) ? 'FH: NA' : 'FH:' + roundList[i].fairwayHit*100 + '%',
					touchEnabled: false
				});
				var greenLabel = Ti.UI.createLabel({ 
					color: yc.style.colors.greyTextColor,
					font: {
						fontSize: yc.style.fontsize.smalltext,
						fontFamily: yc.style.fonts.infoFont
					},						
					bottom: 2, 
					text: (roundList[i].greenHit === -1) ?  'GIR: NA' : 'GIR:' + roundList[i].greenHit*100 + '%',
					touchEnabled: false
				});
				
				leftSide.add(scoreLabel);
				leftSide.add(fairwayLabel);
				leftSide.add(greenLabel);				
				
				tableRow.addEventListener('longpress', function(e){
					Ti.API.debug('Row Longpress - RoundId: ' + e.source.roundId);
				});		
		
				roundsTableData.push(tableRow);
			}
			
			return roundsTableData;
		};	// End of createRoundRows

		var roundsTableView = Ti.UI.createTableView(yc.combine($$.bodyScrollContent,{		
			separatorColor: yc.style.colors.zebraColor,
			filterAttribute: 'filterCourse'
		}));
		
		roundsTableView.addEventListener('click', function(e){
			if (e.source.apiName === 'Ti.UI.Button') {

			} else if (e.source.apiName === 'Ti.UI.TableViewRow') {
				
			}
			Ti.API.debug('Table Click' + JSON.stringify(e.source));
		});
		
		roundsTableView.addEventListener('longpress', function(e){
			var deleted = false;
			var deleteButton = Ti.UI.createButton({
				width: Ti.UI.FILL, height: Ti.UI.FILL,
				title: 'Delete',
				color: 'white',
				backgroundColor: 'red',
				bubbleParent: false,
				backgroundSelectedColor: '#AA0000',
				opacity: 0.8,
				font: {
					fontFamily: yc.style.fonts.buttonFont,
					fontSize: yc.style.fontsize.largetext
				},
				roundId: e.source.roundId					
			});	
			
			deleteButton.addEventListener('click', function(e){
				// delete round
				deleted = true;
				yc.db.rounds.deleteRound(e.source.roundId);
				view.fireEvent('updatelist', {});
			});
						
			e.source.add(deleteButton);	
			
			setTimeout(function(){
				if(!deleted)
					e.source.remove(deleteButton);
			}, 2000);
		});		
		
		
		body.add(roundsTableView);
		
		var roundsList;
		view.addEventListener('updatelist', function(e) {
			roundsTableView.setData([]);
			roundList = yc.db.rounds.listRounds();
			roundsTableView.setData(createRoundData(roundList));
		});

		view.fireEvent('updatelist', {});
						
		return view;
	};
	
})();
