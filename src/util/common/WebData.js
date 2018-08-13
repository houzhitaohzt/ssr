/**
 * @author: houzhitao
 * @since: 2018-06-04 14:49
 */

import xt from "./xt";

const USER_INFO = "USER_INFO"; //存储登录后的用户信息
const USER_ACCOUNT = "USER_ACCOUNT"; //存储用户名信息
const WSHIFU_USER_API = "WSHIFU_USER_API"; //存储 user-api
const WSHIFU_CITY_API = "WSHIFU_CITY_API"; //存储 city-api

export default class WebData {
    static _user = null; // 存储登录后的用户信息
    static _userAccount = null; //存储用户的登录信息（用户名）
    static _wshifuUserApi = null; //代理 user-api
    static _wshifuCityApi = null; //代理 city-api
    static _md5Token = null; //加密之后的city-token 信息

    static get user(){
        if(!this._user){
            let u = sessionStorage.getItem(USER_INFO);
            this._user = u && JSON.parse(xt.base64decode(decodeURIComponent(u)));
        }
        return this._user || null;
    };

    static set user(user){
      if(user){
          sessionStorage.setItem(USER_INFO, encodeURIComponent(xt.base64encode(JSON.stringify(user))));
          this._user = user;
      }else{
          sessionStorage.removeItem(USER_INFO);
          this._user = null;
      }
    };

    static get userAccount(){
        if(!this._userAccount){
            this._userAccount = localStorage.getItem(USER_ACCOUNT);
        }
        return this._userAccount || null;
    };

    static set userAccount(userAccount){
        if(userAccount){
            localStorage.setItem(USER_ACCOUNT, userAccount);
            this._userAccount = userAccount;
        }else{
            localStorage.removeItem(USER_ACCOUNT);
            this._userAccount = null;
        }
    };

    static get wshifuUserApi(){
        if(!this._wshifuUserApi){
            this._wshifuUserApi = localStorage.getItem(WSHIFU_USER_API);
        }
        return this._wshifuUserApi || process.env.USER_API;
    }

    static set wshifuUserApi(api){
        if(api){
            localStorage.setItem(WSHIFU_USER_API, api);
            this._wshifuUserApi = api;
        }
    };

    static get wshifuCityApi(){
        if(!this._wshifuCityApi){
            this._wshifuCityApi = localStorage.getItem(WSHIFU_CITY_API);
        }
        return this._wshifuCityApi || process.env.CITY_API;
    }

    static set wshifuCityApi(api){
        if(api){
            localStorage.setItem(WSHIFU_CITY_API, api);
            this._wshifuCityApi = api;
        }
    }

    //TODO city_phone 需要修改成后台所要求的那个字段
    static get md5Token (){
        let s = document.cookie.split(';').find( e => e.indexOf('city_phone') !== -1);
        return s && s.split('=')[1];
    }

    static loginOut() {
        this._user = null;
        this._userAccount = null;
    }


};