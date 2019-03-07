const clientConfig = require('./client')
const serverConfig = require('./server')

module.exports = function createConfig(options) {
	const target = !!options.server ? serverConfig : clientConfig
	return target(options)
}
