/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import { Rate } from 'antd';
import { Tag,TextareaItem } from 'antd-mobile';
let jsonp = require('../lib/jsonp');


export default React.createClass({
    getInitialState: function () {
        return {
            order_id:this.props.params.id,
            evaluate_text:'',
            starrating:'',
            evaluate_tag:'',
            service_tel:''
        };
    },
    componentDidMount: function () {
        document.title = '评价';
    },
    onSubmit: function () {

        let postData = this.state;

        jsonp("/wechat/evaluate/submit", postData, "POST", function (data) {
            if (data.code == 0) {
                history.back();
            }else {
                errorMsg(data);
            }
        })


    },
    render: function () {

        /*
         <div style={{textAlign:'center',marginTop:30,marginLeft:30,marginRight:30}}>
         <label className="commentLabel">是否需要预约下一次服务</label>
         <Tag style={{marginLeft:20}} data-seed="logId">预约</Tag>
         </div>
         */

        return(
            <div style={{textAlign:'center'}}>
                <Rate style={{ fontSize: 30,marginTop:30}} onChange={(value)=>{this.setState({starrating:value})}}/>
                <table width="100%" style={{marginTop:20}}>
                    <tbody>
                    <tr>
                        <td>
                            <Tag style={{marginTop:20}} data-seed="logId" onChange={()=>{this.setState({evaluate_tag:this.state.evaluate_tag+'服务态度不好1'})}}>服务态度不好1</Tag>
                        </td>
                        <td>
                            <Tag style={{marginTop:20}} data-seed="logId" onChange={()=>{this.setState({evaluate_tag:this.state.evaluate_tag+'服务态度不好2'})}}>服务态度不好2</Tag>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Tag style={{marginTop:20}} data-seed="logId" onChange={()=>{this.setState({evaluate_tag:this.state.evaluate_tag+'服务态度不好3'})}}>服务态度不好3</Tag>
                        </td>
                        <td>
                            <Tag style={{marginTop:20}} data-seed="logId" onChange={()=>{this.setState({evaluate_tag:this.state.evaluate_tag+'服务态度不好4'})}}>服务态度不好4</Tag>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div style={{textAlign:'center',marginTop:30,marginLeft:30,marginRight:30}}>
                    <TextareaItem
                        rows={3}
                        placeholder="其他想说的"
                        style={{borderRadius:5,backgroundColor:'#f5f5f9'}}
                        onChange={(value)=>{
                            this.setState({evaluate_text:value})
                        }}
                    />
                </div>
                <div style={{marginTop:50,height:70}}>
                    <div className="commentSubmitBtn" onClick={this.onSubmit}>提交</div>
                </div>
            </div>
        )
    }
})
