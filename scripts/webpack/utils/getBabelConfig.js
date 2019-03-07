module.exports = function getBabelConfig({ server }) {
	return {
		presets: [
			['@babel/env', {
				modules: !!server ? 'commonjs' : false
			}],
			'@babel/typescript'
		],
		plugins: []
	}
}
