var fs = require('fs');

var path = process.argv[2];
var str = fs.readFileSync(path).toString();
var cnt = 0;
var search = '\n'
for(i=0; i<str.length; i++){
	if(str[i]==search)
		cnt++;
}
console.log(cnt);