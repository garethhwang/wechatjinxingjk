/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import DoctorItem from '../components/CommentItem'
require('../lib/util');

export default React.createClass({
    getInitialState: function () {
        return {
            commentlist: ""
        };
    },
    componentDidMount: function () {

        var postData = {
            'doctor_id':this.props.params.id
        };
        // var postData = {
        //     'doctor_id':16
        // };
        jsonp("/wechat/order/getDoctorEvaluate", postData, "POST", function (data) {
            if (data.code == 0) {

                sessionStorage.jxsession = data.data.jxsession;

                let commentlist = data.data.evaluate_info.map(function (comment, index) {
                    return (
                        <DoctorItem  name={comment.realname} evaluate_text={comment.evaluate_text} starrating={comment.starrating}/>
                    );
                });
                this.setState({
                    commentlist: commentlist
                });
            }
            else {
                errorMsg(data);
            }
        }.bind(this));
    },
    render: function () {
        if(this.state.commentlist.length==0){
            return (
                <div style={{textAlign:'center'}}>
                    <label style={{lineHeight:20,fontSize:20,verticalAlign:'middle'}}>该医生暂无评价</label>
                </div>
            );
        }else{
            return (
                <div>
                    <div className="commentlist" >
                        {this.state.commentlist}
                    </div>
                </div>
            );
        }
    }
})
