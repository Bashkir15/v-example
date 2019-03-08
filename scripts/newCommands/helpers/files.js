const { copy, emptyDir } = require('fs-extra')
const {
	measureFileSizesBeforeBuild,
	printFileSizesAfterBuild 
} = require('react-dev-utils/FileSizeReporter')

async function fileSizeFactory(path) {
	const previousSizes = await measureFileSizesBeforeBuild(path)
	return stats => printFileSizesAfterBuild(stats, previousSizes, path)
}

function clean(path) {
	return emptyDir(path)
}

function copyPublic(paths) {
	return copy(paths.public, paths.publicOutput, {
		dereference: true,
		filter: file => file !== paths.template
	})
}

module.exports = {
	clean,
	copyPublic,
	fileSizeFactory
}
