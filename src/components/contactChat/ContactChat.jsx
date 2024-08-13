import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../Context";
import "./ContactChat.css";
import { ArrowLeft, VideoCamera, Phone, DotsThreeOutlineVertical, SmileySticker, Plus, Microphone, ArrowRight } from "@phosphor-icons/react";

const ContactChat = () => {
  //call the functions from the context
  const { chatDataBase, timeTransform, stateOfMessage, handleChatDataBase } = useGlobalContext();

  //get the id from the url
  const { id } = useParams();

  //set the chat state
  const [chat, setChat] = useState({
    id: 0,
    thumbnail: "",
    name: "",
    lastConnection: "",
    messages: [],
  });

  const [message, setMessage] = useState("");

  //listen to the chatDataBase and set the chat state
  useEffect(() => {
    //get the chat from the database
    const chat = chatDataBase.find((chat) => chat.id === parseInt(id));
    setChat(chat);
  }, [id, chatDataBase]);


  //handle the submit of the form
  const handleSubmit = (e) => {
    const aux = { ...chat, messages: [...chat.messages, { author: "Me", text: message, time: new Date().getTime(), state: "sending" }] }
    e.preventDefault();
    setChat(aux);
    handleChatDataBase(aux);
  };

  //function to clear the input after sending a message
  useEffect(() => {
    document.querySelector("input").value = "";
  }, [chat]);

  //function to send a message
  const handleMessage = (e) => {
    const message = e.target.value;
    setMessage(message);
  };

  return (
    <section className="fatherCC">
      <div className="childCC conStyleOne">
        <div className="headerCC">
          <div className="firstRowCC">
            <Link to="/support">
              <ArrowLeft></ArrowLeft>
            </Link>
            <div style={{ backgroundImage: `url(${chat.thumbnail})` }} className="thumbnailCC"></div>
          </div>
          <div className="secondRowCC">
            <h5>{chat.name}</h5>
            <p>{timeTransform(chat.lastConnection)}</p>
          </div>
          <div className="thirdRowCC">
            <VideoCamera></VideoCamera>
            <Phone></Phone>
            <DotsThreeOutlineVertical></DotsThreeOutlineVertical>
          </div>
        </div>
        <div className="chatCC">
          {chat.messages.map((message, index) => {
            return (
              <div key={index} className={message.author === "Me" ? "meMSG" : "recievedMSG"}>
                <div style={{ backgroundImage: `url(${chat.thumbnail})` }} className="chatIconCC"></div>
                <div className="messageCC">
                  <b>{message.author}</b>
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
        <div className="inputCC">
          <div className="inputIconsCC">
            <SmileySticker></SmileySticker> <Plus></Plus>
          </div>
          <div className="inputBoxCC">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Write a message" onChange={(e) => handleMessage(e)} />
              <button type="submit">
                <ArrowRight></ArrowRight>
              </button>
            </form>
          </div>
          <div className="inputIconsCC2">
            <Microphone />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactChat;
