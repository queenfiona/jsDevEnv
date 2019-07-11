import path from 'path';
// import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';

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
    filename: '[name].js'
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
      new UglifyJsPlugin()  //Minify JS
    ],

  },
  plugins:[
    //Eliminate duplicate packages when generating bundle
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
          use:['style-loader','css-loader']
      },
    ]
  }
}
