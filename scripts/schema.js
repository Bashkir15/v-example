const options = [
	{
		name: 'analyze',
		type: Boolean
	},
	{
		name: 'client',
		type: Boolean
	},
	{
		name: 'server',
		type: Boolean
	}
]

module.exports = {
	watch: {
		description: 'Run the server and client together in dev mode',
		options
	}
}
