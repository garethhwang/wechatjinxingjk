/**
 * Created by sally on 2017/2/15.
 */
import React from 'react'
import { Link,History } from 'react-router'
require('../../css/mui-switch.css');
let jsonp = require('../lib/jsonp');
require('../lib/util');
export default React.createClass({
    getInitialState: function () {
        return {
            firststart: "",
            firstend: "",
            secondstart: "",
            secondend: "",
            thirdstart: "",
            thirdend: "",
            historyrecord: 0
        }
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var countCheckXzbFalse = 0;
        if (document.getElementById("heart").checked) {
            for (var i = 0; i < document.getElementsByName("heartdisease[]").length; i++) {
                if (!document.getElementsByName("heartdisease[]")[i].checked) {
                    countCheckXzbFalse++;
                }
            }
        }
        var countCheckSbFalse = 0;
        if (document.getElementById("neph").checked) {
            for (var i = 0; i < document.getElementsByName("nephropathy[]").length; i++) {
                if (!document.getElementsByName("nephropathy[]")[i].checked) {
                    countCheckSbFalse++;
                }
            }
        }
        var countCheckGbFalse = 0;
        if (document.getElementById("hepa").checked) {
            for (var i = 0; i < document.getElementsByName("hepatopathy[]").length; i++) {
                if (!document.getElementsByName("hepatopathy[]")[i].checked) {
                    countCheckGbFalse++;
                }
            }
        }

        var countCheckJzxFalse = 0;
        if (document.getElementById("thy").checked) {
            for (var i = 0; i < document.getElementsByName("thyroid[]").length; i++) {
                if (!document.getElementsByName("thyroid[]")[i].checked) {
                    countCheckJzxFalse++;
                }
            }
        }

        var countCheckBloodFalse = 0;
        if (document.getElementById("bloods").checked) {
            for (var i = 0; i < document.getElementsByName("blood[]").length; i++) {
                if (!document.getElementsByName("blood[]")[i].checked) {
                    countCheckBloodFalse++;
                }
            }
        }

        var countCheckOtherFalse = 0;
        if (document.getElementById("otherelse").checked) {
            for (var i = 0; i < document.getElementsByName("others[]").length; i++) {
                if (!document.getElementsByName("others[]")[i].checked) {
                    countCheckOtherFalse++;
                }
            }
        }

        if (document.getElementById("heart").checked && countCheckXzbFalse == 3) {
            alert("心脏病必须勾选一项");
        }
        else if (document.getElementById("xzbcheck").checked && document.getElementsByName("xzb")[0].value.trim().length == 0) {
            alert("心脏病【其他】不能为空");
        }
        else if (document.getElementById("xzbcheck").checked && (document.getElementsByName("gxy")[0].value.trim().length == 0 && typeof(document.getElementsByName("gxy")[0].value) == "number")) {
            alert("血压数值必填且必须为数字");
        }
        else if (document.getElementById("GI").checked && (document.getElementsByName("tnb")[0].value.trim().length == 0 || typeof(document.getElementsByName("tnb")[0].value) == "number")) {
            alert("饭后两小时血糖值必填且必须为数字");
        }
        else if (document.getElementById("neph").checked && countCheckSbFalse == 3) {
            alert("肾病必须勾选一项");
        }
        else if (document.getElementById("hepa").checked && countCheckGbFalse == 4) {
            alert("肝病必须勾选一项");
        }
        else if (document.getElementById("hepa").checked && (document.getElementsByName("alt")[0].value.trim().length == 0 || typeof(document.getElementsByName("alt")[0].value) == "number")) {
            alert("ALT数值必填且为数字");
        }
        else if (document.getElementById("hepa").checked && (document.getElementsByName("ast")[0].value.trim().length == 0 || typeof(document.getElementsByName("ast")[0].value) == "number")) {
            alert("AST数值必填且为数字");
        }
        else if (document.getElementById("thy").checked && countCheckJzxFalse == 3) {
            alert("甲状腺功能异常必须勾选一项");
        }
        else if (document.getElementById("bloods").checked && countCheckBloodFalse == 3) {
            alert("血液疾病系统必须勾选一项");
        }
        else if (document.getElementById("bloods").checked && (document.getElementsByName("hgb")[0].value.trim().length == 0 || typeof(document.getElementsByName("hgb")[0].value) == "number")) {
            alert("贫血HGB数值必填且为数字");
        }
        else if (document.getElementById("blood2").checked && (document.getElementsByName("xqb")[0].value.trim().length == 0 || typeof(document.getElementsByName("xqb")[0].value) == "number")) {
            alert("血小板异常数值必填且为数字");
        }
        else if (document.getElementById("otherelse").checked && countCheckOtherFalse == 8) {
            alert("其他必须勾选一项");
        }
        else if (document.getElementById("other1").checked && document.getElementsByName("other")[0].value.trim().length == 0) {
            alert("其他必填");
        }
        else if (!document.getElementById("heart").value &&!document.getElementById("hyper").value&&!document.getElementById("GI").value&&!document.getElementById("neph").value&&!document.getElementById("hepa").value&&!document.getElementById("thy").value&&!document.getElementById("bloods").value&&!document.getElementById("otherelse").value) {
            alert("如果您觉得没有符合的项目，请在'其他'中的'其它'填写具体因素");
        }
        else {
            var switchBtn=new Array();
            var switchObj=document.getElementsByName("switch[]")
            for(var i=0;i<switchObj.length;i++){
                if(switchObj[i].checked){
                    switchBtn.push(switchObj[i].value);
                }
            }

            var heartdiseaseBtn=new Array();
            var heartdiseaseObj=document.getElementsByName("heartdisease[]");
            for(var i=0;i<heartdiseaseObj.length;i++){
                if(heartdiseaseObj[i].checked){
                    heartdiseaseBtn.push(heartdiseaseObj[i].value);
                }
            }

            var cureBtn="";
            var cureObj=document.getElementsByName("cure");
            for(var i=0;i<cureObj.length;i++){
                if(cureObj[i].checked){
                    cureBtn=cureObj[i].value;
                }
            }

            var nephropathyBtn=new Array();
            var nephropathyObj=document.getElementsByName("nephropathy[]");
            for(var i=0;i<nephropathyObj.length;i++){
                if(nephropathyObj[i].checked){
                    nephropathyBtn.push(nephropathyObj[i].value);
                }
            }

            var hepatopathyBtn=new Array();
            var hepatopathyObj=document.getElementsByName("hepatopathy[]");
            for(var i=0;i<hepatopathyObj.length;i++){
                if(hepatopathyObj[i].checked){
                    hepatopathyBtn.push(hepatopathyObj[i].value);
                }
            }

            var bloodBtn=new Array();
            var bloodObj=document.getElementsByName("blood[]");
            for(var i=0;i<bloodObj.length;i++){
                if(bloodObj[i].checked){
                    bloodBtn.push(bloodObj[i].value);
                }
            }

            var othersBtn=new Array();
            var othersObj=document.getElementsByName("others[]");
            for(var i=0;i<othersObj.length;i++){
                if(othersObj[i].checked){
                    othersBtn.push(othersObj[i].value);
                }
            }

            var postData = {
                "switch": switchBtn,
                "heartdisease": heartdiseaseBtn,
                "xzb": document.getElementsByName("xzb")[0].value,
                "gxy": document.getElementsByName("gxy")[0].value,
                "cure": cureBtn,
                "tnb": document.getElementsByName("tnb")[0].value,
                "nephropathy": nephropathyBtn,
                "hepatopathy": hepatopathyBtn,
                "alt": document.getElementsByName("alt")[0].value,
                "blood": bloodBtn,
                "xqb": document.getElementsByName("xqb")[0].value,
                "others": othersBtn,
                "other": document.getElementsByName("other")[0].value
            };
            console.log(JSON.stringify(postData));
            jsonp("/wechat/physicalreceipt/submit", postData, "POST", function (data) {
                if (data.code == 0) {
                    alert("提交成功，请注意产检提醒及时产检！");
                }
                else {
                    errorMsg(data);
                }
            }.bind(this));
        }
    },
    handleSwitch: function (event) {
        var temp = event.target.getAttribute("data-num");
        if (event.target.checked) {
            document.getElementById("div" + temp).style.display = "block";
            event.target.value = false;
            document.getElementById("heart").value = "heart";
            document.getElementById("hyper").value = "hyper";
            document.getElementById("GI").value = "GI";
            document.getElementById("neph").value = "neph";
            document.getElementById("hepa").value = "hepa";
            document.getElementById("thy").value = "thy";
            document.getElementById("bloods").value = "bloods";
            document.getElementById("otherelse").value = "otherelse";
        } else {
            document.getElementById("div" + temp).style.display = "none";
            event.target.value = true;
        }
    },
    handleHeartdisease: function (event) {
        if (document.getElementById("xzbcheck").checked) {
            document.getElementsByName("xzb")[0].style.disabled = false;
        } else {
            document.getElementsByName("xzb")[0].style.disabled = true;
        }
    },
    handleBlood1: function (event) {
        if (document.getElementById("blood1").checked) {
            document.getElementsByName("hgb")[0].style.disabled = false;
        } else {
            document.getElementsByName("hgb")[0].style.disabled = true;
        }
    },
    handleBlood2: function (event) {
        if (document.getElementById("blood2").checked) {
            document.getElementsByName("xqb")[0].style.disabled = false;
        } else {
            document.getElementsByName("xqb")[0].style.disabled = true;
        }
    },
    handleOther1: function (event) {
        if (document.getElementById("other1").checked) {
            document.getElementsByName("other")[0].style.disabled = false;
        } else {
            document.getElementsByName("other")[0].style.disabled = true;
        }
    },
    componentDidMount: function () {
        var code = "";
        if (typeof(this.props.location.query.code) == "string") {
            code = this.props.location.query.code;
        }
        var postData = {"code": code};
        var divObj = document.getElementsByClassName("back_divcontent");
        for (var i = 0; i < divObj.length; i++) {
            divObj[i].style.display = "none";
        }
        document.getElementsByName("xzb")[0].style.disabled = true;
        document.getElementsByName("hgb")[0].style.disabled = true;
        document.getElementsByName("xqb")[0].style.disabled = true;
        document.getElementsByName("other")[0].style.disabled = true;

        jsonp("/wechat/physicalreceipt", postData, "POST", function (data) {
            if (data.code == 0) {
                this.setState({
                    firststart: data.data.firststart,
                    firstend: data.data.firstend,
                    secondstart: data.data.secondstart,
                    secondend: data.data.secondend,
                    thirdstart: data.data.thirdstart,
                    thirdend: data.data.thirdend,
                    historyrecord: data.data.historyrecord,
                    highriskfactor:data.data.highriskfactor,
                });

            }
            else {
                errorMsg(data);
            }
        }.bind(this));
    },
    componentWillMount: function () {
        document.title = '回访调查';
    },
    render: function () {
        return (
            <div>
                <div className="orderTitleInves">
                    {(() => {
                        if (this.state.historyrecord == "0") {
                            return (
                                <span>
                                    第一次回访调查<br />
                                <label className="orderTitle2">{this.state.firststart}至{this.state.firstend}</label>
                                    </span>
                            )
                        }
                        else if (this.state.historyrecord == "2") {
                            return (
                                <span>
                                    第二次回访调查<br />
                                <label className="orderTitle2">{this.state.secondstart}至{this.state.secondend}</label>
                                    </span>
                            )
                        }
                        else {
                            return (
                                <span>
                                    第三次回访调查<br />
                                <label className="orderTitle2">{this.state.thirdstart}至{this.state.thirdend}</label>
                                    </span>
                            )
                        }
                    })()}
                    <span>
                        <br /><label className="orderTitle2">高危因素：{this.state.highriskfactor}</label>
                       <br /> <label className="orderTitle2" style={{color:'red'}}>**此信息会影响医生对您孕期健康情况的判断，请如实填写**</label>
                    </span>
                </div>
                <form action="" method="post" encType="multipart/form-data"
                      className="form-horizontal" id="register_form">
                    <div>
                        <div>
                            <div className="back_div">
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label>心脏病</label>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input className="mui-switch mui-switch-animbg" type="checkbox"
                                                   name="switch[]"
                                                   onClick={this.handleSwitch}
                                                   value="heart" id="heart" data-num="1"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="div1" className="back_divcontent">
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="heartdisease[]" value="心率失常"
                                                       onClick={this.handleHeartdisease}/>
                                            </td>
                                            <td width="22%" className="checktd">
                                                <label >心率失常</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="heartdisease[]" value="心功能异常"
                                                       onClick={this.handleHeartdisease}/>
                                            </td>
                                            <td className="checktd">
                                                <label>心功能异常</label>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="heartdisease[]" id="xzbcheck"
                                                       value="其它"
                                                       onClick={this.handleHeartdisease}/>
                                            </td>
                                            <td className="checktd">
                                                <label>其它</label>
                                            </td>
                                            <td>
                                                <input type="text" className="formcontroller" name="xzb"
                                                       width="90%"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="back_seperator"></div>
                            <div className="back_div">
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label>高血压</label>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input className="mui-switch mui-switch-animbg" type="checkbox"
                                                   name="switch[]"
                                                   onClick={this.handleSwitch}
                                                   value="hyper" id="hyper" data-num="2"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="div2" className="back_divcontent">
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="20%">
                                                <label>血压数值</label>
                                            </td>
                                            <td width="60%">
                                                <input type="text" name="gxy" className="formcontroller"/>
                                            </td>
                                            <td className="checktd">
                                                <label>&nbsp;mmHg</label>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="back_seperator"></div>
                            <div className="back_div">
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label>糖尿病</label>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input className="mui-switch mui-switch-animbg" type="checkbox"
                                                   name="switch[]"
                                                   onClick={this.handleSwitch}
                                                   value="GI" id="GI" data-num="3"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="div3" className="back_divcontent">
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="10%">
                                                <input type="radio" name="cure" value="未使用任何药物"/>
                                            </td>
                                            <td width="40%" className="checktd">
                                                <label>未使用任何药物</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="radio" name="cure" value="口服血糖药物"/>
                                            </td>
                                            <td className="checktd">
                                                <label>口服血糖药物后</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="radio" name="cure" value="使用胰岛素药物"/>
                                            </td>
                                            <td className="checktd">
                                                <label>使用胰岛素药物后</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="37%">
                                                <label>饭后2小时血糖值</label>
                                            </td>
                                            <td>
                                                <input type="text" name="tnb" className="formcontroller"
                                                       width="90%"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="back_seperator"></div>
                            <div className="back_div">
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label>肾病</label>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input className="mui-switch mui-switch-animbg" type="checkbox"
                                                   name="switch[]"
                                                   onClick={this.handleSwitch}
                                                   value="neph" id="neph" data-num="4"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="div4" className="back_divcontent">
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="nephropathy[]" value="肾炎"/>
                                            </td>
                                            <td className="checktd">
                                                <label>肾炎</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="nephropathy[]" value="肾炎伴肾功能损害"/>
                                            </td>
                                            <td className="checktd">
                                                <label>肾炎伴肾功能损害</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="nephropathy[]"
                                                       value="肾炎伴高血压，蛋白尿，肾功能不全"/>
                                            </td>
                                            <td className="checktd">
                                                <label>肾炎伴高血压，蛋白尿，肾功能不全</label>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="back_seperator"></div>
                            <div className="back_div">
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label>肝病</label>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input className="mui-switch mui-switch-animbg" type="checkbox"
                                                   name="switch[]"
                                                   onClick={this.handleSwitch}
                                                   value="hepa" id="hepa" data-num="5"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="div5" className="back_divcontent">
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="hepatopathy[]" value="慢性肝炎病毒携带者"/>
                                            </td>
                                            <td className="checktd">
                                                <label>慢性肝炎病毒携带者</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="hepatopathy[]" value="肝硬化"/>
                                            </td>
                                            <td className="checktd">
                                                <label>肝硬化</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="hepatopathy[]" value="脂肪肝"/>
                                            </td>
                                            <td className="checktd">
                                                <label>脂肪肝</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="hepatopathy[]" value="肝内胆汁淤积症"/>
                                            </td>
                                            <td className="checktd">
                                                <label>肝内胆汁淤积症</label>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="35%">
                                                <label>谷丙转氨酶(ALT)</label>
                                            </td>
                                            <td width="15%">
                                                <input type="text" name="alt"
                                                       className="formcontroller inputWidth4"/>
                                            </td>
                                            <td width="35%">
                                                <label>谷草转氨酶(AST)</label>
                                            </td>
                                            <td>
                                                <input type="text" name="ast"
                                                       className="formcontroller inputWidth4"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="back_seperator"></div>
                            <div className="back_div">
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label>甲状腺功能异常</label>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input className="mui-switch mui-switch-animbg" type="checkbox"
                                                   name="switch[]"
                                                   onClick={this.handleSwitch}
                                                   value="thy" id="thy" data-num="6"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="div6" className="back_divcontent">
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="thyroid[]" value="甲亢"/>
                                            </td>
                                            <td className="checktd">
                                                <label>甲亢</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="thyroid[]" value="甲减或低下"/>
                                            </td>
                                            <td className="checktd">
                                                <label>甲减或低下</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="thyroid[]" value="甲状腺疾病"/>
                                            </td>
                                            <td className="checktd">
                                                <label>甲状腺疾病</label>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="back_seperator"></div>
                            <div className="back_div">
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label>血液疾病系统</label>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input className="mui-switch mui-switch-animbg" type="checkbox"
                                                   name="switch[]"
                                                   onClick={this.handleSwitch}
                                                   value="bloods" id="bloods" data-num="7"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="div7" className="back_divcontent">
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="blood[]" value="贫血HGB数值" id="blood1"
                                                       onClick={this.handleBlood1}/>
                                            </td>
                                            <td className="checktd">
                                                <label>贫血</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                <label>HGB血红蛋白：</label><input type="text" name="hgb"
                                                                              className="formcontroller"
                                                                              width="60%"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="blood[]" value="血小板异常数值" id="blood2"
                                                       onClick={this.handleBlood2}/>
                                            </td>
                                            <td className="checktd">
                                                <label>血小板异常</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                <label>血小板异常数值：</label><input type="text" name="xqb"
                                                                              className="formcontroller"
                                                                              width="50%"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="blood[]" value="再生障碍性贫血/白血病"/>
                                            </td>
                                            <td className="checktd">
                                                <label>再生障碍性贫血/白血病</label>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="back_seperator"></div>
                            <div className="back_div">
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label>其他</label>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input className="mui-switch mui-switch-animbg" type="checkbox"
                                                   name="switch[]"
                                                   onClick={this.handleSwitch}
                                                   value="otherelse" id="otherelse" data-num="8"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="div8" className="back_divcontent">
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="others[]" value="精神疾病"/>
                                            </td>
                                            <td width="30%" className="checktd">
                                                <label>精神疾病</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="others[]" value="血型不合"/>
                                            </td>
                                            <td className="checktd">
                                                <label>血型不合</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="others[]" value="免疫系统疾病"/>
                                            </td>
                                            <td className="checktd">
                                                <label>免疫系统疾病</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="others[]" value="结核"/>
                                            </td>
                                            <td className="checktd">
                                                <label>结核</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="others[]" value="哮喘"/>
                                            </td>
                                            <td className="checktd">
                                                <label>哮喘</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="others[]" value="肿瘤"/>
                                            </td>
                                            <td className="checktd">
                                                <label>肿瘤</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="checkbox" name="others[]" value="性病"/>
                                            </td>
                                            <td className="checktd">
                                                <label>性病</label>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td width="10%">
                                                <input type="checkbox" name="others[]" value="其它" id="other1"
                                                       onClick={this.handleOther1}/>
                                            </td>
                                            <td width="15%" className="checktd">
                                                <label>其它</label>
                                            </td>
                                            <td >
                                                <input type="text" name="other" className="formcontroller"
                                                       width="90%"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bindBottom">
                        <span className="whitebtn active physicalSubmitBtn" onClick={this.handleSubmit}>确定</span>
                    </div>
                </form>
            </div>
        );
    }
})
