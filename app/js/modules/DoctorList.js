/**
 * Created by sally on 2017/2/14.
 */
import React from 'react'
import DoctorItem from '../components/DoctorItem'
import BottomFooter from '../components/BottomFooter'
require('../lib/util');

export default React.createClass({
    getInitialState: function () {
        return {
            doctorlist: ""
        };
    },
    componentDidMount: function () {

        var postData = null;
        jsonp("/wechat/order/getDoctorInfo", postData, "POST", function (data) {
            if (data.code == 0) {

                sessionStorage.jxsession = data.data.jxsession;

                var doctorlist = data.data.doctor_info.map(function (doctor, index) {
                    return (
                        <DoctorItem
                            action={()=>{

                            console.log('doctorid = ' + doctor.doctor_id+'     doctorname'+doctor.realnamename);

                            sessionStorage.doctorid = doctor.doctor_id;
                            sessionStorage.doctorname = doctor.realname;

                            console.log('SessionStorage '+'id = '+sessionStorage.doctorid+'    name ='+sessionStorage.doctorname);

                            history.back();
                        }}
                            commentaction={"/commentlist/"+doctor.doctor_id}
                            key={doctor.doctor_id} thumb={doctor.img_thumbnail} name={doctor.realname} desc={doctor.discription} starrating={parseInt(doctor.starrating)}/>
                    );
                });
                this.setState({
                    doctorlist: doctorlist
                });
            }
            else {
                errorMsg(data);
            }
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <div className="productlist">
                    {this.state.doctorlist}
                </div>
            </div>
        );
    }
})
