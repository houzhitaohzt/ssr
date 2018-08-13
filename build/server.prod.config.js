/**
 * @author: houzhitao
 * @since: 2018-08-08 14:48
 */

/**
 * @author: houzhitao
 * @since: 2018-08-07 18:13
 */
const path = require('path');
const webpack = require('webpack');
const loader = require('./loader');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Dotenv = require('dotenv-webpack');

//corss-env 环境变量
const env = process.env.NODE_ENV;

let webpackServerProdConfig = {
    name: 'server',
    mode: 'production',
    devtool: 'source-map',
    target: 'node',
    entry: ['babel-polyfill', path.resolve(__dirname, '../server/render.js')],
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: 'main.js',
        libraryTarget: 'commonjs2'
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
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less']
    },
    plugins: [
        new webpack.DefinePlugin({
            __isClient__: false,
            __isServer__: true,
            __SSR__: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new Dotenv({
            path: path.resolve(`./build/env/.env.${env}`),
            safe: false,
            systemvars: false,
            silent: true
        })

    ]
};

module.exports = webpackServerProdConfig;