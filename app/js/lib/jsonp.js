/**
 * JSONP操作
 * @param url : 请求的url
 * @param data : 发送数据
 * @param jsonpcallback : 服务器给出的JSONP端口的API名称
 * @param callback : 执行JSONP获取数据的回调函数
 */
;(function () {
    var jsonp = function (url, data, method, callback) {
        var http = require('http');
        var querystring = require('querystring');

        var fullurl = window.location.href;
        console.log("full url is : " + fullurl);
        var codeIndex = fullurl.indexOf("code=");
        var code = "";
        if( codeIndex != -1 ) {
            var codeLastIndex = fullurl.indexOf("&", codeIndex);
            if( codeLastIndex != -1 ) {
                code = fullurl.substr(codeIndex+5,codeLastIndex-codeIndex-5);
            } else {
            	var codeLastIndex = fullurl.indexOf("#", codeIndex);
                if( codeLastIndex != -1 ) {
                    code = fullurl.substr(codeIndex+5,codeLastIndex-codeIndex-5);
                } else {
                    code = fullurl.substr(codeIndex+5);
                }
            }
        }

		if( sessionStorage.wechatcode === undefined || sessionStorage.wechatcode == "" ) {
			sessionStorage.wechatcode = code;
		} else {
			code = sessionStorage.wechatcode;
		}

        console.log("code is : " + code);
	    if( data == null ) {
            data = { "code": code };
        } else {
            data["code"] = code;
        }

		if( sessionStorage.jxsession === undefined || sessionStorage.jxsession == "" ) {
		} else {
			data["jxsession"] = sessionStorage.jxsession;
            console.log("jxsession is : " + sessionStorage.jxsession);
		}

        var postData = data;
        console.log("post json is : " + JSON.stringify(postData));

        var options = {
            hostname: 'be.jinxingjk.com',
            port: 80,
            path: url,
            method: method,
            header: {
                'Content-Type':'application/x-www-form-urlencoded',
                //'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Content-Length': Buffer.byteLength(querystring.stringify(postData))
            }
        }
        var req = http.request(options, function (res) {
            console.log('Status:', res.statusCode);
            res.setEncoding('utf-8');
            var responseString = '';
            res.on('data', function (data) {
                responseString += data;
            });
            res.on('end', function () {
                console.log(responseString);
                callback(JSON.parse(responseString));
                console.log('No more data in response.********');
            });
        });
        req.on('error', function (err) {
            console.error(err);
        });
        req.write(JSON.stringify(postData));
        req.end();
    };
    window.jsonp = jsonp;
})();
module.exports = jsonp;
