import React, { Component } from 'react';
import CommList from './comm-list';
import Pagination from '../../../pageNum/index';
import Cookies from '../../../cookie/cookie';
import Bread from '../../../Breadcrumb/Breadcrumb';
import Find from '../../../find/find';

import './css/index.css'
const ck =new Cookies;
class Commodity extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pagenum:1,
            goodsList:[],
            total:0,
            bread:[],
            find:[{id:'id',name:'按照商品ID'},{id:'goodsName',name:"按照商品名称"}],
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
            body :`model_name=goods`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            this.setState({total:data.data.total})
            let {pagenum,total} = this.state;
            this.getgoodsList(pagenum,total);
            
        })
    }
    getgoodsList = (page,total)=>{
        fetch('/?s=App.Table.FreeQuery&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=goods&where=[["ID",">=","1"]]&page=${page}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            console.log('Category请求',data.data.list);
            this.setState({goodsList:data.data.list})
        }) 
    }
    pageChange(pageNum){
        this.setState({pagenum:pageNum},()=>{let {pagenum,total} = this.state;this.getgoodsList(pagenum,total)});
    }
    xj=(id)=>{
        fetch('/?s=App.Table.Update&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=goods&id=${id}&data={"goodsStatus":0}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            if(data.data.err_code==0){
                let {pagenum,total} = this.state;
                this.getgoodsList(pagenum,total);
            }
            
        }) 
    }
    sj=(id)=>{
        fetch('/?s=App.Table.Update&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=goods&id=${id}&data={"goodsStatus":1}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            if(data.data.err_code==0){
                let {pagenum,total} = this.state;
                this.getgoodsList(pagenum,total);
            }
        }) 
    }
    shaxuan=(zd,data)=>{
        fetch('/?s=App.Table.FreeQuery&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=goods&where=[["${zd}", "LIKE", "${data}"]]`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            console.log(data);
            this.setState({goodsList:data.data.list,total:data.data.total})
        }) 
    }
    render() {
        let {goodsList,pagenum,total,bread,find} = this.state;
        let cateL = goodsList.map((e,i)=>{
            return <CommList {...{
                id:e.id,
                name:e.goodsName,
                xx:e.goodsDesc,
                price:e.goodsPrice,
                stock:e.goodsStock,
                sort1:e.sort1,
                sort2:e.sort2,
                status:e.goodsStatus,
                key:i,
                Xj:this.xj,
                Sj:this.sj
            }}/>
        })
        return (
            <div className='col-md-10' id='goodsList'>
                <div className='features clearFix'>
                    <b className='title'>商品管理</b>
                    <Find {...{Find:find,ss:this.shaxuan}}/>   
                    <button type="button" className="btn btn-info tj">
                        <i className='fa fa-plus'></i>
                        <span>添加商品</span>
                    </button> 
                </div>
                <Bread {...{br:bread}}/>
                <table className="table table-striped table-bordered ">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>information</th>
                            <th>price</th>
                            <th>status</th>
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

export default Commodity;