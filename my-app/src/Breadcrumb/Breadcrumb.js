import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import {Link} from 'react-router-dom';
import './css/Breadcrumb.css';
class Bread extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         };
    }
    componentDidMount(){
        
    }
    render() {
        let{br}=this.props;
        let a = br.map((e,i)=>{
            if(i>=2){
                return <Breadcrumb.Item key='i'><Link to={'/page/'+e}>{e}</Link></Breadcrumb.Item>;
            }else{
                return '';
            } 
        })
        return (
            <div id='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to='/page/home'>Home</Link></Breadcrumb.Item>
                    {a}
                </Breadcrumb>
            </div>
            
        );
    }
}

export default Bread;