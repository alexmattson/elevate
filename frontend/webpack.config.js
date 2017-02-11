var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: __dirname + "/../backend/public",
    filename: "bundle.js"
  },
  node: {
    fs: "empty"
  },

  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules|build/,
      loader: 'babel-loader?cacheDirectory=true'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }
  ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
