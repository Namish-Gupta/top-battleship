const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// We use merge() to combine the common configuration with these development-specific settings.
module.exports = merge(common, {
  // Defines the mode for built-in Webpack optimizations. 
  // 'development' provides unminified code and better error tracing in the browser console.
  mode: 'development',
  
  // Source maps map your compiled, bundled code back to your original source code.
  // 'inline-source-map' is excellent for debugging as it pinpoints the exact file and line of an error.
  devtool: 'inline-source-map',
  
  // Configuration for the Webpack Dev Server to serve files and enable live reloading.
  devServer: {
    static: './dist',
    // Enable hot module replacement for seamless live-updating.
    hot: true,
  },
});