const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      'webSrc': path.resolve(__dirname, '../code/web/src'),
      'serverSrc': path.resolve(__dirname, '../code/server/src'),
      'shared': path.resolve(__dirname, '../code/shared'),
      '~': path.resolve(__dirname, '..'),
    },
  },
}
