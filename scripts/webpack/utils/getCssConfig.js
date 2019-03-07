const ExtractPlugin = require('mini-css-extract-plugin')
module.exports = function getCssConfig({ dev, server }) {
	return [
		(dev && !server) ? 'style-loader' : ExtractPlugin.loader,
		server ? 'css-loader/locals' : 'css-loader'
	]
}
