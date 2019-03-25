var XelkReq = require('./P3_Req.js');
var http = require('http');
var url = require('url')

function process_url(input) {
    var fileExtensions = XelkReq.extAllowed(); //need to iterate over this to get first subelement of each element

    // regex split up into parts
    var localFileString = "^(\/LOCALFILE\/)";
    var localExecString = "^(\/LOCALEXEC\/)";
    var remoteFileString = "^(\/REMOTEFILE\/)";
    var remoteExecString = "^(\/REMOTEEXEC\/)";
    var filepathString = "([a-zA-Z0-9\/\~]*)+";
    var hostString = "[a-zA-Z0-9\.]+";
    var cgipathString = "^[a-zA-Z0-9\/]+\.cgi$";

    // temp extAllowed; can be removed
    var extAllowed = "((\.html)|(\.mp3)|(\.jpg))";

    // example of creating new regex and testing it with a string
    var regex1 = new RegExp(localFileString + filepathString + extAllowed);
    var string1a = "/LOCALFILE/myfile.html";
    var string1b
    regex1.test(string1a); // this one is true
    regex1.test(string1b); // this one is false

    // var localFileRegExp = new RegExp(^(\/)(LOCALFILE\/)(www)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.(html)(:[0-9]{1,5})?(\/.*)?$^(\/)$)
    // var remoteFileRegExp = new RegExp(^(\/)(REMOTEFILE\/)(www)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.(html)(:[0-9]{1,5})?(\/.*)?$^(\/)$)
    //both of these ^ aren't totally correct

}
function getURL(request, response) {
    var xurl = request.url;
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello, World! You requested the following URL: '+xurl+'\n');
    console.log("Hey, the client requested the URL: ("+xurl+")");
    if (urlaccepted){

    }
}
function serveFile() {

}

function pullAndSendFile() {

}

function pullAndSendOutput() {

}

function generatePort() {
    var lower = XelkReq.LowerPort()
    var upper = XelkReq.UpperPort()

    return Math.floor(Math.random() * (upper - lower)) + lower
}

var server = http.createServer(getURL);

try{
    server.on('error', (e) => {
        console.log("Error! " +e.code);
    }); // server.on()
    port = generatePort();
    whereToListen = "test";
    server.listen(port,whereToListen);
    console.log("Listening.....");
} catch(error) {
    console.log("There was an error!" +error);
}
