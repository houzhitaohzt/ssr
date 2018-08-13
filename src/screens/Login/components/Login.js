/**
 * @author: houzhitao
 * @since: 2018-06-05 19:59
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
//创建表单
import {createForm, createFormField} from "../../../components/Form";
//下拉框
import Select from '../../../components/Select';
//input 框组件
import Input from '../../../components/Input';
//Confirm 弹窗组件
import { Confirm } from '../../../components/Modal';

import lStyle from "../assets/login.m.less";

import advertisingImg from "../assets/advertising.jpg";
import LogoImg from "../assets/logo.png";
//switch Dailog
import Switch from './Switch';

@inject('loginStore')
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.store = new this.props.loginStore(props.form, props.history);
    }

    componentDidMount(){
        window.addEventListener && window.addEventListener('keydown', this.store.onKeyCodeDown, true);
        window.attachEvent && window.attachEvent("keydown", this.store.onKeyCodeDown);
    }

    componentWillUnmount(){
        window.removeEventListener && window.removeEventListener('keydown', this.store.onKeyCodeDown, true);
        window.removeEvent && window.removeEvent("keydown", this.store.onKeyCodeDown);

    }

    render() {
        let {form, history} = this.props;
        let {getFieldProps, getFieldsError} = form;
        return (<div className={lStyle.login}>
            <div className={lStyle.l}>
                <img src={advertisingImg} alt="" onLoad={this.store.onLoad} className={lStyle.lImg}/>
            </div>
            <div className={lStyle.r} style={{height: this.store.height + 'px'}}>
                <div className={lStyle.rC}>
                    <div className={lStyle.rLogo}>
                        <img src={LogoImg} alt=""/>
                    </div>
                    <div className={lStyle.username}>
                        <span className={lStyle.userIcon}><i className="fa fa-user-o fa-lg"/></span>
                        <input type="text" className={lStyle.userInput} autoComplete="off"
                               {...getFieldProps('account', {
                                   rules: [{required: true}],
                                   initialValue: '',
                                   validateFirst: true,
                                   valuedateTrigger: true
                               })}
                        />
                    </div>
                    <div className={lStyle.password}>
                        <span className={lStyle.passwordIcon}><i className="fa fa-lock fa-lg"/></span>
                        <input type="password" className={lStyle.passwordInput} autoComplete="off"
                               {...getFieldProps('password', {
                                   rules: [{required: true}],
                                   initialValue: '',
                                   validateFirst: true,
                                   valuedateTrigger: true
                               })}
                        />
                    </div>
                    <div className={lStyle.forget}>
                        <span className={lStyle.errMsg}>{this.store.errorMsg || ''}</span>
                        <span onClick={() => history.push('/findPsd')} className={lStyle.forgetRem}>忘记密码？</span>
                    </div>
                    <button className={lStyle.loginButton + ' button'} onClick={this.store.onLogin}>登录</button>
                    <div className={lStyle.rz}>
                        如果还没有入驻城市服务商，<span className={lStyle.forgetRem} onClick={() => history.push('/index/facilitatorEnter')}>马上入驻&nbsp;<i className="fa fa-arrow-circle-right"/></span>
                    </div>
                </div>
            </div>
            <Confirm isShow={this.store.showConfirm} showFooter={false}>{<Switch store={this.store} />}</Confirm>
        </div>)
    }
}

Login.propTypes = {};

export default createForm()(Login);