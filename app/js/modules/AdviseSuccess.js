/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'

export default React.createClass({
    componentWillMount:function(){
        document.title = '金杏健康';
    },
    render: function () {
        return (
            <div className="advisesuccess_div">
                <img src="app/image/advisesuccess.png" />
                    <p>您的意见已经提交成功</p>
                    <p>我们的客服人员会尽快处理并回复</p>
                    <p>请耐心等待，谢谢</p>
            </div>
        );
    }
})
