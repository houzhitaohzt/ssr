/**
 * @author: houzhitao
 * @since: 2018-06-09 17:20
 */

class Field {
    constructor(fields) {
        Object.assign(this, fields);
    }
}

export function isFormField(obj) {
    return obj instanceof Field;
}

export default function createFormField(field) {
    if (isFormField(field)) {
        return field;
    }
    return new Field(field);
}