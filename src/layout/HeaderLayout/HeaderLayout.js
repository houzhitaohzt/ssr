/**
 * @author: houzhitao
 * @since: 2018-06-05 16:18
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from "./headerlayout.m.less";
import Logo from "./text-logo.png";
import { WWW_URL }  from 'Config';
import {observer, inject} from "mobx-react";

// @inject('routing')
// @observer
class HeaderLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {history, location} = this.props;
        return (<div>
            <div className={style.ltH}>
                <div className={style.ltC}>
                    <div className={style.ltCL}>
                        <a href={WWW_URL} target="_blank" className={style.a}>
                            <img src={Logo} alt="" className={style.img}/>
                        </a>
                        <h5 className={style.title}>城市服务商</h5>
                        <ul className={style.ul}>
                            <li className={location.pathname === '/index/home' ? style.liActive : style.li}
                                onClick={() => history.push('/index/home')}>首页
                            </li>
                            <li className={location.pathname === '/index/assess' ? style.liActive : style.li}
                                onClick={() => history.push('/index/assess')}>考核标准
                            </li>
                            <li className={location.pathname === '/index/question' ? style.liActive : style.li}
                                onClick={() => history.push('/index/question')}>常见问题
                            </li>
                        </ul>
                    </div>
                    <div className={style.ltCR}>
                        <button className={style.login} onClick={() => history.push('/login')}>登录</button>
                        <button className={style.apply} onClick={() => history.push('/index/facilitatorEnter')}>申请入驻
                        </button>
                    </div>
                </div>
            </div>
            {this.props.children}
        </div>)
    }
}

HeaderLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default HeaderLayout;