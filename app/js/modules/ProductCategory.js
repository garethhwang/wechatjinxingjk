/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import ProductItem from '../components/ProductItem'
import BottomFooter from '../components/BottomFooter'
require('../lib/util');

export default React.createClass({
    getInitialState: function () {
        return {
            productlist: ""
        };
    },
    componentDidMount: function () {
        var postData = {"category_id": this.props.params.id};
        jsonp("/product/category", postData, "POST", function (data) {
            if (data.code == 0) {
                sessionStorage.jxsession = data.data.jxsession;
                document.title = data.data.heading_title;
                var productlist = data.data.products.map(function (product, index) {
                    return (
                        <ProductItem key={product.product_id} thumb={product.thumb} name={product.name}
                                     price={product.price}
                                     service_timer={product.service_timer} action={"/product/"+product.product_id}/>
                    );
                });
                this.setState({
                    productlist: productlist
                });
            }
            else {
                errorMsg(data);
            }
        }.bind(this));
    },
    render: function () {
        return (
            <div className="mycontainer">
                <div className="productlist">
                    {this.state.productlist}
                </div>
                <BottomFooter nav="service" />
            </div>
        );
    }
})
