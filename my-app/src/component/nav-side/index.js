import React, { Component } from 'react';
import './css/index.css';
import Navs from './navs';
class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            nav:[
                {
                    navName:'首页',
                    navIco:'fa-home',
                    navChild:[],
                    url:'/'                
                },
                {
                    navName:'商品',
                    navIco:'fa-list',
                    navChild:[{childName:'商品管理',url:'/page/Commodity'},{childName:'种类管理',url:'/page/Category'}],
                    
                },
                {
                    navName:'订单',
                    navIco:'fa-file-text-o',
                    navChild:[{childName:'订单管理',url:'/page/Order'}],
                    
                },
                {
                    navName:'用户',
                    navIco:'fa-user',
                    navChild:[{childName:'用户列表',url:'/page/User'}],
                    
                },
            ]
        };
    }
    render() {
        let {nav} = this.state;
        let navList = nav.map((e,i)=>{
            
            return <Navs {...{
                key:i,
                name:e.navName,
                ico:e.navIco,
                child:e.navChild,
                url:e.url
            }}/>
        })
    
        return (
            <div className="col-md-2 nav">
                <ul className='nav-ul'>
                    {navList}
                </ul>
            </div>
        );
    }
}

export default SideNav;