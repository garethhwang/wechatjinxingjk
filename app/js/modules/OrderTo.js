/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import OrderItem from '../components/OrderItem'
import BottomFooter from '../components/BottomFooter'
import OrderNone from '../components/OrderNone'
import { Modal, Button } from 'antd';
let jsonp = require('../lib/jsonp');

const confirm = Modal.confirm;

export default React.createClass({
    getInitialState: function () {
        return {
            orderHTML: ""
        };
    },
    deleteOrder:function(orderid){

        let _this = this;

        confirm({
            title: '删除',
            content: '点击确认后删除订单',
            onOk() {
                var postData = {
                    "order_id": orderid,
                };
                jsonp("/wechat/ordercenter/delete", postData, "POST", function (data) {
                    if (data.code == 0) {
                        console.log('删除成功')
                        _this.fetchData();
                    }else{
                        alert(error(data.message))
                    }
                }.bind(this))

                // return new Promise((resolve, reject) => {
                //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });



        // alert('删除', '确定删除么???', [
        //     { text: '取消', onPress: () => console.log('cancel') },
        //     { text: '确定', onPress: () => {
        //         console.log('ok')
        //         var postData = {
        //             "order_id": orderid,
        //         };
        //         jsonp("/wechat/ordercenter/delete", postData, "POST", function (data) {
        //             if (data.code == 0) {
        //                 console.log('删除成功')
        //                 this.fetchData();
        //             }else{
        //                 alert(error(data.message))
        //             }
        //         }.bind(this))
        //     }, style: { fontWeight: 'bold' } },
        // ])
    },
    componentWillMount: function () {
        document.title = '待支付订单';
    },
    componentDidMount: function () {
        this.fetchData();
    },
    fetchData: function () {
        var postData = null;
        jsonp("/wechat/ordercenter/getPendingList", postData, "POST", function (data) {
            if (data.code == 0) {
                let _this = this;

                var orderlist;
                if (data.data.orders.length != 0) {
                    orderlist = data.data.orders.map(function (order, index) {
                        return (
                            <OrderItem name={order.order_id} key={index} type="1" order_id={order.order_id} shipping_city={order.shipping_city}
                                       shipping_address_1={order.shipping_address_1}
                                       shipping_date={order.shipping_date} totals={order.total}
                                       products={order.products} onClick={()=>_this.deleteOrder(order.order_id)}

                            />
                        );
                    });
                    this.setState({
                        orderHTML: (
                            <div>
                                <div className="orderTitle">
                                    待支付
                                </div>
                                {orderlist}
                                <BottomFooter nav="order"/>
                            </div>
                        )
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
