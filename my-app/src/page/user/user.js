import React, { Component } from 'react';
import './css/index.css';
import Pagination from '../../pageNum/index';
import Ulist from './ulist/ulist';
import Bread from '../../Breadcrumb/Breadcrumb';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pagenum:1,
            userList:[],
            perpage:10,
            total:0,
            bread:[]
         };
    }
    componentWillMount(){
        let bread = this.props.location.pathname.split("/");
        this.setState({bread:bread});
    }
    componentDidMount(){
        this.getUserList();
    }
    getUserList = ()=>{
        let {pagenum} = this.state; 
            fetch('/?s=App.Main_Set.GetList&app_key=2509BCB562FA77246FF87A5899CE1527',{
                method:"post",
                body :`key=userData&page=${pagenum}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((e)=>e.json())
            .then(data => {
                console.log('userList请求',data)
                this.setState({userList:data.data.items,
                               pagenum:data.data.page,
                               perpage:data.data.perpage,
                               total:data.data.total
                            })
            }) 
    }
    pageChange(pageNum){
        this.setState({pagenum:pageNum},()=>{this.getUserList()});
    }
    render() {        
        let {userList,pagenum,total,bread} = this.state;   
        let newList = [];
        userList.forEach((e)=>{
            newList.push(e.data)
        })
        let ulist = newList.map((e,i)=>{
            return <Ulist {...{
                key:i,
                username:e.username,
                uuid:e.uuid,
                email:e.email,
                phone:e.phone
            }}/>
        })
        
        return (
            <div className='col-md-10' id='userList'>
                <div className='features clearFix'>
                    <b className='title'>用户列表</b>
                </div>
                <Bread {...{br:bread}}/>
                <table className="table table-striped table-bordered ">
                    <thead>
                        <tr>
                            <th>username</th>
                            <th>uuid</th>
                            <th>e-mail</th>
                            <th>phone</th>
                            <th>control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ulist}
                    </tbody>
                </table> 
                <Pagination current={pagenum} total={total}
                    onChange={(pageNum)=>this.pageChange(pageNum)}
                />    
            </div>  
        );
    }
}

export default User;