/**
 * @author: houzhitao
 * @since: 2018-08-08 16:39
 */
const path = require('path');
require('colors');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../build/webpack.dev.config');
const serverConfig = require('../build/server.dev.config');
const clientConfigProd = require('../build/webpack.prod.config');
const serverConfigProd = require('../build/server.prod.config');

const publicPath = '/static/';
const outputPath = path.resolve(__dirname, '../dist/client');
const DEV = process.env.NODE_ENV === 'development';
const app = express();
// app.use(noFavicon())

let isBuilt = false;

const done = () =>
    !isBuilt &&
    app.listen(3000, () => {
        isBuilt = true;
        console.log('BUILD COMPLETE -- Listening @ http://localhost:3000'.magenta)
    });

if (DEV) {
    const compiler = webpack([clientConfig, serverConfig]);
    const clientCompiler = compiler.compilers[0];
    const options = { publicPath, stats: { colors: true } };
    const devMiddleware = webpackDevMiddleware(compiler, options);

    app.use(devMiddleware);
    app.use(webpackHotMiddleware(clientCompiler));
    app.use(webpackHotServerMiddleware(compiler));

    devMiddleware.waitUntilValid(done)
}
else {
    webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
        const clientStats = stats.toJson().children[0];
        const serverRender = require('../dist/server/main.js').default;

        app.use(publicPath, express.static(outputPath));
        app.use(serverRender({ clientStats }));

        done()
    })
}





