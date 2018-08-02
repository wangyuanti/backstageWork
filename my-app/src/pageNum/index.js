import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';
import React, { Component } from 'react';
import './css/Pagination.css';
class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className='row'>
                <div className='col-md-12' id='Pagination'>
                    <RcPagination {...this.props} hideOnSinglePage showQuickJumper/>
                </div>
            </div>
        );
    }
}

export default Pagination;