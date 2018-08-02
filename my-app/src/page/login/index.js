import React, { Component } from 'react';
import './css/index.css';
import forge from 'node-forge';
import Cookies from '../../cookie/cookie';

const ck =new Cookies;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:'',
            info:''
         };
    }
    inputChange=(ev)=>{
        let inputName = ev.target.name;
        let inputValue = ev.target.value;
        if(inputName =='password'){
            var md = forge.md.md5.create();
            md.update(inputValue);
            inputValue = md.digest().toHex();  
        }   
        this.setState({
            [inputName]:inputValue
        })
    }
    submit=()=>{
        let {username,password} = this.state;
        console.log(username,password);
        let {url:{history}} = this.props;
        if(username && password){
            fetch('/?s=App.User.Login&app_key=2509BCB562FA77246FF87A5899CE1527',{
                method:"post",
                body :`username=${username}&password=${password}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((e)=>e.json())
            .then(data => {
                console.log(data);
                this.refs.user.value = '';
                this.refs.pass.value = '';
                if(data.data.err_code=== 0){
                    localStorage.setItem('userData',JSON.stringify(username));
                    let value = data.data.uuid+'&'+data.data.token
                    ck.setCookie('twoID',value,7);
                    history.push('/');
                }else if(data.data.err_code === 1){ 
                    this.setState({info:'*'+data.data.err_msg,username:'',password:''})
                }
            })    
        }else{
            this.setState({info:'*请输入用户名密码',username:'',password:''})
        }
            
    }
    // submit=()=>{      
    //     fetch('/?s=App.User.Login',{
    //         method:"post",
    //         body :`username=wyt&password=05110905dc5417d877bfa35ce82537d8&app_key=2509BCB562FA77246FF87A5899CE1527`,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     })
    //         .then((e)=>e.json())
    //         .then(data => {
    //             console.log(data);
    //         })         
    // }
    inputKey = (ev)=>{
        if(ev.keyCode === 13){
            this.submit();
        }
    }
    
    render() {
        let {info} = this.state;
        // var md = forge.md.md5.create();
        // md.update('shangliudi1314');
        // console.log(md.digest().toHex());
        return (
            <div className='col-md-4 col-md-offset-4'>
                <div className="panel panel-default login-frame">
                    <div className="panel-heading">欢迎登陆</div>
                    <div className="panel-body panel-body-top">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                 className="form-control"
                                   placeholder="请输入用户名"
                                   name='username'
                                   ref = 'user'
                                   onChange={this.inputChange}/>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                 className="form-control"
                                   placeholder="请输入密码"
                                   name = 'password'
                                   ref = 'pass'
                                   onChange={this.inputChange}
                                   onKeyUp={this.inputKey}/>                                  
                            </div>
                            <p className='prompt'>{info}</p>
                            <button 
                            className="btn btn-lg btn-block btn-primary"
                            onClick={this.submit}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
   
        );
    }
}

export default Login;