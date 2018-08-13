/**
 * @author: houzhitao
 * @since: 2018-06-12 13:43
 */

import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-virtualized-select';
import xt from '../../util/common/xt';
import Api from 'Api';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import './assets/index.less';

class ConVirturalSelect extends Component {
    static defaultProps = {
      labelKey: 'name',
      valueKey: 'id',
      clearable: false,
      isLoading: false,
      disabled: false,
      multi: false,
      placeholder: '请选择',
      className: '',
      style: {},
      fieldName: 'fieldName',
      rules: true,
      onChange: () => {},
      options: [],
      initialValue: '',
      isRequest: false, //是否点击的时候，进行请求数据
      initRequest: false, //当isRequest=true 是，下拉框直接请求数据
      apiType: Api.get,
      apiHost: Api.USER_API,
      apiUrl: '/aa/list',
      apiParams: {},
      data: 'data.list',
      refreshMark: undefined //表单刷新标识
    };

    constructor(props) {
        super(props);
        this.onFormSelectChange = this.onFormSelectChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            isLoading: props.loading,
            options: this.getOptionValues(props.options, props),
            selectValue: props.fieldName ? undefined : this.getInitialValue(props)
        };

        this.isInitData = true; //是否进行过点击请求 fase表示没有进行过点击请求 true请求过数据
    }

    componentDidMount(){
        let props = this.props;
        let { disabled, isRequest, initRequest } = props;
        if(!disabled && !isRequest && initRequest){
            this.loadOptions(props, (error, options) => {
                this.setState({selectValue: this.getInitialValue(props, options)})
            })
        };
    };

    componentDidUpdate() {
        if(this.props.fieldName){
            this.setInputValue(this.props.form.getFieldValue(this.props.fieldName));
        } else {
            this.setInputValue(this.state.selectValue);
        }
    }

    componentWillReceiveProps(props){
        let state = null;
        if(props.refreshMark && props.refreshMark !== this.props.refreshMark){
            this.props.form.resetFields([props.fieldName]);
            this.setInputValue();
            state = {options: this.getOptionValues(props.options, props)};
            this.isInitData = false;
        }else if((this.state.options.length && props.options.length ) || (!props.isRequest && props.options !== this.props.options)){
            state = {options: this.getOptionValues(props.options, props)};
        }
        if(props.isLoading !== this.props.isLoading){
            state = props.isLoading;
        }
        state && this.setState(state)
    }

    componentWillUnmount(){

    }

    getInitialValue = (props, options) => {
        let {initialValue: value, activeOption} = props;
        if(activeOption && value === ''){
            let option = options || this.state.options;
            if(option && option.length){
                return xt.isFunction(activeOption) ? activeOption(option) : option[0];
            }
        }

        if(xt.isFunction(value)) value = value(this, props);
        if(!xt.isArray(value)) value = String(value) || '';
        return this.findOptionInitialValue(value, options);
    };

    //查找下拉框 对应要的值
    findOptionInitialValue = (value, options) => {
      options = options || this.state.options;
      if(!value) return value;
      if(xt.isArray(value) && value.length){
          if(xt.isObject(value[0])){
              let optionValue = [];
              vlaue.forEach( da => {
                  if(da && da.labelKey) optionValue.push(da);
              });
              return optionValue;
          }
          return options.filter(da => da.valueKey && ~value.indexOf(da.valueKey));
      }
        return options.find(da => String(da.valueKey) === value);
    };

    //把拿到的数据，转换成select要的数据
    optValue = (da, props) => {
        let {labelKey, valueKey} = props;
        let s_label, s_value;
        if(xt.isObject(da) && !xt.isEmpty(da)){
            if(xt.isFunction(labelKey)){
                s_label = labelKey(da);
            }else if(xt.isArray(labelKey)){
                let arr = [];
                labelKey.map(e => arr.push(da[e]));
                s_label = arr.join('');
            }else{
                s_label = da[labelKey] || '';
            }

            if(xt.isFunction(valueKey)){
                s_value = valueKey(da);
            }else if(xt.isArray(valueKey)){
                let arr = [];
                labelKey.map(e => arr.push(da[e]));
                s_value = arr.join('');
            }else {
                s_value = da[valueKey] || '';
            }
        }else{
            s_value = da;
            s_label = da;
        }

        return {labelKey: s_label, valueKey: s_value, ...da};
    };

    getOptionValues = (option, props) => {
        return option.map(da => this.optValue(da, props))
    };

    onFormChange = (field,value) => {
        // if(xt.isEmpty(value)){
        //     let initialValue = this.props.initialValue;
        // }
        field.onChange(value);
    };

    onSelectChange = value => {
      this.setState({selectValue: value});
      this.props.onChagne(value);
    };

    setInputValue = (inputValue = '') => {
        if(this._selectRef && this._selectRef.state.inputValue !== inputValue){
            if(typeof inputValue !== 'object'){
                this._selectRef.setState({ inputValue });
                this._selectRef.blurInput && this._selectRef.blurInput()
            }
        }
    };

    /*
    * form onChange事件
    * */
    onFormSelectChange = value => {
        this.props.onChange && this.props.onChange(value);
    };

    /**
     * 获取验证规则
     * @param props
     * @returns {*}
     */
    getValidateRules = (props) => {
        let validate = props.rules;
        return validate ? (rule, value, callback, source, options) => {
            //TODO 验证规则
                let errors = [];
                if( xt.isEmpty(value)){
                    errors.push('必填');
                }
                callback(errors);
            }: {required: validate}
    };

    /*
    * 获取表单值
    * */
    getFeildProps = props => {
        let that = this;
        if(props.fieldName){
            let validate = props.rules;
            return props.form.getFieldProps(
                props.fieldName,
                {
                    ref: rf =>that._selectRef = rf && rf._selectRef,
                    validateFields: validate,
                    rules: [that.getValidateRules(props)],
                    initialValue: that.getInitialValue(props),
                    onChange: that.onFormSelectChange
                }
            )
        }else{
            return {onChange: that.onSelectChange, valueKey: that.state.selectValue, ref: ref => that._selectRef = ref && rf._selectRef}
        }
    };

    /*
    * 拉取数据
    * */
    fetchData = (props, cb) => {
        let that = this;
        that.isInitData = false;
        let {apiType, apiHost, apiUrl, apiParams, data } = props;
        apiType(apiHost, apiUrl, apiParams).then( response => {
            that.isInitData = true;
            let options = xt.getItemValue(response, data, []);
            cb && cb(null, options);
            that.setState({options});
        }, error => {
            cb && cb(error);
            that.setState({options: []})
        })
    };

    loadOptions = (props, cb) => {
        if(props.disabled || !props.isRequest) return false;
        if(this.isInitData) return false;
        this.fetchData(props, cb);
    };

    //点击 下拉框展开时 去请求数据
    onOpen = () => {
        this.loadOptions(this.props);
    };

    render() {
        let props = this.props;
        let { form, clearable, isLoading, disabled, multi, placeholder, className, style } = props;

        let field = this.getFeildProps(props);
        let value = field.value;
        if(value && !Array.isArray(field.value) && xt.isEmpty(value.labelKey)) value = undefined;

        return (<div className="convirtural-select" style={{...style}}>
                <ReactSelect
                    onChange={this.onFormChange.bind(this, field)}
                    labelKey={'labelKey'}
                    valueKey={'valueKey'}
                    className={`${className} keyValue`}
                    wrapperStyle={style}
                    options={this.state.options || []}

                    clearable={clearable}
                    isLoading={isLoading}
                    disabled={disabled}
                    multi={multi}
                    placeholder={placeholder}
                    removeSelected={true}
                    matchPos={'any'}
                    matchProp={'label'} //label, value, any 三个选项，默认匹配lebel搜索
                    ignoreCase={true} //忽略大小写 匹配文本
                    autoFocus={true}
                    value={value}
                    ref={field.ref}
                    onOpen={this.onOpen}
                />
                {form.getFieldError(props.fieldName) && <div className="convirtural-select-error error-form">{form.getFieldError(props.fieldName)[0]}</div>}
            </div>
            )
    }
}

ConVirturalSelect.propTypes = {
    name: PropTypes.string,
    labelKey: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.array,
        PropTypes.func
    ]),
    valueKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
        PropTypes.func
    ]),
    clearable: PropTypes.bool,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    multi: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    fieldName: PropTypes.string.isRequired,
    rules: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.object
    ]),
    isRequest: PropTypes.bool,
    initRequest: PropTypes.bool,
    apiType: PropTypes.func,
    apiHost: PropTypes.string,
    apiUrl: PropTypes.string,
    apiParams: PropTypes.object,
    refreshMark: PropTypes.any,
    form: PropTypes.object.isRequired
};

export default ConVirturalSelect;