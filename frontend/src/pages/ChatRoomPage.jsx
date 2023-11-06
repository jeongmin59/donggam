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
    console.log(res.data.data);
    const chatRoomList = res.data.data;
    setChatRoom(chatRoomList);
  };

  const onClickRoom = (roomId, isActive) => {
    navigate(`/chatting/${roomId}`, {state : {isActive}});
  }

  const onClickLeave = async (roomId) => {
    const res = await axiosInstance.post(`/chat/leave`, {
      roomId : roomId,
    });
    console.log(res.data.data);
    const chatRoomList = res.data.data;
    setChatRoom(chatRoomList);
  }

  useEffect(() => {
    updateChatRoom();
  }, []);

  return (
    <div className="chatting h-screen bg-gradient-to-b from-[#e5f3ff] to-white">
      <Header title="채팅 목록 보기" to="/" />
      <div className="flex flex-wrap gap-4 p-4 md:p-8 lg:p-12">
        {chatRoom.length > 0 &&
          chatRoom.map((room) => (
            <div
              key={room.roomId}
              className="w-full md:w-1/2 lg:w-1/3"
              onClick={() => onClickRoom(room.roomId, room.isActive)}
            >
              <div className="bg-white p-6 md:p-8 lg:p-10 flex flex-col justify-between rounded-md shadow-md h-full">
                <span className="cursor-pointer text-lg md:text-xl lg:text-2xl">
                  {room.name}
                </span>
                <div className="flex justify-end items-center mt-4">
                  <button
                    onClick={() => onClickLeave(room.roomId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatRoomPage;