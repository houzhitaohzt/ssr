/**
 * @author: houzhitao
 * @since: 2018-06-15 16:12
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
//创建表单
import {createForm, createFormField} from "../../../components/Form";
//下拉框
import Select from '../../../components/Select';
import WebData from '../../../util/common/WebData';

class Switch extends Component {
    constructor(props) {
        super(props);
        props.store.initDialog(props.form);
    }



    render() {
        let {form, store} = this.props;
        return (<div>
            <div>
                user 用户中心：
                <Select
                    form={form}
                    fieldName="user"
                    rules
                    options={store.userList}
                    initialValue={WebData.wshifuUserApi}
                    style={{width: '150px'}}
                />
            </div>
            <div>
                city 城市服务商：
                <Select
                    form={form}
                    fieldName="city"
                    rules
                    options={store.cityList}
                    initialValue={WebData.wshifuCityApi}
                    style={{width: '150px'}}
                />
            </div>
            <div className="modal-footer">
                <button className="modal-button confirm" onClick={store.onSave}>确认</button>
                <button className="modal-button cancel" onClick={store.onCancel}>取消</button>
            </div>
        </div>)
    }
}

Switch.propTypes = {

};
export default createForm()(Switch);