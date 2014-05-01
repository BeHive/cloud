
<link rel="stylesheet" type="text/css" href="css/dashboard.css">

<div class="gridSmall menuBar">
	<div id="userData">
		<span id="userPicture"/>
		<span id="userName">Hi <?php echo $_SESSION['SHORTNAME'] ?></span>
		<span id="logout" data-tooltip="logout"/>
	</div>
	
</div>
<div class="gridFull dashboardContent"></div>

<script src="script/dashboard.js"></script>
