/**
 * @author: houzhitao
 * @since: 2018-06-19 15:55
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { inject, observer } from 'mobx-react';
import topleftLayoutStore from './topleftLayoutStore';

import t from './topleftlayout.m.less';
import LogoImg from './logo1_03.png';
import UserImg from './user.png';
import LeftLink from './LeftLink';

@observer
class TopLeftLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {history, location, children} = this.props;
        return (<div className={t.all}>
            <div className={t.head}>
                <img className={t.headL} src={LogoImg} alt="" />
                <div className={t.headR}>
                    <img src={UserImg} alt="" className={t.rImg}/>
                    <span className={t.rAddress}>
                        <span className={t.rn}>zhangweiheng</span>
                        <span className={t.ra}>地区：西藏</span>
                    </span>
                    <span className={t.rOut} onClick={() => history.push('/login')}>退出</span>
                    <i className={cn("fa fa-bell-o fa-2x", t.rI)} onClick={() => history.push('/menu/NotifyMessage')} />
                    <a className={t.rHome} href="https://city.wanshifu.com/homepage">企业主页</a>
                    <span className={t.rPhone}>400-806-2580</span>
                </div>
            </div>
            <div className={t.cont}>
                <div className={t.cL}>
                    <LeftLink store={topleftLayoutStore} t={t} {...this.props}/>
                </div>
                <div className={t.cM}>
                    <div className={t.child}>{children}</div>
                </div>
                <div className={t.cR}/>
            </div>
        </div>)
    }
}

TopLeftLayout.propTypes = {};

export default TopLeftLayout;