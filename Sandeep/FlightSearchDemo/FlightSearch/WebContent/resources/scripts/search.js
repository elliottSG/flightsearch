/**
 * Author : SandeepK01
 * Description: This file contains the codes required for the flight search functionality.
 * In order to query the JSON data a jsonsql library is used.
 * Please refer to inline comments for exact description.
 */

//declaring global variables
var source, destination,depDate,retDate;

$(document).ready(function() {
	$("#tab-container").organicTabs();  //Creating Oneway and Return tabs
	
	var availableTags = ["DEL","BLR"];  // Populating autocomplete data for text input fields
	$("#sourceO").autocomplete({source: availableTags});
	$("#destinationO").autocomplete({source: availableTags});
	$("#sourceR").autocomplete({source: availableTags});
	$("#destinationR").autocomplete({source: availableTags});
	
	// Jquery UI date picker for capturing dates
	$("#depDate").datepicker({
		minDate: 0,
		showAnim : 'slideDown',
		dateFormat : 'dd-M-yy'
	});
	$("#depDateR").datepicker({
		minDate: 0,
		showAnim : 'slideDown',
		dateFormat : 'dd-M-yy'
	});
	$("#retDate").datepicker({
		minDate: 0,
		showAnim : 'slideDown',
		dateFormat : 'dd-M-yy'
	});
	
	//Hiding the result table initially and setting return date as null when Oneway tab is active
	$('#result').hide();
	$('li').click(function(){
		if($(this).text()==="One Way"){
			$("#retDate").val("");
			retDate='';
		}
	});
	
	
	//Slider component of Jquery UI initialized
	$("#slider-range").slider({
	      range: true,
	      min: 4200,
	      max: 14000,
	      values: [4200, 12000],  //Setting default values
	      slide: function(event,ui) {  //Shows the amount selected when slider changes
	    	  $("#amount").val("Rs "+ui.values[0]+" - Rs "+ui.values[1]);
	      },
	      stop:function(_,ui){      // Query json data for filtering by price
		  		var minVal = ui.values[0];
				var maxVal = ui.values[1];
				var table = $("table.oneTable");
		    	var filteredResult = jsonsql.query("select * from flightData.result where (cost >="+minVal+" && cost <="+maxVal+") order by cost",flightData);
		    	if($("#retDate").val()===""){  //checking if slider was changed for Oneway tab
		    		if(filteredResult.length>0){
		    			table.empty();
		    			$('div.resultRoute').html(source+' > '+destination);
						$('div.resultPlan').html('Depart :'+depDate);
		    			var tr = "<tr class='row'>";
		    			for(i in filteredResult){  //Displaying the filtered data
		    				tr+="<td class='flight'><div class='showPrice'>Rs. "+filteredResult[i].cost+"</div>"+
		    				"<div class='showOnward'><span class='flightNo'>"+filteredResult[i].flightId+" ("+filteredResult[i].airline+")</span>"+
		    					"<span class='route'>"+filteredResult[i].source+" to "+filteredResult[i].destination+"</span>"+
		    					"<span class='depart'>Depart : "+filteredResult[i].depTime+"</span>"+
		    					"<span class='arrive'>Arrive : "+filteredResult[i].arrTime+"</span></div></td>"+
		    				"<td class='book'><div><img src='../resources/images/flight.png'><br/><br/><button onclick='bookClick()'>Book Now</button></div></td></tr>";
		    				table.append(tr);
		    				tr = "<tr class='row'>";
		    			}
		    			$('#result').show();
		    		}else{ //handling error
		    			Message.set('error','No Flight Data found!');
		    			table.empty();
		    			$('div.resultRoute').html('No Flights found for this criteria.');
						$('div.resultPlan').html('');
		    		}
		    	}
		    	else{
		    		if(filteredResult.length>0){  // performing similar operation as above for return tab
		    			table.empty();
		    			$('div.resultRoute').html(source+' > '+destination+' > '+source);
						$('div.resultPlan').html('Depart :'+depDate+'<br/>Return :'+retDate);
		    			var tr = "<tr class='row'>";
		    			for(i in filteredResult){
		    				tr+= "<td class='flight'><div class='showPrice'>Rs. "+filteredResult[i].cost+"</div>"+
		    					 "<div class='showOnward'><span class='flightNo'>"+filteredResult[i].onFlightId+" ("+filteredResult[i].onAirline+")</span>"+
		    						"<span class='route'>"+filteredResult[i].onward+" to "+filteredResult[i].destination+"</span>"+
		    						"<span class='depart'>Depart : "+filteredResult[i].depTime+"</span>"+
		    						"<span class='arrive'>Arrive : "+filteredResult[i].arrTime+"</span></div>"+
		    					 "<div class='showReturn'><span class='flightNo'>"+filteredResult[i].retFlightId+" ("+filteredResult[i].retAirline+")</span>"+
		    						"<span class='route'>"+filteredResult[i].destination+" to "+filteredResult[i].onward+"</span>"+
		    						"<span class='depart'>Depart : "+filteredResult[i].retDep+"</span>"+
		    						"<span class='arrive'>Arrive : "+filteredResult[i].retArr+"</span></div></td>"+
		    						"<td class='book'><div><img src='../resources/images/flight.png'><br/><br/><button onclick='bookClick()'>Book Now</button></div></td></tr>";
		    				table.append(tr);
		    				tr = "<tr class='row'>";
		    			}
		    			$('#result').show();
		    		}else{// handling error
		    			Message.set('error','No Flight Data found!');
		    			table.empty();
		    			$('div.resultRoute').html('No Flights found for this criteria.');
						$('div.resultPlan').html('');
		    		};
		    	};
		 }
	 });
	
	//Displays amount in the slider onload of page
	$("#amount").val("Rs "+$("#slider-range").slider("values",0)+" - Rs "+$("#slider-range").slider("values",1));
	
	//this function is called for one way flight search
	$("#oneWaySubmit").click(function(){
		//getting form values
		source = $("#sourceO").val();
		destination = $("#destinationO").val();   
		depDate = $('#depDate').val();
		var noOfPass = $("#noOfPassO").val();
		// setting the same in return tab to help user
		document.getElementById('sourceR').value=source;
		document.getElementById('destinationR').value=destination;
		document.getElementById('depDateR').value=depDate;
		var table = $("table.oneTable");
		if(source.length===0){ //validating mandatory source field
			Message.set('error','Please enter the city of origin!');
		}else if(destination.length===0){ // validating mandatory destination field
			Message.set('error','Please enter the city of destination!');
		}else if(depDate.length===0){ // validating mandatory departure date
			Message.set('error','Please enter date of departure!');
		}else if(source===destination){ // validating source and daestination values
			Message.set('error','City of origin and destination cannot be same!');
		}else if(!(source==='DEL'||source==='BLR')||!(destination==='DEL'||destination==='BLR')){
			Message.set('error','Please enter the suggested values only!'); //limitation for data entry check
		}else{
			$('#start').hide(); //hiding page load message
			flightData.result = jsonsql.query("select * from flightData.jsononeway where (sourceCode =='"+source+"' && destCode =='"+destination+"' && seatsAvail >="+noOfPass+") order by cost",flightData);
			var minVal = $("#slider-range").slider("values",0);
			var maxVal = $("#slider-range").slider("values",1); //querying and filtering data
			var filteredResult = jsonsql.query("select * from flightData.result where (sourceCode =='"+source+"' && destCode =='"+destination+"' && seatsAvail >="+noOfPass+" && cost >="+minVal+" && cost <="+maxVal+") order by cost",flightData);
			if(filteredResult.length>0){  //displaying the filtered data in the table
				$('div.resultRoute').html(source+' > '+destination);
				$('div.resultPlan').html('Depart :'+depDate);
				
				table.empty();
				var tr = "<tr class='row'>";
				for(i in filteredResult){
					tr+="<td class='flight'><div class='showPrice'>Rs. "+filteredResult[i].cost+"</div>"+
					"<div class='showOnward'><span class='flightNo'>"+filteredResult[i].flightId+" ("+filteredResult[i].airline+")</span>"+
						"<span class='route'>"+filteredResult[i].source+" to "+filteredResult[i].destination+"</span>"+
						"<span class='depart'>Depart : "+filteredResult[i].depTime+"</span>"+
						"<span class='arrive'>Arrive : "+filteredResult[i].arrTime+"</span></div></td>"+
					"<td class='book'><div><img src='../resources/images/flight.png'><br/><br/><button onclick='bookClick()'>Book Now</button></div></td></tr>";
					table.append(tr);
					tr = "<tr class='row'>";
				}
				$('#result').show();
			}else{//handling error
				Message.set('error','No Flight Data found!');
				table.empty();
    			$('div.resultRoute').html('No Flights found for this criteria.');
				$('div.resultPlan').html('');
			};
		}
	});
	
	
	// this function is called for return search functionality
	$("#returnSubmit").click(function(){
		// reading form values
		source = $("#sourceR").val();
		destination = $("#destinationR").val();
		var noOfPass = $("#noOfPassR").val();
		depDate = $('#depDateR').val();
		retDate = $('#retDate').val();
		// setting the same values in one way tab to help user
		document.getElementById('sourceO').value=source;
		document.getElementById('destinationO').value=destination;
		document.getElementById('depDate').value=depDate;
		var table = $("table.oneTable");
		if(source.length===0){ // performing mandatory source check
			Message.set('error','Please enter the city of origin!');
		}else if(destination.length===0){ // performing mandatory destination check
			Message.set('error','Please enter the city of destination!');
		}else if(depDate.length===0){// performing mandatory departure date check
			Message.set('error','Please enter date of departure!');
		}else if(retDate.length===0){//performing return date check . Date validation has not been performed
			Message.set('error','Please enter date of return!');
		}else if(source===destination){// performing source and destination check
			Message.set('error','City of origin and destination cannot be same!');
		}else if(!(source==='DEL'||source==='BLR')||!(destination==='DEL'||destination==='BLR')){
			Message.set('error','Please enter the suggested values only!'); //limitation for data entry check
		}else{
			$('#start').hide(); //hiding page load message
			flightData.result = jsonsql.query("select * from flightData.jsonreturn where (onwardCode =='"+source+"' && destCode =='"+destination+"' && onSeats >="+noOfPass+" && retSeats >="+noOfPass+") order by cost",flightData);
			var minVal = $("#slider-range").slider("values",0);
			var maxVal = $("#slider-range").slider("values",1); //querying and filtering data
			var filteredResult = jsonsql.query("select * from flightData.result where (cost >="+minVal+" && cost <="+maxVal+") order by cost",flightData);
			if(filteredResult.length>0){ //displaying the filtered data in the table
				$('div.resultRoute').html(source+' > '+destination+' > '+source);
				$('div.resultPlan').html('Depart :'+depDate+'<br/>Return :'+retDate);
				
				table.empty();
				var tr = "<tr class='row'>";
				for(i in filteredResult){
					tr+= "<td class='flight'><div class='showPrice'>Rs. "+filteredResult[i].cost+"</div>"+
						 "<div class='showOnward'><span class='flightNo'>"+filteredResult[i].onFlightId+" ("+filteredResult[i].onAirline+")</span>"+
							"<span class='route'>"+filteredResult[i].onward+" to "+filteredResult[i].destination+"</span>"+
							"<span class='depart'>Depart : "+filteredResult[i].depTime+"</span>"+
							"<span class='arrive'>Arrive : "+filteredResult[i].arrTime+"</span></div>"+
						 "<div class='showReturn'><span class='flightNo'>"+filteredResult[i].retFlightId+" ("+filteredResult[i].retAirline+")</span>"+
							"<span class='route'>"+filteredResult[i].destination+" to "+filteredResult[i].onward+"</span>"+
							"<span class='depart'>Depart : "+filteredResult[i].retDep+"</span>"+
							"<span class='arrive'>Arrive : "+filteredResult[i].retArr+"</span></div></td>"+
							"<td class='book'><div><img src='../resources/images/flight.png'><br/><br/><button onclick='bookClick()'>Book Now</button></div></td></tr>";
					table.append(tr);
					tr = "<tr class='row'>";
				}
				$('#result').show();
			}else{// handling error
				Message.set('error','No Flight Data found!');
				table.empty();
    			$('div.resultRoute').html('No Flights found for this criteria.');
				$('div.resultPlan').html('');
			};
		}
	});
});

//this handles click on the Book now button after data is displayed.
function bookClick(){
	Message.set('notice','Booking facility not available! Enjoy searching.');
}