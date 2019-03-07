const env = require('std-env')
const getOptionsFromArgs = require('./getOptionsFromArgs')
const paths = require('./paths')

module.exports = function getOptions(args) {
	const cliOptions = getOptionsFromArgs(args)
	return {
		env,
		paths,
		...cliOptions
	}
}
