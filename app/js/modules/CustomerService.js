/**
 * Created by sally on 2017/2/24.
 */
import React from 'react'
import { router } from 'react-router'
let jsonp = require('../lib/jsonp');

export default React.createClass({
    componentWillMount:function(){
        document.title = '进妈妈群';
    },
    render: function () {
        return (
            <div >
                <table width="100%">
                    <tbody>
                        <tr>
                            <td width="10%"></td>
                            <td width="80%">
                                <div  className="customerService_titleDiv">
                                    <label className="customerService_titleDiv_label">长按识别下面的二维码，添加金杏健康客服，客服人员会邀请您加入妈妈群。</label>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td width="10%"></td>
                            <td width="80%">
                                <div  className="customerService_qrcodeDiv">
                                    <image className="qrimage" src={"app/image/wechatserviceqrcode.jpeg"} />
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
})
