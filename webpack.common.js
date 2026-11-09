const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // The entry point indicates where Webpack should start building its internal dependency graph.
  entry: './src/index.js',
  
  // Loaders allow Webpack to process other types of files and convert them into valid modules.
  module: {
    rules: [
      {
        // This Regular Expression targets all files ending in .css
        test: /\.css$/i,
        // 'style-loader' injects the parsed CSS into the DOM via a <style> tag.
        // 'css-loader' interprets @import and url() like import/require() and resolves them.
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  
  // Plugins perform a wider range of tasks like HTML generation.
  plugins: [
    new HtmlWebpackPlugin({
      // Generates an HTML5 file that automatically includes all webpack bundles in the body using script tags.
      template: './src/index.html',
      title: 'Battleship TDD',
    }),
  ],
};