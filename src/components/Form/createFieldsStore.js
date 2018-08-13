/**
 * @author: houzhitao
 * @since: 2018-06-09 17:19
 */

import set from 'lodash/set';
import createFormField, { isFormField } from './createFormField';
import {
    flattenFields,
    getErrorStrs,
    startsWith,
    getNameIfNested
} from './utils';

const atom = {};

function partOf(a, b) {
    return b.indexOf(a) === 0 && ['.', '['].indexOf(b[a.length]) !== -1;
}

class FieldsStore {
    constructor(fields) {
        this.fields = this.flattenFields(fields);
        this.fieldsMeta = {};
    }

    updateFields(fields) {
        this.fields = this.flattenFields(fields);
    }

    flattenFields(fields) {
        return flattenFields(
            fields,
            (_, node) => isFormField(node),
            'You must wrap field data with `createFormField`.'
        );
    }

    flattenRegisteredFields(fields) {
        const validFieldsName = this.getAllFieldsName();
        return flattenFields(
            fields,
            path => validFieldsName.indexOf(path) >= 0,
            'You cannot set field before registering it.'
        );
    }

    setFieldsInitialValue = (initialValues) => {
        const flattenedInitialValues = this.flattenRegisteredFields(initialValues);
        const fieldsMeta = this.fieldsMeta;
        Object.keys(flattenedInitialValues).forEach(name => {
            if (fieldsMeta[name]) {
                this.setFieldMeta(name, {
                    ...this.getFieldMeta(name),
                    initialValue: flattenedInitialValues[name],
                });
            }
        });
    }

    setFields(fields) {
        const fieldsMeta = this.fieldsMeta;
        const nowFields = {
            ...this.fields,
            ...fields,
        };
        const nowValues = {};
        Object.keys(fieldsMeta).forEach((f) => {
            const { name, isNested } = getNameIfNested(f);
            if (isNested && fieldsMeta[name].exclusive) {
                return;
            }
            nowValues[f] = this.getValueFromFields(f, nowFields);
        });
        // Object.keys(fieldsMeta)
        //     .forEach((f) => nowValues[f] = this.getValueFromFields(f, nowFields));
        Object.keys(nowValues).forEach((f) => {
            const value = nowValues[f];
            const fieldMeta = this.getFieldMeta(f);
            if (fieldMeta && fieldMeta.normalize) {
                const nowValue =
                    fieldMeta.normalize(value, this.getValueFromFields(f, this.fields), nowValues);
                if (nowValue !== value) {
                    nowFields[f] = {
                        ...nowFields[f],
                        value: nowValue,
                    };
                }
            }
        });
        this.fields = nowFields;
    }

    resetFields(ns) {
        const { fields } = this;
        const names = ns ?
            this.getValidFieldsFullName(ns) :
            this.getAllFieldsName();
        return names.reduce((acc, name) => {
            const field = fields[name];
            if (field && 'value' in field) {
                acc[name] = {};
            }
            return acc;
        }, {});
    }

    setFieldMeta(name, meta) {
        this.fieldsMeta[name] = meta;
    }

    getFieldMeta(name) {
        this.fieldsMeta[name] = this.fieldsMeta[name] || {};
        return this.fieldsMeta[name];
    }

    getValueFromFieldsInternal(name, fields) {
        const field = fields[name];
        if (field && 'value' in field) {
            return field.value;
        }
        const fieldMeta = this.fieldsMeta[name];
        return fieldMeta && fieldMeta.initialValue;
    }

    getValueFromFields(name, fields) {
        const { fieldsMeta } = this;
        if (fieldsMeta[name] && fieldsMeta[name].virtual) {
            const ret = {};
            Object.keys(fieldsMeta).forEach(fieldKey => {
                const nameIfNested = getNameIfNested(fieldKey);
                if (nameIfNested.name === name && nameIfNested.isNested) {
                    set(ret, fieldKey, this.getValueFromFieldsInternal(fieldKey, fields));
                }
            });
            return ret[name];
        };

        return this.getValueFromFieldsInternal(name, fields);

        // const field = fields[name];
        // if (field && 'value' in field) {
        //     return field.value;
        // }
        // const fieldMeta = this.getFieldMeta(name);
        // return fieldMeta && fieldMeta.initialValue;
    }

    getAllValues = () => {
        const { fieldsMeta, fields } = this;
        return Object.keys(fieldsMeta)
            .reduce((acc, name) => set(acc, name, this.getValueFromFields(name, fields)), {});
    }

