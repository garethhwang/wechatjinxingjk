/**
 * Created by sally on 2017/2/24.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var OrderNone = React.createClass({
    render: function () {
        var item;
        item = (
            <div className="advisesuccess_div">
                <img src="app/image/noorder.png" />
                    <p>没有交易订单</p>
            </div>
        );
        return item;
    }
});
module.exports = OrderNone;

