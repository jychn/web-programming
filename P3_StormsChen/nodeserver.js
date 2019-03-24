var XelkReq = require('P3_Req.js');
var http = require('http');
var url = require('url')

function process_url(input){
  var file_extensions = XelkReq.extAllowed; //need to iterate over this to get first subelement of each element

  var localfile_regexp = new RegExp(^(\/)(LOCALFILE\/)(www)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.(html)(:[0-9]{1,5})?(\/.*)?$^(\/)$)
  var remotefile_regexp = new RegExp(^(\/)(REMOTEFILE\/)(www)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.(html)(:[0-9]{1,5})?(\/.*)?$^(\/)$)

  //both of these ^ aren't totally correct

}
function doprocess(request, response){
  var xurl = request.url;
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello, World! You requested the following URL: '+xurl+'\n');
  console.log("Hey, the client requested the URL: ("+xurl+")");
  if (urlaccepted){

  }
}
function serveFile(){

}

function pullandsendFile(){

}

function pullandsendOutput(){

}

function generatePort(){
  var lower = XelkReq.LowerPort()
  var upper = XelkReq.UpperPort()

  return Math.floor(Math.random() * (upper - lower)) + lower

}

var server = http.createServer(doprocess);

try{
  server.on('error', (e) => {
    console.log("Error! " +e.code);
  }); // server.on()
  port = generatePort();
  whereToListen = "test";
  server.listen(port,whereToListen);
  console.log("Listening.....");
} catch(error){
  console.log("There was an error!" +error);
}