    getValidFieldsName() {
        const { fieldsMeta } = this;
        return fieldsMeta ?
            Object.keys(fieldsMeta).filter(name => !this.getFieldMeta(name).hidden) :
            [];
    }

    getAllFieldsName() {
        const { fieldsMeta } = this;
        return fieldsMeta ? Object.keys(fieldsMeta) : [];
    }

    getValidFieldsFullName(maybePartialName) {
        const maybePartialNames = Array.isArray(maybePartialName) ?
            maybePartialName : [maybePartialName];
        return this.getValidFieldsName()
            .filter(fullName => maybePartialNames.some(partialName => (
                fullName === partialName || (
                    startsWith(fullName, partialName) &&
                    ['.', '['].indexOf(fullName[partialName.length]) >= 0
                )
            )));
    }

    getFieldValuePropValue(fieldMeta) {
        const { exclusive, leadingName, name, getValueProps, valuePropName, refreshMark } = fieldMeta;
        const { fieldsMeta } = this;
        const field = exclusive ? this.getField(leadingName) : this.getField(name);
        let fieldValue = atom;
        if('value' in field) {
            fieldValue = field.value
        }
        if (fieldValue === atom || refreshMark) {
            fieldValue = exclusive ? fieldsMeta[leadingName].initialValue : fieldMeta.initialValue;
            if (field && 'value' in field) {
                field.value = fieldValue;
                field.errors = undefined;
                field.validating = true;
                field.dirty = true;
                this.setFields({[exclusive? leadingName: name]: field});
            }
        }
        if (getValueProps) {
            return getValueProps(fieldValue);
        }
        return { [valuePropName]: fieldValue };
    }

    getField(name) {
        return {
            ...this.fields[name],
            name,
        };
    }

    getNotCollectedFields() {
        return this.getValidFieldsName()
            .filter(name => !this.fields[name])
            .map(name => ({
                name,
                dirty: false,
                value: this.getFieldMeta(name).initialValue,
            }))
            .reduce((acc, field) => set(acc, field.name, createFormField(field)), {});
    }

    getNestedAllFields() {
        return Object.keys(this.fields)
            .reduce(
                (acc, name) => set(acc, name, createFormField(this.fields[name])),
                this.getNotCollectedFields()
            );
    }

    getFieldMember(name, member) {
        return this.getField(name)[member];
    }

    getNestedFields(names, getter) {
        const fields = names || this.getValidFieldsName();
        return fields.reduce((acc, f) => set(acc, f, getter(f)), {});
    }

    getNestedField(name, getter) {
        const fullNames = this.getValidFieldsFullName(name);
        if (
            fullNames.length === 0 || // Not registered
            (fullNames.length === 1 && fullNames[0] === name) // Name already is full name.
        ) {
            return getter(name);
        }
        const isArrayValue = fullNames[0][name.length] === '[';
        const suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
        return fullNames
            .reduce(
                (acc, fullName) => set(
                    acc,
                    fullName.slice(suffixNameStartIndex),
                    getter(fullName)
                ),
                isArrayValue ? [] : {}
            );
    }

    getFieldsValue = (names) => {
        return this.getNestedFields(names, this.getFieldValue);
    }

    getFieldValue = (name) => {
        const { fields } = this;
        return this.getNestedField(name, (fullName) => this.getValueFromFields(fullName, fields));
    }

    getFieldsError = (names) => {
        return this.getNestedFields(names, this.getFieldError);
    }

    getFieldError = (name) => {
        return this.getNestedField(
            name,
            (fullName) => getErrorStrs(this.getFieldMember(fullName, 'errors'))
        );
    }

    isFieldValidating = (name) => {
        return this.getFieldMember(name, 'validating');
    }

    isFieldsValidating = (ns) => {
        const names = ns || this.getValidFieldsName();
        return names.some((n) => this.isFieldValidating(n));
    }

    isFieldTouched = (name) => {
        return this.getFieldMember(name, 'touched');
    }

    isFieldsTouched = (ns) => {
        const names = ns || this.getValidFieldsName();
        return names.some((n) => this.isFieldTouched(n));
    }

    // @private
    // BG: `a` and `a.b` cannot be use in the same form
    isValidNestedFieldName(name) {
        const names = this.getAllFieldsName();
        return names.every(n => !partOf(n, name) && !partOf(name, n));
    }

    clearField(name) {
        delete this.fields[name];
        delete this.fieldsMeta[name];
    }
}

export default function createFieldsStore(fields) {
    return new FieldsStore(fields);
}