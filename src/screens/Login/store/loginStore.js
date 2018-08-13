/**
 * @author: houzhitao
 * @since: 2018-06-05 19:59
 */

import React, {Component} from 'react';
import {observable, action, computed} from 'mobx';
import Api from 'Api';
// import WebData from '../../../util/common/WebData';

export default class loginStore {
    form: Object = null;
    history:Object = null;
    @observable
    height: number = 0; //右边 高度
    @observable
    errorMsg: string = ''; //错误提示
    @observable
    showConfirm: boolean = false; //弹窗默认不显示
    dialogForm: Object = null;
    //user 选择下拉框列表
    userList: Array<Object> = [
        {id: 'http://dev-user-api.wanshifu.com/', name: 'dev-user'},
        {id: 'http://test-user-api.wanshifu.com/', name: 'test-user'},
        {id: 'http://user-api.wanshifu.com/', name: 'product-user'}
    ];
    //city 选择下拉框列表
    cityList: Array<Object> = [
        {id: 'http://dev-city-api.wanshifu.com/', name: 'dev-city'},
        {id: 'http://test-city-api.wanshifu.com/', name: 'test-city'},
        {id: 'http://user-city.wanshifu.com/', name: 'product-city'}
    ];

    initDialog(form){
        this.dialogForm = form;
    }

    constructor(form, history) {
        this.form = form;
        this.history = history;
    };

    //加载获取高度
    onLoad = (e: Object): void => {
        if(e.target.height < 776){
            return this.getHeight(776);
        }
        this.getHeight(e.target.height)
    };

    @action
    getHeight = (height: number): void => {
        this.height = height || 776;
    };

    //登录
    onLogin = (): void => {
      this.form.validateFields((error, value) => {
          if(error){
             let arr = Object.keys(error);
             if(arr.findIndex(e => e === 'account') !== -1) return this.showErrorMsg('账号不能为空');
             if(arr.findIndex(e => e === 'password') !== -1) return this.showErrorMsg('密码不能为空');
          }else{
              console.log(value, 'loginvalue');
              this.showErrorMsg('');
              this.loginApi(value);
          }
      })
    };

    @action
    showErrorMsg = (errorMsg: String): void => {
      this.errorMsg = errorMsg || '';
    };

    //登录接口请求
    loginApi = (params: Object = {}): void => {
        Api.form(Api.CITY_API, 'account/login', params)
            .then( res => console.log(res))
            .catch(error => {
                this.showErrorMsg(error.msg || '')
            })
    };

    //键盘事件
    onKeyCodeDown = (e: Object): void => {
      if(e.keyCode === 113){
          this.getShowConfirm();
      }
    };

    //显示弹窗
    @action
    getShowConfirm(): void{
        this.showConfirm = !this.showConfirm;
    }

    //弹窗保存
    onSave = (): void => {
        this.dialogForm.validateFields((error, value) => {
            if(error){

            }else{
                // WebData.wshifuUserApi = value.user;
                // WebData.wshifuCityApi = value.city;
                this.getShowConfirm();
                // window.location.reload();
            }
        })
    };

    onCancel = (): void => {
        this.getShowConfirm();
        this.dialogForm.setFieldsValue();
    };







}