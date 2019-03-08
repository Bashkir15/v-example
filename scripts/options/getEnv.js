const path = require('path')
const { existsSync } = require('fs-extra')
const { getAppDir } = require('./getUrils')
const paths = require('./paths')

// Make sure that including paths.js after env.js will read .env variables

delete require.cache[require.resolve('./paths')]

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {

}

const dotenvFiles = [
	`${paths.dotenv}.${NODE_ENV}.local`,
	`${paths.dotenv}.${NODE_ENV}`,
	`${paths.dotenv}.local`,
	paths.dotenv
]

dotenvFiles.forEach(file => {
	if (existsSync(file)) {
		require('dotenv').config({
			path: file
		})
	}
})

const appDir = getAppDir()
const nodePath = (process.env.NODE_PATH || '')
	.split(path.delimiter)
	.filter(folder => folder && !path.isAbsolute(folder))
	.map(folder => path.resolve(appDir, folder))
	.join(path.delimiter)


function getClientEnv(options) {
	const raw = Object.keys(process.env)
		.reduce((env, key) => {
			env[key] = process.env[key]
			return env
		}, {
			HOST: process.env.HOST || options.host || 'localhost',
			NODE_ENV: process.env.NODE_ENV || 'development',
			PORT: process.env.PORT || options.port || 3000,
		})

	const stringified = Object.keys(raw).reduce((env, key) => ({
		...env,
		[`process.env.${key}`]: JSON.stringify(raw[key])
	}), {})

	return { raw, stringified }
}

module.exports = {
	getClientEnv,
	nodePath
}
