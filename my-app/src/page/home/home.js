import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EchartsTest from '../../ECharts/ec';
import './css/index.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userNum:'-',
            commodityNum:'-',
            orderNum:'-',
            postList:{}
         };
    }
    componentDidMount(){
        this.getUserNum();
        this.getCommodityNum();
        this.getOrderNum();
        this.getGG();
    }
    getGG = ()=>{
        fetch('/?s=App.Main_Set.GetList&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`key=bulletin`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            console.log('公告请求',data); 
            this.setState({postList:data.data.items[0].data})           
        })        
    }
    getUserNum = ()=>{
        fetch('/?s=App.Main_Set.Count&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`key=userData`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            // console.log(data);
            this.setState({userNum:data.data.total})           
        })     
    }
    getCommodityNum = ()=>{
        fetch('/?s=App.Table.Count&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=goods`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            // console.log(data);
            this.setState({commodityNum:data.data.total})           
        })     
    }
    getOrderNum = ()=>{
        fetch('/?s=App.Table.Count&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`model_name=order`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            // console.log(data);
            this.setState({orderNum:data.data.total})           
        })     
    }
    render() {
        let {userNum,commodityNum,orderNum} = this.state;
        let {postList}  =this.state;
        let list = [];
        let nameArr = ['用户总数','商品总数','订单总数'];
        let numArr = [userNum,commodityNum,orderNum];
        for(let i in postList){
            list.push(postList[i]);
        }
        let List = list.map((e,i)=>{
            return (
                <li key={i} className='clearFix List'>
                    <span className='title'>{e.title}</span>
                    <span className='date'>{e.date}</span>
                </li>
            )
        })
        return (
            <div className='col-md-10' id='content'>
                <div className='row r1'>
                    <div className='col-md-10 col-md-offset-1 statistics'>
                        <Link to='/page/Commodity' className='statistics-k'>
                            <p className='num'>{userNum}</p>
                            <p><i className='fa fa-user'></i><span>用户总数</span></p>
                        </Link>
                        <Link to='/page/Commodity' className='statistics-k'>
                            <p className='num'>{commodityNum}</p> 
                            <p><i className='fa fa-list'></i><span>商品总数</span></p>
                        </Link>
                        <Link to='/page/Commodity' className='statistics-k'>
                            <p className='num'>{orderNum}</p>
                            <p><i className='fa fa-file-text-o'></i><span>订单总数</span></p>
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-md-offset-1'>
                        <EchartsTest {...{nameArr:nameArr,numArr:numArr}}/>
                    </div>
                    <div className='col-md-4'>
                    <div className="panel panel-default">
                        <div className="panel-heading clearFix">
                            <h3 className="panel-title titleM">最新公告</h3>
                            <span className='more'>更多<i className='fa fa-angle-right'></i></span>
                        </div>
                        <div className="panel-body">
                            <ul className='listUl'>
                                {List.length?List:''}
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;