import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export default{
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname,'src/index'),
  ],
  devServer:{
    noInfo: false,
    debug: true
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname,'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins:[
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
      inject: true
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
