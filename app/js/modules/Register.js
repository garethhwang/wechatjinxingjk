/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router';
import arrayTreeFilter from 'array-tree-filter';
let jsonp = require('../lib/jsonp');
require('../../css/LArea.css');
require('../lib/LArea');
require('../lib/util');

let catalog = "";
let district = "";

export default React.createClass({
    contextTypes:{
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            weight: "",
            householdregister: "是",
            agree: false,
            realname: "",
            telephone: "",
            barcode: "",
            birthday: "",
            //department: "",
            //departmentvalue: "",
            height: "",
            lastmenstrualdate: "",
            gravidity: "",
            parity: "",
            vaginaldelivery: "",
            aesarean: "",
            spontaneousabortion: "",
            drug_inducedabortion: "",
            highriskfactor: "",
            //district: "",
            //addressvalue: "",
            address_1: "",
            smscode: "",
            highrisk:"是"
        }
    },
    calproductdate: function (value) {
        var lastyjdate = value;
        console.log("calproductdate:" + lastyjdate);
        if (lastyjdate) {
            document.getElementById("edc").innerHTML = this.addDate(lastyjdate, 280);
        }
    },
    addDate: function (date, days) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var val = d.getFullYear() + "-" + month + "-" + day;
        return val;
    },
    countindex: function (event) {
        if (document.getElementById("input-weight").value.trim().length == 0) {
            return;
        }
        var bmiindex = document.getElementById("input-weight").value / (Math.pow(document.getElementById("input-height").value, 2) / 10000);
        var bmiindex = bmiindex.toFixed(2);
        document.getElementById("input-bmiindex").innerHTML = bmiindex;
        if (bmiindex < "18.5") {
            // echo "过轻"; $bmitype = "0";
            document.getElementById("input-bmitype").innerHTML = "过轻";
        }
        else if (bmiindex < "25") {
            //echo "正常"; $bmitype = "1";
            document.getElementById("input-bmitype").innerHTML = "正常";
        }
        else if (bmiindex < "28") {
            //echo "过重"; $bmitype = "2";
            document.getElementById("input-bmitype").innerHTML = "过重";
        }
        else if (bmiindex < "32") {
            //echo "肥胖"; $bmitype = "3";
            document.getElementById("input-bmitype").innerHTML = "肥胖";
        }
        else {
            //echo "非常肥胖"; $bmitype = "4";
            document.getElementById("input-bmitype").innerHTML = "非常肥胖";
        }
    },
    handleHousehold: function (event) {
        event.preventDefault();
        var reg = new RegExp('(\\s|^)' + "active" + '(\\s|$)');
        document.getElementsByName("household")[0].className = event.target.className.replace(reg, ' ');
        document.getElementsByName("household")[1].className = event.target.className.replace(reg, ' ');
        event.target.className += " " + "active";
        if (event.target.innerHTML == "是") {
            document.getElementById("householdregister").value = "是";
            this.setState({householdregister: "是"});
        } else {
            document.getElementById("householdregister").value = "否";
            this.setState({householdregister: "否"});
        }
    },
    handleIsrisk: function (event) {
        //event.preventDefault();
        var reg = new RegExp('(\\s|^)' + "active" + '(\\s|$)');
        document.getElementsByName("isrisk")[0].className = event.target.className.replace(reg, ' ');
        document.getElementsByName("isrisk")[1].className = event.target.className.replace(reg, ' ');
        event.target.className += " " + "active";
        if (event.target.innerHTML == "是") {
            document.getElementById("dangerousreason").disabled = false;
            document.getElementById("highrisk").value = "true";
            this.setState({highrisk: "是"});
        } else {
            document.getElementById("dangerousreason").disabled = true;
            document.getElementById("dangerousreason").value = "";
            document.getElementById("highrisk").value = "false";
            this.setState({highrisk: "否"});
        }
    },
    handleRegister: function (event) {
        event.preventDefault();
        if (this.state.realname.trim().length < 1 || this.state.realname.trim().length > 32) {
            alert("姓名格式不正确");
        }
        else if (this.state.telephone.trim().length < 1 || this.state.telephone.trim().length > 11) {
            alert("手机号码格式不正确");
        } else if (this.state.smscode.trim().length != 6) {
            alert("验证码格式不正确");
        }
        else if (this.state.barcode.trim().length == 0) {
            alert("条形码不能为空");
        }
        else if (this.state.birthday.trim().length == 0) {
            alert("出生日期不能为空");
        }
        else if (this.state.height.trim().length == 0) {
            alert("身高不能为空");
        }
        else if (this.state.weight.trim().length == 0) {
            alert("体重不能为空");
        }
        else if (this.state.lastmenstrualdate.trim().length == 0) {
            alert("末次月经时间不能为空");
        }
        else if (this.state.gravidity.trim().length == 0) {
            alert("孕次不能为空");
        }
        else if ((typeof this.state.gravidity) == "number") {
            alert("孕次必须为数字");
        }
        else if (this.state.parity.trim().length == 0) {
            alert("产次不能为空");
        }
        else if ((typeof this.state.parity) == "number") {
            alert("产次必须为数字");
        }
        else if (this.state.vaginaldelivery.trim().length == 0) {
            alert("阴道分娩次数不能为空");
        }
        else if ((typeof this.state.vaginaldelivery) == "number") {
            alert("阴道分娩次数必须为数字");
        }
        else if (this.state.aesarean.trim().length == 0) {
            alert("剖宫产次不能为空");
        }
        else if ((typeof this.state.aesarean) == "number") {
            alert("剖宫产次必须为数字");
        }
        else if (this.state.highrisk == "true" && this.state.highriskfactor.trim().length == 0) {
            alert("高危因素不能为空");
        }
        else if (this.state.address_1.trim().length == 0) {
            alert("家庭详细地址不能为空");
        }
        else if(district.trim().length == 0){
            alert("居住地址不能为空");
        }
        else if(catalog.trim().length == 0){
           alert("保健科室不能为空");
        }
        else if (!this.state.agree) {
            alert("请阅读协议并确认");
        }
        else {
            var postData = this.state;
            postData.district=district;
            postData.department=catalog;
            postData.householdregister=document.getElementById("householdregister").value;
            postData.highrisk=document.getElementById("highrisk").value;
            console.log(JSON.stringify(postData));
            jsonp("/wechat/register", postData, "POST", function (data) {
                if (data.code == 0) {
                    //this.context.router.push("/registersuccess");

                    sessionStorage.jxsession = data.data.jxsession;

                    var fullurl = window.location.href;
                    var newurl = fullurl.replace(/register/, "registersuccess")
                    console.log("new url is : " + newurl);
                    location.href = newurl;
                }
                else {
                    alert(data.message);
                }
            }.bind(this));
        }

    },
    sendMsgBtn: function (event) {
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
        var sendCodeObj = event.target;
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
        jsonp("/wechat/register/validcode", postData, "POST", function (data) {
            if (data.code == 0) {
                alert(data.message);
            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if (name == "weight") {
            this.countindex(value);
        }
        else if (name == "lastmenstrualdate") {
            this.calproductdate(value);
        }
    },
    componentWillMount: function () {
        document.title = '注册';
    },
    componentDidMount: function () {
        var top = document.getElementById("hr1").offsetTop - document.getElementById("title1").offsetHeight / 2;
        document.getElementById("title1").style.top = top + "px";
        var top2 = document.getElementById("hr2").offsetTop - document.getElementById("title2").offsetHeight / 2;
        document.getElementById("title2").style.top = top2 + "px";
        var code = "";
        if (typeof(this.props.location.query.code) == "string") {
            code = this.props.location.query.code;
        }
        var postData = {"code": code};
        console.log("postData"+JSON.stringify(postData));
        jsonp("/wechat/wechatbinding/getCDO", postData, "POST", function (data) {
            if (data.code == 0) {

                this.setState({
                    catalogOptions:data.data,
                })
            }
            else {
                console.error(data.message)
            }
        }.bind(this));



        var postData = {"code": code};
        console.log("postData"+JSON.stringify(postData));
        jsonp("/wechat/wechatbinding/getPCD", postData, "POST", function (data) {
            if (data.code == 0) {

                this.setState({
                    districtOptions:data.data,
                })
            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },
    onCatalogOptions(v) {
        {

            let temp = "";
            for(let i = 0; i< v.length;i++){

                if(i != v.length - 1){
                    temp = temp + v[i]+',';
                }else{
                    temp = temp + v[i];
                }

            }

            catalog = temp;

            let result = this.getSel(v,this.state.catalogOptions);

            document.getElementById("catalog").value=result;
        }
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

            let result = this.getSel(v,this.state.districtOptions);

            document.getElementById("district").value=result;
        }
    },

    getSel(value,data) {if (!value) { return ''; } const treeChildren = arrayTreeFilter(data, (c, level) => { return c.value === value[level]; }); return treeChildren.map((v) => { return v.label; }).join(','); },
    render: function () {

        return (
            <form id="register_form">
                <div className="register_title" id="title1">您的个人资料</div>
                <hr className="register_hr" id="hr1"/>
                <table className="register_outer" style={{marginBottom: "-1rem"}}>
                    <tbody>
                    <tr>
                        <td width="23%">
                            <label className="orangestar">*</label>
                            真实姓名
                        </td>
                        <td>
                            <input type="text" className="formcontroller" value={this.state.realname}
                                   onChange={this.handleChange} name="realname"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="orangestar">*</label>
                            手机号码
                        </td>
                        <td>
                            <input type="text" className="formcontroller" name="telephone" id="telephone"
                                   value={this.state.telephone} onChange={this.handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="orangestar">*</label>
                            验证码
                        </td>
                        <td>
                            <table className="sendMsg" cellPadding="0" cellSpacing="0">
                                <tbody>
                                <tr style={{height:"4rem"}}>
                                    <td>
                                        <input type="text" name="smscode" id="verificationcode"
                                               value={this.state.smscode} onChange={this.handleChange}/>
                                    </td>
                                    <td className="sendMsgBtn" onClick={this.sendMsgBtn}>
                                        发送验证码
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="orangestar">*</label>
                            条形码
                        </td>
                        <td>
                            <input type="text" className="formcontroller" name="barcode" value={this.state.barcode}
                                   onChange={this.handleChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label className="orangestar">*</label>
                            出生日期
                        </td>
                        <td>
                            <input type="date" className="formcontroller" name="birthday" value={this.state.birthday}
                                   onChange={this.handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="orangestar">*</label>
                            保健科室
                        </td>
                        <td>
                            <Picker
                                data={this.state.catalogOptions}
                                title="保健科室"
                                onChange={this.onCatalogOptions}
                            >
                                <input id="catalog"  type="text" readOnly="true"  className="formcontroller"></input>
                            </Picker>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label className="orangestar">*</label>
                            身高
                        </td>
                        <td>
                            <table>
                                <tbody>
                                <tr>
                                    <td width="33%" align="left">
                            <span className="whitebtn" style={{width:"8.75rem"}}>
                                <input type="text" className="hiddenInput"
                                       name="height"
                                       value={this.state.height}
                                       id="input-height" onChange={this.handleChange}/>cm</span>
                                    </td>
                                    <td align="center"><label className="orangestar">*</label>体重</td>
                                    <td width="33%" align="right">
                            <span className="whitebtn" style={{width:"8.75rem"}}>
                                <input type="text" className="hiddenInput"
                                       name="weight" value={this.state.weight} onChange={this.handleChange}
                                       id="input-weight"/>kg
                            </span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label className="orangestar">*</label>
                            BMI指数
                        </td>
                        <td>
                            <table>
                                <tbody>
                                <tr>
                                    <td width="40%" align="left">
                                        <label className="register_info"
                                               id="input-bmiindex"> </label>
                                    </td>
                                    <td align="center"><label className="orangestar">*</label>BMI类型
                                    </td>
                                    <td width="33%" align="right">
                                        <label className="register_info"
                                               id="input-bmitype"> </label>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className="register_outer">
                    <tbody>
                    <tr>
                        <td width="35%">
                            <label className="orangestar">*</label>
                            末次月经时间
                        </td>
                        <td>
                            <input type="date" className="formcontroller" name="lastmenstrualdate"
                                   value={this.state.lastmenstrualdate} onChange={this.handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className="register_outer">
                    <tbody>
                    <tr>
                        <td width="25%">
                            <label className="orangestar">*</label>
                            预产期
                        </td>
                        <td>
                            <label className="register_info" id="edc" name="edc"></label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="grayBorder">
                    <table className="register_outer">
                        <tbody>
                        <tr>
                            <td width="30%">
                                <label className="orangestar">*</label>孕次
                            </td>
                            <td width="20%">
                                <input type="number" className="formcontroller register_smallInput" name="gravidity"
                                       value={this.state.gravidity} onChange={this.handleChange}/>
                            </td>
                            <td width="30%">
                                <label className="orangestar">*</label>产次
                            </td>
                            <td>
                                <input type="number" className="formcontroller register_smallInput" name="parity"
                                       value={this.state.parity} onChange={this.handleChange}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="register_outer">
                        <tbody>
                        <tr>
                            <td width="30%">
                                <label className="orangestar">*</label>阴道分娩次数
                            </td>
                            <td width="20%">
                                <input type="number" className="formcontroller register_smallInput"
                                       name="vaginaldelivery"
                                       value={this.state.vaginaldelivery} onChange={this.handleChange}/>
                            </td>
                            <td width="30%">
                                <label className="orangestar">*</label>剖宫产次数
                            </td>
                            <td>
                                <input type="number" className="formcontroller register_smallInput" name="aesarean"
                                       value={this.state.aesarean} onChange={this.handleChange}/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label className="orangestar">*</label>自然流产次数
                            </td>
                            <td>
                                <input type="number" className="formcontroller register_smallInput"
                                       name="spontaneousabortion"
                                       value={this.state.spontaneousabortion} onChange={this.handleChange}/>
                            </td>
                            <td>
                                <label className="orangestar">*</label>人工药流次数
                            </td>
                            <td>
                                <input type="number" className="formcontroller register_smallInput"
                                       name="drug_inducedabortion"
                                       value={this.state.drug_inducedabortion} onChange={this.handleChange}/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label className="orangestar">*</label>是否高危
                            </td>
                            <td colSpan="3">
                                <span className="whitebtn active" name="isrisk" onClick={this.handleIsrisk}
                                      style={{marginRight:"4rem"}}>是</span>
                                <span className="whitebtn" name="isrisk" onClick={this.handleIsrisk}>否</span>
                                <input type="hidden" name="highrisk" id="highrisk" value="是"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="orangestar">*</label>高危因素
                            </td>
                            <td colSpan="3">
                                <input type="text" className="formcontroller" id="dangerousreason" name="highriskfactor"
                                       value={this.state.highriskfactor} onChange={this.handleChange}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="register_title" id="title2">您的详细地址</div>
                <hr className="register_hr" id="hr2"/>
                <table className="register_outer">
                    <tbody>
                    <tr>
                        <td width="45%">
                            <label className="orangestar">*</label>是否为本市户口户籍
                        </td>
                        <td>
                            <span className="whitebtn active" name="household" onClick={this.handleHousehold}>是</span>
                            <span className="whitebtn" name="household" onClick={this.handleHousehold}
                                  style={{marginLeft:"2rem"}}>否</span>
                            <input type="hidden" name="householdregister" id="householdregister"
                                   value={this.state.householdregister}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className="register_outer">
                    <tbody>
                    <tr>
                        <td width="25%">
                            <label className="orangestar">*</label>居住地区
                        </td>
                        <td>
                            <Picker
                                data={this.state.districtOptions}
                                title="居住地区"
                                onChange={this.onDistrictOptions}
                            >
                                <input id="district"  type="text" readOnly="true"  className="formcontroller"></input>
                            </Picker>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className="register_outer">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="orangestar">*</label>家庭详细住址
                        </td>
                        <td>
                            <input type="text" className="formcontroller" name="address_1"
                                   value={this.state.address_1} onChange={this.handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="register_outer" style={{textAlign:"center"}}>
                    <div style={{marginTop:"3rem"}}>
                        <input type="checkbox" name="agree"
                               style={{height:"3rem",verticalAlign:"middle"}} value={this.state.agree}
                               onChange={this.handleChange}/><label style={{fontSize:"1.5rem"}}>我已阅读并同意
                        <Link to="/registerterms" style={{color:"#fe8e19"}}>用户协议</Link>
                    </label>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <span className="whitebtn active" style={{margin:"3rem"}} onClick={this.handleRegister}
                              id="register_submitbtn">提交</span>
                    </div>
                </div>
            </form>
        );
    }
})
