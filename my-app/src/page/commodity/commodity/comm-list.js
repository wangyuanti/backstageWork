import React, { Component } from 'react';

class CommList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    xj = ()=>{
        let{id,Xj}=this.props;
        Xj(id)
    }
    sj = ()=>{
        let{id,Sj}=this.props;
        Sj(id)
    }
    render() {
        let{id,name,xx,price,stock,sort1,sort2,status}=this.props
        return (
            <tr className='ulist-tr'>
                <td className='ulist-td'>{id}</td>
                <td className='ulist-td'>{name}</td>
                <td className='ulist-td'>{price}</td>
                <td className='ulist-td'>
                    {status==1?<span>在售</span>:<span>已下架</span>}
                    {status==1?<button type="button" className="btn btn-warning" onClick={this.xj}>下架</button>
                    :<button type="button" className="btn btn-warning" onClick={this.sj}>上架</button>}
                </td>
                <td className='ulist-td'>
                    <button type="button" className="btn btn-info">查看</button>
                    <button type="button" className="btn btn-info">编辑</button>
                </td>
            </tr>
        );
    }
}

export default CommList;