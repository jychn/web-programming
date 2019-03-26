var XelkReq = require('./P3_Req.js');
var http = require('http');
var url = require('url');

function process_url(input) {
    console.log("processingurl:", input);
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
      extAllowed = extAllowed.concat(temp);

    });
    extAllowed = (extAllowed.substring(0, extAllowed.length - 1)).concat(")$")

    // example of creating new regex and testing it with a string
    var regex1 = new RegExp(localFileString + filepathString + extAllowed);

    var regex2 = new RegExp(remoteFileString + filepathString + extAllowed);
    /*
    var string2a = "/REMOTEFILE/myfile.html";
    console.log(regex2.test(string2a)); //
    */
    var regex3 = new RegExp(localExecString + filepathString + extAllowed);
    
    var regex4 = new RegExp(remoteExecString + filepathString + extAllowed);
    //now we should know if the command was valid and if so what type it is
    var type = 0;
    if (regex1.test(input) == true){
      type = 1;
    }
    else if(regex2.test(input) == true){
      type = 2;
    }
    else if(regex3.test(input) == true){
      type = 3;
    }
    else if(regex4.test(input) == true){
      type = 4;
    }
    //if it doesn't fall into any of these cases, i.e., it doesnt pass anything then it remains 0
    // 1. return validity and type
    return type;
}
function getURL(request, response) {
    console.log("request:", request.url);

    var xurl = request.url;
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello, World! You requested the following URL: '+xurl+'\n');
    console.log("Hey, the client requested the URL: ("+xurl+")");
    //2. var = process_url(xurl)

    console.log(process_url(xurl));
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

*/
