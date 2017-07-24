/**
 * Created by sally on 2017/2/13.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var HomeNav = React.createClass({
    handleClick:function(){
        if(this.props.state=="1"){
            alert("此服务暂未开放");
        }
    },
    render: function() {
        return (
            <div className={this.props.className} onClick={this.handleClick}>
              <img src={this.props.srcimg} />
              <div>{this.props.description}</div>
            </div>
        );
    }
});
module.exports = HomeNav;
