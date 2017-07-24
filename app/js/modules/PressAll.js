/**
 * Created by sally on 2017/2/22.
 */
import React from 'react'
import { Link } from 'react-router'
import BlogItem from '../components/BlogItem'
import BottomFooter from '../components/BottomFooter'
import { ListView, WingBlank } from 'antd-mobile';
let jsonp = require('../lib/jsonp');
require("../lib/util");

let index = -1;
const NUM_ROWS = 20;
let pageIndex = 0;

export default React.createClass({
    getInitialState: function () {
        return {
            bloglist: ""
        };
    },
    componentWillMount:function(){
        document.title = '权威文章';
        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.genData = (pIndex = 0) => {
          const dataBlob = {};
          for (let i = 0; i < NUM_ROWS; i++) {
            const ii = (pIndex * NUM_ROWS) + i;
            dataBlob[`${ii}`] = `row - ${ii}`;
          }
          return dataBlob;
        };

        this.state = {
          dataSource: dataSource.cloneWithRows({}),
          isLoading: true,
        };

    },
    componentDidMount: function () {
        var postData = null;
        jsonp("/press/all", postData, "POST", function (data) {
            if (data.code == 0) {
                sessionStorage.jxsession = data.data.jxsession;

                var bloglist = data.data.presses.map(function (press) {
                    return (
                        <BlogItem key={press.press_id} title={press.title} action={"/pressall/"+press.press_id}
                                  thumb={global.ImgUrl+press.thumb}/>
                    );
                });
                this.setState({
                    bloglist: data.data.presses
                });
                //this.rData = this.genData();
                this.rData = data.data.presses;
                this.setState({
                   dataSource: this.state.dataSource.cloneWithRows(this.rData),
                   isLoading: false,
                });
            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },

    render: function () {
          const separator = (sectionID, rowID) => (
              <div key={`${sectionID}-${rowID}`} style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
              }} />
          );
          const row = (rowData, sectionID, rowID) => {
              if (index < 0) {
                index = this.state.bloglist.length - 1;
              }
              const obj = this.state.bloglist[index--];
              return (
                <Link to={`/pressall/${obj.press_id}`} >
                  <div key={rowID} className="row">
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '1rem 0' }}>
                      <img style={{ height: '8rem', marginRight: '4rem' }} src={global.ImgUrl+obj.thumb} />
                      <div className="row-text">
                        <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.8rem' }}>{obj.title}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
          };
          return (
            <div>
            <WingBlank size="lg">
            <ListView ref="lv"
              dataSource={this.state.dataSource}
              renderRow={row}
              renderSeparator={separator}
              className="am-list"
              pageSize={4}
              scrollRenderAheadDistance={500}
              scrollEventThrottle={20}
              onScroll={() => { console.log('scroll'); }}
              useBodyScroll
            />
            </WingBlank>
            <BottomFooter nav="blog" />
            </div>
         );
      }
})
