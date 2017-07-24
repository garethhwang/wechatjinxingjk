/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import { router } from 'react-router'
import { createForm } from 'rc-form';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import arrayTreeFilter from 'array-tree-filter';
require('../../css/LArea.css');
require('../lib/LArea');
require("../lib/util");
let jsonp = require('../lib/jsonp');

let district = "";



export default React.createClass({
    getInitialState: function () {
        return {
            realname: '',
            telephone: "",
            smscode: "",
            district: "",
            pregnantstatus: 0,
            addressvalue: "",
            address_1: ""
        }
    },
    contextTypes:{
        router: React.PropTypes.object.isRequired
    },
    handleChange:function(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    },


    handleSubmit:function(event) {
        event.preventDefault();
        if ( this.state.realname.length < 1 || this.state.realname.length > 32) {
            alert("姓名格式不正确");
        }
        else if (this.state.telephone.length < 1 || this.state.telephone.length > 11) {
            alert("手机号码格式不正确");
        }
        else if (this.state.smscode.length != 6) {
            alert("验证码格式不正确")
        }
        // else if (this.state.pregnantstatus.trim().length < 1) {
        //     alert("状态不能为空");
        // }
        else if (this.state.pregnantstatus == 2 && this.state.babybirth.trim().length<1) {
            alert("宝宝生日不能为空");
        }
        else if (district.trim().length < 1) {
            alert("服务区域不能为空")
        }
        else if (this.state.address_1.trim().length < 1) {
            alert("详细地址不能为空");
        }
        else {
            //submit
            var postData = {
                "telephone": this.state.telephone,
                "realname": this.state.realname,
                "smscode": this.state.smscode,
                "babybirth":this.state.babybirth,
                "pregnantstatus": this.state.pregnantstatus,
                "district": district,
                "address_1": this.state.address_1
            };
            jsonp("/wechat/wechatbinding", postData, "POST", function (data) {
                if (data.code == 0) {
                    this.context.router.push("/registersuccess");
                }
                else {
                    alert(data.message)
                }
            }.bind(this));
        }
    },
    componentDidMount:function() {
        var code = "";
        if (typeof(this.props.location.query.code) == "string") {
            code = this.props.location.query.code;
        }
        var postData = {"code": code};
        console.log("postData"+JSON.stringify(postData));
        jsonp("/wechat/wechatbinding/getPCD", postData, "POST", function (data) {
            if (data.code == 0) {
                // var provs_data = data.data.province;
                // var citys_data = data.data.city;
                // var dists_data = data.data.district;
                // var allcitys_data = data.data.allcities;
                // var deps_data = data.data.office;
                // var area2 = new LArea();
                // area2.init({
                //     'trigger': '#address',
                //     'valueTo': '#addressvalue',
                //     'keys': {
                //         id: 'id',
                //         name: 'name'
                //     },
                //     'type': 2,
                //     'data': [provs_data, citys_data, dists_data]
                // });
                this.setState({
                    options:data.data
                })
            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },
    sendMsg:function(event) {
        event.preventDefault();
        if (this.state.telephone.length == 0) {
            alert("请输入手机号码！");
            return;
        }
        if (this.state.telephone.length != 11) {
            alert("请输入有效的手机号码！");
            return;
        }

        var InterValObj; //timer变量，控制时间
        var count = 90; //间隔函数，1秒执行
        var curCount;//当前剩余秒数
        curCount = count;
        var sendCodeObj = document.getElementById("btnSendCode");
        if (!hasClass(sendCodeObj, "sendMsgBtn")) {
            return;
        }

        var reg = new RegExp('(\\s|^)' + "sendMsgBtn" + '(\\s|$)');
        sendCodeObj.className = sendCodeObj.className.replace(reg, ' ');
        sendCodeObj.className += " " + "sendMsgBtnDis";

        //设置button效果，开始计时
        sendCodeObj.innerHTML = "请在" + curCount + "秒内输入";
        InterValObj = window.setInterval(function () {
            if (curCount == 0) {
                window.clearInterval(InterValObj);//停止计时器
                sendCodeObj.className += " " + "sendMsgBtn";
                var reg = new RegExp('(\\s|^)' + "sendMsgBtnDis" + '(\\s|$)');
                sendCodeObj.className = sendCodeObj.className.replace(reg, ' ');
                sendCodeObj.innerHTML = "重新发送";
            }
            else {
                curCount--;
                sendCodeObj.innerHTML = "请在" + curCount + "秒内输入";
            }
        }, 1000); //启动计时器，1秒执行一次

        //发送验证码
        var postData = {"telephone": this.state.telephone};
        jsonp("/wechat/wechatbinding/validcode", postData, "POST", function (data) {
            if (data.code == 0) {
                alert(data.message);
            }
            else {
                alert(data.message)
            }
        }.bind(this));
    },
    componentWillMount: function () {
        document.title = '金杏健康';
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

            let result = this.getSel(v);

            document.getElementById("district").value=result;
        }
    },

    getSel(value) {if (!value) { return ''; } const treeChildren = arrayTreeFilter(this.state.options, (c, level) => { return c.value === value[level]; }); return treeChildren.map((v) => { return v.label; }).join(','); },
    render: function () {

        /*<input id="address" name="district" className="formcontroller" type="text" readOnly=""
         placeholder="选择区域" value={this.state.district} onChange={this.handleChange}/>
         <input id="addressvalue" type="hidden" name="addressvalue"
         value={this.state.addressvalue} onChange={this.handleChange}/>*/

        return (
            <div>
                <div className="orderTitle">绑定手机</div>
                <form className="form-horizontal" id="bindingform">
                    <table className="bind">
                        <tbody>
                        <tr>
                            <td>姓名</td>
                            <td className="colwidth">
                                <input type="text" name="realname" className="formcontroller"
                                       value={this.state.realname}
                                       onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>手机</td>
                            <td>
                                <input type="text" name="telephone" id="telephone" className="formcontroller"
                                       value={this.state.telephone} onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                验证码
                            </td>
                            <td>
                                <span className = "sendMsg_parent">
                                   <table className="sendMsg formcontroller">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <input type="text" name="smscode" id="verificationcode"
                                                   onChange={this.handleChange}/>
                                        </td>
                                        <td className="sendMsgBtn" id="btnSendCode" onClick={this.sendMsg}>
                                            发送验证码
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>状态</td>
                            <td>
                                <select className="formcontroller" name="pregnantstatus"
                                        value={this.state.pregnantstatus} onChange={this.handleChange}>
                                    <option value="0">未怀孕</option>
                                    <option value="2">已生产</option>
                                    <option value="3">孕产妇家属</option>
                                </select>
                            </td>
                        </tr>
                        {(() => {
                            if (this.state.pregnantstatus == "2") {
                                return (
                                    <tr>
                                        <td>宝宝生日</td>
                                        <td>
                                            <input type="date" className="formcontroller" name="babybirth" value={this.state.babybirth}
                                                   onChange={this.handleChange}/>
                                        </td>
                                    </tr>
                                )
                            }
                        })()}
                        <tr>
                            <td>服务区域</td>
                            <td>
                                <Picker
                                    data={this.state.options}
                                    title="服务区域"
                                    onChange={this.onDistrictOptions}
                                >
                                    <input id="district"  type="text" readOnly="true"  className="formcontroller"></input>
                                </Picker>
                            </td>
                        </tr>
                        <tr>
                            <td>详细地址</td>
                            <td>
                                <input type="text" name="address_1" className="formcontroller"
                                       value={this.state.address_1}
                                       onChange={this.handleChange}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="bindBottom">
                    <span className="whitebtn active bindBtn" id="register_submitbtn"
                          onClick={this.handleSubmit}>提交</span>
                    </div>
                </form>
            </div>
        );
    }
})
