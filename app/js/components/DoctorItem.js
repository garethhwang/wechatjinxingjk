/**
 * Created by sally on 2017/2/14.
 */
'use strict';
require("../lib/util");
var React = require('react');
import { Rate } from 'antd';
import { Link } from 'react-router'
let jsonp = require('../lib/jsonp');


var DoctorItem = React.createClass({
    onClick(){
        this.props.action();
    },
    onCommentClick(){
        this.props.commentaction();
    },
    render: function () {
        var item = (
            <div>
                <div className="doctorlist_item">
                    <table width="100%" className="doctorlist_item_top">
                        <tbody>
                            <tr>
                                <td>
                                    <image className="doctorlist_item_top_image" style={{flex:1,width:80,height:80,borderRadius:40}} src={global.ImgUrl+this.props.thumb}/>
                                </td>
                                <td>
                                    <label className="doctorlist_item_top_label" style={{flex:1,marginLeft:20,fontSize:15}}>{this.props.name}</label>
                                </td>
                                <td className="commentBtn">
                                    <Link to={this.props.commentaction} className="commentBtn">
                                        <input className="formcontroller" type="button" value="查看评价" style={{marginRight:30,width:80}}/>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="doctorlist_item_middle">
                        <label style={{marginTop:10}}>{this.props.desc}</label>
                    </div>
                    <table className="doctorlist_item_bottom" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <Rate style={{ fontSize: 20,marginTop:10}} disabled defaultValue={this.props.starrating}/>
                                </td>
                                <td className="commentBtn">
                                    <input type="button" className="formcontroller" style={{marginRight:30,width:80}} value="确定" onClick={this.onClick}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
        return item;
    }
});
module.exports = DoctorItem;