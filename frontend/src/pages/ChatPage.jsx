import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import React, { useState, useEffect } from "react";
import ChatRoomList from "../components/chatpage/ChatRoomList";
import ChatRoom from "../components/chatpage/ChatRoom";
import { useLocation } from "react-router-dom";

const ChatPage = () => {
  const location = useLocation();
  const [stompClient, setStompClient] = useState(null);
  const [isOnChat, setIsOnChat] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({});

  const updateStompClient = () => {
    // const socket = new SockJS(`http://localhost:8080/stomp/chat`, null, {
    //   transports: ["xhr-streaming", "xhr-polling"],
    // });
      const socket = new SockJS(`https://k9e107.p.ssafy.io/stomp/chat`, null, {
        transports: ["xhr-streaming", "xhr-polling"],
      });
    setStompClient(Stomp.over(socket));
  };

  const connectStomp = () => {
    if (stompClient !== null) {
      stompClient.connect({}, (frame) => {
        // console.log("Stomp Connected", frame);
      });
    }
  };

  useEffect(() => {
    updateStompClient();
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    connectStomp();
  }, [stompClient]);

  return (
    <div>
      {isOnChat && (
        <ChatRoom
          room={currentRoom}
          stompClient={stompClient}
          setIsOnChat={setIsOnChat}
        />
      )}
      {!isOnChat && (
        <ChatRoomList
          setCurrentRoom={setCurrentRoom}
          setIsOnChat={setIsOnChat}
        />
      )}
    </div>
  );
};

export default ChatPage;
