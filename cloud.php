<?php
require_once('lib/yaml/sfYaml.class.php');
require_once('lib/yaml/sfYamlDumper.class.php');

$settings = sfYaml::load('cloud.yml');

session_start();

writeLog("entering with action = '".$_GET['action']."'",4);
writeLog(serialize($_SESSION),4);

if(!isset($_GET['action']))
	doLogout();
elseif($_GET['action'] == 'doLogin' || $_GET['action'] == 'hasSession')
	call_user_func($_GET['action']);
else
	checkSession($_GET['action']);
	
function doLogin(){
writeLog("logging in user ".$_POST['username'],3);
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
			$_SESSION['SESSIONTIMEOUT'] = $settings['session']['timeout'];
			$_SESSION['SHORTNAME'] = $rows[0]['fst_name'];
			$_SESSION['FULLNAME'] = $rows[0]['fst_name'].' '.$rows[0]['lst_name'];
			dashboard();
		}
		$con = null;
		
	} catch(PDOException $ex) {
		writeLog("error connecting to database",1);
		header("CLOUD-Status: error");
		header("CLOUD-Message: System unavailable");
	}
	
}

function dashboard(){
	include('dashboard.php');
}

function doLogout(){
	session_unset();
	include('index.html');
}

function checkSession($action){
	global $settings;
	if(!isset($_SESSION['USER']) || (time() - $_SESSION['TIMER']) > $_SESSION['SESSIONTIMEOUT'] || !is_callable($action))
		doLogout();
	else{
		$_SESSION['TIMER'] = time();
		call_user_func($action);
	}
}

function hasSession(){
	global $settings;
	if(!isset($_SESSION['USER']) || (time() - $_SESSION['TIMER']) > $_SESSION['SESSIONTIMEOUT']){
		$arr = array('hasSession' => false, 'action' => 'doLogout');
		doLogout();
	}
	else{
		$arr = array('hasSession' => true, 'action' => 'dashboard');
	}
	
	echo json_encode($arr);
	
}

function writeLog($msg,$lvl){
/*
lvl 0 - off
lvl 1 - error
lvl 2 - warning
lvl 3 - info
lvl 4 - debug
*/
	global $settings;

	if($settings['log']['level'] >= $lvl){
		$fd = fopen($settings['log']['file'], "a");
		$str = "[" . date("Y/m/d h:i:s", time()) . "] " . $msg; 
		fwrite($fd, $str . "\n");
		fclose($fd);
	}
}
