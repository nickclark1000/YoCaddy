// Create the settings view
// Pushed and popped from the ApplicationWindow.Stack when requested

(function(){
	
	// Create the list of nearby courses
	var courseListView = function(courseList) {
		var selectionWindow = Titanium.UI.createView({
			zIndex: 99,
			backgroundImage: '/images/backgrounds/fullWindowBg.png',
			width: Titanium.UI.FILL,
			height: Titanium.UI.FILL
		});
	
		var tableData = [];
		for (var i = 0; i < courseList.length; i++) {
			var row = Titanium.UI.createTableViewRow();
			var label = Titanium.UI.createLabel({
				left: '10dp', height: '50dp', width: Titanium.UI.SIZE,
				text: courseList[i].name,
				color: '#000',
				font: {
					fontSize: yc.style.fontsize.normaltext,
					fontFamily: yc.style.fonts.infoFont
				}
			});
			
			var button = Titanium.UI.createButton({
				top: 0, bottom: 0,
				left: 0, right: 0,
				backgroundColor: 'transparent',
				backgroundSelectedColor: yc.style.colors.highlightColor,
				opacity: 0.5
			});
	
			row.add(label);
			row.add(button);
			tableData.push(row);
		}		
	
		var fillerHeight = '90%';	
		if (tableData.length < 8)
			fillerHeight = Titanium.UI.SIZE;
		
		var fillerView = Titanium.UI.createView({
			width: '85%', height: fillerHeight,
			backgroundColor: 'white',
			borderColor: '#3C3C3C',
			borderWidth: '2dp',
			borderRadius: 10
		});	
		
		var selectionTableView = Titanium.UI.createTableView({
			top: '10dp', bottom: '50dp',
			left: '5dp', right: '5dp',
			data: tableData,
			separatorColor: yc.style.colors.lowlightColor
		});	
		
		var cancelButton = Titanium.UI.createButton(yc.combine($$.modalButton,{
			title: 'Cancel / Clear Course', 
			bottom: '5dp', width: '80%'
		}));
		
		fillerView.add(selectionTableView);
		fillerView.add(cancelButton);
		selectionWindow.add(fillerView);
		
		return selectionWindow;	
	};
	
	// create the main application window
	yc.ui.createStartRoundView = function(_args) {
		// Create the layout view elements
		var currentCourseLon, currentCourseLat, currentCourseFSID;
		var view = Ti.UI.createView($$.stretch);
		
		var header = new yc.ui.headerView({
			title: 'Start Round',
			leftbutton: {
				show: true,
				callback: function() { 
					yc.app.applicationWindow.fireEvent('androidback', {}); 
				}
			},
			rightbutton: {
				show: true,
				callback: function() { 
					yc.app.currentRound = new yc.models.Round({
						course: courseNameText.getValue(),
						desc: courseDescText.getValue(),
						lon: currentCourseLon,
						lat: currentCourseLat,
						fsid: currentCourseFSID,
						date: dateText.getValue()
					});
					
					Ti.API.info('Start Round:' + JSON.stringify(yc.app.currentRound)); 					
				},
				image: '/images/button_accept.png'
			}
		});
		view.add(header);
		
		var body = Ti.UI.createScrollView($$.bodyScrollView);			
		var appContent = Ti.UI.createView(yc.combine($$.bodyContent, {}));
		var infoContent = Ti.UI.createView(yc.combine($$.bodyContent, {
			bottom: 10
		}));		

		body.add(appContent);
		body.add(infoContent);
		view.add(body);
							
		///////////////////////////////////////  End of Common Window Section //////////////////////////////////////
		
		var startSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Round Details',
			top: 10, left: 5
		}));
		
		var infoSection = Ti.UI.createLabel(yc.combine($$.sectionTitle, {
			text: 'Information',
			top: 5, left: 5
		}));				
		
		var startLabel = Ti.UI.createLabel(yc.combine($$.infoText, {
			text: 'There are two ways to begin a round:\n1) Enter a course name and description.\n2) Select a nearby course and enter a description.\n\nStarting a round will initiate the GPS functionality of your device.  To stop the GPS, the round must be paused or ended.',
			top: 5, bottom: 5, width: '95%'
		}));		
		
		var courseNameText = Ti.UI.createTextField(yc.combine($$.textfield, {
			hintText: '[Course or Round Name]'
		}));
		
		var courseFindButton = Ti.UI.createButton(yc.combine($$.modalButton, {
			title: 'Select a Course / Clear Selection',
			top: 10, width: '95%',
			image: '/images/button_search.png',			
			font: {
				fontFamily: yc.style.fonts.buttonFont
			}
		}));
		
		var courseDescText = Ti.UI.createTextArea(yc.combine($$.textfield, {
			hintText: '[Course or Round Description]',
			height: 90, 
			autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
			layout: 'horizontal',
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
			maxLength: 200,
			horizontalWrap: true,
			enableReturnKey: true,
			suppressReturn:false,
			textAlign: 'left'
		}));
		
		var dateText = Ti.UI.createTextField(yc.combine($$.textfield,{
			editable: false,
			value: yc.getCurrentDate('mm/dd/yyyy')
		}));
		
		var CheckBox = require('/common/checkBoxView');
		
		var saveTrace = new CheckBox({
			top: 10, width: '95%', height: 40,
			text: 'Save Walking Trace',
			checked: true
		});
		
		var showTrace = new CheckBox({
			top: 10, bottom: 10, width: '95%', height: 40,
			text: 'Show Walking Trace',
			checked: true
		});		
		
		appContent.add(startSection);
		appContent.add(courseNameText);
		appContent.add(courseFindButton);
		appContent.add(courseDescText);
		appContent.add(dateText);
		appContent.add(saveTrace.getView());
		appContent.add(showTrace.getView());
		infoContent.add(infoSection);
		infoContent.add(startLabel);
		
		////////////////////////////////////// Private Functions //////////////////////////////////////////////
		
		// Display the course list and deal with the response
		var displayCourseList = function(courses) {
			var clv = new courseListView (courses);
			
			clv.addEventListener('click', function(e){
				Ti.API.debug(JSON.stringify(e));
					
				if (!e.rowData) {
					// Blank out the course name 
					courseNameText.setValue('');
					courseNameText.setEditable(true);
					currentCourseFSID = undefined;
					currentCourseLat = undefined;
					currentCourseLon = undefined;
				} else {
					Ti.API.debug(JSON.stringify(courses[e.index]));
					
					courseNameText.setValue(courses[e.index].name);
					courseNameText.setEditable(false);
					currentCourseFSID = courses[e.index].fsid;
					currentCourseLat = courses[e.index].lat;
					currentCourseLon = courses[e.index].lon;
				}
				
				view.remove(clv);
			});
			
			view.add(clv);
		};
		
		// CurrentLocationFound is the callback fired when the GeoLocation service finds a location
		var currentLocationFound = function(e) {
			var FourSquare = require('/lib/foursquare');
			var fs = new FourSquare();
			
			if (e.success) {
				fs.findNearbyCourses(e.coords.longitude, e.coords.latitude, displayCourseList);
			} else {
				Ti.UI.createAlertDialog({
					title: 'Location unavailable',
					message: 'Unable to get current location from your device.',
					ok: 'Close'
				}).show();
			}
		};
		
		// createCourseList is called when the Find Course List button is clicked
		var createCourseList = function(_args) {
			if (Titanium.Geolocation.locationServicesEnabled) {
				if (Titanium.Platform.osname == 'android') { // Setup android related GPS listeners
					Titanium.API.debug('Configuring Geolocation for Android');
					Ti.Geolocation.preferredProvider = "gps";		
					Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
					Ti.Geolocation.distanceFilter = yc.settings.settingOptions.gpsdistSettings[yc.settings.settingsSaved.gpsdistSettings].value; 
					Ti.Geolocation.Android.manualMode = false; 	 					
				} else if (Titanium.Platform.osname == 'iphone ' || Titanium.Platform.osname == 'ipad') { // Setup ipad and iphone related GPS listeners
					Titanium.API.debug('Configuring Geolocation for iOS');
					Ti.Geolocation.preferredProvider = "gps";
					Ti.Geolocation.purpose = "yoCaddy requires access to GPS services";
				    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
				    Ti.Geolocation.distanceFilter = yc.settings.settingOptions.gpsdistSettings[yc.settings.settingsSaved.gpsdistSettings].value;   	
				}
				
				Titanium.Geolocation.getCurrentPosition(currentLocationFound);
			} else {
				Ti.UI.createAlertDialog({
					title: 'Location Service Error',
					message: 'Location services are not currently available.',
					ok: 'Ok'
				}).show();
			}			
		};		
		
		courseFindButton.addEventListener('click', createCourseList);
		return view;
	};
	
})();
