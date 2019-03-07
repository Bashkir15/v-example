const webpack = require('webpack')

module.exports = function createCompiler(config) {
	let compiler
	try {
		compiler = webpack(config)
	} catch (err) {
		console.error(err)
		process.exit(1)
	}

	return compiler
}
