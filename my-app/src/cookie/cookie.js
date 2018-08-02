

class Cookies {
    setCookie(key,val,time){
        if(time){
            let iDate = new Date;
            iDate.setDate(iDate.getDate()+ time);
            document.cookie = key+'='+val+ '; expires='+ iDate;
        }else{
            document.cookie = key+'='+val;
        }
    }
    getCookie(key){
        let str = document.cookie;
        let arr = str.split('; ');
        let onOff = false;
        for(let i=0;i<arr.length;i++){
            let s = arr[i].split('=');
            if(s[0] === key){
                return s[1];
            }
        }
        if(!onOff)return null;
    }
    removeCookie(key,val){
        if(val){
            this.setCookie(key,val,-1);
        }else{
            let v = this.getCookie(key);
            this.setCookie(key,v,-1);
        }
    }
}

export default Cookies;