
import React from 'react'
import { Radio,Switch,Checkbox,Upload,Icon } from 'antd';
import { ImagePicker } from 'antd-mobile';
import { router } from 'react-router'
import HttpTools from '../../js/lib/httpTools';
let jsonp = require('../lib/jsonp');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const chanhoutengtongOptions = ['头', '背', '胸','腰','颈椎','手','足','膝','关节酸','关节胀','关节麻','关节刺痛'];
const hanchuOptions = ['背部','腹部','头部','颈部','手','足'];
const yinshipianhaoOptions = ['酸','甜','苦','辣','咸'];
const zhongkuaiweizhiOptions = ['外上','外下','内上','内下'];

/*
* <table width="90%" className="bodyidentifyCell">
 <tbody>
 <tr>
 <td width="30%">
 <label className="cellTitle">面色：</label>
 </td>
 <td style={{textAlign:'right'}}>
 <ImagePicker
 files={this.state.imageUrl}
 onChange={this.onChange}
 onImageClick={(index, fs) => console.log(index, fs)}
 selectable={this.state.imageUrl.length < 1}
 />
 </td>
 </tr>
 </tbody>
 </table>
* */


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        alert('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        alert('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

export default React.createClass({
    getInitialState: function () {
        return {
            imageUrl:[],
            files:[],

            name:"",
            height:"",
            weight:"",
            age:"",
            countWeek:"",
            babyWeight:"",
            churuDate:"",
            buruStatu:'母乳',
            muruQingkuang:'充足',
            tizhiXingtai:'鸭梨型',
            huanyuanqianWeight:"",
            chanqianWeight:"",
            chanci:'初产',
            fenmianFangshi:'顺产',
            hanchu:false,
            hanchuWeizhi:"",
            tigan:'畏寒',
            shuimian:'好',
            chanhouTengtong:false,
            chanhouTengtongWeizhi:"",
            dabian:'干燥',
            dabianCishu:'无',
            yinshiWeikou:'正常',
            yinshipianhao:'',
            rufangDaxiao:'丰满',
            rutouJunlie:'无',
            zhongkuai:"",
            zhongkuaiZainace:'一侧',
            zhongkuaiWeizhi:"",
            hongzhong:'无',
            tengtong:'无',
            jubuPifuWendu:'温',
            faceAvatar:"",
            shetaiAvatar:"",
            faceAvatarUrl:"",
            faceAvatarUrl_thumbnail:"",
            shetaiAvatarUrl:"",
            shetaiAvatarUrl_thumbnail:"",
        }
    },
    componentWillMount(){

    },
    onChange(files, type, index){
        console.log(files, type, index);
        this.setState({
            files:files,
        });

        let fileBlob = this.b64toBlob(files[0].url.substr(23), "image/jpeg");

        let url = {uri:URL.createObjectURL(fileBlob)};

        HttpTools.upload('/doctor/identification/uploadimg',url,null).then(
            (json)=> {
                if (json.code == 0) {

                    alert(json.data.fileurl);

                    this.setState({
                        imageUrl:json.data.fileurl,
                    })
                }else {
                    alert(json.message);
                }
            },
        )
    },
    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || ''; sliceSize = sliceSize || 512;
        let byteCharacters = atob(b64Data);
        let byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    },
    // getBase64(img, callback) {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // },
    handleChange(info){
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    },
    // beforeUpload(file) {
    //     // const isJPG = file.type === 'image/jpeg';
    //     // if (!isJPG) {
    //     //     message.error('You can only upload JPG file!');
    //     // }
    //     alert(file.type);
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         alert('Image must smaller than 2MB!');
    //     }
    //     // return isJPG && isLt2M;
    //     return isLt2M;
    // },
    uploadImg(obj){

        let target = obj.currentTarget;
        let file = target.files[0];

        // HttpTools.upload('http://be.jinxingjk.com/doctor/identification/uploadphoto',files[0],'test.jpg',null).then(
        //     (json)=> {
        //         if (json.code == 0) {
        //
        //             alert(json.data.fileurl);
        //
        //             this.setState({
        //                 imageUrl:json.data.fileurl,
        //             })
        //         }else {
        //             alert(json.message);
        //         }
        //     },
        // )
    },
    onSubmit(){
        if(this.state.name == ""){
            alert("请填写姓名")
        }else if(this.state.height == "" ){
            alert("请填写正确身高")
        }else if(this.state.weight == "" ){
            alert("请填写正确现体重")
        }else if(this.state.age == "" ){
            alert("请填写正确年龄")
        }else if(this.state.countWeek == "" ){
            alert("请填写正确现产后周期")
        }else if(this.state.babyWeight == "" ){
            alert("请填写正确胎儿重量")
        }else if(this.state.churuDate == ""){
            alert("请填写正确初乳时间")
        }else if(this.state.huanyuanqianWeight == ""){
            alert("请填写正确怀孕前体重")
        }else if(this.state.chanqianWeight == "" ){
            alert("请填写正确产前体重")
        }else if(this.state.hanchu == true && this.state.hanchuWeizhi==""){
            alert("请选择汗出位置")
        }
        else if(this.state.chanhouTengtong == true && this.state.chanhouTengtongWeizhi==""){
            alert("请选择产后疼痛位置")
        }
        else if(this.state.yinshipianhao == ""){
            alert("请选择饮食偏好")
        }
        else if(this.state.zhongkuai == true && this.state.zhongkuaiWeizhi==""){
            alert("请选择肿块位置")
        }
        // else if(this.state.faceAvatar == ""){
        //     alert("面部照片不能为空");
        // }
        // else if(this.state.shetaiAvatar == ""){
        //     alert("舌苔照片不能为空");
        // }
        else{ 
            let postData = {
                doctor_id: "",
                customer_id:"",
                identification_text:JSON.stringify(this.state),
                face_img:"",
                tongue_img:"",
                face_img_thumbnail:"",
                tongue_img_thumbnail:""
            }

            jsonp("/doctor/identification/submit", postData, "POST", function (data) {
                    if (data.code == 0) {

                    }else {
                        console.error(data.message)
                    }
            }.bind(this));
        }
    },
    render: function () {

        /*
        * <table width="90%" className="bodyidentifyCell">
         <tbody>
         <tr>
         <td width="30%">
         <label className="sectionTitle">选择用户</label>
         </td>
         <td style={{textAlign:'right'}}>
         <image className="cellArrow" src={'app/image/cellArrow.png'}/>
         </td>
         </tr>
         </tbody>
         </table>
        * */


        const imageUrl = this.state.imageUrl;

        return (
            <div className="bodyidentifyContainer">

                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="sectionTitle">基本资料</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">姓名：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input value={this.state.name} className="cellText" type="text" onChange={(e)=>{
                                this.setState({name:e.target.value});
                            }}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">身高：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input value={this.state.height} className="cellText2" type="text"  onChange={(e)=>{
                                this.setState({height:e.target.value});
                            }}/><label className="cellText3">cm</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">现体重：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input value={this.state.weight} className="cellText2" type="text" onChange={(e)=>{
                                this.setState({weight:e.target.value});
                            }}/><label className="cellText3">kg</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">年龄：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input value={this.state.age} className="cellText2" type="text" onChange={(e)=>{
                                this.setState({age:e.target.value});
                            }}/><label className="cellText3">岁</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">现产后：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input value={this.state.countWeek} className="cellText2" type="text" onChange={(e)=>{
                                this.setState({countWeek:e.target.value});
                            }}/><label className="cellText3">周</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">胎儿重量：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input value={this.state.babyWeight} className="cellText2" type="text" onChange={(e)=>{
                                this.setState({babyWeight:e.target.value});
                            }}/><label className="cellText3">克</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td >
                            <label className="cellTitle">初乳排出时间：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <label className="cellText2">产后</label><input value={this.state.churuDate} className="cellText2" style={{width:30}} type="text" onChange={(e)=>{
                            this.setState({churuDate:e.target.value});
                        }}/><label className="cellText3">天</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="sectionTitle">详细状况</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">哺乳状况：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.buruStatu} size="large" onChange={(e)=>{
                                this.setState({buruStatu:e.target.value});
                            }}>
                                <RadioButton value="母乳">母乳</RadioButton>
                                <RadioButton value="奶粉">奶粉</RadioButton>
                                <RadioButton value="混合">混合</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">母乳情况：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.muruQingkuang} size="large" onChange={(e)=>{
                                this.setState({muruQingkuang:e.target.value});
                            }}>
                                <RadioButton value="充足">充足</RadioButton>
                                <RadioButton value="不足">不足</RadioButton>
                                <RadioButton value="剩余">剩余</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">体质形态：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.tizhiXingtai} size="small" onChange={(e)=>{
                                this.setState({tizhiXingtai:e.target.value});
                            }}>
                                <RadioButton value="鸭梨型">鸭梨型</RadioButton>
                                <RadioButton value="苹果型">苹果型</RadioButton>
                                <RadioButton value="水桶型">水桶型</RadioButton>
                                <RadioButton value="枣核型">枣核型</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">怀孕前体重：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input value={this.state.huanyuanqianWeight} className="cellText2" type="text" onChange={(e)=>{
                                this.setState({huanyuanqianWeight:e.target.value});
                            }}/><label className="cellText3">kg</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">产前体重：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input value={this.state.chanqianWeight} className="cellText2" type="text" onChange={(e)=>{
                                this.setState({chanqianWeight:e.target.value});
                            }}/><label className="cellText3">kg</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">产次：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.chanci} size="large" onChange={(e)=>{
                                this.setState({chanci:e.target.value});
                            }}>
                                <RadioButton value="初产">初产</RadioButton>
                                <RadioButton value="二胎">二胎</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">分娩方式：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.fenmianFangshi} size="large" onChange={(e)=>{
                                this.setState({fenmianFangshi:e.target.value});
                            }}>
                                <RadioButton value="顺产">顺产</RadioButton>
                                <RadioButton value="剖宫产">剖宫产</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">汗出：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <Switch defaultChecked={this.state.hanchu} onChange={(value)=>{
                                value==true?this.setState({hanchu:value}):this.setState({hanchu:value,hanchuWeizhi:''})
                            }}/>
                        </td>
                    </tr>
                    {(() => {
                        if(this.state.hanchu){
                            return (
                                <tr>
                                    <td colSpan="2">
                                        <div style={{textAlign:'center',margin:15,}}>
                                            <CheckboxGroup options={hanchuOptions} onChange={(checkedValues)=>{
                                                this.setState({
                                                    hanchuWeizhi:checkedValues
                                                })
                                            }} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    })()}
                    </tbody>
                </table>

                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">体感：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup  defaultValue={this.state.tigan} size="large" onChange={(e)=>{
                                this.setState({tigan:e.target.value});
                            }}>
                                <RadioButton value="畏寒">畏寒</RadioButton>
                                <RadioButton value="怕热">怕热</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">睡眠：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.shuimian} size="large" onChange={(e)=>{
                                this.setState({shuimian:e.target.value});
                            }}>
                                <RadioButton value="好">好</RadioButton>
                                <RadioButton value="一般">一般</RadioButton>
                                <RadioButton value="差">差</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">产后疼痛：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <Switch defaultChecked={this.state.chanhoutengtong} onChange={(value)=>{
                                value==true?this.setState({chanhoutengtong:value}):this.setState({chanhoutengtong:value,chanhouTengtongWeizhi:''})
                            }}/>
                        </td>
                    </tr>

                    {(() => {
                        if(this.state.chanhoutengtong){
                            return (
                                <tr>
                                    <td colSpan="2">
                                        <div style={{textAlign:'center',margin:15,}}>
                                            <CheckboxGroup options={chanhoutengtongOptions} onChange={(checkedValues)=>{
                                                this.setState({
                                                    chanhouTengtongWeizhi:checkedValues
                                                })
                                            }} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    })()}

                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">大便：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup  defaultValue={this.state.dabian} size="small" onChange={(e)=>{
                                this.setState({dabian:e.target.value});
                            }}>
                                <RadioButton value="干燥">干燥</RadioButton>
                                <RadioButton value="稀溏">稀溏</RadioButton>
                                <RadioButton value="前干后稀">前干后稀</RadioButton>
                                <RadioButton value="正常">正常</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">次数：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.dabianCishu} size="large" onChange={(e)=>{
                                this.setState({dabianCishu:e.target.value});
                            }}>
                                <RadioButton value="无">无</RadioButton>
                                <RadioButton value="多(>3次/天)">多(>3次/天)</RadioButton>
                                <RadioButton value="正常">正常</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">饮食胃口：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.yinshiWeikou} size="large" onChange={(e)=>{
                                this.setState({yinshiWeikou:e.target.value});
                            }}>
                                <RadioButton value="正常">正常</RadioButton>
                                <RadioButton value="不欲饮食">不欲饮食</RadioButton>
                                <RadioButton value="食欲旺盛">食欲旺盛</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">饮食偏好：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <CheckboxGroup options={yinshipianhaoOptions} onChange={(checkedValues)=>{
                                this.setState({
                                    yinshipianhao:checkedValues
                                })
                            }} />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="sectionTitle">局部情况</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">乳房大小：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.rufangDaxiao} size="large" onChange={(e)=>{
                                this.setState({rufangDaxiao:e.target.value});
                            }}>
                                <RadioButton value="丰满">丰满</RadioButton>
                                <RadioButton value="正常">正常</RadioButton>
                                <RadioButton value="偏小">偏小</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">乳头皲裂：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue={this.state.rutouJunlie} size="large" onChange={(e)=>{
                                this.setState({rutouJunlie:e.target.value});
                            }}>
                                <RadioButton value="无">无</RadioButton>
                                <RadioButton value="有">有</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">肿块：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <Switch defaultChecked={this.state.zhongkuai} onChange={(value)=>{
                                value==true?this.setState({zhongkuai:value}):this.setState({zhongkuai:value,zhongkuaiWeizhi:'',zhongkuaiZainace:''})
                            }}/>
                        </td>
                    </tr>

                    {(() => {
                        if(this.state.zhongkuai){
                            return (
                                <tr>
                                    <td colSpan="2">
                                        <div style={{textAlign:'center',margin:15,}}>
                                            <RadioGroup defaultValue={this.state.zhongkuaiZainace} size="large" onChange={(e)=>{
                                                this.setState({zhongkuaiZainace:e.target.value});
                                            }}>
                                                <RadioButton value="一侧">一侧</RadioButton>
                                                <RadioButton value="双侧">双侧</RadioButton>
                                            </RadioGroup>
                                            <CheckboxGroup options={zhongkuaiweizhiOptions} onChange={(checkedValues)=>{
                                                this.setState({
                                                    zhongkuaiWeizhi:checkedValues
                                                })
                                            }} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    })()}

                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">红肿：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue="无" size="large" onChange={(e)=>{
                                this.setState({hongzhong:e.target.value});
                            }}>
                                <RadioButton value="无">无</RadioButton>
                                <RadioButton value="有">有</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">疼痛：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue="无" size="large" onChange={(e)=>{
                                this.setState({tengtong:e.target.value});
                            }}>
                                <RadioButton value="无">无</RadioButton>
                                <RadioButton value="有">有</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">局部温度：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <RadioGroup defaultValue="温" size="large" onChange={(e)=>{
                                this.setState({jubuPifuWendu:e.target.value});
                            }}>
                                <RadioButton value="温">温</RadioButton>
                                <RadioButton value="热">热</RadioButton>
                                <RadioButton value="正常">正常</RadioButton>
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="sectionTitle">请拍照</label>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">面色：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <Upload
                                className="avatar-uploader"
                                name="avatar"
                                showUploadList={false}
                                action="http://be.jinxingjk.com/doctor/identification/uploadphoto"
                                beforeUpload={this.beforeUpload}
                                customRequest={this.uploadImg}
                                onChange={this.handleChange}
                            >
                                {
                                    imageUrl ?
                                        <img src={imageUrl} alt="" className="avatar" /> :
                                        <Icon type="plus" className="avatar-uploader-trigger" />
                                }
                            </Upload>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">面色：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <ImagePicker
                                files={this.state.files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={this.state.files.length < 1}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td width="30%">
                            <label className="cellTitle">面色：</label>
                        </td>
                        <td style={{textAlign:'right'}}>
                            <input id="fileUpload0" type="file" accept="image/png,image/gif,image/jpeg,image/bmp"  onChange={this.uploadImg}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="90%" className="bodyidentifyCell">
                    <tbody>
                    <tr>
                        <td style={{textAlign:'center'}}>
                            <input type="button" className="formcontroller" onClick={this.onSubmit} value="提交" />
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }
})