import path from 'path';
// import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default{
  mode: 'development',
  devtool: 'source-map', //ensures we see original code
  entry: {
    vendor: path.resolve(__dirname,'src/vendor'),
    main: path.resolve(__dirname,'src/index'),
  },
  devServer:{
    noInfo: false,
    debug: true
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname,'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true, // represents entry point name
      cacheGroups: {
        vendors: {
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin(), //Minify JS
    ],

  },
  plugins:[
    //Eliminate duplicate packages when generating bundle
    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Create HTML file that includes reference to bundled JS
    new HTMLWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true  //inject any necessary script tags
    }),

  ],
  module:{
    rules: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader:'babel-loader'
          }]
      },
      {
          test:/\.css$/,
          use:[MiniCssExtractPlugin.loader,'css-loader']
      },
    ]
  }
}
