/**
 * @author: houzhitao
 * @since: 2018-06-19 17:54
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class LeftLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {store,  t,  history, location } = this.props;
        return store.list.map( (da, di) => {
            return (<dl className={t.dl} key={di + da.icon}>
                <dt className={t.dt}><i className={cn(da.icon, t.dli)}/>{da.title}</dt>
                {da.children && da.children.map( e => (<dd className={cn(t.dd, {[t.active] : location.pathname === e.url})} key={e.url} onClick={() => history.push(e.url)}>{e.title}</dd>) )}
            </dl>)
        });
    }
}

LeftLink.propTypes = {};

export default LeftLink;