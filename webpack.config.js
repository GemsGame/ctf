const path = require('path');

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
           
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf|TTF)$/,
        use: [
                 {
                     loader: 'file-loader?name=../assets/font/[name].[ext]'
                 },
              
             ]
     }
    ],
  },


};
