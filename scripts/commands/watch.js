const webpack = require('webpack')
const DevServer = require('webpack-dev-server-speedy')
const getOptions = require('../getOptions')
const { createConfig, createCompiler } = require('../webpack')

process.noDeprecation = true

function watch() {
	// Delete assets
	const options = getOptions()
	const clientConfig = createConfig({ ...options, client: true })
	const serverConfig = createConfig({ ...options, server: true })

	const clientCompiler = createCompiler(clientConfig)
	const serverCompiler = createCompiler(serverConfig)

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

	const devServer = new DevServer(clientCompiler, clientConfig.devServer)
	devServer.listen(options.port || 3001, err => {
		if (err) {
			console.error(err)
		}
	})
}

watch()



