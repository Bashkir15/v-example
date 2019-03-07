const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const { emptyDir } = require('fs-extra')
const { createConfig, createCompiler } from '../webpack'
const { getPreviousBuildSize, printCurrentBuildSize } = require('./helpers/measure')

function createBuilds(options) {
	const clientConfig = createConfig({ ...options, client: true })
	const serverConfig = createConfig({ ...options, server: true })

	return new Promise((resolve, reject) => {
		createCompiler(clientConfig, (err, clientStats) => {
			if (err) {
				return reject(err)
			}

			const clientMessages = formatWebpackMessages(clientStats.toJson({}, true))
			if (clientMessages.errors.length) {
				return reject(new Error(clientMessages.errors.join('\n\n')))
			}

			createCompiler(serverConfig, (err, serverStats) => {
				if (err) {
					reject(err)
				}

				const serverMessages = formatWebpackMessages(
					serverStats.toJson({}, true)
				)
				if (serverMessages.errors.length) {
					return reject(new Error(serverMessages.errors.join('\n\n')))
				}

				return resolve({
					stats: clientStats,
					warnings: { ...clientMessages.warning, ...serverMessages.warning }
				})
			})
		})
	})
}

async function build(options) {
	try {
		const previousSize = await getPreviousBuildSize(options.paths.clientOutput)
		await emptyDir(paths.build)
		const { stats, warnings } = await createBuilds(options)

		if (warnings.length) {

		} else {
			console.log('Compiled successfully')
		}

		await printCurrentBuildSize({
			prev: previousSize,
			path: options.paths.clientOutput,
			stats
		})
		console.log()
	} catch (err) {
		console.error((err.message || err) + '\n')
		process.exit(1)
	}
}

module.exports = build
