/**
 * @author: houzhitao
 * @since: 2018-08-08 14:45
 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const loader = require('./loader');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const Dotenv = require('dotenv-webpack');

//corss-env 环境变量
const env = process.env.NODE_ENV;

const res = p => path.resolve(__dirname, p);
const nodeModules = res('../node_modules');
const externals = fs
    .readdirSync(nodeModules)
    .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
    .reduce((externals, mod) => {
        externals[mod] = `commonjs ${mod}`;
        return externals
    }, {});
externals['react-dom/server'] = 'commonjs react-dom/server';

let webpackServerDevConfig = {
    name: 'server',
    mode: 'development',
    devtool: 'source-map',
    target: 'node',
    externals,
    entry: ['babel-polyfill', path.resolve(__dirname, '../server/render.js')],
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
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
    plugins: [
        new WriteFilePlugin(),
        new webpack.DefinePlugin({
            __isClient__: false,
            __isServer__: true,
            __SSR__: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: true,
        //     analyzerMode: 'public/server', // server, static
        //     // reportFilename: 'report.html'
        // }),
        new Dotenv({
            path: path.resolve(`./build/env/.env.${env}`),
            safe: false,
            systemvars: false,
            silent: true
        })
    ]
};

module.exports = webpackServerDevConfig;