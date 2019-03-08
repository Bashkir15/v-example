module.exports = function getOptionsFromArgs(args) {
	if (args.length && args.length > 0) {
		return args.reduce((acc, curr) => ({
			...acc,
			[curr]: true
		}), {})
	}
	return {}
}
