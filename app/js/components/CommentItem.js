/**
 * Created by zzc on 2017/4/15.
 */
/**
 * Created by sally on 2017/2/14.
 */
'use strict';
require("../lib/util");
var React = require('react');
import { Rate } from 'antd';


var CommentItem = React.createClass({
    render: function () {
        var item = (
            <div onClick={this.onClick}>
                <div className="doctorlist_item">
                    <div className="doctorlist_item_middle">
                        <label>{this.props.name}</label>
                    </div>
                    <div className="doctorlist_item_middle">
                        <label style={{marginTop:10}}>{this.props.evaluate_text}</label>
                    </div>
                    <div className="doctorlist_item_bottom">
                        <Rate style={{ fontSize: 20,marginTop:10}} disabled defaultValue={parseInt(this.props.starrating)}/>
                    </div>
                </div>
            </div>
        );
        return item;
    }
});
module.exports = CommentItem;