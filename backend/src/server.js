const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    ws.on("connected", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()))
    })

    console.log("client connected")
    
    ws.on("error", console.error);

    ws.on("message", (data) => {
        wss.clients.forEach((client) => {
            if(client.readyState === client.OPEN) {
                client.send(data.toString());
            }
        });
    });

    ws.on("close", () =>{
        console.log("client disconnected")
    })
    

});