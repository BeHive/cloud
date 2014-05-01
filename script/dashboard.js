$(document).ready(function(){
	$("#logout").off("click").on("click",function(){
		$("#loader").fadeIn();
		$.ajax({
			type: "POST",
			url: "cloud.php?action=doLogout",
			success: function(data,status,hdr){
						$("#loader").fadeOut();
						$("#pageContent").fadeOut();
						$("#pageContent").empty();
						$("#pageContent").html(data);
						$("#pageContent").fadeIn();
					}
		}).done(function(){$("#loader").fadeOut();});
	});
	

});

