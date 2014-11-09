//console.log(process.argv)
var out = 0;

for(argNum = 2;argNum < process.argv.length; argNum++){
	out += parseInt(process.argv[argNum]);
}
console.log(out);