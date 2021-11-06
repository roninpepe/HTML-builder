const fs = require('fs'),
	path = require('path'),
	process = require('process'),
	readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: '> '
	}),
	exit=()=>process.exit(0),
	fpath = path.join(__dirname, 'text.txt')


console.log('< Hi!')
rl.prompt()
rl.on('line', (line) => {
	if(line.trim() == 'exit') exit()
	fs.open(fpath, 'r', (err, fd) => {
		if(err){
			fs.writeFile(fpath, line, (err) => {if(err) console.log(err)})
		} else {
			fs.appendFile(fpath, "\r\n" + line, (err) => {if(err) console.log(err)})
		}
	})
	rl.prompt()
})
rl.on('SIGINT', ()=>{
	readline.clearLine(process.stdout, 0)
	process.stdout.write('\r> exit\n')
	exit()
})
process.on('exit', ()=>{console.log('< Bye!')})