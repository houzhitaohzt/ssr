/**
 * @author: houzhitao
 * @since: 2018-06-20 11:33
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import cn from 'classnames';
import i from '../assets/joblog.m.less';

@inject('joblogStore')
@observer
class JobLog extends Component {
    constructor(props) {
        super(props);
        this.store = new props.joblogStore();
    }

    render() {
        return (<div className={i.jl}>
            <div className={i.jlH}>工作安排概况</div>
            <div className={i.time}>
                <div className={i.timec}>
                    <i className={cn('fa fa-calendar-check-o', i.timecI)}/> 2018-06-25工作概况
                </div>
                <span className={i.updatetime}>更改时间</span>(显示当天客服的工作安排和师傅工作完成情况)
            </div>
        </div>)
    }
}

JobLog.propTypes = {};

export default JobLog;