module.exports = function getOptionsFromArgs(args) {
	return args.reduce((acc, curr) => ({
		...acc,
		[curr]: true
	}), {})
}
