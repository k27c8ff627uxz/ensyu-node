const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "production",
  output: {
		path: path.resolve(__dirname, 'www'),
		filename: 'main.js'
  },
	devServer: {
    static: {
      directory: path.join(__dirname, 'www')
    }
	},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Title',
    }),
  ]
}
