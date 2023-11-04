import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './../components/common/Header';
import axiosInstance from '../api/axiosConfig';

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const [chatRoom, setChatRoom] = useState([]);

  const updateChatRoom = async () => {
    const res = await axiosInstance.get(`/room/list`);
    console.log(res.data.data.roomList);
    const chatRoomList = res.data.data.roomList;
    setChatRoom(chatRoomList);
  };

  const onClickRoom = (roomId) => {
    navigate(`/chatting/${roomId}`)
  }

  useEffect(() => {
    updateChatRoom();
  }, []);

  return (
    <div className="chatting h-screen bg-gradient-to-b from-[#e5f3ff] to-white">
      <Header title="채팅 목록 보기" />
      <ul>
        {chatRoom.length && chatRoom.map(room => (
          <li key={room.roomId} onClick={() => onClickRoom(room.roomId)}>
            {room.name}의 채팅방
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomPage;