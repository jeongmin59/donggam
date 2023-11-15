import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/common/Header";
import axiosInstance from "../api/axiosConfig";
import { XIcon } from "@heroicons/react/outline";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
 
const ChatRoomPage = () => {
  const navigate = useNavigate();
  const [chatRoom, setChatRoom] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  const updateChatRoom = async () => {
    const res = await axiosInstance.get(`/room/list`);
    const chatRoomList = res.data.data;
    setChatRoom(chatRoomList);
  };

  const onClickRoom = (roomId, isActive, roomName ) => {
    const stompString = JSON.stringify(stompClient);
    navigate(`/chatting/${roomId}`, { state: { isActive, roomName, stompString } });
  };

  const onClickLeave = async (e, roomId) => {
    e.stopPropagation();
    const res = await axiosInstance.post(`/chat/leave`, {
      roomId: roomId,
    });
    const chatRoomList = res.data.data;
    setChatRoom(chatRoomList);
  };

  useEffect(() => {
    const socket = new SockJS(`http://localhost:8080/stomp/chat`, null, {
        transports: ["xhr-streaming", "xhr-polling"],
    });
    setStompClient(Stomp.over(socket));

    updateChatRoom();
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    }
  }, [])

  useEffect(() => {
    if (stompClient !== null) {
      stompClient.connect({}, frame => {
        console.log("Stomp Connected", frame);
      })
    }
  }, [stompClient]);

  return (
    <div>
      <div className="chatting bg-gradient-to-b from-[#e5f3ff] to-white">
        <Header title="채팅 목록 보기" to="/" />
        <div className="flex-col gap-2 p-4 h-[calc(100vh-100px)] overflow-y-auto ">
          <div className="">
            {chatRoom.length > 0 &&
              chatRoom.map((room) => (
                <div
                  key={room.roomId}
                  className="my-2"
                  onClick={() => onClickRoom(room.roomId, room.isActive, room.name)}
                >
                  <div className="bg-white p-4 flex flex-col justify-between rounded-[20px] shadow-md h-full w-full relative ">
                    <div className="flex items-center w-full ">
                      <img
                        src={`/character/${room.characterId}.svg`}
                        alt="대화상대의 캐릭터 이미지"
                        className="h-16 w-16 object-contain mr-4"
                      />
                      <div className="flex flex-col flex-grow">
                        <span className="cursor-pointer text-lg mb-2">
                          {room.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {room.lastChat}
                        </span>
                      </div>
                      {room.unReadChatCount > 0 && (
                        <div className="flex items-center justify-center h-6 w-6 bg-red-500 rounded-full text-white text-xs">
                          {room.unReadChatCount}
                        </div>
                      )}
                      <div
                        className="absolute top-0 right-0 p-2 cursor-pointer"
                        onClick={(e) => onClickLeave(e, room.roomId)}
                      >
                        <XIcon className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
