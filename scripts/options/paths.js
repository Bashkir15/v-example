const path = require('path')
const { getAppDir, getServedPath } = require('./getUrls')

const appDir = getAppDir()
const resolveWith = relative => path.resolve(appDir, relative)

const nodePaths = (process.env.NODE_PATH || '')
	.split(process.platform === 'win32' ? ';' : ':')
	.filter(Boolean)
	.filter(folder => !path.isAbsolute(folder))
	.map(resolveWith)

module.exports = {
	build: resolveWith('build'),
	dotenv: resolveWith('.env'),
	clientEntry: resolveWith('src/index.ts'),
	clientOutput: resolveWith('build/client'),
	nodePaths,
	public: resolveWith('src/public'),
	publicOutput: resolveWith('build/public'),
	servedPath: getServedPath(resolveWith('package.json')),
	serverEntry: resolveWith('server/server.ts'),
	serverOutput: resolveWith('build/server'),
	template: resolveWith('src/public/index.hbs')
}

