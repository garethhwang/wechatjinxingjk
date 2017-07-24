<?php

$deleteMenuObj = new deleteMenu();
$deleteMenuObj->delete();

class deleteMenu
{
    public function delete()
    {
        $appid="wx5ce715491b2cf046";
        $redirect_uri="http://wechat.jinxingjk.com/";
        /*生成自定义菜单开始*/

        $get_url = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=E8VX0dBtvMVwxi1Mkhh0lJDJXJtspJM_S31fq5N7J7xgPS3vVi8LqfQWQ0xrODtv8doZA7B-eXUrkM2oh7VPfAhW3LrtdTM8LYlGFlRsOjHl7Ff-TDQASreDNXIO6klqZIGaAHALUS';
        $ch = curl_init($get_url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
        $respose_data = curl_exec($ch);
        echo $respose_data;exit;
        /*生成自定义菜单结束*/
    }

}
?>
