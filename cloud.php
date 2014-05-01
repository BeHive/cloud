<?php
require_once('lib/yaml/sfYaml.class.php');
require_once('lib/yaml/sfYamlDumper.class.php');

$settings = sfYaml::load('cloud.yml');

session_start();

if(!isset($_GET['action']))
	if(isset($_SESSION['LOCATION']))
		include($_SESSION['LOCATION']);
	else{
		$_SESSION['LOCATION'] = 'login.html';
		include('login.html');
	}
elseif($_GET['action'] == 'doLogin')
	doLogin();

else
	if(checkSession($_GET['action']))
		call_user_func($_GET['action']);

	
function doLogin(){
	global $settings;
	try {
		$con = new PDO("mysql:host=".$settings['db']['host'].";dbname=".$settings['db']['dbname'], $settings['db']['user'], $settings['db']['pass']);
		$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		$stmt = $con->prepare("SELECT * FROM CLOUD_USERS where login = ? and passwd = ?");
		$stmt->execute(array($_POST['username'], md5($_POST['username'].$_POST['password'])));
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		if($stmt->rowCount() != 1){
			header("CLOUD-Status: error");
			header("CLOUD-Message: Wrong username or password");
		}
		else{	
			$_SESSION['USER'] = $_POST['username'];
			$_SESSION['TIMER'] = time();
			$_SESSION['SHORTNAME'] = $rows[0]['fst_name'];
			$_SESSION['FULLNAME'] = $rows[0]['fst_name'].' '.$rows[0]['lst_name'];
			$_SESSION['LOCATION'] = 'dashboard.php';
			include('dashboard.php');
		}
		$con = null;
		
	} catch(PDOException $ex) {
		header("CLOUD-Status: error");
		header("CLOUD-Message: System unavailable");
	}
	
}

function doLogout(){
	session_unset();
	$_SESSION['LOCATION'] = 'login.html';
	include('index.html');
}

function checkSession($action){
	global $settings;
	if(!isset($_SESSION['USER']) || (time() - $_SESSION['TIMER']) > $settings['session']['timeout'] || !is_callable($action))
		doLogout();
	else{
		$_SESSION['TIMER'] = time();
		$_SESSION['ACTION'] = $action;
		return true;
	}
}
