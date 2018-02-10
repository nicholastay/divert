'use strict';

const fs = require('fs');

if (process.argv.length < 4)
	return usage();

if (!fs.existsSync('./redir_links.js'))
	fs.writeFileSync('./redir_links.js', 'window.nexdivert = {};');
let raw = fs.readFileSync('./redir_links.js', 'utf8');
let data = JSON.parse(raw.substring(raw.indexOf('{'), raw.length-1));

if (process.argv[2] === 'add') {
	if (process.argv[4] && data.hasOwnProperty(process.argv[4]))
		return console.log('this short-link already exists!');
	let code = process.argv[4] || generateRandomName();
	data[code] = process.argv[3];
	console.log(`generated short-link: ${code} -> ${process.argv[3]}`);
	return save();
} else if (process.argv[2] === 'remove') {
	if (!data.hasOwnProperty(process.argv[3]))
		return console.log('this short-link does not exist!');
	delete data[process.argv[3]];
	return save();
} else {
	return usage();
}

function save() {
	fs.writeFileSync('./redir_links.js', `window.nexdivert = ${JSON.stringify(data, null, '\t')};`);
}

function generateRandomName() {
	let code = Math.random().toString(36).substr(2, 5);
	while (data.hasOwnProperty(code)) // in the rare case we have the exact same code
		code = Math.random().toString(36).substr(2, 5); // generates random 5 character thing
	return code;
}

function usage() {
	console.log('divert v1 - links helper');
	console.log('usage:')
	console.log('  $ node divert.js add [url] <vanity link (optional)>');
	console.log('  $ node divert.js remove [vanity link]');
}