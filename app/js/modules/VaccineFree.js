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
                    国家免费提供接种的一类疫苗接种时间表
                </div>
                <div className="vaccineContent">
                    <table>
                        <tbody>
                        <tr>
                            <td><span className="age">出生时</span></td>
                            <td>
                                乙肝疫苗（第1针）、卡介苗
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">1月龄</span></td>
                            <td>
                                乙肝疫苗（第2针）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">2月龄</span></td>
                            <td>
                                脊髓灰质炎减毒活疫苗或灭活疫苗（第1剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">3月龄</span></td>
                            <td>
                                脊髓灰质炎减毒活疫苗或灭活疫苗（第2剂）<br/>
                                百白破联合疫苗（第1剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">4月龄</span></td>
                            <td>
                                脊髓灰质炎减毒活疫苗或灭活疫苗（第3剂）<br/>
                                百白破联合疫苗（第2剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">5月龄</span></td>
                            <td>
                                百白破联合疫苗（第3剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">6月龄</span></td>
                            <td>
                                乙肝疫苗（第3剂）<br/>
                                A群流行性脑脊髓膜炎疫苗
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">8月龄</span></td>
                            <td>
                                麻风疫苗（第1剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">9月龄</span></td>
                            <td>
                                A群流脑疫苗（第2剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">12月龄</span></td>
                            <td>
                                乙脑减毒活疫苗或乙脑灭活疫苗（第1、2剂，间隔7-10天）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">18月龄</span></td>
                            <td>
                                甲肝减毒活疫苗（第1剂）或甲肝灭活疫苗
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">1.5岁-2岁</span></td>
                            <td>
                                百白破联合疫苗（第4剂）<br/>
                                麻腮风疫苗或麻腮疫苗（第1剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">2岁</span></td>
                            <td>
                                乙脑减毒活疫苗（第2剂）或乙脑灭活疫苗（第3剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">2-2.5岁</span></td>
                            <td>
                                甲肝灭活疫苗（第2剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">3岁</span></td>
                            <td>
                                流脑A+C群疫苗（第1剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">4岁</span></td>
                            <td>
                                脊髓灰质炎减毒活疫苗（第4剂）
                            </td>
                        </tr>
                        <tr>
                            <td><span className="age">6岁</span></td>
                            <td>
                                麻腮风疫苗（第2剂）、白破疫苗
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
})
