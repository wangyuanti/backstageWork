import React, { Component } from 'react';
import './css/find.css';
class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    ss=()=>{
        // console.log(this.refs.select.value,this.refs.text.value)
        if(this.refs.text.value){
            let{ss}=this.props;
            ss(this.refs.select.value,this.refs.text.value);
        }
        
    }
    render() {
        let{Find}=this.props;
        let findArr = Find.map((e,i)=>{
            return <option value={e.id} key={i}>{e.name}</option>
        })
        return (
            <div className='find' id='Find'>  
                <div className="float">
                    <select className="form-control" ref = 'select'>
                        {findArr}
                    </select>
                </div> 
                <div className="float input">
                    <input type="text"className="form-control" placeholder="请输入" ref = 'text'/>
                </div>
                <button type="button" className="btn btn-info" onClick={this.ss}>搜索</button>
            </div>
        );
    }
}

export default Find;