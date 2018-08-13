/**
 * @author: houzhitao
 * @since: 2018-08-09 16:04
 */

/**
 * @author: houzhitao
 * @since: 2018-08-08 16:39
 */

// // 引入renderToString
// import { renderToString, renderToStaticMarkup, renderToNodeStream } from 'react-dom/server';

import React from 'react'
import ReactDOM from 'react-dom/server'
import createHistory from 'history/createMemoryHistory'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/renderApp'

export default ({ clientStats }) => (req, res) => {
    const history = createHistory({ initialEntries: [req.path] });
    const app = ReactDOM.renderToNodeStream(<App history={history} />);
    const chunkNames = flushChunkNames();

    const {
        js,
        styles,
        cssHash,
        scripts,
        stylesheets
    } = flushChunks(clientStats, { chunkNames });


    console.log('PATH', req.path);
    console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
    console.log('SCRIPTS SERVED', scripts);
    console.log('STYLESHEETS SERVED', stylesheets);

    res.send(
        `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>万师傅平台</title>
          ${styles}
        </head>
        <body>
          <div id="app">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
    )
}
