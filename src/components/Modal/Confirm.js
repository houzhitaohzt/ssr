/**
 * @author: houzhitao
 * @since: 2018-06-12 08:43
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from './components/Modal';
import ModalHeader from "./components/Header";
import ModalBody from "./components/Body";
import ModalFooter from "./components/Footer";

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.onHide = this.onHide.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            open: props.isShow
        }
    }

    componentDidMount(){

    }

    componentWillReceiveProps(props){
        if(props.isShow !== this.props.isShow){
            this.setState({open: props.isShow})
        }
    }

    static defaultProps = {
        isShow: false,
        closeButton: true,
        showHeader: true, //头部是否显示
        title: '温馨提示',
        children: '确认成功',
        showFooter: true, //尾部是否显示
        showConfirm: true,
        confirmLabel: '确认',
        showCancel: true,
        cancelLabel: '取消'
    };

    onHide = () => {
        this.setState({open: false}, () => {
            this.props.cancel && this.props.cancel();
        })
    };

    onConfirm = () => {
      this.setState({open: false}, () => {
          this.props.confirm && this.props.confirm();
      })
    };

    onCancel = () => {
        this.setState({open: false}, () => {
            this.props.cancel && this.props.cancel();
        })
    };

    renderFooter = props => {
      const {showFooter, showConfirm, confirmLabel, showCancel, cancelLabel } = props;
      if(!showFooter) return null;
      return (<ModalFooter>
          { showConfirm && <button className="modal-button confirm" onClick={this.onConfirm}>{confirmLabel}</button> }
          { showCancel && <button className="modal-button cancel" onClick={this.onCancel}>{cancelLabel}</button> }
      </ModalFooter>)
    };

    render() {
        let props = this.props;
        let { open } = this.state;
        const { closeButton, showHeader, title, children } = props;
        return (<Modal show={open} onHide={this.onHide}>
            { showHeader && <ModalHeader closeButton={closeButton}>{title}</ModalHeader> }
            <ModalBody>{children}</ModalBody>
            {this.renderFooter(props)}
        </Modal>)
    }
}

Confirm.propTypes = {
    isShow: PropTypes.bool,
    showHeader: PropTypes.bool,
    title: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.node
    ]),
    closeButton: PropTypes.bool,
    children: PropTypes.any,
    showFooter: PropTypes.bool,
    showConfirm: PropTypes.bool,
    confirm: PropTypes.bool,
    confirmLabel: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.node
    ]),
    showCancel: PropTypes.bool,
    cancel: PropTypes.func,
    cancelLabel: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.node
    ])


};

export default Confirm;