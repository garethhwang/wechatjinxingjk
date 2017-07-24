/**
 * Created by sally on 2017/2/25.
 */
import React from 'react'
import { Link } from 'react-router'
let jsonp = require('../lib/jsonp');

export default React.createClass({
    getInitialState: function () {
        return {
            first: {
                start: "",
                end: ""
            },
            second: {
                start: "",
                end: ""
            },
            third: {
                start: "",
                end: ""
            },
            fourth: {
                start: "",
                end: ""
            },
            fifth: {
                start: "",
                end: ""
            },
            sixth: {
                start: "",
                end: ""
            },
            seventh: {
                start: "",
                end: ""
            },
            eighth: {
                start: "",
                end: ""
            },
            ninth: {
                start: "",
                end: ""
            },
            tenth: {
                start: "",
                end: "",
                firend:"",
                secstart:"",
                secend:"",
                thistart:""
            }
        };
    },
    componentWillMount:function(){
        document.title = '产检计划';
    },
    componentDidMount: function () {
        var postData = null;
        jsonp("/wechat/checklist", postData, "POST", function (data) {
            if (data.code == 0) {
                this.setState({
                    first: {
                        start: data.data.first.start,
                        end: data.data.first.end
                    },
                    second: {
                        start: data.data.second.start,
                        end: data.data.second.end
                    },
                    third: {
                        start: data.data.third.start,
                        end: data.data.third.end
                    },
                    fourth: {
                        start: data.data.fourth.start,
                        end: data.data.fourth.end
                    },
                    fifth: {
                        start: data.data.fifth.start,
                        end: data.data.fifth.end
                    },
                    sixth: {
                        start: data.data.sixth.start,
                        end: data.data.sixth.end
                    },
                    seventh: {
                        start: data.data.seventh.start,
                        end: data.data.seventh.end
                    },
                    eighth: {
                        start: data.data.eighth.start,
                        end: data.data.eighth.end
                    },
                    ninth: {
                        start: data.data.ninth.start,
                        end: data.data.ninth.end
                    },
                    tenth: {
                        start: data.data.tenth.start,
                        end: data.data.tenth.end,
                        firend:data.data.tenth.firend,
                        secstart:data.data.tenth.secstart,
                        secend:data.data.tenth.secend,
                        thistart:data.data.tenth.thistart
                    }
                });
            }
            else {
                console.error(data.message)
            }
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/1?start="+this.state.first.start+"&end="+this.state.first.end}>第一次产检（第12周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                                <span className="checkHigh">空腹</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.first.start}至{this.state.first.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/2?start="+this.state.second.start+"&end="+this.state.second.end}>第二次产检（第16周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.second.start}至{this.state.second.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/3?start="+this.state.third.start+"&end="+this.state.third.end}>第三次产检（第20周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.third.start}至{this.state.third.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/4?start="+this.state.fourth.start+"&end="+this.state.fourth.end}>第四次产检（第24周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.fourth.start}至{this.state.fourth.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/5?start="+this.state.fifth.start+"&end="+this.state.fifth.end}>第五次产检（第28周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                                <span className="checkHigh">空腹</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.fifth.start}至{this.state.fifth.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/6?start="+this.state.sixth.start+"&end="+this.state.sixth.end}>第六次产检（第30周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.sixth.start}至{this.state.sixth.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/7?start="+this.state.seventh.start+"&end="+this.state.seventh.end}>第七次产检（第32周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.seventh.start}至{this.state.seventh.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/8?start="+this.state.eighth.start+"&end="+this.state.eighth.end}>第八次产检（第36周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.eighth.start}至{this.state.eighth.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/9?start="+this.state.ninth.start+"&end="+this.state.ninth.end}>第九次产检（第37周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                                <span className="checkHigh">空腹</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="time">{this.state.ninth.start}至{this.state.ninth.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checksheduleList">
                    <table>
                        <tbody>
                        <tr>
                            <td className="title">
                                <Link to={"/shedule/10?start="+this.state.tenth.start+"&end="+this.state.tenth.end+"&firend="+this.state.tenth.firend+"&secstart="+this.state.tenth.secstart+"&secend="+this.state.tenth.secend+"&thistart="+this.state.tenth.thistart}>第十--十二次产检（第38-40周）</Link>
                            </td>
                            <td rowSpan="2" className="highInfo">
                            </td>
                        </tr>
                        <tr>
                            <td className="time">
                                {this.state.tenth.start}至{this.state.tenth.end}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
})