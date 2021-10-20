const path = require('path');

module.exports = {
  entry: './app.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.js'],
  },
};