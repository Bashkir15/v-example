const {
	measureFileSizesBeforeBuild,
	printFileSizesAfterBuild
} = require('react-dev-utils/FileSizeReporter')

function getPreviousBuildSize(path) {
	return measureFileSizesBeforeBuild(path)
}

function printCurrentBuildSize({ path, prev, stats }) {
	return printFileSizesAfterBuild(stats, prev, path)
}
