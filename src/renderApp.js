/**
 * @author: houzhitao
 * @since: 2018-08-13 09:35
 */

import 'babel-polyfill';
import React, { Component } from 'react';

import "./util/common/date";
import './components/Modal/less/animation.less';
import './components/Modal/less/rbm-complete.less';
import "./style/css/font-awesome.css";
//初始化样式
import "./style/init.less";

import { Provider } from 'mobx-react';
import { configure } from 'mobx';
//mobx 开启严格模式
configure({ enforceActions: true});

import App from "./routers";
import store from "./store";

class renderApp extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    render() {
        const { history } = this.props;
        return (<Provider {...store}>
            <App history={history}/>
        </Provider>)
    }
}

renderApp.propTypes = {

};

export default renderApp;