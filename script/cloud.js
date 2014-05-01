$(document).ready(function(){
	$("#pageContent").load("cloud.php");
	
	var opts = {
		lines: 13, // The number of lines to draw
		length: 0, // The length of each line
		width: 6, // The line thickness
		radius: 30, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#ff911a', // #rgb or #rrggbb or array of colors
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: true, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: '30%', // Top position relative to parent
		left: '50%' // Left position relative to parent
	};
	var target = document.getElementById('loader');
	var spinner = new Spinner(opts).spin(target);

})

function logout(){
	$("#loader").fadeIn();
	$.ajax({
			type: "POST",
			url: "cloud.php?action=doLogout",
			success: function(data,status,hdr){
				$("#loader").fadeOut();
				$("#pageContent").html(data);
			}
	});
}