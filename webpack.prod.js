const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

// Merge the common settings with production-specific optimizations.
module.exports = merge(common, {
  // 'production' mode automatically enables minification (TerserPlugin) and other optimization plugins.
  mode: 'production',
  
  // 'source-map' is recommended for production; it separates the source map from the bundle to keep file sizes small.
  devtool: 'source-map',
  
  // We define the output here in production to ensure strict file placement and directory cleanup.
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // Automatically cleans up the 'dist' folder before each build to remove orphaned files.
    clean: true,
  },
});