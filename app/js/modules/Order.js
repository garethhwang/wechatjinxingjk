/**
 * Created by sally on 2017/3/3.
 */
import React from 'react'
import { Popup, List, Button, Icon, Picker, Badge } from 'antd-mobile';
import arrayTreeFilter from 'array-tree-filter';
require('../../css/LArea.css');
require('../lib/LArea');
require("../lib/util");
let jsonp = require('../lib/jsonp');

let district = "";

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
    // Note: the popup content will not scroll.
    maskProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

export default React.createClass({
    getInitialState: function () {
        return {
            product_id:"",
            name: "",
            price: "",
            realname: "",
            telephone: "",
            productCount: 1,
            //address: "1111",
            //addressvalue: "1111",
            //shipping_address_1: "",
            service_tel: "",
            shipping_date:"",
            countPrice: "",
            couponcode: "",
            sel: '',
            couponIndex:null,
            couponvalue:"",
            doctorname:'',
            doctor_id:'',
            service_timer:''
        }
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    addCount: function (event) {
        event.preventDefault();
        var temp = this.state.productCount;
        if (event.target.value == "-") {
            temp = temp - 1;

            if (temp <= 0) {
                temp = 1
            }
        } else {
            temp = temp + 1;
        }
        this.setState({productCount: temp});
        this.setState({countPrice: temp * this.state.price});
    },
    handleVoucher: function (event) {
        event.preventDefault();
        if (hasClass(event.target, "whitebtn active")) {
            var couponcode = document.getElementById("couponcode").value;

            var useObj = document.getElementById("useVoucher");
            var reg = new RegExp('(\\s|^)' + "whitebtn active" + '(\\s|$)');
            useObj.className = useObj.className.replace(reg, ' ');

            var postData = {"product_id": 50, "couponcode": couponcode}
            jsonp("/wechat/order/validcoupon", postData, "POST", function (data) {
                if (data.code == 0) {
                    alert("折扣券成功启用");
                    useObj.className += " " + "whitebtn active";

                }
                else {
                    alert(data.message);
                    useObj.className += " " + "whitebtn active";

                }
            }.bind(this));
        }
    },
    handleSubmit: function () {

       //alert('id = '+sessionStorage.doctorid+'    name ='+sessionStorage.doctorname) ;

       //return;

        if (document.getElementsByName("realname")[0].value.trim().length == 0) {
            alert("姓名不能为空");
        } else if (document.getElementsByName("telephone")[0].value.trim().length < 1 || document.getElementsByName("telephone")[0].value.trim().length > 11) {
            alert("电话格式不正确");
        } else if (document.getElementById("district").value.trim().length == 0) {
            alert("区域不能为空");
        } else if (document.getElementsByName("address_1")[0].value.trim().length == 0) {
            alert("详细地址不能为空");
        }
        // else if (document.getElementsByName("shipping_date")[0].value.trim().length == 0) {
        //     alert("日期不能为空");
        // }
        else {

            var postData = this.state;

            if(district.length == 0){
                let temp = "";
                for(let i = 0; i< this.state.districtid.length;i++){

                    if(i != this.state.districtid.length - 1){
                        temp = temp + this.state.districtid[i]+',';
                    }else{
                        temp = temp + this.state.districtid[i];
                    }

                }

                postData.city = temp;
            }else {
                postData.city = district;
            }

            jsonp("/wechat/order/addOrder", postData, "POST", function (data) {
                if (data.code == 0) {
                    sessionStorage.doctorid = "";
                    sessionStorage.doctorname = "";

                    this.context.router.push("/orderadd/"+data.data.order_id+"?code="+document.code);
                }
                else {
                    errorMsg(data);
                }
            }.bind(this));

        }
    },
    handleChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(name == 'shipping_date'){
            sessionStorage.shipping_date = target.value;
        }

        this.setState({
            [name]: value
        });
    },
    componentWillMount:function(){
        console.log('componentWillMount');

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
        console.log("will mount code is : " + code);
        document.code = code;

    },
    componentDidMount: function () {
        console.log('componentDidMount');

        if(sessionStorage.doctorname != '' || sessionStorage.doctorname == undefined||sessionStorage.doctorid!=''||sessionStorage.doctorid==undefined){
            this.setState({
                doctorname:sessionStorage.doctorname,
                doctor_id:sessionStorage.doctorid
            })
        }

        if(sessionStorage.shipping_date != ''||sessionStorage.shipping_date==undefined){
            this.setState({shipping_date:sessionStorage.shipping_date});
        }

        this.getAddress();
        var postData = {"product_id": this.props.params.id};
        // postData = {"product_id": 50};
        jsonp("/wechat/order", postData, "POST", function (data) {
            if (data.code == 0) {
                this.setState({
                    product_id:this.props.params.id,
                    name: data.data.name,
                    price: data.data.price,
                    //realname: data.data.realname,
                    telephone: data.data.telephone,
                    productCount: 1,
                    countPrice: data.data.price,
                    city:data.data.city,
                    districtid:data.data.districtid.split(','),
                    //address_1:data.data.address_1,
                    service_tel: data.data.service_tel,
                    options:data.data.pcd_data,
                    couponall:data.data.couponall,
                    service_timer:data.data.service_timer
                });

                document.getElementById("district").value = this.getSel(this.state.districtid,this.state.options);
            }
            else {
                //console.error(data.message)
            }
        }.bind(this));
    },
    getAddress: function () {
        var postData = null;
        jsonp("/wechat/wechatbinding/getAddress", postData, "POST", function (data) {
            if (data.code == 0) {

            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },
    onDistrictOptions(v) {
        {

            let temp = "";
            for(let i = 0; i< v.length;i++){

                if(i != v.length - 1){
                    temp = temp + v[i]+',';
                }else{
                    temp = temp + v[i];
                }

            }

            district = temp;

            let result = this.getSel(v,this.state.options);

            document.getElementById("district").value=result;
        }
    },
    getSel(value,data) {if (!value) { return ''; } const treeChildren = arrayTreeFilter(data, (c, level) => { return c.value === value[level]; }); return treeChildren.map((v) => { return v.label; }).join(','); },
    onClose (sel){
        this.setState({ sel });
        Popup.hide();
    },
    onCouponClick(index,i){

        var couponcode = i.code;

        var postData = {"product_id": this.state.product_id, "couponcode": couponcode}
        jsonp("/wechat/order/getDiscount", postData, "POST", function (data) {
            if (data.code == 0) {
                this.setState({
                        couponvalue:i,
                        couponIndex:index,
                        countPrice:data.data.lastprice,
                        couponcode:i.code,
                    });

                this.onClose('cancel');
                console.log('key =' + index);
            }
            else {
                alert(data.message);

            }
        }.bind(this));
    }
    ,
    chooseDoctor(){
        this.context.router.push("/doctorlist/");
    },
    render() {
				/*
                <table width="98%">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="order_detail">医生</label>
                        </td>
                        <td width="45%">
                            <label className="order_detail">{this.state.doctorname}</label>
                        </td>
                        <td >
                            <input type="button" value="选择医生" className ="formcontroller" onClick={this.chooseDoctor}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
				*/
        return (
            <form id="order_form" style={{backgroundColor:'white'}}>
                <div className="order_title" style={{height:"13rem"}}>
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td style={{color:"#333"}}>{this.state.name}</td>
                            <td rowSpan="2" style={{textAlign:"right"}}>
                                <div style={{marginRight:"3rem"}} hidden>
                                    <input type="button" value="-" className="order_plusbtn" onClick={this.addCount}/>
                                    <label id="productCount">1</label>
                                    <input type="hidden" name="productCount" value={this.state.productCount}
                                           onChange={this.handleChange}/>
                                    <input type="button" value="+" className="order_plusbtn" onClick={this.addCount}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{color:"#fe8e19"}}><label>￥{this.state.price}&nbsp;&nbsp;</label></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <span className="order_detail">联系人</span>
                    <input type="text" name="realname" className="order_detail_input"  onChange={this.handleChange}/>
                </div>
                <div>
                    <span className="order_detail">联系电话</span>
                    <input type="text" name="telephone" className="order_detail_input" value={this.state.telephone} onChange={this.handleChange}/>
                </div>
                <table width="98%">
                    <tbody>
                    <tr>
                        <td width="25%">
                            <span className="order_detail_font">地址</span>
                        </td>
                        <td>
                            <Picker
                                data={this.state.options}
                                title="地址"
                                onChange={this.onDistrictOptions}
                            >
                                <input id="district"  type="text" readOnly="true"  className="formcontroller"></input>
                            </Picker>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <input type="text" name="address_1"  width="100%" placeholder="详细地址" className="order_detail_input order_detail_input_addressDetail"
                           onChange={this.handleChange}/>
                </div>
                <div>
                    {(() => {
                        if (this.state.service_timer != 0) {
                            return (
                                <div width="100%">
                                    <span className="order_detail">预约时间</span>
                                    <input type="date" name="shipping_date" value={this.state.shipping_date} className="order_detail_input" onChange={this.handleChange} />
                                </div>
                            )
                        }
                    })()}
                </div>
                <table width="98%">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="order_detail">折扣券</label>
                        </td>
                        <td width="45%">
                            <label className="order_detail">{this.state.couponvalue.name}</label>
                        </td>
                        <td>
                            <input type="button" value="选择优惠券" className ="formcontroller" onClick={ ()=>
                                Popup.show(
                                    <div>
                                        <List  className="popup-list">
                                            {this.state.couponall.map((i, index) =>{

                                                console.log("index = "+index+"     this.state.couponIndex = "+this.state.couponIndex);

                                                if(index == this.state.couponIndex){
                                                    return (
                                                        <List.Item  className="special-badge" extra={<Badge text={'促'} />}  key={index} onClick ={() =>this.onCouponClick(index,i) }>
                                                            <table className="couponTable" >
                                                                <tbody>
                                                                <tr>
                                                                    <td className="couponTd">
                                                                        <div>{i.name}</div>
                                                                        <div>{"有效期:  "+i.date_start+"至"+i.date_end}</div>
                                                                        <div>{"(全商品适用)"}</div>
                                                                    </td>
                                                                    <td width='3%'>
                                                                        <image className="couponImg" src={'app/image/cupon.png'} />
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </List.Item>
                                                    )
                                                }else {
                                                    return (
                                                        <List.Item  key={index} onClick ={() => this.onCouponClick(index,i)}>

                                                            <table className="couponTable" style={{paddingRight:'10%'}} >
                                                                <tbody>
                                                                <tr>
                                                                    <td className="couponTd">
                                                                        <div>{i.name}</div>
                                                                        <div>{"有效期:  "+i.date_start+"至"+i.date_end}</div>
                                                                        <div>{"(全商品适用)"}</div>
                                                                    </td>
                                                                    <td width='3%'>
                                                                        <image className="couponImg" src={'app/image/cupon.png'} />
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </List.Item>
                                                    )
                                                }}

                                            )}
                                        </List>
                                    </div>,
                                    { animationType: 'slide-up', maskClosable: true}
                                )
                            } />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="order_detail" style={{height: "22rem"}}>
                    温馨提示
                    <span><p className="info1">1、请您仔细核对您的手机号，并保持电话畅通，服务顾问会在服务开始前与此号码沟通相关事宜。<br />
        2、您有任何疑问，也可以随时拨打客服电话：<br />
        <a href={"tel:"+this.state.service_tel}><label className="info2">{this.state.service_tel}</label></a>前来咨询
    </p></span>
                </div>
                <div className="order_title" style={{borderBottom:"none"}}>
                    <label>合计：</label><label style={{color:"#fe8e19"}}>￥<label
                    id="countPrice">{this.state.countPrice}</label></label>

                </div>
                <div className="footerblock"></div>
                <footer className="productfooter_mobile productv2_footwrap" id="orderpay_submitbtn"
                        onClick={this.handleSubmit}>
                    <div className="product_foot info1">
                        <label className="info2">支付</label>
                    </div>
                </footer>
            </form>
        )
    }
})
