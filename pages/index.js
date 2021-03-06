import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Pusher from "pusher-js";

export default function Home() {
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  let allMessages = [];

  useEffect(() => {

    Pusher.logToConsole = true;

    const pusher = new Pusher('22bb8b6da493812d25dc', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });

  });

  const submit = async () => {

    e.preventDefault();

    await fetch('http://localhost:2142/api/messages', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        message
      })
    });

    setMessage('');

  }



  return (
    <div className="container">
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous" />
      </Head>

      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">


        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <input className="fs-5 fw-semibold" value={username} onChange={e => setUsername(e.target.value)}></input>
        </div>


        <div className="list-group list-group-flush border-bottom scrollarea" style={{ minHeight: "500px" }}>

          {messages.map(message => {
            return (
              <div className="list-group-item list-group-item-action py-3 lh-tight">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <strong className="mb-1">{message.username}</strong>
                </div>
                <div className="col-10 mb-1 small">{message.message}</div>
              </div>
            )
          })}


        </div>




      </div>

      <form onSubmit={submit}>
        <input className="form-control" placeholder="Write a message" value={message} onChange={e => setMessage(e.target.value)} />
      </form>
    </div >
  )
}
