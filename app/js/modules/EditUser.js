/**
 * Created by sally on 2017/2/14.
 */
import React from 'react';
import { Link } from 'react-router';
import arrayTreeFilter from 'array-tree-filter';
import { Picker, List, WhiteSpace } from 'antd-mobile';
let jsonp = require('../lib/jsonp');
require('../../css/LArea.css');
require('../lib/LArea');
require('../lib/util');

let catalog = "";
let district = "";

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            headimgurl:"",
            weight: "",
            householdregister: false,
            agree: false,
            realname: "",
            telephone: "",
            barcode: "",
            birthday: "",
            //department: "",
            //depname: "",
            height: "",
            lastmenstrualdate: "",
            gravidity: "",
            parity: "",
            vaginaldelivery: "",
            aesarean: "",
            spontaneousabortion: "",
            drug_inducedabortion: "",
            highriskfactor: "",
            districtid:new Array(),
            //district: "",
           // addressvalue: "",
            address_1: "",
            highrisk: false
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
        }else if(name == "department"){

            if(value.length != 0){
                this.state.departmentvalue = value;
            }

        }
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
        event.preventDefault();
        var reg = new RegExp('(\\s|^)' + "active" + '(\\s|$)');
        document.getElementsByName("isrisk")[0].className = event.target.className.replace(reg, ' ');
        document.getElementsByName("isrisk")[1].className = event.target.className.replace(reg, ' ');
        event.target.className += " " + "active";
        if (event.target.innerHTML == "是") {
            document.getElementById("highriskfactor").disabled = false;
            document.getElementById("highrisk").value = "是";
            this.setState({highrisk: "是"});
        } else {
            document.getElementById("highriskfactor").disabled = true;
            document.getElementById("highriskfactor").value = "";
            document.getElementById("highrisk").value = "否";
            this.setState({highrisk: "否",highriskfactor:""});
        }
    },
    handleRegister: function (event) {

        event.preventDefault();
        if (this.state.realname.trim().length < 1 || this.state.realname.trim().length > 32) {
            alert("姓名格式不正确");
        }
        else if (this.state.telephone.trim().length < 1 || this.state.telephone.trim().length > 11) {
            alert("手机号码格式不正确");
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
        else if (this.state.height.trim().length == 0) {
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
            alert("分娩次数不能为空");
        }
        else if ((typeof this.state.vaginaldelivery) == "number") {
            alert("分娩次数必须为数字");
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
        }else if (document.getElementById("district").value.trim().length == 0) {
            alert("居住地区不能为空");
        } else if(document.getElementById("catalog").value.trim().length == 0){
            alert("保健科室不能为空");
        }
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

                postData.district = temp;
            }else {
                postData.district = district;
            }

            if(catalog.length == 0){
                let temp = "";
                for(let i = 0; i< this.state.departmentid.length;i++){

                    if(i != this.state.departmentid.length - 1){
                        temp = temp + this.state.departmentid[i]+',';
                    }else{
                        temp = temp + this.state.departmentid[i];
                    }

                }

                postData.department = temp;
            }else {
                postData.department = catalog;
            }

            postData.householdregister=document.getElementById("householdregister").value;
            postData.highrisk=document.getElementById("highrisk").value;
            jsonp("/wechat/edituser/modify", postData, "POST", function (data) {
                if (data.code == 0) {
                    this.context.router.push("/baseinfo?code="+data.data.wechatcode);
                }
                else {
                    alert(data.message);
                }
            }.bind(this));
        }

    },
    componentWillMount: function () {


        var postData = null;
        jsonp("/wechat/edituser", postData, "POST", function (data) {
            if (data.code == 0) {
                // var provs_data = data.data.provs_data;
                // var citys_data = data.data.citys_data;
                // var dists_data = data.data.dists_data;
                // var allcitys_data = data.data.allcitys_data;
                // var deps_data = data.data.deps_data;
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
                //
                // var area1 = new LArea();
                // area1.init({
                //     'trigger': '#department',
                //     'valueTo': '#departmentvalue',
                //     'keys': {
                //         id: 'id',
                //         name: 'name'
                //     },
                //     'type': 2,
                //     'data': [allcitys_data, dists_data, deps_data]
                // });




                // let a = new Array();
                //
                // for(let objStr in data.data.pcd_data){
                //     let obj = data.data.pcd_data[JSON.parse(objStr)];
                //
                //     if(obj.children){
                //
                //         let b = new Array();
                //
                //         for(let childrenObjStr in obj.children){
                //             let childenObj = obj.children[JSON.parse(childrenObjStr)];
                //
                //             b.push(childenObj)
                //         }
                //
                //         obj.children = b;
                //
                //     }
                //
                //
                //     a.push(obj);
                // }
                //
                //
                // const options = [{
                //     value: "1",
                //     label: "浙江",
                //     children: [{
                //         value: 'hangzhou',
                //         label: 'Hangzhou',
                //         children: [{
                //             value: 'xihu',
                //             label: 'West Lake',
                //         }],
                //     }],
                // }, {
                //     value: 'jiangsu',
                //     label: 'Jiangsu',
                //     children: [{
                //         value: 'nanjing',
                //         label: 'Nanjing',
                //         children: [{
                //             value: 'zhonghuamen',
                //             label: 'Zhong Hua Men',
                //         }],
                //     }],
                // }];


                this.setState({
                    headimgurl:data.data.headimgurl,
                    realname:data.data.realname,
                    telephone:data.data.telephone,
                    barcode:data.data.barcode,
                    birthday:data.data.birthday,
                    department:data.data.department,
		            departmentid:data.data.departmentid.split(','),
                    height:data.data.height,
                    weight:data.data.weight,
                    lastmenstrualdate:data.data.lastmenstrualdate,
                    gravidity:data.data.gravidity,
                    parity:data.data.parity,
                    vaginaldelivery:data.data.vaginaldelivery,
                    aesarean:data.data.aesarean,
                    spontaneousabortion:data.data.spontaneousabortion,
                    drug_inducedabortion:data.data.drug_inducedabortion,
                    highrisk:data.data.highrisk,
                    highriskfactor:data.data.highriskfactor,
                    householdregister:data.data.householdregister,
                    address_1:data.data.address_1,
                    district:data.data.district,
                    districtid:data.data.districtid.split(','),
                    catalogOptions:data.data.cdo_data,
                    districtOptions:data.data.pcd_data
                });

                document.getElementById("catalog").value = this.getSel(this.state.departmentid,this.state.catalogOptions);
                document.getElementById("district").value = this.getSel(this.state.districtid,this.state.districtOptions);

                if(this.state.highrisk == "是"){
                    document.getElementById("highriskfactor").style.disabled=false;
                    document.getElementById("highrisk").value = "是";
                    document.getElementById("risk").className += " " + "active";
                    var reg = new RegExp('(\\s|^)' + "active" + '(\\s|$)');
                    document.getElementById("norisk").className = document.getElementById("norisk").className.replace(reg, ' ');

                }else {
                    document.getElementById("highriskfactor").style.disabled=true;
                    document.getElementById("highriskfactor").value = "";
                    document.getElementById("highrisk").value = "否";
                    var reg = new RegExp('(\\s|^)' + "active" + '(\\s|$)');
                    document.getElementById("risk").className = document.getElementById("risk").className.replace(reg, ' ');
                    document.getElementById("norisk").className += " " + "active";
                }

                if(this.state.householdregister == "是"){
                    var reg = new RegExp('(\\s|^)' + "active" + '(\\s|$)');
                    document.getElementById("nonative").className = document.getElementById("nonative").className.replace(reg, ' ');
                    document.getElementById("native").className += " " + "active";
                }else {
                    var reg = new RegExp('(\\s|^)' + "active" + '(\\s|$)');
                    document.getElementById("native").className = document.getElementById("native").className.replace(reg, ' ');
                    document.getElementById("nonative").className += " " + "active";
                }

                this.countindex(document.getElementById("input-weight").value);
                this.calproductdate(this.state.lastmenstrualdate);

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
    render() {
        /*<input id="address" name="district" className="formcontroller" type="text"
         readOnly="readOnly" placeholder="选择区域"  onChange={this.handleChange} value={this.state.district}/>
         <input id="addressvalue" type="hidden"/>*/

        return (
            <div>
                <div className="userinfo_top">
                    <img src={this.state.headimgurl}/>
                </div>
                <form action="" method="post" encType="multipart/form-data" id="register_form">
                    <div className="userinfo_title" style={{marginLeft:"2.25rem"}}>宝妈资料</div>
                    <div className="userinfo_content" style={{marginLeft:"2.25rem",marginRight:"2rem"}}>
                        <table>
                            <tbody>
                            <tr>
                                <td width="35%">真实姓名：</td>
                                <td>
                                    <input type="text" className="formcontroller" value={this.state.realname}
                                           onChange={this.handleChange}
                                           name="realname"/>
                                </td>
                            </tr>
                            <tr>
                                <td>手机号码：</td>
                                <td>
                                    <input type="text" className="formcontroller" name="telephone"
                                           onChange={this.handleChange}
                                           value={this.state.telephone}/>
                                </td>
                            </tr>
                            <tr>
                                <td>条形码：</td>
                                <td>
                                    <input type="text" className="formcontroller" name="barcode"
                                           onChange={this.handleChange}
                                           value={this.state.barcode}/>
                                </td>
                            </tr>
                            <tr>
                                <td>出生日期：</td>
                                <td>
                                    <input type="date" className="formcontroller" name="birthday"
                                           onChange={this.handleChange}
                                           value={this.state.birthday}/>
                                </td>
                            </tr>
                            <tr>
                                <td>保健科室：</td>
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
                                <td>身高：</td>
                                <td>
                <span className="whitebtn" style={{width:"8.75rem"}}>
                    <input type="text" className="hiddenInput"
                           name="height"
                           value={this.state.height} onChange={this.handleChange}
                           id="input-height"/>cm
                </span>
                                </td>
                            </tr>
                            <tr>
                                <td>体重：</td>
                                <td>
                                    <span className="whitebtn" style={{width:"8.75rem"}}>
                                        <input type="text"
                                               className="hiddenInput"
                                               name="weight"
                                               value={this.state.weight} onChange={this.handleChange}
                                               id="input-weight"/>kg
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>BMI指数：</td>
                                <td>
                                    <span style={{fontSize:"1.75rem",marginLeft:"1rem"}} id="input-bmiindex"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>BMI类型：</td>
                                <td>
                                    <span style={{fontSize:"1.75rem",marginLeft:"1rem"}} id="input-bmitype"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>末次月经时间：</td>
                                <td>
                                    <input type="date" className="formcontroller" name="lastmenstrualdate" onChange={this.handleChange}
                                           value={this.state.lastmenstrualdate}/>
                                </td>
                            </tr>
                            <tr>
                                <td>预产期：</td>
                                <td>
                                    <label style={{fontSize:"1.75rem",marginLeft:"1rem"}} name="edc" id ="edc"></label>
                                </td>
                            </tr>
                            <tr>
                                <td>孕次：</td>
                                <td>
                                    <input type="number" className="formcontroller" name="gravidity" onChange={this.handleChange}
                                           value={this.state.gravidity}/>
                                </td>
                            </tr>
                            <tr>
                                <td>产次：</td>
                                <td>
                                    <input type="number" className="formcontroller" name="parity" onChange={this.handleChange}
                                           value={this.state.parity}/>
                                </td>
                            </tr>
                            <tr>
                                <td>分娩次数：</td>
                                <td>
                                    <input type="number" className="formcontroller" name="vaginaldelivery" onChange={this.handleChange}
                                           value={this.state.vaginaldelivery}/>
                                </td>
                            </tr>
                            <tr>
                                <td>剖宫产次数：</td>
                                <td>
                                    <input type="number" className="formcontroller" name="aesarean" onChange={this.handleChange}
                                           value={this.state.aesarean}/>
                                </td>
                            </tr>
                            <tr>
                                <td>自然流产次数：</td>
                                <td>
                                    <input type="number" className="formcontroller" name="spontaneousabortion" onChange={this.handleChange}
                                           value={this.state.spontaneousabortion}/>
                                </td>
                            </tr>
                            <tr>
                                <td>人工流产次数：</td>
                                <td>
                                    <input type="number" className="formcontroller" name="drug_inducedabortion" onChange={this.handleChange}
                                           value={this.state.drug_inducedabortion}/>
                                </td>
                            </tr>
                            <tr>
                                <td>是否高危：</td>
                                <td>
                                    <span className="whitebtn active" name="isrisk" id="risk"
                                          style={{marginRight:"4rem"}} onClick={this.handleIsrisk}>是</span>
                                    <span className="whitebtn" name="isrisk" id="norisk" onClick={this.handleIsrisk}>否</span>
                                    <input type="hidden" name="highrisk" id="highrisk" value={this.state.highrisk} onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>高危因素：</td>
                                <td >
                                    <input type="text" className="formcontroller" id="highriskfactor"
                                           name="highriskfactor"
                                           value={this.state.highriskfactor} onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td >是否为本市户口户籍：</td>
                                <td>
                                    <span className="whitebtn active" id="native" name="household"
                                          onClick={this.handleHousehold}
                                          style={{marginRight:"4rem"}}>是</span>
                                    <span className="whitebtn" name="household" id="nonative"
                                          onClick={this.handleHousehold}
                                          style={{marginLeft:"2rem"}}>否</span>
                                    <input type="hidden" name="householdregister" id="householdregister"
                                           value={this.state.householdregister} onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>居住地区：</td>
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
                            <tr>
                                <td>家庭详细住址：</td>
                                <td>
                                    <input type="text" className="formcontroller" name="address_1"
                                           value={this.state.address_1} onChange={this.handleChange}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="register_outer" style={{textAlign:"center"}}>
                        <span className="whitebtn active" style={{margin:"3rem"}} id="register_submitbtn" onClick={this.handleRegister}>提交</span>
                    </div>
                </form>
            </div>
        )
    }
})
