import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {Route,Switch} from 'react-router-dom';
import Layout from '../component/layout/index';
import Home from '../page/home/home';
import Login from '../page/login/index';
import Commodity from '../page/commodity/commodity/commodity';
import Category from '../page/commodity/category/category';
import Order from '../page/order/order';
import User from '../page/user/user';
import Confirmlogin from '../Confirmlogin/Confirmlogin';
import Cookies from '../cookie/cookie';
import '../css/public.css';
const cl = new Confirmlogin;
const ck = new Cookies;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loginOnOff:false
         };
    }
    componentDidMount(){
        let a = ck.getCookie('twoID');        
        if(a){
            let b = a.split("&")
            cl.confirm(b[0],b[1]);
            this.setState({loginOnOff:true})
        }else{
            this.setState({loginOnOff:false})
        }
        let {loginOnOff}=this.state;
        console.log(loginOnOff);
    }
    render() {
        let {loginOnOff} = this.state;
        if(loginOnOff){
            return (
                <Switch> 
                    <Route exact path="/login" render={(props)=><Login url={props}/>}/>
                    <Route  path="/" render={(props)=>(
                        
                        <Layout url={props}> 
                            <Switch>      
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/page/Commodity" component={Commodity}/>
                                <Route exact path="/page/Category" component={Category}/>
                                <Route exact path="/page/Order" component={Order}/>
                                <Route exact path="/page/User" component={User}/>
                            </Switch>  
                        </Layout>
                )}/>
                
                </Switch>
            );
        }else{
            return(
                <Route  path="/" render={(props)=><Login url={props}/>}/>
            )
        }
        
    }
}

export default App;