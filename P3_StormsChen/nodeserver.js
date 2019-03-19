const whereToListen = 'belgarath.cs.uky.edu';
const port = 3332;

function doprocess(request, response){
  var xurl = request.url;
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello, World! You requested the following URL: '+xurl+'\n');
  console.log("Hey, the client requested the URL: ("+xurl+")");
}

var server = http.createServer(doprocess);

try{
  server.on('error', (e) => {
    console.log("Error! " +e.code);
  }); // server.on()
  server.listen(port,whereToListen);
  console.log("Listening.....");
} catch(error){
  console.log("There was an error!" +error);
}
