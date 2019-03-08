const chalk = require('chalk')
const webpack = require('webpack')
const formatMessages = require('react-dev-utils/formatWebpackMessages')

function createCompiler(config, cb) {
	let compiler
	try {
		compiler = webpack(config)
	} catch (err) {
		console.error('Failed to compile', err)
		process.exit(1)
	}

	if (cb && typeof cb === 'function') {
		compiler.run((err, stats) => {
			cb(err, stats)
		})
	} else {
		return compiler
	}
}

function getWebpackOutput(resolve, reject, err, stats) {
	if (err) {
		reject(err)
	}

	const { errors, warnings } = formatMessages(stats.toJson({}, true))
	if (errors.length) {
		return reject(new Error(errors.join('\n\n')))
	}

	if (
		process.env.CI &&
		(typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
		warnings.length
	) {
		console.log(
			chalk.yellow(
				'\nTreating warnings as errors because process.env.CI = true\n'
			)
		)
		return reject(new Error(warnings.join('\n\n')))
	}

	return warnings
}

function compileWebpack(config, cb) {
	return new Promise((resolve, reject) => {
		createCompiler(config, (err, stats) => {
			const warnings = getWebpackOutput(resolve, reject, err, stats)
			if (cb && typeof cb === 'function') {
				cb(resolve, reject, stats, warnings)
			} else {
				resolve({
					stats,
					warnings
				})
			}
		})
	})
}


module.exports = {
	compileWebpack,
	getWebpackOutput,
	createCompiler
}
