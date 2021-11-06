const fs = require('fs'),
	path = require('path'),
	folder = path.join(__dirname, 'secret-folder')
async function showFilesInFolder(folder) {
	try {for (const file of await fs.promises.readdir(folder,{withFileTypes: true})) {if (file.isFile()) {
		let filepath = path.join(folder, file.name),
			extname = path.extname(filepath),
			basename = path.basename(filepath, extname),
			filesize = (await fs.promises.stat(filepath)).size
		console.log(basename + ' - ' + extname.substring(1) + ' - ' + (filesize > 999 ? filesize / 1000 + ' KiB' : filesize + 'B'))	
	}}}
	catch(err) {console.error(err)}
}
showFilesInFolder(folder)