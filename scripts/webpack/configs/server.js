const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

const base = require('./base')

module.exports = function server(options) {
	const { paths } = options
	const env = { ...options.env, server: true }
	const config = base(env, options)

	config.node = {
		__console: false,
		__dirname: false,
		__filename: false
	}

	config.externals = [
		nodeExternals({
			whitelist: [
				env.dev ? 'webpack/hot/poll?300' : null,
				/\.(eot|woff|woff2|ttf|otf)$/,
				/\.(svg|png|jpg|jpeg|gif|ico)$/,
				/\.(mp4|mp3|ogg|swf|webp)$/,
				/\.(css|scss|sass|sss|less)$/
			].filter(Boolean)
		})
	]

	config.entry = [paths.serverEntry]
	config.output = {
		filename: 'server.js',
		libraryTarget: 'commonjs2',
		path: paths.serverOutput,
		publicPath: env.dev ? 'http://localhost:3001/' : '/'
	}

	config.plugins = [
		...config.plugins,
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	]

	if (env.dev) {
		config.watch = true
		config.entry.unshift('webpack/hot/poll?300')
		config.entry.unshift('razzle-dev-utils/prettyNodeErrors')

		const nodeArgs = ['-r', 'source-map-support/register']

		if (process.env.INSPECT_BRK) {
			nodeArgs.push(process.env.INSPECT_BRK)
		} else if (process.env.INSPECT) {
			nodeArgs.push(process.env.INSPECT)
		}

		config.plugins = [
			...config.plugins,
			new webpack.HotModuleReplacementPlugin(),
			new StartServerPlugin({
				name: 'server.js',
				nodeArgs
			})
		]
	}

	return config
}
