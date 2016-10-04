var http = require("http");
var fs = require("fs");
port = process.argv[2] || 8080;

//web server object
http.createServer(function (request, response) { 
    var fileName = "public/index.html";
    // Non-blocking
    /*fs.readFile(fileName, function(err, data){
        //response.send(data.toString());
	if(err) {        
	    response.writeHead(500, {"Content-Type": "text/plain"});
	    response.write(err + "\n");
	    response.end();
	    return;
	    }
	  response.writeHead(200);
	  response.write(data, "binary");
	  response.end();
    });*/
    // Blocking
    /*var data = fs.readFileSync(fileName);
      response.writeHead(200);
      response.write(data, "binary");
      response.end();*/
    // Part 2
    fs.exists(fileName, function(exists) {
	  if (exists) {
	            fs.stat(fileName, function(error, stats) {
			    fs.open(fileName, "r", function(error, fd) {
				var buffer = new Buffer(stats.size);

				fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
				          var data = buffer.toString("utf8", 0, buffer.length);
				          response.writeHead(200);
				      response.write(data, "binary");
				      response.end();
				          fs.close(fd);
				        });
				  });
			  });
	              }
	});
    
}).listen(process.env.PORT || 8080);


console.log("Node app is running at\n  =>:" + 8080 + "/\nCTRL + C to shutdown");
