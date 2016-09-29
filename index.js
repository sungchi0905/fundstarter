var express = require('express')
var app = express()
var fs = require("fs");

app.set('port', (process.env.PORT || 8080))
//app.use(express.static(__dirname + '/public'))

//__dirname returns the directory that the currently executing script is in.

app.get('/', function(request, response) {

    var fileName = "public/index.html";
    // Non-blocking
    fs.readFile(fileName, function(err, data){
        response.send(data.toString());
    });
/* sends an entire HTTP response to the client,                                                                                                                                     
 including headers and content,                                                                                                                                                     
 which is why you can only call once*/


})

app.listen(app.get('port'), function() {
  console.log("Node app is running at :" + app.get('port'))
})
