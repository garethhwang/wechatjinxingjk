/**
 * Created by sally on 2017/2/14.
 */
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

window.hasClass=function(elem, cls){
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

window.errorMsg=function(data){
    var fullurl = window.location.href;

    switch (data.code){
        case 1001:alert(data.message);
            break;
        case 1011:
			alert(data.message);
            var newurl = fullurl.replace(/personalinfo/, "register");
            console.log("new url is : " + newurl);
            location.href = newurl;

            //("如果您是孕妇用户。。。。。")
            //{this.showModal};
            break;
        case 1012:
            alert(data.message);
            wx.closeWindow();
            //var newurl = fullurl.replace(/physicalreceipt/,"edituser");
            //console.log("new url is : " + newurl);
            //location.href = newurl;
            break;
        case 1013:
            alert(data.message);
            //alert("您不是高危孕妇，不需要进行回访调查喔");
            wx.closeWindow();
            //var newurl = fullurl.replace(/physicalreceipt/,"personalInfo");
            //console.log("new url is : " + newurl);
            //location.href = newurl;
            break;
        case 1014:
            alert(data.message);
            //alert("本次回访调查已成功提交！");
            wx.closeWindow();
            //var newurl = fullurl.replace(/physicalreceipt/,"personalInfo");
            //console.log("new url is : " + newurl);
            //location.href = newurl;
            break;
        case 1015:
            alert(data.message);
            //alert("您未到下次回访时间，请耐心等待哦");
            wx.closeWindow();
            //var newurl = fullurl.replace(/physicalreceipt/,"personalInfo");
            //console.log("new url is : " + newurl);
            //location.href = newurl;
            break;
        case 1016:
            alert(data.message);
            //var newurl = fullurl.replace(/physicalreceipt/,"personalInfo");
            //console.log("new url is : " + newurl);
            //location.href = newurl;
            //alert("您的回访调查已结束！");
            wx.closeWindow();
            break;
        case 1020:alert(data.message);
            var newurl = fullurl.replace(/productcategory\/20/,"binding");
            console.log("new url is : " + newurl);
            location.href = newurl;
            break;
        case 1002:
            var newurl = fullurl.replace(/\/#\/.*$/, "/#/binding");
            var newurl = newurl.replace(/\/?.*$/, "/#/binding");
            console.log("new url is : " + newurl);
            location.href = newurl;
			break;
        default:
            alert(data.message);
    }
}
    window.setCookie=function(key,val,time){//设置cookie方法
        var date=new Date(); //获取当前时间
        var expiresDays=time;  //将date设置为n天以后的时间
        date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
    },
    window.getCookie=function(key){//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
            var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips=arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
    },
    window.deleteCookie=function(key) { //删除cookie方法
    var date = new Date(); //获取当前时间
    date.setTime(date.getTime() - 10000); //将date设置为过去的时间
    document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
    }

global.ImgUrl="http://be.jinxingjk.com/";
