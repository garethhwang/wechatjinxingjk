/**
 * Created by sally on 2017/2/26.
 */
import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router'
import { Carousel } from 'antd-mobile'
let jsonp = require('../lib/jsonp');

export default React.createClass({
    getInitialState: function () {
        return {
            imgUrls: [{url:""}],
            heading_title: "",
            price: "",
            service_timer: "",
            applicable_user: {__html: ""},
            description: {__html: ""},
            service_notes: {__html: ""},
            service_tel: ""
        }
    },
    componentDidMount: function () {
        var postData = {"product_id": this.props.params.id};
        jsonp("/product/product", postData, "POST", function (data) {
            if (data.code == 0) {
                var imgArray = new Array();
                var bannerLen = data.data.images.length;
                for (var i = 0; i < bannerLen; i++) {
                    var bannerObj = data.data.images[i];
                    imgArray.push({"url": global.ImgUrl+bannerObj.image});
                }
                document.title = data.data.name;
                this.setState({
                    imgUrls:imgArray,
                    heading_title: data.data.name,
                    price: data.data.price,
                    service_timer: data.data.service_timer,
                    applicable_user: {__html: data.data.applicable_user},
                    description: {__html: data.data.description},
                    service_notes: {__html: data.data.service_notes},
                    service_tel: data.data.service_tel
                });
            }
            else {
                errorMsg(data);
            }
        }.bind(this));

        var postData2 = {"url": location.href.split('#')[0]};
        jsonp("/wechat/accesstoken/jsapisign", postData2, "POST", function (data) {

           var fullurl = window.location.href;
           var newurl = fullurl.replace(/\/\?response_type.*state=STATE#\//, "#/");
           var newurl = newurl.replace(/\?response_type.*state=STATE/, "");
           wx.config({
               debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
               appId: data.appId, // 必填，公众号的唯一标识
               timestamp: data.timestamp, // 必填，生成签名的时间戳
               nonceStr: data.nonceStr, // 必填，生成签名的随机串
               signature: data.signature,// 必填，签名，见附录1
               jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
           });

           wx.ready(function(){
           });

           wx.error(function(res){
           });

           wx.onMenuShareAppMessage({
               title: document.title, // 分享标题
               desc:  "健康顾问通过中医推拿手法，刺激相应穴位和经络，为新生儿身体成长打下坚实基础，同时也有效的促进妈妈身体恢复", // 分享描述
               link: newurl, // 分享链接
               imgUrl: global.ImgUrl + 'image/logo.jpg',
               type: 'link', // 分享类型,music、video或link，不填默认为link
               dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
               success: function () { 
               // 用户确认分享后执行的回调函数
               },
               cancel: function () { 
               // 用户取消分享后执行的回调函数
               }
           });

        }.bind(this));

    }
    ,
    render: function () {
        return (
            <div>
                <div id="header">
                  <Carousel
                    className="my-carousel" autoplay={true} infinite selectedIndex={1}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                  >
                    {this.state.imgUrls.map(img => (
                        <img
                          src={img.url}
                          onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({
                              initialHeight: null,
                            });
                          }}
                        />
                    ))}
                  </Carousel>
                </div>
                <div className="product_divdetail">
                    <table width="100%" className="product_tabledetail">
                        <tbody>
                        <tr>
                            <td >
                                <div>
                                    <label className="product_titile">{this.state.heading_title}</label>
                                </div>
                            </td>

                                {(() => {
                                    if (this.state.service_timer != 0) {
                                        return (
                                            <td width="33%">
                                                <div width="100%" style = {{textAlign:'center'}}>
                                                    <div className="clockDiv">
                                                        <img src="app/image/clock.png"/>
                                                    </div>
                                                    <div className="timeOuter">
                                                        <label className="time">{this.state.service_timer}分钟</label>
                                                    </div>
                                                </div>
                                            </td>
                                        )
                                    }
                                })()}

                            <td>
                                <div className="priceDiv">
                                    <label className="product_price">￥{this.state.price}</label>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="product_separater">
                </div>
                <div className="product_targetuser">
                    <label>适用人群：</label>
                    <label dangerouslySetInnerHTML={this.state.applicable_user}></label>
                </div>
                <div className="product_separater divMargin">
                </div>
                <div className="product_desc">
                    <label>服务介绍：</label>
                    <p dangerouslySetInnerHTML={this.state.description}></p>
                </div>
                <div className="product_separater divMargin1">
                </div>
                <div className="product_desc2">
                    <label>服务须知：</label>
                    <p dangerouslySetInnerHTML={this.state.service_notes}></p>
                </div>
                <div className="footerblock"></div>
                <footer className="productfooter_mobile productv2_footwrap">
                    <div className="product_foot">
                        <div className="left"><a href={"tel:"+this.state.service_tel}>电话预约</a></div>
                        <div className="row">
                        </div>
                        <div className="left">
                            <Link to={"/order/"+this.props.params.id}>下单支付</Link>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
})
