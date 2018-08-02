import React, { Component } from 'react';
import '../../css/font-awesome.css';
import './theme.css';
import TopNav from '../nav-top';
import SideNav from '../nav-side';
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        let {url} = this.props;
        // console.log(url);
        return (
            <div id='wrapper' className="container-fluid">
                <TopNav URL={url}/>
                <div className="row body">
                    <SideNav/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;