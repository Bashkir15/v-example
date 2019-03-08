const path = require('path')
const { realpathSync } = require('fs-extra')

const envPath = process.env.PUBLIC_URL

const getAppDir = () => realpathSync(process.cwd())

const ensureSlash = (path, needsSlash) => {
	const hasSlash = path.endsWith('/')
	if (hasSlash && !needsSlash) {
		return path.substr(path, path.length - 1)
	} else if (!hasSlash && needsSlash) {
		return `${path}/`
	}
	return path
}

const getPublicUrl = appPackage => (
	envPath || require(appPackage).homepage
)

const getServedPath = appPackage => {
	const publicUrl = getPublicUrl(appPackage)
	const servedUrl = 
		envPath ||
		(publicUrl ? url.parse(publicUrl).pathname : '/')
	return ensureSlash(servedUrl, true)
}

module.exports = {
	getAppDir,
	getServedPath
}
