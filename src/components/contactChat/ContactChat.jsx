import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../Context";
import "./ContactChat.css";
import { ArrowLeft, Check, Checks } from "@phosphor-icons/react";

const ContactChat = () => {
  //call the functions from the context
  const { chatDataBase, timeTransform, stateOfMessage } = useGlobalContext();

  //get the id from the url
  const { id } = useParams();

  //set the chat state
  const [chat, setChat] = useState({
    id: "",
    thumbnail: "",
    name: "",
    lastConnection: "",
    messages: [],
  });

  //listen to the chatDataBase and set the chat state
  useEffect(() => {
    //get the chat from the database
    const chat = chatDataBase.find((chat) => chat.id === parseInt(id));
    setChat(chat);
  });


  return (
    <section className="fatherCC">
      <div className="childCC">
        <div className="headerCC">
          <div className="backCC">
            <Link to="/support">
              <ArrowLeft></ArrowLeft>
            </Link>
          </div>
          <div style={{ backgroundImage: `url(${chat.thumbnail})` }} className="thumbnailCC"></div>
          <div className="textCC">
            <h2>{chat.name}</h2>
            <p>{timeTransform(chat.lastConnection)}</p>
          </div>
        </div>
        <div className="chatCC">
          {chat.messages.map((message, index) => {
            console.log(message);
            return (
              <div key={index} className={message.author === "Me" ? "meMSG" : "recievedMSG"}>
                <div style={{ backgroundImage: `url(${chat.thumbnail})` }}></div>
                <div className="messageCC">
                  <p>{message.author}</p>
                  <p>{message.text}</p>
                </div>
                <div className="dataTimeCC">
                  <span>{timeTransform(message.time)}</span>
                  {stateOfMessage(message)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactChat;
