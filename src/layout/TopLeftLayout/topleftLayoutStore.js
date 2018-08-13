/**
 * @author: houzhitao
 * @since: 2018-06-19 17:05
 */

import React, {Component} from 'react';
import {observable, action, computed} from 'mobx';
import Api from 'Api';

class topleftLayoutStore {
    list: Array<Object> = [
            { title: '订单中心', icon: 'fa fa-book', children: [
                { url: '/menu/jobLogging', title: '工作安排概况'},
                { url: '/menu/listPage', title: '订单管理'},
                { url: '/menu/addExternalOrder', title: '添加外部商家订单'},
                { url: '/menu/waitOrder', title: '待报价订单'},
                { url: '/menu/evaluateManage', title: '评价管理'}
            ]},
            {
                title: '企业资源管理', icon: 'fa fa-calendar', children: [
                {url: '/menu/masterMessage', title: '师傅信息'},
                {url: '/menu/vehicleInformation', title: '车辆信息'}
            ]},
            {
                title: '账号管理', icon: 'fa fa-address-card-o', children: [
                {url: '/menu/serviceInfo', title: '基本资料'},
                {url: '/menu/accountManagementCredibility', title: '诚信认证'},
                {url: '/menu/oderSource', title: '外部商家订单来源'}
            ]},
            {
                title: '钱包管理', icon: 'fa fa-calendar', children: [
                {url: '/menu/myWallet', title: '我的钱包'},
                {url: '/menu/addBank', title: '银行卡信息'},
                {url: '/menu/bailManage', title: '保证金管理'}
            ]},
            {
                title: '商家管理', icon: 'fa fa-calendar', children: [
                {url: '/menu/quotationList', title: '商家报价表'},
                {url: '/menu/cooperationRelation', title: '合作中的商家'},
                {url: '/menu/bill/billList', title: '账单信息'}
            ]},
            {
                title: '消息', icon: 'fa fa-commenting', children: [
                {url: '/menu/NotifyMessage', title: '消息通知'}
            ]}
        ]
}

export default new topleftLayoutStore();