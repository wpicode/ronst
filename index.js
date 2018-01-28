var processEnv = Object.keys(process.env);
var fs = require('fs');
var ronst = {};

module.exports= new Promise(function(resolve, reject) {

	function readLines(input, func) {
	  var remaining = '';

	  input.on('data', function(data) {
	    remaining += data;
	    var index = remaining.indexOf('\n');
	    while (index > -1) {
	      var line = remaining.substring(0, index);
	      remaining = remaining.substring(index + 1);
	      func(line);
	      index = remaining.indexOf('\n');
	    }
	  });

	  input.on('end', function() {
	    if (remaining.length > 0) {
	    	remainingArr = remaining.split('=');
	      ronst[remainingArr[0]] = remainingArr[1];
	    } else {	
	    	for (var i = processEnv.length - 1; i >= 0; i--) {
				ronst[processEnv[i]] = process.env[processEnv[i]];
			}
	    	resolve(ronst);
	    }
	  });
	}



	var input = fs.createReadStream('../../.env');
	readLines(input, func);


});