/**
 * Created by sally on 2017/2/25.
 */
import React from 'react'
import { Link } from 'react-router'
let jsonp = require('../lib/jsonp');

export default React.createClass({
    componentWillMount:function(){
        document.title = '产检计划';
    },
    render: function () {
        var shedule= Object;
        shedule.num1 = (
            <div className="checkContent">
                <div className="title">第1次产检(第12周)</div>
                <p>检查时间：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>检查项目：</p>
                <p>1、领取“母子健康档案”</p>
                <p>2、血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>3、排除常见疾病如宫外孕、葡萄胎及各种类型的流产</p>
                <p>是否需要空腹：是</p>
                <p>说明：这次产检，一般医院会给妈妈们办理“母子健康档案”。日后医生为每位准妈妈做各项产检时，也会依据手册记载的检查项目分别进行并做记录。</p>
                <p>检查项目主要包括：</p>
                <p>1. 量体重和血压。</p>
                <p>2.进行问诊：医生通常会问准妈妈未怀孕前的体重数，以作为日后准妈妈孕期体重增加的参考依据。并了解过去病史，有无药物过敏、家庭病史、准妈妈病史等。</p>
                <p>3.听宝宝心跳：医生运用多普勒胎心仪来听宝宝的心跳。</p>
                <p>4.验尿：主要是验准妈妈的糖尿及蛋白尿两项数值，以判断准妈妈本身是否已有糖尿病或耐糖不佳的代谢性疾病、肾脏功能健全与否(代谢蛋白质问题)、子痫前症、妊娠糖尿病等各项疾病。</p>
                <p>5.身体各部位检查：医生会对准妈妈的甲状腺、乳房、骨盆等进行检查。</p>
                <p>6.抽血：准妈妈做抽血检验，主要是验准妈妈的血型、ABO 血型、RH 血型、血红蛋白(检视准妈妈贫血程度)、筛查地中海贫血、肝功、肾功及梅毒、乙肝、艾滋病、有无病毒感染等，好为未来做防范。</p>
                <p>7.检查子宫大小。</p>
            </div>
        );
        shedule.num2 = (
            <div className="checkContent">
                <div className="title">第2次产检(第16周)</div>
                <p>检查时间：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>检查项目：</p>
                <p>1、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>2、唐氏症筛检</p>
                <p>是否需要空腹：否</p>
                <p>说明：从第二次产检开始，准妈妈每次必须做基本的例行检查，包括称体重、量血压、问诊及看宝宝的胎心等。此外准妈妈可以在16周以上抽血做唐氏症筛检(但以16 ～ 18
                    周最佳)，并看第一次产检的抽血报告。唐氏综合征又称“先天愚型”或“21 三体综合征”，特指21 号染色体由正常的2 条变成3
                    条，患唐氏综合征的孩子大多为严重智能障碍，所以三元专家建议怀孕女性选择这项检查。</p>
            </div>
        );
        shedule.num3 = (
            <div className="checkContent">
                <div className="title">第3次产检(第20周)</div>
                <p>检查时间：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>检查项目：</p>
                <p>1、四维彩超胎儿畸形筛查</p>
                <p>2、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>是否需要空腹：否</p>
                <p>说明：除了常规检查以外，这次产检要做第一次超声波检查。</p>
                <p>准妈妈在孕20 周做第一次超声波检查，主要是看胎儿外观发育上是否有较大问题。医生会仔细量胎儿的头围、腹围，看大腿骨长度及检视脊柱是否有先天性异常。</p>
            </div>
        );
        shedule.num4 = (
            <div className="checkContent">
                <div className="title">第4次产检(第24周)</div>
                <p>检查项目：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>1、妊娠糖尿病筛检</p>
                <p>2、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>是否需要空腹：否</p>
                <p>说明：大部分妊娠糖尿病的筛检，是在孕期第24 周做。先抽取准妈妈的血液样本，来做一项耐糖试验，建议空腹喝下50 克的糖水，等1 小时后，再进行抽血。当结果出来后，血液指数若在140
                    以下，即属正常。如糖筛异常者，指导控制饮食，两周后复查空腹血糖和餐后一小时血糖，其中有一项异常继续控制饮食两周。</p>
            </div>
        );
        shedule.num5 = (
            <div className="checkContent">
                <div className="title">第5次产检(第28周)</div>
                <p>检查时间：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>检查项目：</p>
                <p>1、乙型肝炎抗原、骨盆测量、胎位检查、B 超</p>
                <p>2、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>是否需要空腹：是</p>
                <p>说明：此阶段最重要是为准妈妈抽血检查乙型肝炎，目的是要检视准妈妈本身是否携带乙肝病毒或已感染到乙型肝炎。如果准妈妈的乙型肝炎两项检验皆呈阳性反应，一定要让医生知道，才能在准妈妈生下胎儿24
                    小时内，为新生儿注射疫苗，以免让新生儿遭受感染。此外，要再次做B 超检查，以排除畸形可能。这次产检开始检查宝宝的胎位，检查妈妈的骨盆，为分娩做准备。</p>
            </div>
        );
        shedule.num6 = (
            <div className="checkContent">
                <div className="title">第6次产检(第30周)</div>
                <p>检查时间：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>检查项目：</p>
                <p>1、下肢水肿、子痫前症的发生</p>
                <p>2、胎位检查、指导准妈妈自数胎动</p>
                <p>3、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>是否需要空腹：否</p>
                <p>说明： 在孕期28
                    周以后，产检变为两周一次，医生要陆续为准妈妈检查是否有水肿现象。因为准妈妈的子宫已经扩张到一定水平，有可能会压迫到静脉，所以，静脉回流不好的准妈妈，此阶段较易出现下肢水肿现象。由于大部分的子痫前症，会在孕期28
                    周以后发生，医生通常依据准妈妈测量血压所得到的数值作为依据，如果测量结果发现准妈妈的血压偏高，又出现蛋白尿、全身水肿等情况时，准妈妈须多加留意，以免有子痫前症的危险。所以，准妈妈在怀孕后期，针对血压、蛋白尿、尿糖所做的检查非常重要。从这周开始，准妈妈要关注自己的胎动。</p>
            </div>
        );
        shedule.num7 = (
            <div className="checkContent">
                <div className="title">第7次产检(第32周)</div>
                <p>检查时间：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>检查项目：</p>
                <p>1、评估胎儿体重、胎位检查</p>
                <p>2、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>3、指导准妈妈自数胎动</p>
                <p>是否需要空腹：否</p>
                <p>
                    说明：除了做常规检查以外，这次产检还会预估胎儿至足月生产时的重量。一旦发现胎儿体重不足，准妈妈就应多补充一些营养素;若发现胎儿过重，准妈妈在饮食上就要稍加控制，以免日后需要剖宫生产，或在生产过程中出现胎儿难产情形。</p>
            </div>
        );
        shedule.num8 = (
            <div className="checkContent">
                <div className="title">第8次产检(第36周)</div>
                <p>检查时间：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>检查项目：</p>
                <p>1、胎位检查</p>
                <p>2、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>3、指导准妈妈自数胎动</p>
                <p>是否需要空腹：否</p>
                <p>说明：从36 周开始，产检变为一周一次，医生会持续监视胎儿的状态。此阶段的准妈妈，可开始准备一些生产用的东西，以免生产当天太过匆忙，手忙脚乱。</p>
            </div>
        );
        shedule.num9 = (
            <div className="checkContent">
                <div className="title">第9次产检 (第37周 )</div>
                <p>检查时间：</p><p>{this.props.location.query.start} 至 {this.props.location.query.end}</p>
                <p>检查项目：</p>
                <p>1、肝功有异常者复查肝功</p>
                <p>2、查血凝四项、B 超、心电图、胎位检查、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>
                <p>3、胎心监测、检查胎儿与准妈妈骨盆等综合情况，决定分娩方式</p>
                <p>4、指导准妈妈自数胎动，指导准妈妈有不适情况如腹痛、见红、阴道流液随诊。</p>
                <p>是否需要空腹：是</p>
                <p>说明：这次医生会全面了解准妈妈和胎儿的状况，包括准妈妈的心脏状况等。因为37 周以后，准妈妈随时有可能生产，从这次产检开始，以后每次产检都会做胎心监护，严密监测胎儿的状况。</p>
            </div>
        );
        shedule.num10 = (
            <div className="checkContent">
                <div className="title">第10-12次产检(第38-40 周各一次)</div>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            检查时间：
                        </td>
                        <td>{this.props.location.query.start}至{this.props.location.query.firend}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{this.props.location.query.secstart}至{this.props.location.query.secend}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{this.props.location.query.thistart}至{this.props.location.query.end}</td>
                    </tr>
                    </tbody>
                </table>
                <p>检查项目：</p>

                <p>1、胎位检查、复查血常规、尿常规、宫高、腹围、胎心、血压、体重</p>

                <p>2、胎心监测、可以熟悉了解生产的进行情况，每天勤练拉玛泽呼吸法</p>

                <p>是否需要空腹：否</p>

                <p>说明：从38 周开始，胎位开始固定，胎头已经下来，并卡在盆腔内，此时准妈妈应做好临产准备，注意自己的胎动变化。</p>
            </div>
        );
        switch (Number(this.props.params.id)) {
            case 1:
                return shedule.num1;
            case 2:
                return shedule.num2;
            case 3:
                return shedule.num3;
            case 4:
                return shedule.num4;
            case 5:
                return shedule.num5;
            case 6:
                return shedule.num6;
            case 7:
                return shedule.num7;
            case 8:
                return shedule.num8;
            case 9:
                return shedule.num9;
            case 10:
                return shedule.num10;
        }
    }
})