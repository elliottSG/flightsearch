$(document).ready(function() {
	$("#tab-container").organicTabs();
	$('#depDate').Zebra_DatePicker({
		format: 'd-M-Y',
		direction: true
	});
	$('#depDateR').Zebra_DatePicker({
		pair: $('#retDate'),
		format: 'd-M-Y',
		direction: true
	});
	$('#retDate').Zebra_DatePicker({
		format: 'd-M-Y',
	});
});