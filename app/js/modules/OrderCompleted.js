/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import OrderItem from '../components/OrderItem'
import BottomFooter from '../components/BottomFooter'
import OrderNone from '../components/OrderNone'
let jsonp = require('../lib/jsonp');

export default React.createClass({
    getInitialState: function () {
        return {
            orderHTML: ""
        };
    },
    componentDidMount: function () {
        document.title = '已完成订单';
        var postData = null;
        jsonp("/wechat/ordercenter/getCompletedList", postData, "POST", function (data) {
                if (data.code == 0) {
                var orderlist;
                if (data.data.orders.length != 0) {
                    orderlist = data.data.orders.map(function (order, index) {
                        return (

                                <OrderItem key={index} type="5" order_id={order.order_id} shipping_city={order.shipping_city}
                                           shipping_address_1={order.shipping_address_1}
                                           shipping_date={order.shipping_date} totals={order.total}
                                           products={order.products} service_tel={data.data.service_tel}/>

                        );
                    });
                    this.setState({
                        orderHTML: (<div>
                            <div className="orderTitle">
                                已完成订单
                            </div>
                            {orderlist}
                            <BottomFooter nav="order"/>
                        </div>)
                    });
                }
                else {
                    orderlist = (
                        <OrderNone />
                    );
                    this.setState({
                        orderHTML: orderlist
                    });
                }

            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },
    render: function () {
        var webHTML = (
            <div>
                {this.state.orderHTML}
            </div>
        );
        return webHTML;
    }
})

