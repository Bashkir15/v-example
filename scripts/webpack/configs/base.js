const webpack = require('webpack')
const path = require('path')
const ExtractPlugin = require('mini-css-extract-plugin')

const { getBabelConfig, getCssConfig } = require('../utils')

module.exports = function base(env, options) {
	const { paths } = options

	const babelOptions = getBabelConfig(env)
	const cssOptions = getCssConfig(env)

	return {
		mode: env.dev ? 'development' : 'production',
		target: env.server ? 'node' : 'web',
		module: {
			strictExportPresence: true,
			rules: [
				{
					test: /\.ts$/,
					use: {
						loader: 'babel-loader',
						options: babelOptions
					}
				},
				{
					test: /\.css$/,
					use: cssOptions
				},
				{
					test: /\.scss$/,
					use: [...cssOptions, 'sass-loader']
				}
			]
		},
		resolve: {
			extensions: ['.js', '.ts'],
			alias: {
				'webpack/hot/poll': require.resolve('webpack/hot/poll')
			}
		},
		plugins: [
			(!env.dev && !env.server) && new ExtractPlugin({
				allChunks: true,
				chunkFilename: '[contenthash:8].chunk.css',
				filename: '[contenthash:8].chunk.css'
			})
		].filter(Boolean)
	}
}
