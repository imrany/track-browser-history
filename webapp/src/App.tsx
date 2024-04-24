import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OpenFolderDialog } from "./components/dialogs";
import Layout from "./pages/Layout";
import { useEffect } from "react";
import { socket } from "./socket"
import LandingPage from "./pages/LandingPage";
import ErrorPage from './pages/ErrorPage';
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import { UserDetails } from "./types";

function App() {
  useEffect(()=>{
    socket.emit("hello","my name is hello")
  },[])

  let userDetails:UserDetails={
    username:"",
    token:""
  }
  
  let user_details:any=localStorage.getItem("user_details")!==null?localStorage.getItem("user_details"):""
  let userDetailsParsed:UserDetails=user_details.length!==0?JSON.parse(user_details):userDetails;

  // window.oncontextmenu=(e:any)=>{
  //   e.preventDefault()
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={userDetailsParsed.token.length===0?<LandingPage/>:<Navigate to="/"/>} />
        <Route path="/" element={userDetailsParsed.token.length!==0?<Layout/>:<Navigate to="/welcome"/>}>
          <Route index element={<Home data={{userDetailsParsed}}/>} />
          <Route path="docs" element={<Docs />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <OpenFolderDialog/>
    </BrowserRouter>
  )
}

export default App
