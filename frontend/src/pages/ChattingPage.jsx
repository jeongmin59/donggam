import Header from "../components/common/Header";
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserSelector } from '../recoil/user/userSelector';
import axiosInstance from "../api/axiosConfig";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const ChattingPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const { state } = location;
  const isActive = state ? state.isActive : false ;
  const [chatList, setChatList] = useState([]);
  const [stompClient, SetStompClient] = useState(null);
  const [message, setMessage] = useState('');
  const user = useRecoilValue(UserSelector);
  const senderId = user.memberId;
  const sender = user.nickname;
  const [isOpponentOnline, setIsOpponentOnline] = useState(false);

  const updateChatList = async () => {
    const res = await axiosInstance.get(`/chat/list/${roomId}`)
    setChatList(res.data.data.chatList);
  }

  // Spring 서버와 채팅 연결
  const updateStompClient = () => { 
    // const socket = new WebSocket(`ws://localhost:8080/stomp/chat`);
    const socket = new SockJS(`https://k9e107.p.ssafy.io/stomp/chat`);
    const stompClient = Stomp.over(socket);
    SetStompClient(stompClient);

    stompClient.connect({}, function (frame) {
      console.log('Connected : ' + frame);
      stompClient.subscribe(`/sub/chat/room/${roomId}`, function (response) {
        const message = JSON.parse(response.body);
        setChatList(prevChatList => [...prevChatList, message]);
      }); 
      // 상대방의 접속 유무 판단
      stompClient.ws.onopen = () => {
        setIsOpponentOnline(true);
      };
      stompClient.ws.onclose = () => {
        setIsOpponentOnline(false);
      }
    });
  };

  useEffect(() => {
    updateChatList();
    updateStompClient();
    console.log(isActive);
    console.log('isOpponentOnline : ' + isOpponentOnline);
  }, [])

  // 메시지 전송
  const handleSendMessage = () => {
    const request = {
      "type" : "TALK",
      "roomId" : roomId,
      "sender" : sender,
      "senderId" : senderId,
      "content" : message,
      "isRead" : isOpponentOnline
    };
    stompClient.send(`/pub/chat/message`, {}, JSON.stringify(request));
    setMessage('');
  }

  return (
      <div className="chatting h-screen bg-gradient-to-b from-[#e5f3ff] to-white">
        <Header title="1:1 채팅방" />
        <ul>
          {chatList.length > 0 && chatList.map(chat => (
            <li key={chat.id}>{chat.sender} : {chat.content} - 읽음유무 : {chat.isRead ? '읽음' : '안읽음'}</li>
          ))}
        </ul>
        {isActive ? (
          <>
            <input
              type="text"
              value={message}
              onChange={e=>setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>전송</button>
          </>
        ) : (
          <p>상대방이 나가서 비활성화 상태입니다.</p>
        )}
      </div>
  );
};

export default ChattingPage;