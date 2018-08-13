/**
 * @author: houzhitao
 * @since: 2018-05-30 11:20
 */

import React, { Component } from 'react';
import { render, unmountComponentAtNode, hydrate  } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

//router
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

import App from './renderApp';

/************************************************/
// 初始化
/************************************************/
const MOUNT_NODE = document.getElementById('app');

/***********************************************/
// 运行中
/***********************************************/
let renderGo = AppCom => {
    hydrate(
        <AppContainer>
            <AppCom history={history}/>
        </AppContainer>
        , MOUNT_NODE);
};

/**********************************************/
// 运行
/**********************************************/
renderGo(App);

