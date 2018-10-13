'use strict';

const fs = require('fs');
const path = require('path');

if (process.argv[2] === 'upgrade')
	return upgrade();

if (process.argv.length < 4)
	return usage();

if (process.argv[2] === 'add') {
	if (process.argv[4] && fs.existsSync(linkPath(process.argv[4])))
		return console.log('this short-link already exists!');
	let code = process.argv[4] || generateRandomName();
	writeLink(code, process.argv[3]);
	console.log(`generated short-link: ${code} -> ${process.argv[3]}`);
	return;
} else if (process.argv[2] === 'remove') {
	let file = linkPath(process.argv[3]);
	if (!fs.existsSync(file))
		return console.log('this short-link does not exist!');
	fs.unlinkSync(file);
	console.log(`deleted short-link: ${process.argv[3]}`);
	return;
} else {
	return usage();
}

function writeLink(short, url) {
	let body = `---
layout: divert
code: ${short}
redir: ${url}
---
`;
	fs.writeFileSync(linkPath(short), body, 'utf8');
}

function linkPath(s) {
	return path.join(__dirname, '_diversions', s + '.md');
}

function generateRandomName() {
	let code = Math.random().toString(36).substr(2, 5);
	while (fs.existsSync(linkPath(code))) // in the rare case we have the exact same code
		code = Math.random().toString(36).substr(2, 5); // generates random 5 character thing
	return code;
}

function usage() {
	console.log('divert v2 - links helper');
	console.log('usage:')
	console.log('  $ node divert.js add [url] <vanity link (optional)>');
	console.log('  $ node divert.js remove [vanity link]');
	console.log('upgrading from v1? -- $ node divert.js upgrade');
}

function upgrade() {
	let old = path.join(__dirname, 'redir_links.js');
	if (!fs.existsSync(old))
		return console.log('fatal!: could not find old redir_links.js file to upgrade.');

	let raw = fs.readFileSync(old, 'utf8');
	let data = JSON.parse(raw.substring(raw.indexOf('{'), raw.length-1));

	for (let k of Object.keys(data))
	{
		console.log('upgrading short-link: ' + k);
		writeLink(k, data[k]);
	}

	console.log('success! upgraded from v1 to new v2 format. you may now safely delete the redir_links.js file.');
}