$(document).ready(function() {
	$("#tab-container").organicTabs();
	var availableTags = ["DEL","BLR"];
	$("#sourceO").autocomplete({source: availableTags});
	$("#destinationO").autocomplete({source: availableTags});
	$("#sourceR").autocomplete({source: availableTags});
	$("#destinationR").autocomplete({source: availableTags});
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
	$("#oneWaySubmit").click(function(e){
		Message.set('error','This is a sample error message.');
	});
	$("#book").click(function(e){
		alert("Booking facility not available! Enjoy searching.");
	});
	$('#msgWid').hide();
	$("#slider-range").slider({
	      range: true,
	      min: 4000,
	      max: 15000,
	      values: [4200, 14000],
	      slide: function(event,ui) {
	    	  $("#amount").val("Rs "+ui.values[0]+" - Rs "+ui.values[1]);
	    	  $("#priceRange").val(ui.values[0]+"-"+ui.values[1]);
	      }
	 });
	$("#amount").val("Rs "+$("#slider-range").slider("values",0)+" - Rs "+$("#slider-range").slider("values",1));
	$("#priceRange").val($("#slider-range").slider("values",0)+"-"+$("#slider-range").slider("values",1));
});