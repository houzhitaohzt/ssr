/**
 * @author: houzhitao
 * @since: 2018-05-31 10:23
 */

import fetch from 'isomorphic-fetch';

import xt from "../common/xt";

//请求失效时间
const TimeOut = 15000;

class Api {
    constructor(){

    }

    /**
     * @param baseUrl
     * @param hostUrl
     * @return {string}
     * */
    getUrl(baseUrl: string = '', hostUrl: string = ''): string {
        return baseUrl + hostUrl;
    };

    /**
     * @param params
     * @return {string}
     * */
    getParams(params: Object = {}): string {
        let s = '', o = Object.entries(params);
        o.length && o.forEach(([k, v], index) => {
            s += index == 0 ? `${k}=${xt.isEmpty(v) ? '': v}`:`&${k}=${xt.isEmpty(v) ? '' : v}`;
        });
        return s;
    };

    getHeader(): Object{
        return {
            'Accept': 'application/json;charset=utf-8',
            'Content-type': 'text/plain;charset=utf-8'
            // 'Content-type': 'application/json;charset=utf-8'
        }
    };

    getFormHeader(): Object{
        return {
            'Accept': 'application/json;charset=utf-8',
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    };

    /**
     * @param response
     * @param resolve
     * @param reject
     * @return {void}
     * */
    async result(response: Promise, resolve:Function, reject: Function): void {
        console.log(response.headers.get('X-UA-Compatible'), 'X-UA-Compatible');
        console.log(response.headers.get('Content-Type'), 'Content-Type');
        console.log(response.headers.get('xl-server'), 'xl-server');
        let status = response.status;
        if(status === 200){
            let data = await response.json();
            if(data.status === 1){
                resolve(data.data || {})
            }else{
                reject(data);
            }
        }else if(status === 501){//登录失效
            reject('登录超时')
        }else{
            reject('服务器数据错误')
        }
    };

    /**
     * @param baseUrl
     * @param hostUrl
     * @param params
     * @return {Promise}
     * */
    get(baseUrl: string = "", hostUrl: string = '', params: Object = {}): Promise {
        let that = this;
        return new Promise( async (resolve, reject) => {
            let timer = setTimeout(() => {
                timer = null;
                reject('请求超时！！');
            }, TimeOut);
            try {
                let urlH = this.getUrl(baseUrl, hostUrl);
                let pm = this.getParams(params);
                let url = pm ? `${urlH}?${pm}`:`${urlH}`;
                let response = await fetch(url, {
                    method: 'GET',
                    headers: this.getHeader(),
                    crossDomain: true,
                    mode: 'cors',
                    credentials: 'include'
                });
                timer && await that.result(response, resolve, reject);
            }catch (e){
                reject(e + '报错啦')
            }finally {
                timer && clearTimeout(timer);
                timer = null;
            }
        })
    }

    /**
     * @param baseUrl
     * @param hostUrl
     * @param params
     * @return {Promise}
     * */
    post(baseUrl: string = "", hostUrl: string = "", params: Object = {}): Promise {
        let that = this;
        return new Promise( async (resolve, reject ) => {
            let timer = setTimeout(() => {
                timer = null;
                reject('请求超时！！')
            }, TimeOut);
            try {
                let url = this.getUrl(baseUrl + hostUrl);
                let response = await fetch(url, {
                    method: 'POST',
                    headers: that.getHeader(),
                    crossDomain: true,
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify(params)
                });
                timer && await that.result(response, resolve, reject);
            }catch (e){
                reject(e + '报错啦')
            }finally {
                timer && clearTimeout(timer);
                timer = null;
            }
        })
    }

    /**
     * @param baseUrl
     * @param hostUrl
     * @param params
     * @return {Promise}
     * */
    form(baseUrl: string = '', hostUrl: string = '', params: Object = {}): Promise {
        let that = this;
        return new Promise( async (resolve, reject ) => {
            let timer = setTimeout(() => {
                timer = null;
                reject('请求超时！！')
            }, TimeOut);
            try {
                let url = this.getUrl(baseUrl + hostUrl);
                let response = await fetch(url, {
                    method: 'POST',
                    headers: that.getFormHeader(),
                    crossDomain: true,
                    mode: 'cors',
                    credentials: 'include',
                    body: that.getParams(params)
                });
                timer && await that.result(response, resolve, reject);
            }catch (e){
                reject(e + '报错啦')
            }finally {
                timer && clearTimeout(timer);
                timer = null;
            }
        })
    };
}
export default new Api;
