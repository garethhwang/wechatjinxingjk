/**
 * Created by sally on 2017/2/23.
 */
var http=require('http');
var querystring=require('querystring');
var postData={"product_id": 50};
var options={
    hostname:'wechat.jinxingjk.com',
    port:80,
    path:'/product/product',
    method:'POST',
    header:{
        //'Content-Type':'application/x-www-form-urlencoded',
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':Buffer.byteLength(querystring.stringify(postData))
    }
}
var req=http.request(options, function(res) {
    console.log('Status:',res.statusCode);
    console.log('headers:',JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data',function(chun){
        console.log('body分隔线---------------------------------\r\n');
        console.info(chun);
    });
    res.on('end',function(){
        console.log('No more data in response.********');
    });
});
req.on('error',function(err){
    console.error(err);
});
req.write(JSON.stringify(postData));
req.end();
