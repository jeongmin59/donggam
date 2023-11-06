import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './../components/common/Header';
import axiosInstance from '../api/axiosConfig';

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
      <Header title="채팅 목록 보기" to="/"/>
      <ul>
        {chatRoom.length > 0 && chatRoom.map(room => (
          <li key={room.roomId} >
            <span onClick={() => onClickRoom(room.roomId, room.isActive)}>
              {room.name}의 채팅방 - 상태 : {room.isActive ? '활성' : '비활성'}
            </span>
            <button onClick={() => onClickLeave(room.roomId)}>방나가기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomPage;