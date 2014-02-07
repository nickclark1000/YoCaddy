	// Private instance Method - chooseOption
	// used as the click event listener
	this.view.addEventListener('click', function(e){
		var selectionWindow = Titanium.UI.createView({
			zIndex: 99,
			backgroundImage: '/images/backgrounds/fullWindowBg.png',
			width: Titanium.UI.FILL,
			height: Titanium.UI.FILL
		});
		
		var tableData = [];
		for (var i = 0; i < _args.options.length; i++) {
			var row = Titanium.UI.createTableViewRow();
			var label = Titanium.UI.createLabel({
				left: '10dp', height: '50dp', width: Titanium.UI.SIZE,
				text: this.oOptions[i],
				color: '#000',
				font: {
					fontSize: '18dp'
				}
			});
			var check = Titanium.UI.createImageView({
				right: '10dp', height: '50dp', width: '50dp'
			});
			
			if (this.oSelected == i) {
				check.setImage('/images/checkmark.png');
			}
			
			row.add(label);
			row.add(check);
			tableData.push(row);
		}	
		
		var fillerView = Titanium.UI.createView({
			width: '70%',
			height: Titanium.UI.SIZE,	
			backgroundColor: 'white',
			borderColor: '#3C3C3C',
			borderWidth: '2dp',
			borderRadius: 10
		});
		
		var selectionTableView = Titanium.UI.createTableView({
			top: '10dp', bottom: '50dp',
			left: '5dp', right: '5dp',
			data: tableData,
			separatorColor: '#C3C3C3',
		});	
		
		var cancelButton = Titanium.UI.createButton({
			title: 'Cancel', 
			bottom: '5dp', width: '80%',
			height: '40dp',
			color: '#000'
		});
		
		cancelButton.addEventListener('click', function(e){
			oParent.remove(selectionWindow);
		});
		
		selectionTableView.addEventListener('click', function(e){
			oParent.remove(selectionWindow);
		});
		
		fillerView.add(selectionTableView);
		fillerView.add(cancelButton);
		selectionWindow.add(fillerView);
		oParent.add(selectionWindow);
	});