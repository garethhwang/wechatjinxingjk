/**
 * Created by sally on 2017/2/15.
 */
var React = require('react');
var ReactDOM = require('react-dom');


var DocumentDetail = React.createClass({
    render: function () {
        var item;
        item = (
            <div className="userinfoList">
                {this.props.title}<img src="app/image/userinfoimg3.png" />
            </div>
        );
        return item;
    }
});
module.exports = DocumentDetail;
