const fs = require('fs'),
	path = require('path')
async function copyDirectory(src, dest) {
	let srcpath = path.join(__dirname, src),
		destpath = path.join(__dirname, dest)
	await fs.promises.rm(destpath, {force: true, recursive: true})
	await fs.promises.mkdir(destpath, {recursive: true})
	try {for (const file of await fs.promises.readdir(srcpath)) {await fs.copyFile(path.join(srcpath, file), path.join(destpath, file), (err)=>{if(err) throw err})}}
	catch(err) {console.error(err)}
}
copyDirectory('files', 'files-copy')