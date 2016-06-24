window.onload = function() {
	$('form').submit(function (e) {
		e.preventDefault();
		var date = new Date($("#datetimepicker").val());
		$('#output').html(date);
	});
}