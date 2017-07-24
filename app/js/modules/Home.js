/**
 * Created by sally on 2017/2/11.
 */
import React from 'react'
import { Link } from 'react-router'
import { Carousel, WhiteSpace, ActivityIndicator, Flex } from 'antd-mobile';
import HomeNav from '../components/HomeNav'
import BottomFooter from '../components/BottomFooter'
let jsonp = require('../lib/jsonp');
require('../lib/util');

export default React.createClass({
    getInitialState: function () {
        return {
            imgUrls: [],
            animating:false,
        };
    },
    componentWillMount: function () {
        document.title = '金杏健康';
        var imgArray = new Array();
        imgArray.push({"url": global.ImgUrl + "image/catalog/上线图片(1).jpg"});
        this.setState({imgUrls: imgArray});
    },
    componentDidMount: function () {

        this.setState({
            animating:true,
        })

        var code = "";
        if (typeof(this.props.location.query.code) == "string") {
            code = this.props.location.query.code;
        }

        var postData = {"code": code};
        console.log("postData" + JSON.stringify(postData));
        jsonp("/common/homem", postData, "POST", function (data) {
            this.setState({
                animating:false,
            })

            if (data.code == 0) {
                var imgArray = new Array();
                var bannerLen = data.data.banners.length;
                for (var i = 0; i < bannerLen; i++) {
                    var bannerObj = data.data.banners[i];
                    console.log("imgurl"+global.ImgUrl + bannerObj.image);
                    imgArray.push({"url": global.ImgUrl + bannerObj.image});
                }
                this.setState({imgUrls: imgArray});
            }
            else {
                errorMsg(data);
            }
        }.bind(this));

    },
    render: function () {
        return (
            <div>
                <div id="header">
                  <Carousel
                    className="my-carousel" autoplay={true} infinite selectedIndex={1}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                  >
                    {this.state.imgUrls.map(img => (
                        <img
                          src={img.url}
                          onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({
                              initialHeight: null,
                            });
                          }}
                        />
                    ))}
                  </Carousel>
                </div>
                <WhiteSpace size="xl" />
                <Link to="/productcategory/20">
                    <Flex>
                    <Flex.Item>
                      <HomeNav description="泌乳调理" srcimg="app/image/homenavimg1.png" className="homenav nav1" state="0"/>
                    </Flex.Item>
                    </Flex>
                </Link>
                <WhiteSpace size="xl" />
                <Link to="/productcategory/57">
                    <Flex>
                    <Flex.Item>
                      <HomeNav description="金杏课堂" srcimg="app/image/homenavimg2.png" className="homenav nav2" state="0"/>
                    </Flex.Item>
                    </Flex>
                </Link>
                <WhiteSpace size="xl" />
                <Flex>
                <Flex.Item>
                <HomeNav description="营养膳食" srcimg="app/image/homenavimg3.png" className="homenav nav3" state="1"/>
                </Flex.Item>
                </Flex>
                <BottomFooter nav="service"/>
                <div className="loading-example">
                    <ActivityIndicator animating/>
                </div>
            </div>
        );
    }
})
