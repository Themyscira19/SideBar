var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.join(__dirname, '/Client/src');
var DIST_DIR = path.join(__dirname, '/Client/dist');

module.exports = {
    entry: SRC_DIR + '/index.jsx',
    output: {
      filename: 'bundle.js',
      path: DIST_DIR
    },
    module: {
      rules: [
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
              }
            }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
   };

