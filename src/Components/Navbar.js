import React, { useEffect, useState,createContext} from 'react'
import { auth ,provider} from "../Components/firebaseConfig";
import { signInWithPopup } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';

import chat from '../assets/chat.jpg';

 function Navbar() {
  const [room,setRoom]=useState('')
  const [isSignin,setIsSignin]=useState(false);

      useEffect(()=>{
        const t=Cookies.getItem('token')
        if(t != null)
        {
         setIsSignin(true) 
        }
      },[])
  const navigate=useNavigate();
     const handleLogin=async ()=>{
         
     const r=  await signInWithPopup(auth, provider); 
      
      if(r._tokenResponse.emailVerified)
      {
         Cookies.setItem("token",r._tokenResponse.oauthIdToken)
         
      }
    }

    const handleLogout=()=>{
      setIsSignin(false)
      Cookies.removeItem('token')
    }
    return (
      <div>
        <div className="bg-gray-600 h-16 w-full fixed top-0 left-0 flex items-center gap-10 px-4 justify-end">
          <button className='bg-slate-300 rounded mt-5 hover:bg-slate-400 w-20 h-8'>About</button>
          {isSignin ? (
            <button className='bg-slate-300 rounded mt-5 hover:bg-slate-400 w-20 h-8' onClick={handleLogout}>Log Out</button>
          ) : (
            <button className='bg-slate-300 rounded mt-5 hover:bg-slate-400 w-20 h-8' onClick={handleLogin}>Login</button>
          )}
        </div>
        <div className="mt-20 p-4">
          {isSignin ? (
            <div className=' ml-40    '>
              <input
                placeholder='Enter room'
                className='w-40 h-10 border rounded p-2 ml-96'
                value={room}
                onChange={(e) =>{ setRoom(e.target.value)
                   localStorage.setItem("room",e.target.value)
                }}
              />
               <Link to={`/Chatpage?room=${room}`}>
                <button className='ml-2 bg-blue-500 text-white rounded px-4 py-2'>Join Room</button>
              </Link>
             </div>
          ) : (
            <div><img  src={chat}  className='h-96  ml-96'/> 
              
            </div>
          )}
        </div>
      </div>
    );
}

export default Navbar

 