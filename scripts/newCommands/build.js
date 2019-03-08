const webpack = require('webpack')
const chalk = require('chalk')
const { handleBuild } = require('./helpers/build')
const { clean, copyPublic, fileSizeFactory } = require('./helpers/files')
const { logWebpackWarnings } = require('./helpers/log')

async function build(options) {
	try {
		const measureSizes = await fileSizeFactory(options.paths.build)
		await clean(options.paths.build)
		await copyPublic(options.paths)

		const { stats, warnings } = await handleBuild(options)
		logWebpackWarnings(warnings)

		console.log('File sizes after gzip:\n')
		await measureSizes(stats)
		console.log()
	} catch (err) {
		console.log(chalk.red('Failed to compile\n'))
		console.log((err.message || err) + '\n')
		process.exit(1)
	}
}

module.exports = build
