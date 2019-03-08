const { createConfig } = require('../../webpack')
const { compileWebpack, createCompiler, getWebpackOutput } = require('./compile')

function pickBuildTarget(options) {
	if (!!options.client) {
		return createConfig({ ...options, client: true })
	}
	if (!!options.server) {
		return createConfig({ ...options, server: true })
	}

	return [
		createConfig({ ...options, client: true }),
		createConfig({ ...options, server: true })
	]
}

async function handleBuild(options) {
	const buildTarget = pickBuildTarget(options)
	// multi-compiler build
	if (Array.isArray(buildTarget)) {
		const [clientConfig, serverConfig] = buildTarget
		compileWebpack(clientConfig, (resolve, reject, stats, clientWarnings) => {
			console.log(chalk.green('Client Compiled successfully'))
			console.log('Compiling server...')
			createCompiler(serverConfig, (err, serverStats) => {
				console.log(chalk.green('Server compiled successfully'))
				const warnings = getWebpackOutput(resolve, reject, err, serverStats)
				return resolve({
					stats,
					warnings: { ...clientWarnings, ...warnings }
				})
			})
		})
	} else {
		console.log(`Compiling ${buildTarget.name}`)
		const result = await compileWebpack(buildTarget)
		console.log(chalk.green(`${buildTarget.name} compiled successfully`))
		return result
	}
}

module.exports = {
	handleBuild,
	pickBuildTarget
}
