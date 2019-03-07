const path = require('path')
const root = path.resolve(__dirname, '..')
const resolveWith = relative => path.resolve(root, relative)
const env = require('std-env')

const paths = {
	// This will be your paths for your app
}

// Get these from process.argv.slice()
module.exports = function getOptions() {
	return {
		env,
		paths
	}
} 
