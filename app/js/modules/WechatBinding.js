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
        if (this.state.telephone.length < 1 || this.state.telephone.length > 11) {
            alert("手机号码格式不正确");
        }
        else if (this.state.smscode.length != 6) {
            alert("验证码格式不正确")
        }
        else {
            //submit
            var postData = {
                "telephone": this.state.telephone,
                "smscode": this.state.smscode,
            };
            jsonp("/account/jxlogin", postData, "POST", function (data) {
                if (data.code == 0) {
                    sessionStorage.jxsession = data.data.jxsession;

                    if(data.data.edit == 1){
                        this.context.router.push("/bindinginfo");
                    }else {
                        history.back();
                    }


                }
                else {
                    alert(data.message)
                }
            }.bind(this));
        }
    },
    componentDidMount:function() {
        // var code = "";
        // if (typeof(this.props.location.query.code) == "string") {
        //     code = this.props.location.query.code;
        // }
        // var postData = {"code": code};
        // console.log("postData"+JSON.stringify(postData));
        // jsonp("/wechat/wechatbinding/getPCD", postData, "POST", function (data) {
        //     if (data.code == 0) {
        //         // var provs_data = data.data.province;
        //         // var citys_data = data.data.city;
        //         // var dists_data = data.data.district;
        //         // var allcitys_data = data.data.allcities;
        //         // var deps_data = data.data.office;
        //         // var area2 = new LArea();
        //         // area2.init({
        //         //     'trigger': '#address',
        //         //     'valueTo': '#addressvalue',
        //         //     'keys': {
        //         //         id: 'id',
        //         //         name: 'name'
        //         //     },
        //         //     'type': 2,
        //         //     'data': [provs_data, citys_data, dists_data]
        //         // });
        //         this.setState({
        //             options:data.data
        //         })
        //     }
        //     else {
        //         console.error(data.message)
        //     }
        // }.bind(this));
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

        return (
            <div>
                <div className="orderTitle">绑定手机</div>
                <form className="form-horizontal" id="bindingform">
                    <table className="bind">
                        <tbody>
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
