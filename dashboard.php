
<link rel="stylesheet" type="text/css" href="css/dashboard.css">

<div class="gridSmall menuBar">
	<div id="progressbar"></div>
	<div id="userData">
		<span id="userPicture"/>
		<span id="userName">Hi <?php echo $_SESSION['SHORTNAME'] ?></span>
		<span id="logout" data-tooltip="logout"/>
	</div>
	<ul id="menu">
		<li class = "divider"></li>
		<li class="item">item 1</li>
		<li class = "divider"></li>
		<li class="item">item 2</li>
		<li class = "divider"></li>
		<li class="item">item 3</li>
		<li class = "divider"></li>
		<li class="item">item 4</li>
		<li class = "divider"></li>
	</ul>
</div>
<div class="gridFull dashboardContent">
	<span class="cloudBack">cloud</span>
</div>

<script src="script/dashboard.js"></script>

<script>
setTimer(<?php echo $_SESSION['SESSIONTIMEOUT'] ?>);
</script>