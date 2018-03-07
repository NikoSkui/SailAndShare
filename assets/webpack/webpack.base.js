/**
 * Load module required
 */
const webpack           = require("webpack"),
      path              = require('path'),
      extractTextPlugin = require('extract-text-webpack-plugin'),
      cleanWebpackPlugin = require('clean-webpack-plugin')
/**
 * Definition of some variables
 */
let debug               = process.env.NODE_ENV === 'development',
    hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    cssLoaders          = [{ loader: 'css-loader', options: { importLoaders: 1, minimize: !debug } }]

/**
 * CONFIGURATION DE PRODUCTION
 */
if (!debug) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                browsers: ['last 2 versions', 'ie > 8']
                })
            ]
        }
    })
}

/**
 * CONFIGURATION DE BASE
 */
let webpackBase = {
    devtool: debug ? 'cheap-module-eval-source-map' : false,
    watch: debug,
    mode: process.env.NODE_ENV,
    entry:{
        app: ['./assets/scss/app.scss', './assets/js/app.js', hotMiddlewareScript]
    },
    output: {
        path: path.resolve('./public/'),
        filename: debug ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
        publicPath:'/assets/'
    },
    resolve: {
        alias: {
            '@css': path.resolve('./css/'),
            '@': path.resolve('./js/')
        }
    },
    module: {
        rules: [
            // Loaders
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaders
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: extractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [...cssLoaders, 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new extractTextPlugin({
          filename: debug ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
          disable: debug
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new cleanWebpackPlugin(['public'], {
            root: path.resolve('./'),
            verbose: true,
            dry: false,
            exclude: ['images','fonts','resources']
          })
      ],
}

module.exports = webpackBase;