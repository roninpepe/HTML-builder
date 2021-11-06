const
fs = require('fs'),
path = require('path')
async function mergeStyles(src, dest, bundlename) {
	let
	srcdir = path.join(__dirname, src),
	destdir = path.join(__dirname, dest),
	bundle = path.join(destdir, bundlename+'.css')
	fs.writeFile(bundle, '', (err) => {if(err) console.log(err)})
	try {for (const file of await fs.promises.readdir(srcdir, {withFileTypes: true})) {
		let filepath = path.join(srcdir, file.name)
		if (path.extname(filepath) == '.css' && file.isFile()) {await fs.createReadStream(filepath).pipe(await fs.createWriteStream(bundle, {flags: 'a'}))}
	}}
	catch(err) {console.error(err)}
}
async function copyDirectory(src, dest) {
	let
	srcpath = path.join(__dirname, src),
	destpath = path.join(__dirname, dest)
	await fs.promises.mkdir(destpath, {recursive: true})
	try {for (const file of await fs.promises.readdir(srcpath)) {await fs.copyFile(path.join(srcpath, file), path.join(destpath, file), (err)=>{if(err) throw err})}}
	catch(err) {console.error(err)}
}
async function buildPage(prodpath, srcpath, assetspath, stylespath, stylename, componentsfolder, pagename, template){
	await fs.promises.rm(path.join(__dirname, prodpath), {force: true, recursive: true})
	await fs.promises.mkdir(path.join(__dirname, prodpath), {recursive: true})
	await fs.promises.mkdir(path.join(__dirname, prodpath + '/' + assetspath), {recursive: true})
	await copyDirectory(assetspath + '/fonts', prodpath + '/' + assetspath + '/fonts')
	await copyDirectory(assetspath + '/img', prodpath + '/' + assetspath + '/img')
	await copyDirectory(assetspath + '/svg', prodpath + '/' + assetspath + '/svg')
	await mergeStyles(stylespath, prodpath, stylename)
	let
	pagepath = path.join(__dirname, prodpath + '/' + pagename + '.html'),
	templatepath = path.join(__dirname, template + '.html')
	components = [],
	componentsdata = [],
	componentspath = path.join(__dirname, componentsfolder),
	rawdata = await fs.promises.readFile(templatepath, 'utf8', (err, data) => data)
	for (const file of await fs.promises.readdir(componentspath, {withFileTypes: true})) {if (file.isFile() && path.extname(path.join(componentspath, file.name)) == '.html') {
		let
		filepath = path.join(componentspath, file.name),
		extname = path.extname(filepath),
		basename = path.basename(filepath, extname)
		componentsdata.push(await fs.promises.readFile(filepath, 'utf8', (err, data) => data))
		components.push(basename)
	}}
	function handler() {
		if(componentsdata.length < 3 && !rawdata) {handler()}
		else {
			components.forEach((e, i) => {rawdata = rawdata.replace(new RegExp('{{' + e + '}}', 'g'), componentsdata[i])})
			fs.writeFile(pagepath, rawdata, (err) => {if(err) console.log(err)})
		}
	}
	handler()
}
buildPage('project-dist', '', 'assets', 'styles', 'style', 'components', 'index', 'template')