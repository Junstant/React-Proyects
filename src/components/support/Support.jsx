import React from "react";
import "./support.css";
import { useGlobalContext } from "../../Context";
import { ChatCircleDots } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Support = () => {
  const { chatDataBase, timeTransform, stateOfMessage } = useGlobalContext();
  return (
    <section className="fatherSP">
      <div className="childSP">
        <div className="headerSP">
          <ChatCircleDots className="iconSP"></ChatCircleDots> Chats
        </div>
        <div className="chatSP">
          {chatDataBase.map((chat, index) => {
            return (
              <Link to={`/contact/${chat.id}`} style={{ textDecoration: "none" }} key={index}>
                <div className="chatBoxSP">
                  <div style={{ backgroundImage: `url(${chat.thumbnail})` }} className="thumbnailSP" />
                  <div className="titleMessagesSP">
                    <div className="titleAndDateSP">
                      <div className="chatNameSP">{chat.name}</div>
                      <div className="chatDateSP">{timeTransform(chat.lastConnection)}</div>
                    </div>
                    <div className="chatMessageSP">{stateOfMessage(chat.messages.at(-1))} <div className="lastMessageSP">{chat.messages.at(-1).text}</div></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Support;
