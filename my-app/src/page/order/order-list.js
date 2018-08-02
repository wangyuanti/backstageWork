import React, { Component } from 'react';

class CateList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        let{id,name,time,address,goodsID,goodsName,oredrUuid,pay,price}=this.props
        return (
            <tr className='ulist-tr'>
                <td className='ulist-td'>{id}</td>
                <td className='ulist-td'>{oredrUuid}</td>
                <td className='ulist-td'>{pay}</td>
                <td className='ulist-td'>{price}</td>
                <td className='ulist-td'>{time}</td>
                <td className='ulist-td'>
                    <button type="button" className="btn btn-info">查看</button>
                </td>
            </tr>
        );
    }
}

export default CateList;