import express from "express";
import cors from "cors";
import router from "./routes"
import { Server } from "socket.io"
import websocket from "./websocket"
import { config } from "dotenv";
config();

const app=express();
const cors_option = {
  origin:["http://localhost:3000","https://gemmie-hackathon-demo.web.app"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH", "PUT"]
}

//middleware
app.use(express.json())
app.use(cors(cors_option))
app.use(express.urlencoded({extended:false}))
app.use('/api',router)

let port=process.env.PORT||8000
let server=app.listen(port,()=>{
  console.log(`Server running on port 8000`)
})
let io=new Server(server,{
    cors:{
        origin:cors_option.origin,
        methods:cors_options.methods,
        transports:['websocket', 'polling'],
        credentials:true
    },
    allowEIO3:true,
    maxHttpBufferSize:1e8
});
websocket(io);
