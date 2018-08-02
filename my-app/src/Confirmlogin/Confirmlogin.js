// 检测是否登录
class Confirmlogin {
    confirm(uuid,token){
        fetch('/?s=App.User.Check&app_key=2509BCB562FA77246FF87A5899CE1527',{
            method:"post",
            body :`uuid=${uuid}&token=${token}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((e)=>e.json())
        .then(data => {
            console.log('登录认证请求',data);
        })    
    }   
}

export default Confirmlogin;