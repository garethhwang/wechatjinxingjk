/**
 * Created by sally on 2017/2/24.
 */
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
    componentWillMount:function(){
        document.title = '疫苗接种表';
    },
    render: function () {
        return (
            <div>
                <div className="vaccineTitle">
                    需要自费的二类疫苗接种时间表
                </div>
                <div className="vaccineContent">
                    <table>
                        <tbody>
                        <tr>
                            <td><span className="age">2月龄-24月龄</span>五联疫苗</td>
                        </tr>
                        <tr>
                            <td><span className="age">3月-2岁</span>7价肺炎球菌结合疫苗</td>
                        </tr>
                        <tr>
                            <td><span className="age">2岁以上高危人群</span>23价肺炎球菌多糖疫苗</td>
                        </tr>
                        <tr>
                            <td><span className="age">6月龄以上</span>流行性感冒疫苗</td>
                        </tr>
                        <tr>
                            <td><span className="age">2月龄以上</span>B型流感嗜血杆菌疫苗（Hib疫苗）</td>
                        </tr>
                        <tr>
                            <td><span className="age">2月龄-3岁</span>轮状病毒疫苗</td>
                        </tr>
                        <tr>
                            <td><span className="age">18月龄以上</span>水痘疫苗</td>
                        </tr>
                        <tr>
                            <td><span className="age">2岁及以上</span>霍乱疫苗</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
})
