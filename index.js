var express = require('express')
var app = express()
var fs = require("fs");

app.set('port', (process.env.PORT || 8080))
//app.use(express.static(__dirname + '/public'))

//__dirname returns the directory that the currently executing script is in.

app.get('/', function(request, response) {

    var fileName = "public/index.html";
    // Non-blocking
    /*fs.readFile(fileName, function(err, data){
        response.send(data.toString());
    });*/

    // Blocking
    /* var data = fs.readFileSync(fileName);
    response.send(data.toString());
    */
    // Part 2
    fs.exists(fileName, function(exists) {
	  if (exists) {
	            fs.stat(fileName, function(error, stats) {
			    fs.open(fileName, "r", function(error, fd) {
				var buffer = new Buffer(stats.size);

				fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
				          var data = buffer.toString("utf8", 0, buffer.length);
				          response.send(data.toString());
				          fs.close(fd);
				        });
				  });
			  });
	              }
	});
/* sends an entire HTTP response to the client,                                                                                                                                     
 including headers and content,                                                                                                                                                     
 which is why you can only call once*/


})

app.listen(app.get('port'), function() {
  console.log("Node app is running at :" + app.get('port'))
})
