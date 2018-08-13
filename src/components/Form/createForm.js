/**
 * @author: houzhitao
 * @since: 2018-06-09 17:20
 */

import createBaseForm from './createBaseForm';
import xt from "../../util/common/xt";

export const mixin = {

    getObjectValue (fields, fieldValue = {}){
        let fieldsEntries = Object.entries(fields);
        for(let [k, v] of fieldsEntries){
            if(xt.isObject(v)){
                fieldValue[k] = v['valueKey']
            }else if(xt.isArray(v)){
                fieldValue[k] = v;
            }else{
                fieldValue[k] = v;
            }
        }
        return fieldValue;
    },

    getFieldSingleValue (fieldValue, defaultValue) {
        return xt.isUndefined(fieldValue['valueKey']) ? fieldValue['valueKey'] : defaultValue;
    },

    getObjectFieldValue (name, defaultValue) {
        let fieldValue = this.fieldsStore.getFieldValue(name);
        if(xt.isObject(fieldValue)){
            return this.getFieldSingleValue(fieldValue, defaultValue);
        }
        return xt.isUndefined(fieldValue) ? defaultValue : fieldValue;
    },

    getForm() {
        let oldFieldsValue = this.fieldsStore.getFieldsValue;
        this.fieldsStore.getFieldsValue = names => this.getObjectValue(oldFieldsValue(names));
        return {
            getFieldsValue: this.fieldsStore.getFieldsValue,
            // getFieldValue: this.fieldsStore.getFieldValue,
            getFieldValue: this.getObjectFieldValue,
            getFieldInstance: this.getFieldInstance,
            setFieldsValue: this.setFieldsValue,
            setFields: this.setFields,
            setFieldsInitialValue: this.fieldsStore.setFieldsInitialValue,
            getFieldDecorator: this.getFieldDecorator,
            getFieldProps: this.getFieldProps,
            getFieldsError: this.fieldsStore.getFieldsError,
            getFieldError: this.fieldsStore.getFieldError,
            isFieldValidating: this.fieldsStore.isFieldValidating,
            isFieldsValidating: this.fieldsStore.isFieldsValidating,
            isFieldsTouched: this.fieldsStore.isFieldsTouched,
            isFieldTouched: this.fieldsStore.isFieldTouched,
            isSubmitting: this.isSubmitting,
            submit: this.submit,
            validateFields: this.validateFields,
            resetFields: this.resetFields,
        };
    },
};

function createForm(options) {
    return createBaseForm(options, [mixin]);
}

export default createForm;