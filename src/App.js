import './App.css';
import { useEffect, useState } from 'react';
import {io} from 'socket.io-client'

const socket= io('http://localhost:3001')

function App() {
  const [input,setInput] = useState('')
  const [messages,setMessages]=useState([])

  useEffect(()=>{
    socket.on('recieve message',(msg)=>{
      setMessages((preMsg)=>[...preMsg,msg])
      console.log(msg)
    })
    return ()=>{
      socket.off('recieve message')
    }
  },[])

  const sendMessage=(e)=>{
    e.preventDefault()
    setMessages((preMsg)=>[...preMsg,input])
    socket.emit('send message',input)
    setInput('')
  }
  
  return (
    <div >
      <form action="" onSubmit={sendMessage}>
        <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" />
        <button>send</button> <br />
        <input onChange={(e)=>setInput(e.target.value)} type="text" />
        <button>Room</button>
      </form>
      {messages.map((msg,index)=>{
        return(
          <p><span key={index}>{msg}</span> <br /></p>
        )
      })}
    </div>
  );
}
export default App;
