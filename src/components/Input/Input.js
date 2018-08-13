/**
 * @author: houzhitao
 * @since: 2018-06-15 15:21
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Input extends Component {
    static defaultProps = {
        type: 'text',
        className: '', //className
        rules: false, //是否需要必填验证
        value: '', //初始化的值
        style: {}
    };

    constructor(props) {
        super(props);
    }

    /*
    * 获取验证规则
    * */
    getValidate = props => {
        let validate = props.rules;
        //TODO 验证规则 要修改
        return validate ? (rule, value, callback, source, options) => {
            let errors = [];
            if(xt.isEmpty(value)){
                errors.push('必填')
            };
            callback(errors);
        }: {required: validate}
    };

    onChange = event => {
      this.props.onChange && this.props.onChange(event.target.value);
    };

    render() {
        let props = this.props;
        const { type, className, form, fieldName, value = '', rules, style } = props;
        const {getFieldProps, getFieldError} = form;
        return (<div className={`input-form ${className}`} style={{...style}}>
            <input type={type} className={'input-form-common'}
                   {...getFieldProps([fieldName],{
                       initialValue: value,
                       validateFields: rules,
                       rules: [this.getValidate(props)],
                       onChange: this.onChange
                   })}
            />
            {getFieldError(props.fieldName) && <div className="input-form-error error-form">{getFieldError(props.fieldName)[0]}</div>}
        </div>)
    }
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    fieldName: PropTypes.string.isRequired,
    rules: PropTypes.bool,
    onChange: PropTypes.func

};

export default Input;