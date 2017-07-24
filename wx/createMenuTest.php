<?php

$createMenuObj = new createMenu();
$createMenuObj->create();

class createMenu
{
    public function create()
    {
        $appid="wxcbdd2080caff37fe";
        $redirect_uri="http://test.jinxingjk.com/";
        /*生成自定义菜单开始*/

        $xjson = '{"button":[
        {
                "name": "健康服务",
                "type": "view",
                "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.$redirect_uri.'?response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
	   },
        {
                "name": "帮助手册",
                "type": "view",
                "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.$redirect_uri.'#/documents&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
	   },
            {
                "name": "个人中心",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "个人信息",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.$redirect_uri.'#/personalinfo&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
                    },

		    {
                        "type": "view",
                        "name": "回访调查",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.$redirect_uri.'#/physicalreceipt&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
                    },
           {
                        "type": "view",
                        "name": "投诉建议",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.$redirect_uri.'#/advise?&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
                    }
			]
		}
		]
	}';

        $jsonMenu = json_encode($xjson);
        $post_url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=EE3Q6hAL8xEVTbQGuK4yFj0zHcLfH88uZM0xlirjkNyjdljloveyUGUKpVcqz9E-klshZa-CRr_Dg-3Q3TU2ahbSxKVmg5r-XBC88qtraob2ksgzA-xzqKgI5knYnWdZASBgAGARJS';
        $ch = curl_init($post_url);

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS,$xjson);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($xjson))
        );

        $respose_data = curl_exec($ch);
        echo $respose_data;exit;
        /*生成自定义菜单结束*/
    }
}
?>


