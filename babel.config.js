module.exports = {
  // Presets act as a collection of plugins. 
  // @babel/preset-env allows us to use the latest JavaScript syntax (ES6+) 
  // without needing to micromanage which syntax transforms are required by the current Node environment.
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};