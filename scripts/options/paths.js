const path = require('path')

const root = path.resolve(__dirname, '..')
const resolveWith = relative => path.resolve(root, relative)

module.exports = {
	clientEntry: resolveWith('src/index.ts'),
	serverEntry: resolveWith('server/server.ts'),
	clientOutput: resolveWith('build/client'),
	serverOutput: resolveWith('build/server')
}
