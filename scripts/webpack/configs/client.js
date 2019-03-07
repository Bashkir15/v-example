const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const ExtractPlugin = require('mini-css-extract-plugin')

const base = require('./base')

module.exports = function client(options) {
	const { paths } = options
	const env = { ...options.env, server: false }
	const config = base(env, options)

	// If you want to do type-script checking with ts-loader instead
	// you'll need to include the FormTsCheckerWebpackPlugin

	if (env.dev) {
		config.entry = [
			require.resolve('razzle-dev-utils/webpackHotDevClient'),
			paths.clientEntry
		]
		config.output = {
			chunkFilename: '[name].js',
			filename: '[name].js',
			libraryTarget: 'var',
			pathinfo: true,
			path: paths.clientBuild,
			publicPath: paths.clientPublicPath
		}

		config.devServer = {
			clientLogLevel: 'none',
			compress: true,
			disableHostCheck: true,
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			historyApiFallback: {
				disableDotRule: true
			},
			host: 'localhost',
			hot: true,
			noInfo: true,
			port: 3001,
			quiet: true,
			watchOptions: {
				ignored: /node_modules/
			}
		}

		config.plugins = [
			...config.plugins,
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]

		return config
	}

	config.entry = {
		main: paths.clientEntry
	}
	config.output = {
		chunkFilename: '[chunkhash].js',
		filename: '[chunkhash].js',
		libraryTarget: 'var',
		path: paths.clientBuild,
		publicPath: paths.clientPublicPath
	}

	config.plugins = [
		...config.plugins,
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	]

	config.optimization = {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				terserOptions: {
					compress: {
						ecma: 6
					}
				}
			})
		]
	}

	return config
}
