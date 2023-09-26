import React, { useState, useEffect } from "react";
import "./Chat.css";
import { db, auth } from "../firebase.js";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="roomname">
        <h2>{room.toUpperCase()}</h2>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <h5>{message.user}</h5>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="type your message here"
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
