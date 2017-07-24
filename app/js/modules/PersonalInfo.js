/**
 * Created by sally on 2017/2/15.
 */
/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import { Link } from 'react-router'
import DocumentDetail from '../components/DocumentDetail'
require('../lib/util');

export default React.createClass({
    componentWillMount:function(){
        document.title = '个人信息';

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
    componentWillUnmount: function () {
        document.body.style.backgroundColor = "white";
    },
    componentDidMount: function () {
        document.body.style.backgroundColor = "#eee";
        var code = "";
        if (typeof(this.props.location.query.code) == "string") {
            code = this.props.location.query.code;
        }
        var postData = {"code": code};
        jsonp("/wechat/personalinfo", postData, "POST", function (data) {
            if (data.code == 0) {
                
            }
            else {
                errorMsg(data);
            }
        }.bind(this));
    },
    render: function () {
        var data = {
            info: [
                {title: "基本信息", action: "/baseinfo?code="+document.code},
                {title: "产检计划", action: "/checklist?code="+document.code},
                {title: "疫苗接种表", action: "/vaccinemenu?code="+document.code}
            ]
        };

        var personalinfo = data.info.map(function (info, index) {
            return (
                <Link key={index} to={info.action}><DocumentDetail title={info.title} action={info.action}/></Link>
            );
        });
        return (
            <div>
                {personalinfo}
            </div>
        );
    }
})

