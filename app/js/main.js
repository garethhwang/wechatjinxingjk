/**
 * Created by sally on 2017/2/11.
 */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Home from './modules/Home'
import ProductCategory from './modules/ProductCategory'
import Product from './modules/Product'
import WechatBinding from './modules/WechatBinding'
import Documents from './modules/Documents'
import Document from './modules/Document'
import Advise from './modules/Advise'
import AdviseSuccess from './modules/AdviseSuccess'
import PersonalInfo from './modules/PersonalInfo'
import PressAll from './modules/PressAll'
import Press from './modules/Press'
import VaccineMenu from './modules/VaccineMenu'
import VaccineFree from './modules/VaccineFree'
import Vaccine from './modules/Vaccine'
import BaseInfo from './modules/BaseInfo'
import Shedule from './modules/Shedule'
import OrderCenter from './modules/OrderCenter'
import OrderAll from './modules/OrderAll'
import OrderTo from './modules/OrderTo'
import OrderCompleted from './modules/OrderCompleted'
import OrderPaid from './modules/OrderPaid'
import Order from './modules/Order'
import OrderAdd from './modules/OrderAdd'
import CheckList from './modules/CheckList'
import Register from './modules/Register'
import RegisterSuccess from './modules/RegisterSuccess'
import RegisterTerms from './modules/RegisterTerms'
import PhysicalReceipt from './modules/PhysicalReceipt'
import EditUser from './modules/EditUser'
import Repos from './modules/Repos'
import ProductedRegister from './modules/ProductedRegister'
import CustomerService from './modules/CustomerService'
import WechatBindingInfo from './modules/WechatBindingInfo'
import OrderComment from './modules/OrderComment'
import DoctorList from './modules/DoctorList'
import CommentList from './modules/CommentList'
import BodyIdentify from './modules/BodyIdentify'

render((

    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/productcategory/:id" component={ProductCategory}/>
        <Route path="/product/:id" component={Product}/>
        <Route path="/binding" component={WechatBinding}/>
        <Route path="/documents" component={Documents}/>
        <Route path="/documents/:id" component={Document}/>
        <Route path="/advise" component={Advise}/>
        <Route path="/advisesuccess" component={AdviseSuccess}/>
        <Route path="/personalinfo" component={PersonalInfo}/>
        <Route path="/pressall" component={PressAll}/>
        <Route path="/pressall/:id" component={Press}/>
        <Route path="/vaccinemenu" component={VaccineMenu}/>
        <Route path="/vaccinefree" component={VaccineFree}/>
        <Route path="/vaccine" component={Vaccine}/>
        <Route path="/baseinfo" component={BaseInfo}/>
        <Route path="/ordercenter" component={OrderCenter}/>
        <Route path="/orderall" component={OrderAll}/>
        <Route path="/orderto" component={OrderTo}/>
        <Route path="/ordercompleted" component={OrderCompleted}/>
        <Route path="/order/:id" component={Order}/>
        <Route path="/orderpaid" component={OrderPaid}/>
        <Route path="/orderadd/:id" component={OrderAdd}/>
        <Route path="/checklist" component={CheckList}/>
        <Route path="/shedule/:id" component={Shedule}/>
        <Route path="/register" component={Register}/>
        <Route path="/registersuccess" component={RegisterSuccess}/>
        <Route path="/registerterms" component={RegisterTerms}/>
        <Route path="/physicalreceipt" component={PhysicalReceipt}/>
        <Route path="/edituser" component={EditUser}/>
        <Route path="/repos" component={Repos}/>
        <Route path="/productedregister" component={ProductedRegister}/>
        <Route path="/customerservice" component={CustomerService}/>
        <Route path="/ordercomment/:id" component={OrderComment}/>
        <Route path="/bindinginfo" component={WechatBindingInfo}/>
        <Route path="/doctorlist" component={DoctorList}/>
        <Route path="/commentlist/:id" component={CommentList}/>
        <Route path="/bodyidentify" component={BodyIdentify}/>
    </Router>
), document.getElementById('app'));

