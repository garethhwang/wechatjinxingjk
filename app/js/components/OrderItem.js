/**
 * Created by sally on 2017/2/27.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { Link } from 'react-router'

var OrderItem = React.createClass({
    contact:function(){
        event.stopPropagation();
        //location.href = "tel:"+this.props.service_tel;
        this.context.router.push("/ordercomment/"+this.props.order_id);
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    handlePay:function(){
        this.context.router.push("/orderadd/"+this.props.order_id);
    },
    render: function () {

        /*
         <td className="thirdRight">
         <input type="image" style={{width:30,height:30}} src="app/image/trashIcon.png" onClick={this.props.onClick}/>
         </td>
         */
        //<input type="button" value="删除" onClick={this.props.onClick}/>

        var productList = this.props.products.map(function (product, index) {
            return (
                <span key={index}>{product.name}</span>
            )
        });
        var item;
        switch (Number(this.props.type)) {
            case 1:
                item = (
                    <div className="orderList">
                        <table className="maintable" data-num={this.props.order_id}>
                            <tbody>
                            <tr>
                                <td width="25%" className="left">地址：</td>
                                <td width="50%" className="collRight">{this.props.shipping_city + this.props.shipping_address_1}</td>
                                <td className="thirdRight">
                                    <input type="image" style={{width:30,height:30}} src="app/image/trashIcon.png" onClick={this.props.onClick}/>
                                </td>
                            </tr>
                            <tr>
                                <td>时间：</td>
                                <td>{this.props.shipping_date}</td>
                                <td className="listMoney thirdRight">
                                    ￥{this.props.totals}
                                </td>
                            </tr>
                            <tr>
                                <td>商品：</td>
                                <td>
                                    {productList}
                                </td>
                                <td className="thirdRight">
                                    <span className="listPaybtn" datanum={this.props.order_id} onClick={this.handlePay}>去支付</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
                break;
            case 5:
            case 15:
                item = (
                    <div className="orderList" onClick={this.contact}>
                        <table className="maintable">
                            <tbody>
                            <tr>
                                <td className="left">地址：</td>
                                <td colSpan="2"
                                    className="collRight">{this.props.shipping_city + this.props.shipping_address_1}</td>
                            </tr>
                            <tr>
                                <td>时间：</td>
                                <td>{this.props.shipping_date}</td>
                                <td className="listMoney" style={{textAlign:"right"}}>￥{this.props.totals}</td>
                            </tr>
                            <tr>
                                <td>商品：</td>
                                <td>
                                    {productList}
                                </td>
                                <td style={{textAlign:"right"}}>
                                    <span className="listPaybtn" onClick={this.contact}>去评价</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
                break;
        }

        return item;
    }
});
module.exports = OrderItem;
