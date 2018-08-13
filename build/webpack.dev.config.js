/**
 * @author: houzhitao
 * @since: 2018-05-30 10:51
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.base.config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const Dotenv = require('dotenv-webpack');

//corss-env 环境变量
const env = process.env.NODE_ENV;

let webpackDevConfig = {
    name: 'client',
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
            'react-hot-loader/patch', path.resolve(__dirname, '../src/app.js')],
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        publicPath: '/static/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    plugins: [
        new WriteFilePlugin(),
        new webpack.DefinePlugin({
            __isClient__: true,
            __isServer__: false,
            __SSR__: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new Dotenv({
            path: path.resolve(`./build/env/.env.${env}`),
            safe: false,
            systemvars: false
        })
    ]
};

module.exports = merge(baseWebpackConfig, webpackDevConfig);