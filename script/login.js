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


$(function(){
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
	$(".cloudLogo").off("click").on("click",function(){
		$(".cloudLogo").fadeOut();
		setTimeout(function() { $("#loginForm").fadeIn(); }, 400);
	})
})