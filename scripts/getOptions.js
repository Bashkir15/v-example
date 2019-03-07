const path = require('path')
const root = path.resolve(__dirname, '..')
const resolveWith = relative => path.resolve(root, relative)
const env = require('std-env')

const paths = {
	clientEntry: resolveWith('src/index.ts'),
	serverEntry: resolveWith('server/server.ts'),
	clientOutput: resolveWith('build/client'),
	serverOutput: resolveWith('build/server')
}

// Get these from process.argv.slice()
module.exports = function getOptions() {
	return {
		env,
		paths
	}
} 
