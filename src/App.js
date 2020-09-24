import React, { useEffect, useState } from 'react';
import {db} from './firebase';
import firebase from 'firebase'
import './App.css';
import userEvent from '@testing-library/user-event';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("")
  
  useEffect(() => {
    setUsername(prompt("please enter your username"))
  }, [])

  useEffect(() => {
    db
    .collection('messages')
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
      //snapshot.docs.forEach((doc) => console.log(doc.data()))
  })
  }, [])

  const sendMessage = (e) =>{
    e.preventDefault();
    // setMessages([...messages, input])
    db.collection("messages").add({
      user:username,
      content:input,
      timestamp:firebase.firestore.Timestamp.now(),
    })
    setInput("");
  }
  // console.log(messages)
  return (
    <div className="App">
      <h1>not welcome to 9 chat room : {username} </h1>
      {messages.map((message) => (
        <p>{message.user ? message.user : "anonymous"} said : {message.content}</p>
      ))}
      <form className="app__form" >          

        <TextField 
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined"   
        className="app__input"      
        value={input} 
        onChange={e => setInput(e.target.value)}/>   

        <Button variant="contained" type="submit" onClick={sendMessage} color="primary">Send Message</Button>
      </form>


    </div>
  );
}

export default App;
