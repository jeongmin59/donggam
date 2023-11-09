import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './../components/common/Header';
import axiosInstance from '../api/axiosConfig';
import { XIcon } from '@heroicons/react/outline';

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const [chatRoom, setChatRoom] = useState([]);

  const updateChatRoom = async () => {
    const res = await axiosInstance.get(`/room/list`);
    const chatRoomList = res.data.data;
    setChatRoom(chatRoomList);
  };

  const onClickRoom = (roomId, isActive, roomName) => {
    navigate(`/chatting/${roomId}`, { state: { isActive, roomName } });
  };

  const onClickLeave = async (e, roomId) => {
    e.stopPropagation();
    const res = await axiosInstance.post(`/chat/leave`, {
      roomId: roomId,
    });
    const chatRoomList = res.data.data;
    setChatRoom(chatRoomList);
  }

  useEffect(() => {
    updateChatRoom();
  }, []);

  return (
    <div className="chatting h-full bg-gradient-to-b from-[#e5f3ff] to-white">
      <div>
        <Header title="채팅 목록 보기" to="/" />
      </div>
      <div className="flex flex-wrap p-4 md:p-6 lg:p-8">
        {chatRoom.length > 0 &&
          chatRoom.map((room) => (
            <div
              key={room.roomId}
              className="w-full md:w-1/2 lg:w-1/3 my-2 max-w-screen min-w-[20rem] flex-shrink-0"
              onClick={() => onClickRoom(room.roomId, room.isActive, room.name)}
            >
              <div className="bg-white p-4 md:p-6 lg:p-8 flex flex-col justify-between rounded-[20px] shadow-md h-full w-full relative">
                <div className="flex items-center w-full">
                  <img
                    src={`/character/${room.characterId}.svg`}
                    alt="대화상대의 캐릭터 이미지"
                    className="h-16 w-16 object-contain mr-4"
                  />
                  <div className="flex flex-col flex-grow">
                    <span className="cursor-pointer text-lg md:text-xl lg:text-2xl mb-2">
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
                  <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={(e) => onClickLeave(e, room.roomId)}>
                    <XIcon className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatRoomPage;