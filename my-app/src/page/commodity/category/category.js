import React, { Component } from 'react';
import Pagination from '../../../pageNum/index';
import Cookies from '../../../cookie/cookie';
import Bread from '../../../Breadcrumb/Breadcrumb';
import CateList from './cate-list';
import './css/index.css'
const ck =new Cookies;
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pagenum:1,
            sortList:[],
            total:0,
            bread:[]
         };
    }
    componentWillMount(){
        let bread = this.props.location.pathname.split("/");
        this.setState({bread:bread});
    }
    componentDidMount(){
        this.getLength();
    }
    getLength = ()=>{
        fetch('/?s=App.Table.Count&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=sort`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            this.setState({total:data.data.total})
            let {pagenum,total} = this.state;
            this.getSortList(pagenum,total);
            
        })
    }
    getSortList = (page,total)=>{
        let a = ck.getCookie('twoID');        
        let b = a.split("&");
        fetch('/?s=Super.Table.FreeQuery&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=sort&admin_uuid=${b[0]}&admin_token=${b[1]}&where=[["ID",">=","1"],["ID","<=","9999"]]&page=${page}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            console.log('Category请求',data);
            this.setState({sortList:data.data.list})
        }) 
    }
    pageChange(pageNum){
        this.setState({pagenum:pageNum},()=>{let {pagenum,total} = this.state;this.getSortList(pagenum,total)});
    }
    render() {
        let {sortList,pagenum,total,bread} = this.state;
        let cateL = sortList.map((e,i)=>{
            return <CateList {...{
                id:e.id,
                name:e.sortName,
                key:i
            }}/>
        })
        return (
            <div className='col-md-10' id='sortList'>
                <div className='features clearFix'>
                    <b className='title'>种类管理</b>
                    <button type="button" className="btn btn-info">
                        <i className='fa fa-plus'></i>
                        <span>添加品类</span>
                    </button>
                </div>
                <Bread {...{br:bread}}/>
                <table className="table table-striped table-bordered ">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>sortname</th>
                            <th>control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cateL}
                    </tbody>
                </table>  
                <Pagination current={pagenum} total={total}
                        onChange={(pageNum)=>this.pageChange(pageNum)}
                    /> 
            </div>
            
        );
    }
}

export default Category;