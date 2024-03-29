import './App.css';
import io from 'socket.io-client'
import { useEffect,useState } from "react";

const socket = io.connect("http://localhost:3001")
// const socket = io('http://10.105.26.46:3001');
function App() {
  const [message,setMessage]=useState('');
  const [messageRecieved,setMessageRecieved]=useState('');
  const sendMessage  = () =>{
    socket.emit("send_message",{message}); //since both key and value are same
  };

  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
        setMessageRecieved(data.message);
    })
  })


  return (
    <div className="App">
      <input placeholder='Message...' onChange={(event)=>{
        setMessage(event.target.value);
      }}/>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageRecieved}
    </div>
  );
}

export default App;
