import { io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

const URL=`http://localhost:8000`
export const socket = io(URL);

socket.on("disconnect", () => {
  localStorage.setItem("status",JSON.stringify(false))
});

// socket.on('response',async(data:any)=>{
//   const notification=new Notification(`From ${data.groupname} (Group)`,{
//     body:`
//       ${data.username.startsWith('@',0)?data.username.slice(1,data.username.length):data.username} has just upload ${data.filename.slice(0,15)}... on ${data.groupname}
//     `,
//     icon:`https://drive.google.com/uc?id=${data.photo}`,
//   });
//   notification.onclick=function(){
//     window.parent.focus();
//     window.location.href=`/group?name=${data.groupname}`
//     this.close();
//   }
// })

socket.on("hello",(data:any)=>{
  console.log(data)
})
