myArgs = process.argv.slice(2)

const scraping = require('./utils/scraping');
const convert = require('./utils/convert');
const name = convert(myArgs[0]); 
let date = null;

if (myArgs[2] !== undefined) {
	date = myArgs[2]
}

scraping(date, name, myArgs[1]);
