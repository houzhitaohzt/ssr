/**
 * @author: houzhitao
 * @since: 2018-05-30 16:52
 */
import React from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export default class extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        const { history } = this.props;
        return (<Router history={history}>
            <AppRoutes />
        </Router>)
    }
}



