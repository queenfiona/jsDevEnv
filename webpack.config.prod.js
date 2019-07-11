import path from 'path';
import webpack from 'webpack';

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
  plugins:[
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //Minify JS
    new webpack.optimize.UglifyJsPlugin()

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
