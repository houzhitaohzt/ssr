/**
 * @author: houzhitao
 * @since: 2018-06-15 17:43
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DialogForm extends Component {
    constructor(props) {
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        super(props);
    }

    onSave = () => {
        this.props.onSave && this.props.onSave();
    };

    onCancel = () => {
        this.props.onCancel && this.props.onCancel();
    };

    render() {
        let props = this.props;
        const { children, showConfirm, confirmLabel, showCancel, cancelLabel } = props;
        return (<div className="dialog-form">
            {children}
            { showConfirm && <button className="modal-button confirm" onClick={this.onSave}>{confirmLabel || "确认"}</button> }
            { showCancel && <button className="modal-button cancel" onClick={this.onCancel}>{cancelLabel || "取消"}</button> }
        </div>)
    }
}

DialogForm.propTypes = {};

export default DialogForm;