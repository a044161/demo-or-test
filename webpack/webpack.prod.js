const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = merge.smart(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new UglifyJSPlugin(),
    new WorkboxPlugin({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
})
