/**
 * Created by sally on 23.2/2/14.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link,IndexLink, browserHistory, history, hashHistory} from 'react-router'
import { TabBar, Icon } from 'antd-mobile';

var BottomFooter = React.createClass({
    render: function () {
        return (
               <TabBar
                  unselectedTintColor="white"
                  tintColor="#EDA268"
                  barTintColor="#3b3a3d"
                >

                  <TabBar.Item
                    title="服务首页"
                    key="服务首页"
                    icon={<div style={{
                      width: '3.24rem',
                      height: '3.24rem',
                      background: 'url(app/image/wechatfooter/footerhome.png) center center /  3.22rem 3.22rem no-repeat' }}
                    />
                    }
                    selectedIcon={<div style={{
                      width: '3.24rem',
                      height: '3.24rem',
                      background: 'url(app/image/wechatfooter/footerhome_active.png) center center /  3.22rem 3.22rem no-repeat' }}
                    />
                    }
                    selected={this.props.nav === 'service'}
                    onPress={() => {
                      hashHistory.push('/')
                    }}
                    data-seed="logId"
                  >
                  </TabBar.Item>

                  <TabBar.Item
                    title="权威文章"
                    key="权威文章"
                    icon={<div style={{
                      width: '3.24rem',
                      height: '3.24rem',
                      background: 'url(app/image/wechatfooter/footerdoc.png) center center /  3.22rem 3.22rem no-repeat' }}
                    />
                    }
                    selectedIcon={<div style={{
                      width: '3.24rem',
                      height: '3.24rem',
                      background: 'url(app/image/wechatfooter/footerdoc_active.png) center center /  3.22rem 3.22rem no-repeat' }}
                    />
                    }
                    selected={this.props.nav === 'blog'}
                    onPress={() => {
                      hashHistory.push('/pressall')
                      //hashHistory.push('/bodyidentify')
                    }}
                    data-seed="logId"
                  >
                  </TabBar.Item>

                  <TabBar.Item
                    title="订单中心"
                    key="订单中心"
                    icon={<div style={{
                      width: '3.24rem',
                      height: '3.24rem',
                      background: 'url(app/image/wechatfooter/footeruser.png) center center /  3.22rem 3.22rem no-repeat' }}
                    />
                    }
                    selectedIcon={<div style={{
                      width: '3.24rem',
                      height: '3.24rem',
                      background: 'url(app/image/wechatfooter/footeruser_active.png) center center /  3.22rem 3.22rem no-repeat' }}
                    />
                    }
                    selected={this.props.nav === 'order'}
                    onPress={() => {
                      hashHistory.push('/ordercenter')
                    }}
                    data-seed="logId"
                  >
                  </TabBar.Item>

                </TabBar>
        );
    }
});
module.exports = BottomFooter;
