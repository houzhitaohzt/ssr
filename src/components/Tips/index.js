/**
 * @author houzhitao
 * @since 2018-06-10
 * */

import React, {Component} from 'react';
import {render} from 'react-dom';
import tipStyle from './tips.m.less';

import successImg from './success.png';
import errorImg from './error.png';
import infoImg from './info.png';
import warningImg from './warning.png';

//生成全局唯一id
export function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4() + Date.now());
}


class Tip extends Component {
    constructor(props) {
        super(props);
        this.getImgSrc = this.getImgSrc.bind(this);
        this.timer = null;
    }

    static defaultProps = {
        type: 'success', // success, error, warning, info 四种提示样式
        msg: '保存成功！', //string 或者是标签
        callback: () => {},
        timeOut: 2000
    };

    componentDidMount() {
        let {id, callback, timeOut } = this.props;
        this.timer = setTimeout(() => {
            document.body.removeChild(document.getElementById(id));
            callback && callback();

        }, timeOut);
    };

    onMouseOver = () => {
        clearTimeout(this.timer);
    };

    onMouseOut = () => {
        let {id, callback, timeOut} = this.props;
        this.timer = setTimeout(() => {
            document.body.removeChild(document.getElementById(id));
            callback && callback();
        }, timeOut);
    };

    getImgSrc = type => {
        switch (type) {
            case 'success':
                return successImg;
            case 'error':
                return errorImg;
            case 'info':
                return infoImg;
            case 'warning':
                return warningImg;
            default:
                return infoImg;
        }
    };

    render() {
    	let { id, type, msg} = this.props;
    	return (<div className={`${tipStyle.showTip} ${type}`} id={id}>
			<img src={this.getImgSrc(type)} className={tipStyle.showTipImg} /><span className={tipStyle.showTipC} dangerouslySetInnerHTML={{__html: msg}} />
		</div>)
	}
}

function serverTip(option = {}) {
    let {type = 'success', msg} = option;
    if (!msg) return false;
    let uuid = guid();
    let el = document.createElement('div');
    el.setAttribute('id', uuid);
    document.body.appendChild(el);
    render(<Tip {...option} id={uuid} />, el);
};

/**
 * 一般用于成功提示,该方式建议文字较少提示
 * @param {string | node} text
 * @return {node} 文字提示
 * */
export function successTip(text) {
    serverTip({msg: text, type: 'success'});
};

/**
 * 一般用于错误提示,该方式建议文字较少提示
 * @param {string | node} text
 * @return {node} 文字提示
 * */
export function errorTip(text) {
    serverTip({msg: text, type: 'error'});
};

/**
 * 一般用于info提示，该方式建议文字较少提示
 * @param {string} text
 * @return {node} 文字提示
 * */
export function infoTip(text) {
    serverTip({msg: text, type: 'info'});
};


/**
 * 一般用于警告提示，该方式建议文字较少提示
 * @param {string} text
 * @return {node} 文字提示
 * */
export function warnTip(text) {
    serverTip({msg: text, type: 'warning'});
}

export default serverTip;

/**
 * 默认用法
 * import serverTip, {successTip, errorTip, infoTip, warnTip} from '../../compoents/Tip';
 * serverTip({msg: '保存成功', type: 'success'})
 * serverTip({msg: '服务器报错', type: 'error'})
 * serverTip({msg: '信息提示', type: 'info'})
 * serverTip({msg: '警告提示', type: 'warning'})
 * successTip('保存成功')
 * errorTip('服务器报错')
 * infoTip('信息提示')
 * warnTip('警告提示')
 * */
