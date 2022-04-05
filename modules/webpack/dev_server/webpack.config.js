const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js'
  },
	devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    }
	},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Title',
    }),
  ]
}
