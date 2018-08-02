import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Navs extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    click = ()=> {
        this.refs.ul.classList.toggle('nav-ul-2-dian')
    }
    clickChild=(e)=>{
        e.stopPropagation();
    }
    render() {
        let {name,ico,child,url} = this.props;
        let cld = '' ;
        if(child.length){
            cld=child.map((ev,i)=>{
                return <li key={i} onClick={this.clickChild}><Link to={ev.url}><i></i><span>{ev.childName}</span><i></i></Link></li>
            })
        }
        if(url){
            return (
                <li onClick={this.click}>
                    <Link to={url}>
                        <i className={`fa ${ico}`}></i>
                        <span>{name}</span>
                        <i className={child.length?'fa fa-angle-down':''}></i>
                        <ul className='nav-ul-2' ref='ul'>
                            {cld}
                        </ul>
                    </Link>
                </li>
            );
        }else{
            return (
                <li onClick={this.click}>
                    <i className={`fa ${ico}`}></i>
                    <span>{name}</span>
                    <i className={child.length?'fa fa-angle-down':''}></i>
                    <ul className='nav-ul-2' ref='ul'>
                        {cld}
                    </ul>
                </li>
            );
        }
        
    }
}

export default Navs;