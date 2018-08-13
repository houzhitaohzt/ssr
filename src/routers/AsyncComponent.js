/**
 * @author: houzhitao
 * @since: 2018-05-30 19:45
 */

import React, {Component} from 'react';

export function asyncComponent(getComponent, condition) {
    return class AsyncComponent extends React.Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if(condition){
                condition();
                return false;
            }
            if (!this.state.Component) {
                getComponent().then(({default: Component}) => {
                    AsyncComponent.Component = Component;
                    this.setState({ Component })
                })
            }
        }
        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}