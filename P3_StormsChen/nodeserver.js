var XelkReq = require('./P3_Req.js');
var http = require('http');
var url = require('url');
var fs = require('fs');
var child_process = require('child_process');
//testing git merge stuff
function process_url(input) {

    // regex split up into parts
    var localFileString = "^(\/LOCALFILE\/)";
    var localExecString = "^(\/LOCALEXEC\/)";
    var remoteFileString = "^(\/REMOTEFILE\/)";
    var remoteExecString = "^(\/REMOTEEXEC\/)";
    var filepathString = "[a-zA-Z0-9\/\~]+";
    var hostString = "([a-zA-Z0-9\.]+)";
    var cgipathString = "[a-zA-Z0-9\/\~]+(\.cgi)$";

    var extAllowed = "(";
    XelkReq.extAllowed().forEach(function(item){
      var temp = "(\\".concat(item[0]).concat(")|");
      extAllowed = extAllowed.concat(temp);

    });
    extAllowed = (extAllowed.substring(0, extAllowed.length - 1)).concat(")$")

    // example of creating new regex and testing it with a string
    var regex1 = new RegExp(localFileString + filepathString + extAllowed);

    var regex2 = new RegExp(remoteFileString + hostString + filepathString + extAllowed);

    /*
    var string2a = "/REMOTEFILE/myfile.html";
    console.log(regex2.test(string2a)); //
    */
    var regex3 = new RegExp(localExecString + cgipathString);

    var regex4 = new RegExp(remoteExecString + hostString + cgipathString);
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

    return type;
}
function getURL(request, response) {
    var xurl = request.url;
    response.statusCode = 200;
    // response.setHeader('Content-Type', 'text/plain');
    // response.write('You requested the following URL: '+xurl+'\n');
    console.log("Hey, the client requested the URL: ("+xurl+")");

    var type = process_url(xurl);
    if (type != 0){
      response.write("It has been ACCEPTED\n");
      //response.end();
    }else{
      response.write("It has been REJECTED\n");
      response.end();
    }
    if (type == 1){
      //serve file
      serveFile(xurl, response);

    }
    if (type == 2){
      //serve remote file
      pullAndsendFile(xurl, response);

    }
    if (type == 3){
      serveCGI(xurl, response);
      //execfile
    }
    if (type == 4){
      //exec remote file
      pullandsendOutput(xurl, response);
    }
    //response.end();

}
function serveFile(xurl, response) {
  /* your server shall create a file path from XelkReq.fileDir() + the URL requested.
      This function must use the readFile() function for thispart.
  */
  var curr_char = ""
  idx = 1; //start at first 'slash'
  while (curr_char != '/'){
    curr_char = xurl[idx];
    idx ++;
  }
  var truncated_url = xurl.substring(idx - 1,xurl.length); //truncate url

  //take the first character off until you hit the /
  var filepath = XelkReq.fileDir().concat(truncated_url);
  console.log(filepath);
  var text;
  var exp = ""
  fs.readFile(filepath, function read(err, data) {
    if (err) {
        throw err;
    }
    response.write(data);
    response.end();
    });
}

function serveCGI(xurl, response) {
  /* your server shall use the exec() functionto run the requested .cgi file locally.
    You shall usethe XelkReq.execdir() + the URL requested.
  */
  // response.setHeader('Content-Type', 'text/html');
  var curr_char = ""
  idx = 1;
  while (curr_char != '/'){
    curr_char = xurl[idx];
    idx ++;
  }
  var truncated_url = xurl.substring(idx - 1,xurl.length);

  //take the first character off until you hit the /
  var execpath = XelkReq.execDir().concat(truncated_url);
  console.log(execpath);
  child_process.exec(execpath, function (error, stdout, stderr) {
    if (error) {
      //response.end("There was an error executing this CGI.");
      console.log(stderr);
    } else {
      var text = stdout;

      response.end(stdout)
    }
    // the response ending
  });
}

function pullAndsendFile(xurl, response) {
  /* your server shall take therequested URL and use exec() to call "curl"+URL.
  */
  var curr_char = ""
  idx = 1;
  while (curr_char != '/'){
    curr_char = xurl[idx];
    idx ++;
  }
  var truncated_url = xurl.substring(idx, xurl.length);

  //take the first character off until you hit the /
  var execpath = truncated_url;
  console.log(execpath);
  child_process.exec("curl -s -S " + execpath, function (error, stdout, stderr) { //CHANGE CURL TO USR/BIN/CURL
    if (error) {
      response.end("There was an error executing this CGI.");
      console.log(stderr);
    } else {
      var text = stdout;

      response.end(stdout)
    }
    // the response ending
  });


}

function pullandsendOutput(xurl, response){
  /* your server shall take the requested URL and use exec() to call "curl"+URL forREMOTEEXEC.
  Note, that pullandsendFile() andpullandsendOutput() are virtually identical.
  Also note that serveCGI *also* uses exec().
  You shouldnot duplicate code.
  Hint:  you could write a function to exec() something passed in as a parameter.
  That parameter could be either the CGI or either"curl" commands.....
  */
  var curr_char = ""
  idx = 1;
  while (curr_char != '/'){
    curr_char = xurl[idx];
    idx ++;
  }
  var truncated_url = xurl.substring(idx, xurl.length);

  //take the first character off until you hit the /
  var execpath = truncated_url;
  console.log(execpath);
  child_process.exec("curl -s -S " + execpath, function (error, stdout, stderr) { //CHANGE CURL TO USR/BIN/CURL
    if (error) {
      response.end("There was an error executing this CGI.");
      console.log(stderr);
    } else {
      var text = stdout;

      response.end(stdout)
    }
    // the response ending
  });


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
