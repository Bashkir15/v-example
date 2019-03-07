const commandLineCommands = require('command-line-commands')
const commandLineArgs = require('command-line-args')

const getOptions = require('./options')
const schema = require('./schema')

const validCommands = Object.keys(schema)

function execute() {
	const { command, argv } = commandLineCommands(validCommands, process.argv.slice(2))
	const args = commandLineArgs(schema[command].options, { argv })
	const options = getOptions(args)

	// This is where we need to execute the scripts

}
