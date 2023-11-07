import Header from "../components/common/Header";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../recoil/user/userSelector";
import axiosInstance from "../api/axiosConfig";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const ChattingPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const isActive = location.state.isActive;
  const [chatList, setChatList] = useState([]);
  const [stompClient, SetStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const user = useRecoilValue(UserSelector);
  const senderId = user.memberId;
  const sender = user.nickname;

  const updateChatList = async () => {
    const res = await axiosInstance.get(`/chat/list/${roomId}`);
    setChatList(res.data.data);
  };

  // Spring 서버와 채팅 연결
  const updateStompClient = () => {
    // const socket = new SockJS(`http://localhost:8080/stomp/chat`);
    const socket = new SockJS(`https://k9e107.p.ssafy.io/stomp/chat`);
    const stompClient = Stomp.over(socket);
    SetStompClient(stompClient);

    stompClient.connect({}, function (frame) {
      console.log("Connected : " + frame);
      stompClient.subscribe(`/sub/chat/room/${roomId}`, function (response) {
        const message = JSON.parse(response.body);
        setChatList((prevChatList) => [...prevChatList, message]);
        const chatWindow = document.getElementById("chatWindow");
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    });
  };

  const readChats = async () => {
    const res = await axiosInstance.post(`/chat/list/${roomId}`);
    console.log(res.data);
  };

  useEffect(() => {
    updateChatList();
    updateStompClient();
    return () => {
      readChats();
    };
  }, []);

  useEffect(() => {
    const element = document.querySelector(".bottom");
    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [chatList]);

  // 메시지 전송
  const handleSendMessage = () => {
    const request = {
      type: "TALK",
      roomId: roomId,
      sender: sender,
      senderId: senderId,
      content: message,
      isRead: false,
    };
    stompClient.send(`/pub/chat/message`, {}, JSON.stringify(request));
    setMessage("");
  };

  return (
    <div
      className=" flex flex-col chatting h-screen bg-gradient-to-b from-[#e5f3ff] to-white w-full"
      // style={{ overflowY: "hidden" }}
    >
      <div>
        <Header title="1:1 채팅방" to="/chatroom" />
      </div>
      <ul
        className="w-full h-full"
        id="chatWindow"
        style={{ overflowY: "scroll" }}
      >
        {chatList &&
          chatList.length > 0 &&
          chatList.map((chat) => (
            <li
              key={chat.id}
              className={`chatbox ${
                user.memberId === chat.senderId ? "text-right" : "text-left"
              }`}
            >
              <div className="chat_user_name text-lg font-bold mb-2 mt-2 ml-8 mr-8">
                {chat.sender}
              </div>
              <div
                className={`inline-block ${
                  user.memberId === chat.senderId
                    ? "bg-gray-100"
                    : "bg-blue-100"
                } p-4 rounded-3xl border max-w-xs max-h-96 whitespace-pre-wrap ml-5 mr-5`}
                style={{
                  maxHeight: "auto",
                  maxWidth: "auto",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {chat.content}
              </div>
            </li>
          ))}
        <li className="bottom" style={{ height: "80px" }}></li>
      </ul>
      {isActive ? (
        <div
          className=" bg-gray-100 rounded-full"
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            height: "3rem",
          }}
        >
          <input
            type="text"
            className="w-full h-full bg-transparent p-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            style={{ borderRadius: "10px", flexShrink: 0 }}
          />
          <div
            className="inline-block absolute mr-5 top-1/2 transform -translate-y-1/3"
            onClick={handleSendMessage}
            style={{ right: "0%" }}
          >
            전송
          </div>
        </div>
      ) : (
        <div style={{ bottom: 20 }}>상대방이 나가서 비활성된 방입니다.</div>
      )}
    </div>
  );
};

export default ChattingPage;
