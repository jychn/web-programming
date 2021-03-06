/* CS 316
   Project 3
   by William Storms and Jia-Yi Chen
   March 27, 2019
*/

// Including modules and methods required for project
var XelkReq = require('/homes/paul/HTML/CS316/P3_Req.js');
var http = require('http');
var url = require('url');
var fs = require('fs');
var exec = require('child_process').exec;


// Defines the generated port and hostname
const port = generatePort();
const hostname = 'iris.cs.uky.edu';


function getURL(request, response) {
/* Function that obtains client input and responds according to whether request
   has been accepted or rejected. If accepted, accesses or executes requested
   file. Rejects if file does not exist. */

    var xurl = request.url;
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    var type = processURL(xurl);
    var status;

    // Check if URL is valid and set corresponding response
    if (type == 0) {
        status = "REJECTED";
        response.write("Your URL is invalid and not accepted: " + xurl + "\n");
        response.end();
    }
    else {
        status = "ACCEPTED";
    }
    console.log("Hey, the client requested the URL: (" + xurl + ") " + status);

    // If not rejected, deploy function corresponding to type of URL request
    if (type == 1) { // Accessing local file
        serveFile(xurl, response);
    }
    else if (type == 2) { // Executing local CGI file
        serveCGI(xurl, response);
    }
    else if (type == 3) { // Accessing remote file
        pullandsendFile(xurl, response);
    }
    else if (type == 4) { // Executing remote CGI file
        pullandsendOutput(xurl, response);
    }
}


function processURL(inputURL) {
/* Function that takes in URL input and ensures it is a valid HTTP requests by
   checking the format with regular expressions using .test() method. */

    // RegEx strings split up into parts
    // XelkReq.extAllowed() used to form a separate extensions variable string
    var extAllowed = "(";
    XelkReq.extAllowed().forEach(function(item) {
        var temp = "(\\".concat(item[0]).concat(")|");
        extAllowed = extAllowed.concat(temp);
    });
    extAllowed = (extAllowed.substring(0, extAllowed.length - 1)).concat(")$");
    var filepathString = "[a-zA-Z0-9\/\~]+" + extAllowed;
    var hostString = "[a-zA-Z0-9\.]+\/";
    var cgipathString = "[a-zA-Z0-9\/\~]+\.cgi$";

    var localFileString = "^(\/LOCALFILE\/)" + filepathString;
    var localExecString = "^(\/LOCALEXEC\/)" + cgipathString;
    var remoteFileString = "^(\/REMOTEFILE\/)" + hostString + filepathString;
    var remoteExecString = "^(\/REMOTEEXEC\/)" + hostString + cgipathString;

    // Initializing regular expressions for each type of input
    var localFileRegEx = new RegExp(localFileString);
    var localExecRegEx = new RegExp(localExecString);
    var remoteFileRegEx = new RegExp(remoteFileString);
    var remoteExecRegEx = new RegExp(remoteExecString);

    // Initilizing type to return value based on type of URL
    var type = 0;

    // Test input with each regular expressions to identify type of URL
    if (localFileRegEx.test(inputURL) == true) {
        type = 1;
    }
    else if(localExecRegEx.test(inputURL) == true) {
        type = 2;
    }
    else if(remoteFileRegEx.test(inputURL) == true) {
        type = 3;
    }
    else if(remoteExecRegEx.test(inputURL) == true){
        type = 4;
    }
    // If it doesn't fall into any of these cases, remains 0
    return type;
}


function truncateURL(inputURL) {
/* Function removes type of URL description from client URL by removing
   characters until reaching the next '/'. */

    var currChar = "";
    var i = 1; // Start at first 'slash' in client URL
    while (currChar != '/') {
        currChar = inputURL[i];
        i++;
    }
    var newURL = inputURL.substring(i, inputURL.length); // Truncate url

    return newURL;
}


function executePath(inputPath, response) {
/* Function executes given path and writes corresponding output to server and
   client in both success and error. */

    // Execute file using callback function and output to server and client
    exec(inputPath, function (err, stdout, stderr) {
        if (err) {
            response.statusCode = 403;
            console.log("Error executing file: " + err);
            response.write("Error executing file: " + stderr);
        }
        else {
            response.write(stdout);
        }
        response.end();
    });
}


function serveFile(xurl, response) {
/* Function creates a file path using XelkReq.fileDir() + requested URL and uses
   readFile() to access the file. */

    // Truncate URL
    var truncatedURL = "\/" + truncateURL(xurl);

    // Creating file path
    var filepath = XelkReq.fileDir().concat(truncatedURL);

    // Check to see if file exists
    if (fs.existsSync(filepath)) {
        // Read file using callback function and writing output to client
        fs.readFile(filepath, function read(err, data) {
            if (err) {
                response.statusCode = 403;
                console.log("Error reading file: " + err);
                response.write("Error reading file: " + err);
            }
            else {
                response.write(data);
            }
            response.end();
        });
    }
    else {
        response.statusCode = 403;
        console.log("The URL is valid but the requested file does not exist.");
        response.write("Your URL is valid but the file does not exist.\n")
        response.end();
    }
}


function serveCGI(xurl, response) {
/* Function creates a file path using XelkReq.execDir() + requested URL and uses
   exec() to execute the CGI file. */

    // Truncate URL
    var truncatedURL = "\/" + truncateURL(xurl);

    // Create file path
    var execpath = XelkReq.execDir().concat(truncatedURL);

    if (fs.existsSync(execpath)) {
        // Execute path
        executePath(execpath, response);
    }
    else {
        response.statusCode = 403;
        console.log("The URL is valid but the requested file does not exist.");
        response.write("Your URL is valid but the file does not exist.\n")
        response.end();
    }
}


function pullandsendFile(xurl, response) {
/* Function creates a curl command using requested URL and uses executePath() to
   execute the curl command. */

    // Truncate URL
    var truncatedURL = truncateURL(xurl);

    // Create curl command using client URL
    var execpath = "/usr/bin/curl -s -S " + truncatedURL;

    // Execute path
    executePath(execpath, response);
}


function pullandsendOutput(xurl, response) {
/* Function creates curl command using requested URL and uses executePath() to
   execute the curl command. */

    // Truncate URL
    var truncatedURL = truncateURL(xurl);

    // Create curl command using client URL
    var execpath = "/usr/bin/curl -s -S " + truncatedURL;

    // Execute path
    executePath(execpath, response);
}


function generatePort() {
/* Function generates a random port number using XelkReq.LowerPort() and
   XelkReq.UpperPort(), and then returns the port value. */
    var lower = XelkReq.LowerPort();
    var upper = XelkReq.UpperPort();

    return Math.floor(Math.random() * (upper - lower)) + lower;
}


// Creates a server to listen given a port and hostname, and uses a callback
// function to output success or error.
var server = http.createServer(getURL);
server.listen(port, hostname, function(err) {
    if (err) {
        console.log("Error starting server: " + err);
    }
    else {
        console.log("Server started. Listening on http://" + hostname + ":" + port);
    }
});
