import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import React, { useState, useEffect } from "react";
import ChatRoomList from "../components/chatpage/ChatRoomList";
import ChatRoom from "../components/chatpage/ChatRoom";
import ChatInviteRoom from "../components/chatpage/ChatInviteRoom";
import { useLocation } from "react-router-dom";
import loadingAnimation from '../assets/animation/loading-animation.json';
import Lottie from 'react-lottie';

const ChatPage = () => {
  const location = useLocation();
  const memberId = location.state?.memberId;
  const memberName = location.state?.memberName;
  const [isInvite, setIsInvite] = useState(location.state?.isInvite);

  const [stompClient, setStompClient] = useState(null);
  const [isStompConnected, setIsStompConnected] = useState(false);
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
        setIsStompConnected(true);
      });
    }
  };

  useEffect(() => {
    if (isInvite) setIsOnChat(true);
    updateStompClient();
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
        setStompClient(null);
      }
    };
  }, []);

  useEffect(() => {
    connectStomp();
  }, [stompClient]);

  return (
    <div>
      {!isStompConnected && (
        <div className="flex justify-center items-center h-screen bg-white">
          <div className="flex-col">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: loadingAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={200}
              width={300}
            />
            <div className="text-[14px] text-blue-300 text-center">
              채팅 연결 하는중
            </div>
          </div>
        </div>
      )}
      {isStompConnected && isInvite && isOnChat && (
        <ChatInviteRoom
          memberId={memberId}
          memberName={memberName}
          stompClient={stompClient}
          setIsOnChat={setIsOnChat}
          setIsInvite={setIsInvite}
        />
      )}
      {isStompConnected && isOnChat && (!isInvite || isInvite === null) && (
        <ChatRoom
          room={currentRoom}
          stompClient={stompClient}
          setIsOnChat={setIsOnChat}
        />
      )}
      {isStompConnected && !isOnChat && (
        <ChatRoomList
          setCurrentRoom={setCurrentRoom}
          setIsOnChat={setIsOnChat}
          setIsInvite={setIsInvite}
        />
      )}
    </div>
  );
};

export default ChatPage;
