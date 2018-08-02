import React, { Component } from 'react';
import Cookies from '../../cookie/cookie';
import Pagination from '../../pageNum/index';
import CateList from './order-list';
import Find from '../../find/find';
import Bread from '../../Breadcrumb/Breadcrumb';
import './css/index.css'
const ck =new Cookies;
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pagenum:1,
            orderList:[],
            total:0,
            find:[{id:'id',name:'按照订单ID'},{id:'orderUserID',name:"按照用户UUID"}],
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
            body :`model_name=order`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            console.log('OrderNum请求',data);
            this.setState({total:data.data.total})
            let {pagenum,total} = this.state;
            this.getorderList(pagenum,total);
            
        })
    }
    getorderList = (page,total)=>{
        let a = ck.getCookie('twoID');        
        let b = a.split("&");
        fetch('/?s=Super.Table.FreeQuery&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=order&admin_uuid=${b[0]}&admin_token=${b[1]}&where=[["ID",">=","1"],["ID","<=","9999"]]&page=${page}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            console.log('Order请求',data);
            this.setState({orderList:data.data.list})
        }) 
    }
    pageChange(pageNum){
        this.setState({pagenum:pageNum},()=>{let {pagenum,total} = this.state;this.getorderList(pagenum,total)});
    }
    render() {        
        let {orderList,pagenum,total,find,bread} = this.state;
        let cateL = orderList.map((e,i)=>{
            return <CateList {...{
                id:e.id,
                key:i,
                time:e.add_time,
                address:e.address,
                goodsID:e.goodsID,
                goodsName:e.goodsName,
                oredrUuid:e.oredrUuid,
                pay:e.pay,
                price:e.price
            }}/>
        })
        return (
            <div className='col-md-10' id='orderList'>
                <div className='features clearFix'>
                    <b className='title'>订单管理</b>
                    <Find {...{Find:find}}/>    
                </div>
                <Bread {...{br:bread}}/>
                <table className="table table-striped table-bordered ">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>orderUserID</th>
                            <th>OrderStatus</th>
                            <th>Totalprice</th>
                            <th>Time</th>
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

export default Order;