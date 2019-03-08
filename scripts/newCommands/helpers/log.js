const chalk = require('chalk')

function logWebpackWarnings(warnings) {
	if (warnings.length) {
		console.log(chalk.yellow('Compiled with warnings\n'))
		console.log(warnings.join('\n\n'))
		console.log(
			'\n Search for the ' +
			chalk.underline(chalk.yellow('keywords')) +
			' to learn more about each warning'
		)
		console.log(
			'To ignore, add ' +
			chalk.cyan('//eslint-disable-next-line') +
			' to the line before\n'
		)
	} else {
		console.log(chalk.green('Compiled successfully.\n'))
	}
}


module.exports = {
	logWebpackWarnings
}
