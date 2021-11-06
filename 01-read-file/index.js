const fs = require('fs'),
	path = require('path'),
	process = require('process')
fs.createReadStream(path.join(__dirname, 'text.txt')).pipe(process.stdout)