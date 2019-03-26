var XelkReq = require('./P3_Req.js');
var http = require('http');
var url = require('url')

function process_url(input) {

    // regex split up into parts
    var localFileString = "^(\/LOCALFILE\/)";
    var localExecString = "^(\/LOCALEXEC\/)";
    var remoteFileString = "^(\/REMOTEFILE\/)";
    var remoteExecString = "^(\/REMOTEEXEC\/)";
    var filepathString = "([a-zA-Z0-9\/\~]*)+";
    var hostString = "[a-zA-Z0-9\.]+";
    var cgipathString = "^[a-zA-Z0-9\/]+\.cgi$";

    var extAllowed = "(";
    XelkReq.extAllowed().forEach(function(item){
      var temp = "(\\".concat(item[0]).concat(")|");
      //console.log(temp);
      extAllowed = extAllowed.concat(temp);

    });
    extAllowed = (extAllowed.substring(0, extAllowed.length - 1)).concat(")")

    console.log(extAllowed);
    //ask chen about the differences in what this creates vs the one below
    var extAllowed = "((\.html)|(\.mp3)|(\.jpg))";
    console.log(extAllowed);

    // example of creating new regex and testing it with a string
    var regex1 = new RegExp(localFileString + filepathString + extAllowed);
    var string1a = "/LOCALFILE/myfile.html";
    var string1b = "/LOCALFILE/myfile/test.html";
    var string1c = "";
    console.log(regex1.test(string1a)); // this one is true
    console.log(regex1.test(string1b)); // this one is true
    console.log(regex1.test(string1c)); // this one is false

    //now we should know if the command was valid and if so what type it is


    // 1. return validity and type
}
function getURL(request, response) {
    var xurl = request.url;
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello, World! You requested the following URL: '+xurl+'\n');
    console.log("Hey, the client requested the URL: ("+xurl+")");
    //2. var = process_url(xurl)
    if (urlaccepted){
      //3. do something
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

var server = http.createServer(getURL).listen(8080);

//const whereToListen = 'belgarath.cs.uky.edu';
//const port = 3332;
/*
try{
    server.on('error', (e) => {
        console.log("Error! " +e.code);
    }); // server.on()
    //port = generatePort();
    //whereToListen = "cs.uky.edu:";
    server.listen(port,whereToListen);
    console.log("Listening.....");
} catch(error) {
    console.log("There was an error!" +error);
}
process_url("test")
*/
