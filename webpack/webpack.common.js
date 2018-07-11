const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

function getPath (dir) {
  return path.resolve(__dirname, dir)
}

const PATH_SRC = getPath('src')
const PATH_DIST = getPath('dist')
const MATCH_NODE_MODULES = /node_modules/

module.exports = {
  entry: {
    app: PATH_SRC,
    polyfill: ['babel-polyfill'],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].[hash].js',
    path: PATH_DIST,
    chunkFilename: '[name].[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: getPath('src/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.RuntimeChunkPlugin({
      name: 'manifest'
    }),
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        // 打包重复出现的代码
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'vendor'
        },
        // 打包第三方类库
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: Infinity
        }
      }
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      components: getPath('src/components'),
      UIComponents: getPath('src/UIComponents'),
      src: PATH_SRC,
      view: getPath('src/view'),
      style: getPath('src/style'),
      lib: getPath('src/lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: MATCH_NODE_MODULES,
        include: PATH_SRC,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: MATCH_NODE_MODULES,
        include: PATH_SRC,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  }
}
