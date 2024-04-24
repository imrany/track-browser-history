import express from "express";
import cors from "cors";
import router from "./routes"
import { Server } from "socket.io"
//import websocket from "./websocket"
import { createServer } from "http"; 
import * as WebSocket from "ws";
import { config } from "dotenv";
config();

const app=express();
const server = createServer(app);
const wss=new WebSocket.Server({ server });

const cors_option = {
  origin:["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH", "PUT"]
}

//middleware
app.use(express.json())
app.use(cors(cors_option))
app.use(express.urlencoded({extended:false}))
app.use('/api',router)

//Websocket connection handling
wss.on('connection',(ws:any)=>{
    console.log("WebSocket connected")

    ws.on('message',function incoming(message:any){
        console.log('Received message:', message);
        //echo back the received message to the client
        ws.send(message)
    });

    ws.on('close', function() {
        console.log('WebSocket disconnected.');
    });
})

let port=process.env.PORT||8000
server.listen(port,()=>{
  console.log(`Server running on port ${port}`)
})
//let io=new Server(server,{
  //  cors:{
    //    origin:cors_option.origin,
      //  methods:cors_option.methods,
        //credentials:true
    //},
    //allowEIO3:true,
    //maxHttpBufferSize:1e8
//});
//websocket(io);
