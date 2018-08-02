import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Cookies from '../../cookie/cookie';
import './css/index.css';
const ck = new Cookies;
class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        };
    }
    login = ()=>{
        let {URL:{history}} = this.props;
        history.push('/login');
    }
    quit = ()=>{
        ck.removeCookie('twoID');
        this.login();                                   
    }
    render() {
        let userData = JSON.parse(localStorage.getItem('userData'));
        return (
            <div className="row head">
                <div className="col-md-2 head-left">
                <Link to='/'><span className='logo'>商品后台管理系统</span></Link>
                </div>
                <div className="col-md-10">
                    <div className="row head-right">
                        <div className={userData?"col-md-2 col-md-offset-10 head-user outOK":"col-md-2 col-md-offset-10 head-user"}>
                            <i className='fa fa-user'></i>
                            {
                               userData?
                               <span>{'欢迎， '+userData}</span>
                               :<span onClick={this.login}>请登录</span>
                            }
                            
                            <i className='fa fa-caret-down'></i>
                            <div className="user-child" onClick={this.quit}>
                                <i className='fa fa-sign-out'></i>
                                <span>退出登录</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default TopNav;