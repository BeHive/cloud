$(document).ready(function(){
	
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
	
	$("#login").off("click").on("click",doLogin);
	$("input").off("keydown").on("keydown",function(){
		$(this).parent().removeClass("error");
		$(this).parent().removeAttr("data-tooltip");
	});
	
	$("#loginForm").keydown(function(event){
    	if(event.keyCode == 13){
    	    $("#login").click();
		}
	});
	
	$(".cloudLogo").on("mouseover",function(){
		$(".cloud").fadeOut(200);
		setTimeout(function() { $("#loginForm").fadeIn(200); $("#username").focus();}, 200);
	});
	
	hasSession();
	
})

function doLogin(){

	$(".error").removeAttr("data-tooltip").removeClass("error");
	
	if($("#username").val().length == 0){
		$("#username").parent().attr("data-tooltip","mandatory");
		$("#username").parent().addClass("error");
	}
	if($("#password").val().length == 0){
		$("#password").parent().attr("data-tooltip","mandatory");
		$("#password").parent().addClass("error");
	}	
	
	if($("#username").val().length != 0 && $("#password").val().length != 0){
		$("#loginForm").fadeOut();
		$("#loader").fadeIn();
		$.ajax({
			type: "POST",
			url: "cloud.php?action=doLogin",
			data: { 
				username: $("#username").val(), 
				password: $("#password").val()
			},
			success: function(data,status,hdr){
				if(hdr.getResponseHeader("CLOUD-Status") == "error"){
					$("#login").addClass("error").attr("data-tooltip",hdr.getResponseHeader("CLOUD-Message"));
					$("#username").val("");
					$("#password").val("");
					$("#loginForm").fadeIn();
				}
				else{
					$("#pageContent").hide();
					$("#loader").fadeOut();
					$("#pageContent").html(data);
					$("#pageContent").show("slide",{direction:'right'},1000);
				}
				
			}
		}).done(function(){$("#loader").fadeOut();});
	}
}

function doLogout(){
	$.ajax({
			type: "POST",
			url: "cloud.php?action=doLogout",
			success: function(data,status,hdr){
				$("#pageContent").hide("slide",{direction:'right'},1000);
				setTimeout(function() { $("#pageContent").html(data).fadeIn(200); }, 1000);
			}
	});
}

function hasSession(){
	$.ajax({
		type: "POST",
		url: "cloud.php?action=hasSession",
		dataType: "json",
		success: function(data,status,hdr){
			if(data.hasSession){
				$.ajax({
					type: "POST",
					url: "cloud.php?action="+data.action,
					success: function(data,status,hdr){
						$("#pageContent").html(data);
							
					}
				});
			}
				
		}
	});
}
