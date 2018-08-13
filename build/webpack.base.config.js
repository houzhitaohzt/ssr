/**
 * @author: houzhitao
 * @since: 2018-05-30 10:24
 */

const path = require('path');
const loader = require('./loader');
const webpack = require('webpack');

//基本配置
module.exports = {
    cache: true,
    devtool: false,
    resolve: {
        modules: [
            path.resolve('node_modules')
        ],
        extensions: ['.js', '.jsx', '.css', '.less'],
        alias: {
            'Api': path.resolve(__dirname, '../src/util/Api/index.js'),
            'Config': path.resolve(__dirname, '../src/util/Api/Config.js')
        }
    },
    resolveLoader: {
        modules: [
            path.resolve('node_modules')
        ]
    },
    module: {
        rules: [
            loader.css(),
            loader.less(),
            loader.cssModules(),
            loader.lessModules(),
            loader.babel(),
            loader.images(),
            loader.fonts(),
            loader.medias(),
            loader.text()
        ]
    },
    externals: {

    },
    // target: 'web'
};


