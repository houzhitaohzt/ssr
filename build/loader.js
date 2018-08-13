let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

let resolve = path.resolve;
// let dev = process.env.NODE_ENV === 'development';
let dev = process.env.NODE_ENV === 'local';

let styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: dev
  }
};

// css
let cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: dev,
    modules: false,
    importLoaders: 1
  }
};

let moduleCSSLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: dev,
    modules: true,
    camelCase: 'only',
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:8]'
  }
};

let lessLoader = {
  loader: 'less-loader'
};

// postcss
let postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: dev,
    config: {
      path: path.join(__dirname, './postcss.config.js')
    }
  }
};

function getCSSLoaders (modules) {
  return dev ?
    [styleLoader, modules ? moduleCSSLoader : cssLoader, postCSSLoader]
    :
    [MiniCssExtractPlugin.loader, modules ? moduleCSSLoader : cssLoader, postCSSLoader]
}

function getLessLoaders (modules) {
    return dev ?
        [styleLoader, modules ? moduleCSSLoader : cssLoader, postCSSLoader, lessLoader]
        :
        [MiniCssExtractPlugin.loader, modules ? moduleCSSLoader : cssLoader, postCSSLoader, lessLoader]
}

exports.css = () => {
  return {
    test: /\.css$/,
    // exclude: /\.module\.css$/,
    exclude: /\.m\.css$/,
    oneOf: [
      // this matches `<style module>`
      {
        // resourceQuery: /module/,
        resourceQuery: /m/,
        use: getCSSLoaders(true)
      },
      // this matches plain `<style>` or `<style scoped>`
      {
        use: getCSSLoaders(false)
      }
    ]
  };
};

exports.less = () => {
    return {
        test: /\.less$/,
        // exclude: /\.module\.css$/,
        exclude: /\.m\.less$/,
        oneOf: [
            // this matches `<style module>`
            {
                // resourceQuery: /module/,
                resourceQuery: /m/,
                use: getLessLoaders(true)
            },
            // this matches plain `<style>` or `<style scoped>`
            {
                use: getLessLoaders(false)
            }
        ]
    };
};

exports.cssModules = () => {
  return {
    test: /\.m\.css$/,
    use: getCSSLoaders(true)
  };
};

exports.lessModules = () => {
  return {
    test: /\.m\.less$/,
      use: getLessLoaders(true)
  }

};

// eslint
// exports.eslint = () => {
//   return {
//     enforce: 'pre',
//     test: /\.(jsx?|vue)$/,
//     loader: 'eslint-loader',
//     include: resolve('src'),
//     options: {
//       fix: true,
//       cache: dev ? resolve('.cache/eslint') : false,
//       failOnError: !dev, // 生产环境发现代码不合法，则中断编译
//       useEslintrc: true,
//       formatter: require('eslint-friendly-formatter')
//     }
//   };
// }

// babel
exports.babel = () => {
  return {
    test: /\.jsx?$/,
    // include: resolve('src'),
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: resolve('.cache/babel'),
        babelrc: true
      }
    }
  };
};

// images
exports.images = (opt = {}) => {
  return {
    test: /\.(png|jpe?g|gif|webp|ico)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: opt.filename || 'images/[name].[hash:8].[ext]'
        }
      },
      // 生产模式启用图片压缩
      !dev && {
        loader: 'imagemin-loader',
        options: {
          plugins: [
            {
              use: 'imagemin-pngquant'
            },
            {
              use: 'imagemin-mozjpeg'
            }
          ]
        }
      }
    ].filter(p => p)
  };
};

// fonts
exports.fonts = (opt = {}) => {
  return {
    test: /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)??$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: opt.filename || 'fonts/[name].[hash:8].[ext]'
    }
  };
};

// media
exports.medias = (opt = {}) => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 3000,
      name: opt.filename || 'medias/[name].[hash:8].[ext]'
    }
  };
};

// text
exports.text = () => {
  return {
    test: /\.(md|txt|tpl)$/,
    loader: 'raw-loader'
  };
};
