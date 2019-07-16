
// Required modules to run the app.
var http = require('http');
var url = require('url');
var fs = require('fs');

// Hostname and port for the server.
var hostname = 'localhost';
var port = 8888;

// JSON data
var responseBody = {
    "class": "CS313",
    "name": "Paul Owens"
};

// Start the server and process data in it.
var server = http.createServer(function onRequest(req, res) {
    if (req.url == "/home") {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write("<h1>Welcome to the Home Page</h1>");
        res.end();
    } else if (req.url == "/getData") {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(responseBody));
        res.end();
    } else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.write("Page Not Found");
        res.end();
    }
});

// Listen to the port and display information to the console when running.
server.listen(port, hostname, () => {
    console.log('Server started on port ' + port);
});