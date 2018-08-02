import React, { Component } from 'react';

class Ulist extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            seal:false
         };
    }
    fyclick = ()=>{
        let{seal}=this.state;
        this.setState({seal:!seal});
    }
    render() {
        let{username,uuid,email,phone}=this.props;
        let{seal}=this.state;
        return (
            <tr className='ulist-tr'>
                <td className='ulist-td'>{username}</td>
                <td className='ulist-td'>{uuid}</td>
                <td className='ulist-td'>{email}</td>
                <td className='ulist-td'>{phone}</td>
                <td className='ulist-td'>
                    <button type="button" className="btn btn-info">详细信息</button>
                    <button type="button" 
                        className={seal?"btn btn-danger":"btn btn-success"}
                        onClick={this.fyclick}
                    >
                        {seal?"点击解封":"点击封号"}
                    </button>
                </td>
            </tr>
        );
    }
}

export default Ulist;