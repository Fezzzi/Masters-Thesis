const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
require('dotenv').config()

const webpackAliases = require('./webpack-aliases.config')

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  context: path.resolve(__dirname, '../code/web'),
  ...webpackAliases,
  output: {
    filename: 'main.[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: module =>
            `npm.${module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace('@', '')}`,
        },
      },
    },
  },
  entry: {
    main: ['babel-polyfill', 'webSrc/index.tsx'],
  },
  devServer: {
    historyApiFallback: true,
    port: process.env.DEV_PORT ?? 8081,
    host: process.env.DOCKER_ENV ? '0.0.0.0' : 'localhost',
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 1000
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|ts(x?))$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../assets/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: '../../assets/manifest.json' },
        { from: '../../assets/favicon.ico' },
        { from: '../../assets/icons/icon-128.png' },
        { from: '../../assets/icons/icon-512.png' },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.API_PORT': process.env.API_PORT ?? 8080,
      'process.env.DEBUG': Boolean(process.env.DEBUG),
    }),
  ],
}
