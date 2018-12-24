var SRC_DIR = __dirname + '/client/src/';
var DIST_DIR = __dirname + '/client/dist';

module.exports = {
    entry: SRC_DIR + 'index.jsx',
    output: {
      filename: 'bundle.js',
      path: DIST_DIR
    },
    module: {
      rules: [
        {
            test: [/\.jsx$/],
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

//    module.exports = {
//     entry: __dirname + '/client/src/index.jsx',
//     module: {
//       rules: [
//         {
//           test: [/\.jsx$/],
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-react', '@babel/preset-env']
//             }
//           }
//         }
//       ]
//     },
//     output: {
//       filename: 'bundle.js',
//       path: __dirname + '/client/dist'
//     }
//   };