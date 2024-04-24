// import { socket } from "../socket.ts";
// import { useEffect } from "react"
import { UserDetails } from "../types/index.ts";

type Props={
    data:{
        userDetailsParsed:UserDetails,
    }
}

export default function Home(props:Props){
    // useEffect(()=>{
    //     socket.emit("hello",{
    //        data: "my name is hello"
    //     })
    // },[])
    return(
        <div>
            <p>Home page</p>
        </div>
    )
}
