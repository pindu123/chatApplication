import React, { useState,useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { addDoc,collection ,serverTimestamp,onSnapshot,query,where} from 'firebase/firestore'
import { auth,db } from './firebaseConfig'
 
function Chatbox() {
  const [msg,setMsg]=useState('')
  const [data,setData]=useState('')
  const [messages,setMessages]=useState([])
  const msgs=collection(db,"messages")
  const handleMessage=async(e)=>{
    e.preventDefault();
        await addDoc(msgs,{
      text:msg,
      createdAt:serverTimestamp(),
      user:auth.currentUser.displayName,
      room:localStorage.getItem('room')

     })

     setMsg('')
     
  }
 
  useEffect(() => {
    const room = localStorage.getItem('room'); // Get room value from localStorage
    if (!room) {
      console.error('Room is not defined in localStorage.');
      return;
    }
         console.log("hello")
    const msgs = collection(db, "messages");
    console.log(msgs)
    const qm = query(msgs, where("room", "==", room)); // Use "==" for equality
     const unsubscribe = onSnapshot(qm, (snapshot) => {
      const m = [];
       

      snapshot.forEach((doc) => {

 
        m.push({ ...doc.data(), id: doc.id }); // Spread doc.data() and add id
      });

     
      setMessages(m);
    }, (error) => {
      console.error("Error in snapshot listener:", error);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className='bg-zinc-300 w-full h-screen mt-0 fixed'>
      <div className=' h-full p-4 overflow-y-auto'>
    <h1 className="bg-blue-200 text-center font-bold  text-pretty text-lime-900">Welcome to {localStorage.getItem('room').toUpperCase()}</h1>
        {messages.map((item, index) => (
          <div>   <p key={index} className='text-emerald-700'>{item.user}  : {item.text}</p> </div>
        ))}
      </div>
      <div className='ml-56 fixed bottom-0 w-full'>
        <form onSubmit={handleMessage} className='flex items-center p-4'>
          <input
            type="text"
            className="w-full max-w-3xl h-10 border border-gray-300 rounded-l-md px-4"
            placeholder="Enter a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-950 h-10 px-4 text-white rounded-r-md"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox
