/**
 * Created by sally on 2017/2/15.
 */
import React from 'react'
import { Link,History } from 'react-router'
require('../lib/util');

export default React.createClass({
    getInitialState: function () {
        return {
            "advisetext": "",
            "service_tel":""
        }
    },
    contextTypes:{
        router: React.PropTypes.object.isRequired
    },
    handleChange: function (event) {

        this.setState({
            "advisetext": event.target.value
        });
    },
    handleSubmit: function (event) {
        event.preventDefault();
        if (this.state.advisetext.length == 0) {
            alert("建议内容不能为空！");
            return;
        }
        var postData = {"advisetext": this.state.advisetext};
        jsonp("/wechat/advise", postData, "POST", function (data) {
            if (data.code == 0) {
                this.context.router.push("/advisesuccess");
            }
            else {
                errorMsg(data);
            }
        }.bind(this));
    },
    componentWillMount:function(){
        document.title = '投诉建议';
    },
    componentDidMount: function () {
        var code = "";
        if (typeof(this.props.location.query.code) == "string") {
            code = this.props.location.query.code;
        }
        var postData = {"code": code};
        console.log("postData"+JSON.stringify(postData));
        jsonp("/wechat/advise/show", postData, "POST", function (data) {
            if (data.code == 0) {
                this.setState({
                    service_tel:data.data.service_tel
                });
            }
            else {
                errorMsg(data);
            }
        }.bind(this));
    },
    render: function () {
        return (
            <form action="" method="post" className="form-horizontal">
                <div className="adviseTitle">投诉建议</div>
                <div className="adviseTel">客服电话：<a href={"tel:"+this.state.service_tel}>{this.state.service_tel}</a></div>
                <div className="adviseIllu">
                    说明：您有任何意见或者建议，可以公共平台提交意见，也可以直接拨打客服电话反映，我们的工作人员将在第一时间进行处理和回复。
                </div>
                <textarea className="adviseContent" name="advisetext" value={this.state.handleChange} onChange={this.handleChange}></textarea>
                <div className="adviseBottom">
                    <input type="submit" className="bindBtn" onClick={this.handleSubmit} value="提交建议"/>
                </div>
            </form>
        );
    }
})