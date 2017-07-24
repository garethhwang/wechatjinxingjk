/**
 * Created by sally on 2017/2/15.
 */
import React from 'react'
import { Link } from 'react-router'
let jsonp = require('../lib/jsonp');

export default React.createClass({
    componentWillMount:function(){
        document.title = '基本信息';

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
    getInitialState: function () {
        return {
            data: {
                "wechat_id": "",
                "subscribe": "",
                "openid": "",
                "nickname": "",
                "sex": "",
                "city": "",
                "country": "",
                "province": "",
                "wlanguage": "",
                "headimgurl": "",
                "subscribe_time": null,
                "unionid": null,
                "remark": null,
                "groupid": null,
                "customer_id": "",
                "customer_group_id": "",
                "store_id": "",
                "language_id": "",
                "email": "",
                "telephone": "",
                "fax": null,
                "password": null,
                "salt": "",
                "cart": null,
                "wishlist": null,
                "newsletter": "",
                "address_id": "",
                "custom_field": "",
                "ip": "",
                "status": "",
                "approved": "",
                "safe": "",
                "token": "",
                "code": "",
                "date_added": "",
                "department": "",
                "productiondate": null,
                "pregnantstatus": "",
                "babybirth": "",
                "realname": "",
                "physical_id": "",
                "barcode": "",
                "birthday": "",
                "receiptdate": "",
                "ispregnant": "",
                "height": "",
                "bmiindex": "",
                "bmitype": "",
                "lastmenstrualdate": "",
                "edc": "",
                "gravidity": "",
                "parity": "",
                "vaginaldelivery": "",
                "aesarean": "",
                "spontaneousabortion": "",
                "drug_inducedabortion": "",
                "fetal": "",
                "highrisk": "",
                "highriskfactor": "",
                "weight": "",
                "householdregister": "",
                "district": "",
                "address_1": "",
                "header": ""
            }
        };
    },
    componentDidMount: function () {
        var postData = {"document_id": this.props.params.id};
        jsonp("/account/personal_center", postData, "POST", function (data) {
            if (data.code == 0) {
                this.setState({
                    data: data.data
                });
            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },
    render: function () {
        var editurl = "/edituser?code="+document.code;

        return (
            <div>
                <div className="userinfo_top">
                    <img src={this.state.data.headimgurl}/>
                </div>
                <div className="userinfo_edit"><Link to={editurl}><span>修改资料</span></Link></div>

                <div className="userinfo_title">宝妈资料</div>
                <div className="userinfo_content">
                    <table>
                        <tbody>
                        <tr>
                            <td className="left">真实姓名：</td>
                            <td>{this.state.data.realname}</td>
                        </tr>
                        <tr>
                            <td>手机号码：</td>
                            <td>{this.state.data.telephone}</td>
                        </tr>
                        <tr>
                            <td>条形码：</td>
                            <td>{this.state.data.barcode}</td>
                        </tr>
                        <tr>
                            <td>出生日期：</td>
                            <td>{this.state.data.birthday}</td>
                        </tr>
                        <tr>
                            <td>保健科室：</td>
                            <td>{this.state.data.department}</td>
                        </tr>
                        <tr>
                            <td>身高：</td>
                            <td>{this.state.data.height}</td>
                        </tr>
                        <tr>
                            <td>体重：</td>
                            <td>{this.state.data.weight}</td>
                        </tr>
                        <tr>
                            <td>BMI分类：</td>
                            <td>{this.state.data.bmitype}</td>
                        </tr>
                        <tr>
                            <td>BMI值：</td>
                            <td>{this.state.data.bmiindex}</td>
                        </tr>
                        <tr>
                            <td>末次月经时间：</td>
                            <td>{this.state.data.lastmenstrualdate}</td>
                        </tr>
                        <tr>
                            <td>预产期：</td>
                            <td>{this.state.data.edc}</td>
                        </tr>
                        <tr>
                            <td>孕次：</td>
                            <td>{this.state.data.gravidity}</td>
                        </tr>
                        <tr>
                            <td>产次：</td>
                            <td>{this.state.data.parity}</td>
                        </tr>
                        <tr>
                            <td>分娩次数：</td>
                            <td>{this.state.data.vaginaldelivery}</td>
                        </tr>
                        <tr>
                            <td>剖宫产次数：</td>
                            <td>{this.state.data.aesarean}</td>
                        </tr>
                        <tr>
                            <td>自然流产次数：</td>
                            <td>{this.state.data.spontaneousabortion}</td>
                        </tr>
                        <tr>
                            <td>药物及人工流产次数：</td>
                            <td>{this.state.data.drug_inducedabortion}</td>
                        </tr>
                        <tr>
                            <td>是否高危：</td>
                            <td>{this.state.data.highrisk}</td>
                        </tr>
                        <tr>
                            <td>高危因素：</td>
                            <td >{this.state.data.highriskfactor}</td>
                        </tr>
                        <tr>
                            <td>是否是本市户籍：</td>
                            <td >{this.state.data.householdregister}</td>
                        </tr>
                        <tr>
                            <td>居住地区：</td>
                            <td >{this.state.data.district}</td>
                        </tr>
                        <tr>
                            <td>详细地址：</td>
                            <td >{this.state.data.address_1}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
})
