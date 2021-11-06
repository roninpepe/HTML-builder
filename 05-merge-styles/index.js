const fs = require('fs'),
	path = require('path'),
	srcdir = path.join(__dirname, 'styles'),
	destdir = path.join(__dirname, 'project-dist')
async function mergeStyles(srcdir, destdir) {
	let bundle = path.join(destdir, 'bundle.css')
	fs.writeFile(bundle, '', (err) => {if(err) console.log(err)})
	try {for (const file of await fs.promises.readdir(srcdir, {withFileTypes: true})) {
		let filepath = path.join(srcdir, file.name)
		if (path.extname(filepath) == '.css' && file.isFile()) {await fs.createReadStream(filepath).pipe(fs.createWriteStream(await bundle, {flags: 'a'}))}
	}}
	catch(err) {console.error(err)}
}
mergeStyles(srcdir, destdir)