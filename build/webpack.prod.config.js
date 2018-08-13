/**
 * @author: houzhitao
 * @since: 2018-05-30 11:16
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.base.config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Dotenv = require('dotenv-webpack');

//corss-env 环境变量
const env = process.env.NODE_ENV;


let webpackProdConfig = {
    name: 'client',
    mode: 'production',
    devtool: 'source-map',
    target: 'web',
    stats: 'verbose',
    entry: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')],
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        publicPath: '/static/',
        filename: '[name]-[chunkhash:8].js',
        chunkFilename: '[name]-[chunkhash:8].js'
    },
    //optiomization 取代commonchunk
    // optimization: {
    //     minimizer: [
    //         new UglifyjsWebpackPlugin({
    //             exclude: /\.min\.js$/,
    //             cache:true,
    //             parallel: true,
    //             sourceMap: false,
    //             extractComments: false,
    //             uglifyOptions: {
    //                 compress: {
    //                     unused: true,
    //                     warning: false, //不输出警告
    //                     drop_debugger: true //删除所以的console.log语句
    //                 },
    //                 output: {
    //                     comments: false, //不保留注释
    //                     beautify: false //不需要格式化
    //                 }
    //             }
    //         }),
    //         new OptimizeCssAssetsPlugin({
    //             assetNameRegExp: /\.css$/g,
    //             cssProcessorOptions: {
    //                 safe: true,
    //                 autoprefixer: { disabled: true },
    //                 mergeLonghand: false,
    //                 discardComments: {
    //                     removeAll: true
    //                 }
    //             },
    //             canPrint: true
    //         })
    //     ],
    //     runtimeChunk: {
    //         name: 'single'
    //     },
    //     spliteChunks: {
    //         chunks: 'async',
    //         minSize: 30000,
    //         minChunks: 1,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         name: false,
    //         cacheGroup: {
    //             vendor: {
    //                 name: 'vendor',
    //                 chunks: 'initial',
    //                 priority: -10,
    //                 reuseExistingChunk: false,
    //                 test: /[\\/]node_modules[\\/](.*).js/
    //             },
    //             commons: {
    //                 name: 'styles',
    //                 chunks: 'all',
    //                 minChunks: 1,
    //                 reuseExistingChunk: true,
    //                 enforce: true,
    //                 test: /\.(less|css)$/
    //             }
    //         }
    //     }
    // },
    plugins: [
        new webpack.DefinePlugin({
            __isClient__: true,
            __isServer__: false,
            __SSR__: false
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     title: '万师傅平台',
        //     inject: true,
        //     hash: true,
        //     cache: true,
        //     template: './build/static/index.html',
        //     favicon: './build/static/favicon.ico',
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeRedundantAttributes: true,
        //         useShortDoctype: true,
        //         removeEmptyAttributes: true,
        //         removeStyleLinkTypeAttributes: true,
        //         keepClosingSlash: true,
        //         minifyJS: true,
        //         minifyCSS: true,
        //         minifyURLs: true
        //     }
        // }),
        // new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        // new InlineManifestWebpackPlugin(),
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: true,
        //     analyzerMode: 'server' // server, static
        // }),
        new Dotenv({
            path: path.resolve(`./build/env/.env.${env}`),
            safe: false,
            systemvars: false,
            silent: true
        })

    ]
};

module.exports = merge(baseWebpackConfig, webpackProdConfig);