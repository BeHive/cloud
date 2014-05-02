var sessionTimer;
var timerVal;

$(document).ready(function(){
	// initializing timer bar
	$("#progressbar").progressbar({ value: 96 });
	
	// setting it to decrease every second
	sessionTimer = setInterval(updateTimer, 1000);
	
	// logout button setup
	$("#logout").off("click").on("click",doLogout);
	
	// menu item events
	$("#menu .item").off("click").on("click",function(){
		$("#menu .item").removeClass("active");
		$(this).addClass("active");
	});
});

function updateTimer(){
	
	var timer = $("#progressbar").progressbar("value") - (100 / timerVal);

	if(timer <= 0){
		clearInterval(sessionTimer);
		//doLogout();
	}
	else
		$("#progressbar").progressbar({ value: timer });

}

function setTimer(seconds){
	timerVal = seconds;
}
//# sourceURL = dashboard.js