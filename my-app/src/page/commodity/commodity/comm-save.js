import React, { Component } from 'react';
import Bread from '../../../Breadcrumb/Breadcrumb';
class CoomSave extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bread:[]
         };
    }
    componentWillMount(){
        let bread = this.props.location.pathname.split("/");
        this.setState({bread:bread});
    }
    render() {
        let {bread} = this.state;
        return (
            <div className='col-md-10' id='goodsSave'>
                <div className='features clearFix'>
                    <b className='title'>商品添加</b> 
                </div>
                <Bread {...{br:bread}}/>
            </div>
        );
    }
}

export default CoomSave;