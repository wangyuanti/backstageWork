import React, { Component } from 'react';

class CateList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        let{id,name}=this.props
        return (
            <tr className='ulist-tr'>
                <td className='ulist-td'>{id}</td>
                <td className='ulist-td'>{name}</td>
                <td className='ulist-td'>
                    <button type="button" className="btn btn-info">修改名称</button>
                    <button type="button" className="btn btn-info">查看子分类</button>
                </td>
            </tr>
        );
    }
}

export default CateList;