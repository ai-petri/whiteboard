var WebsocketServer = require(`websocket`).server;

var express = require(`express`);



// express server
var app = express();
app.use(express.static(`./public`));
var server = app.listen(80);



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



process.stdin.setRawMode(true);
process.stdin.on("data", data=>process.exit());