<?php
date_default_timezone_set('PRC');
//echo date('Y-m-d H:i:s');
//$servername = "localhost";
//$username = "username";
//$password = "password";
 
 require_once('/home/work/www/BeJinXingJK/www/db.php');
// require_once('/home/work/www/BeJinXingJK/www/config.php');
// 创建连接
$db = new class_mysql();
if($db){
echo "连接成功";}
//$conn = new DB('mysql', DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
 
// 检测连接
/*if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
	echo "连接";
} 
echo "连接成功";*/
$result = "SELECT * FROM ph_qrcode WHERE openid = 'oKe2EwWLwAU7EQu7rNof5dfG1U8g'";
$sql = "INSERT INTO ph_qrcode (qrcode_id, scene_id, status, year, month, day, date_added, openid) VALUES (NULL, '123','1', '".date("Y")."', '".date("m")."', '".date("d")."','".date("Y-m-d H:i:s")."','1')";
//$db->query($result);
$aa = $db->query_array($result);
var_dump($aa);
