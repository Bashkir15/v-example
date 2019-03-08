const webpack = require('webpack')
const DevServer = require('webpack-dev-server-speedy')
const { pickBuildTarget } = require('./helpers/build')
const { createCompiler } = require('./helpers/compile')
const { clean } = require('./helpers/files')

process.noDeprecation = true

async function watch(options) {
	await clean(options.paths.build)

	// Specifically set client and server to false to override any
	// arguments passed as flags so we get both confgurations
	const configs = pickBuildTarget({
		...options,
		client: false,
		server: false
	})

	const [clientCompiler, serverCompiler] = configs.map(
		config => createCompiler(config)
	)

	let isWatching

	clientCompiler.plugin('done', () => {
		if (isWatching) {
			return
		}

		isWatching = serverCompiler.watch({
			quiet: true,
			stats: 'none'
		}, stats => {})
	})

	const devServer = new DevServer(clientCompiler, configs[0].devServer)
	devServer.listen(options.port || 3001, err => {
		if (err) {
			console.error(err)
		}
	})
}

module.exports = watch
