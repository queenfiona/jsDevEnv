import path from 'path';
// import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default{
  mode: 'development',
  devtool: 'source-map', //ensures we see original code
  entry: [
    path.resolve(__dirname,'src/index'),
  ],
  devServer:{
    noInfo: false,
    debug: true
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname,'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()  //Minify JS
    ],

  },
  plugins:[
    //Eliminate duplicate packages when generating bundle

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
