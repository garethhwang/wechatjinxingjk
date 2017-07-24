/**
 * Created by sally on 2017/3/3.
 */
import React from 'react'
require("../lib/util");
let jsonp = require('../lib/jsonp');

export default React.createClass({
    getInitialState: function () {
        return {
            name: "",
            price: "",
            shipping_realname: "",
            telephone: "",
            shipping_city: "",
            shipping_address_1: "",
            shipping_date: "",
            service_tel: "",
            coupontype: "",
            discount: "",
            lastprice: "",
            order_status_id: "",
            wxpay: "",
        }
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    onBridgeReady: function () {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', this.state.wxpay, function (res) {
                WeixinJSBridge.log(res.err_msg);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    //updateOrder();
                    var fullurl = window.location.href;
                    var newurl = fullurl.replace(/code=/, "changestatus=1&code=");
                    location.href = newurl;
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    alert("返回");
                } else {
                    alert(res.err_code+res.err_desc+res.err_msg);
                }
            }
        );
    },
    callpay: function (event) {
        event.preventDefault();
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
        }
        else {
            this.onBridgeReady();
        }
    },
    updateOrder:function(){
        var postData = {"order_id": this.props.params.id};
        jsonp("/wechat/orderStatusUpdate", postData, "POST", function (data) {
            if (data.code == 0) {
                //this.getOrderInfo();
                //this.context.router.push("/orderadd/"+this.props.params.id);
                this.setState({
                        name: data.data.store_name,
                        price: data.data.products[0].price,
                        shipping_realname: data.data.shipping_realname,
                        telephone: data.data.telephone,
                        shipping_city: data.data.shipping_city,
                        shipping_address_1: data.data.shipping_address_1,
                        shipping_date: data.data.shipping_date,
                        service_tel: data.data.service_tel,
                        coupontype: data.data.coupontype,
                        discount: data.data.discount,
                        lastprice: data.data.lastprice,
                        order_status_id: data.data.order_status_id
                });
            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },

    getOrderInfo:function(){
        var postData = {"order_id": this.props.params.id};
        jsonp("/wechat/orderDetail", postData, "POST", function (data) {
            if (data.code == 0) {
                this.setState({
                        name: data.data.products[0].name,
                        price: data.data.products[0].price,
                        shipping_realname: data.data.shipping_realname,
                        telephone: data.data.telephone,
                        shipping_city: data.data.shipping_city,
                        shipping_address_1: data.data.shipping_address_1,
                        shipping_date: data.data.shipping_date,
                        service_tel: data.data.service_tel,
                        coupontype: data.data.coupontype,
                        discount: data.data.discount,
                        lastprice: data.data.lastprice,
                        order_status_id: data.data.order_status_id,
                        wxpay: JSON.parse(data.data.wxpay)
                    });
            }
            else {
                errorMsg(data);
            }
        }.bind(this));
    },

    componentDidMount: function () {
        document.title = '金杏健康';
        var fullurl = window.location.href;
        if( fullurl.indexOf("changestatus") != -1 ) {
            this.updateOrder();
        } else {
            this.getOrderInfo();
        }
    },
    render() {
        return (
            <form id="order_form">
                <div className="order_title">
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td style={{color:"#333"}}>{this.state.name}</td>
                            <td style={{textAlign:"right",color:"#fe8e19"}}><label
                                style={{marginRight: "1.5rem"}}>{this.state.lastprice}</label></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="order_detail">
                    联系人&nbsp;&nbsp;<label name="realname">{this.state.shipping_realname}</label>
                </div>
                <div className="order_detail">
                    联系电话&nbsp;&nbsp;<label name="telephone">{this.state.telephone}</label>
                </div>
                <div className="order_detail">
                    地址&nbsp;&nbsp;<label
                    name="shipping_address_1">{this.state.shipping_city + this.state.shipping_address_1}</label>
                </div>
                <div className="order_detail">
                    日期&nbsp;&nbsp;<label name="shipping_date">{this.state.shipping_date}</label>
                </div>
                <div className="order_detail" style={{height: "20rem"}}>
                    温馨提示
                <span><p className="info1">1、请您仔细核对您的手机号，并保持电话畅通，服务顾问会在服务开始前与此号码沟通相关事宜。<br />
                    2、您有任何疑问，也可以随时拨打客服电话：<br />
                    <a href={"tel:" + this.state.service_tel}><label className="info2">{this.state.service_tel}</label></a>前来咨询
                </p></span>
                </div>
                <div className="order_title" style={{borderBottom: "none"}}>
                    <label>原价：</label><label style={{color: "#fe8e19"}}>￥{this.state.price}</label><br />

                    {(() => {
                        if (this.state.coupontype == "P") {
                            return (
                                <div>
                                    <label>折扣：</label><label
                                    style={{color:"#fe8e19"}}>{this.state.discount}%</label><br />
                                    <label>合计：</label><label style={{color:"#fe8e19"}}>￥{this.state.lastprice}</label><br /><br />
                                </div>
                            )
                        }
                        else if (this.state.coupontype == "F") {
                            return (
                                <div>
                                    <label>折扣：</label><label
                                    style={{color:"#fe8e19"}}>￥{this.state.discount}</label><br />
                                    <label>合计：</label><label style={{color:"#fe8e19"}}>￥{this.state.lastprice}</label><br /><br />
                                </div>
                            )
                        }
                        else {
                            return (
                                <div>
                                    <label>折扣：</label><label style={{color:"#fe8e19"}}>{this.state.discount}</label><br />
                                    <label>合计：</label><label style={{color:"#fe8e19"}}>￥{this.state.lastprice}</label><br /><br />
                                </div>
                            )
                        }
                    })()}

                    {(() => {
                        if (this.state.order_status_id && this.state.order_status_id=="1") {
                            return (
                                <footer className="productfooter_mobile productv2_footwrap" id="orderpay_submitbtn"
                                        onClick={this.callpay}>
                                    <div className="product_foot info1" id="PayProduct">
                                        <label className="info2">确认支付</label>
                                    </div>
                                </footer>
                            )
                        }
                    })()}

                </div>
            </form>
        )
    }
})
