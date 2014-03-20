// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	/**
	 * Format the score and par into a specific format
	 * @Param {Integer} Score
	 * @Param {Integer} Par
	 * @Return {String} result 
	 *		{ text: 'Score (Par)', value: 1 },
	 *		{ text: '+/- (Par)', value: 2 },
	 *		{ text: 'Score (+/-)', value: 3 }	
	 */
	var formatScores = function(score, par) {
		var text = '';
		var plusminus = (score-par > 0) ? '+' : '-';
		var displayType = yc.settings.app.propvalues[yc.settings.app.propids.scoredisplay][yc.settings.app.selected[yc.settings.app.propids.scoredisplay]].value;
		
		switch (displayType) {
			case 1:
				text = score +' ('+par+')';
				break;
			case 2:
				text = plusminus + Math.abs(score-par) + ' ('+par+')';
				break;				
			case 3:
				text = score + ' ('+ plusminus + Math.abs(score-par) + ')';
				break;
		}
		
		return text;
	};
	
	/**
	 * Creation of the yc Namespace function to display the list of saved rounds to
	 * the user.
	 */
	yc.ui.createListRoundsView = function(_args) {
		
		///////////////////////////////////////  Start of Common Window Section ////////////////////////////////////////

		var view = Ti.UI.createView($$.stretch);
		view.viewid = yc.ui.viewids.listrounds;
		var roundsList;
		
		var header = new yc.ui.headerView({
			title: 'Saved Rounds',
			leftbutton: {
				show: true,
				callback: function() { yc.app.applicationWindow.fireEvent('appback', {}); }
			},
			rightbutton: [{
				show: true,
				callback: showSearch,
				image: '/images/button_search.png'
			},{
				show: true,
				image: '/images/button_refresh.png',
				callback: function() {
					view.fireEvent('updatelist', {});
				}
			}]
		});
		view.add(header);
		
		var body = Ti.UI.createView(yc.combine($$.bodyScrollView, {}));		
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
					text: (roundList[i].score === -99) ? 'NA' : formatScores(roundList[i].score, roundList[i].par),
					touchEnabled: false
				});
				var fairwayLabel = Ti.UI.createLabel({ 
					color: yc.style.colors.greyTextColor,
					font: {
						fontSize: yc.style.fontsize.tinytext,
						fontFamily: yc.style.fonts.infoFont
					},			
					top: 2,			
					text: (roundList[i].fairwayHit === -1 || roundList[i].fairwayHit === 'NaN') ? 'FH: NA' : 'FH: ' + roundList[i].fairwayHit*100 + '%',
					touchEnabled: false
				});
				var greenLabel = Ti.UI.createLabel({ 
					color: yc.style.colors.greyTextColor,
					font: {
						fontSize: yc.style.fontsize.tinytext,
						fontFamily: yc.style.fonts.infoFont
					},						
					bottom: 2, 
					text: (roundList[i].greenHit === -1 || roundList[i].greenHit === 'NaN') ?  'GIR: NA' : 'GIR: ' + roundList[i].greenHit*100 + '%',
					touchEnabled: false
				});
				
				leftSide.add(scoreLabel);
				leftSide.add(fairwayLabel);
				leftSide.add(greenLabel);					
		
				roundsTableData.push(tableRow);
			}
			
			return roundsTableData;
		};	// End of createRoundRows		

		var roundsTableView = Ti.UI.createTableView(yc.combine({ top: 5, bottom: 5, left: 5, right: 5 },{		
			separatorColor: yc.style.colors.zebraColor
		}));
		
		roundsTableView.addEventListener('click', function(e){
			if (e.source.apiName === 'Ti.UI.TableViewRow') {
				var round = yc.db.rounds.getRound(e.source.roundId);
				
				if (round) {
					yc.app.editviewRound = round;
					yc.app.applicationWindow.fireEvent('addview', { viewIdx: yc.ui.viewids.editviewround });
				} else {
					Ti.API.debug('Received back More or Less than 1 specific round');
				}
			}
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
		
		//view.fireEvent('updatelist', {});
		
		view.addEventListener('closing', function() { 
			yc.app.applicationWindow.fireEvent('appback', {}); 
		});
		
		view.addEventListener('postlayout', postLayout);
		
		var busy = new yc.ui.createActivityStatus('Loading Round List ...');
		view.add(busy);		
						
		return view;
		
		/********************************* Functions ********************************************/
		
		function postLayout(e) {
			view.removeEventListener('postlayout', postLayout);
			updateList(e);
			view.addEventListener('updatelist', updateList);
		}
		
		function updateList(e) {
			busy.show();
			//var busy = new yc.ui.createActivityStatus('Loading Round List ...');
			//yc.app.applicationWindow.add(busy);	
			
			roundsTableView.setData([]);
			roundList = yc.db.rounds.listRounds();
			roundsTableView.setData(createRoundData(roundList));
			
			busy.hide();
			//yc.app.applicationWindow.remove(busy);			
		}
		
		/**
		 * ShowSearch will display Search box with a choice of search type
		 * This is a work in progress and will be completed later.
 		 * @param {Object} e
		 */
		function showSearch(e) {
			var searchByView = Ti.UI.createView(yc.combine($$.stretch, {
				backgroundImage: '/images/backgrounds/fullWindowBg.png'
			}));
			
			searchByView.addEventListener('click', function(e) {
				view.remove(searchByView);
			});
			
			var buttonList = Ti.UI.createView({
				backgroundColor: yc.style.colors.white,
				width: '60%', height: Ti.UI.SIZE,
				layout: 'vertical'
			});
			
			searchByView.add(buttonList);
			
			var courseSearch = Ti.UI.createButton(yc.combine($$.modalButton, {
				width: Ti.UI.FILL,
				title: 'Search By Course',
				bottom: 5, top: 5,
				left: 5, right: 5
			}));
			
			var descSearch = Ti.UI.createButton(yc.combine($$.modalButton, {
				width: Ti.UI.FILL,
				title: 'Search By Description',
				bottom: 5, left: 5, right: 5
			}));
			
			var dateSearch = Ti.UI.createButton(yc.combine($$.modalButton, {
				width: Ti.UI.FILL,
				title: 'Search By Date',
				bottom: 5, left: 5, right: 5
			}));
			
			// open a modal screen and let the user pick which item to seach by
			var searchByChange = function(e) {
				switch (e.source) {
					case courseSearch:
						roundsTableView.setFilterAttribute('filterCourse');
						searchView.setHintText('By Course Name');
						break;
					case descSearch:
						roundsTableView.setFilterAttribute('filterDesc');
						searchView.setHintText('By Description');
						break;
					case dateSearch:
						roundsTableView.setFilterAttribute('filterDate');
						searchView.setHintText('By Date [YYYY/MM/DD]');
						break;
				}
				
				view.remove(searchByView);
			};
			
			courseSearch.addEventListener('click', searchByChange);
			descSearch.addEventListener('click', searchByChange);
			dateSearch.addEventListener('click', searchByChange);
			
			buttonList.add(courseSearch);
			buttonList.add(descSearch);
			buttonList.add(dateSearch);
			
			view.add(searchByView);
		} // End of Seach By Event Listener
				
	};
	
})();
