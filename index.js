var WebsocketServer = require(`websocket`).server;
var http = require(`http`);
var express = require(`express`);




// http server
var server = http.createServer((request, response)=>{
	console.log(`request for ${request.url}`);
	response.write('hello');
	response.end();
});
server.listen(8080,()=>{console.log("listening");} );


// websocket server
wsServer = new WebsocketServer({httpServer: server});


var connections = [];

wsServer.on("request", (request)=>{
var connection = request.accept(null, request.origin);
connections.push(connection);
console.log("connected");
connection.on("message", (msg)=>{
	//console.log(`recieved: ${msg.utf8Data}`);
	//connection.sendUTF(msg.utf8Data);
	connections.forEach(con=>con.sendUTF(msg.utf8Data));
});
connection.on("close",(reason, description)=>
	{
		console.log(`${connection.remoteAddress} disconnected`);
	}
)
})

// express server
var app = express();
app.use(express.static(`./public`));
app.listen(80);


process.stdin.setRawMode(true);
process.stdin.on("data", data=>process.exit());