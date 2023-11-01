import React, { useEffect, useState } from 'react';
import MailList from './MailList';
import { getMailList, getStatusList } from '../../api/mailApi';
import { useRecoilValue } from 'recoil';
import { StatusMessageAtom, StatusMessageIdAtom } from '../../recoil/user/userAtom';
import StatusList from './StatusList';

const MailBox = () => {
  const nowStatus = useRecoilValue(StatusMessageAtom)
  const nowStatusId = useRecoilValue(StatusMessageIdAtom)
  const [status, setStatus] = useState(nowStatus);
  const [statusList, setStatusList] = useState([]);
  const [mailList, setMailList] = useState([]);

  const [selectedStatusId, setSelectedStatusId] = useState(nowStatusId)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getStatusList()

      .then((res) => {
        setStatusList(res.statusList)
        // console.log('상메리스트 가져오기 성공', res.statusList)
        return getMailList(selectedStatusId)
      })
      .then((res) => {
        setMailList(res.data.messageList);
        // console.log('두 번째 요청 성공', res.data);
      })
      .catch((err) => {
        console.log('status리스트 가져오기 실패ㄱ-', err)
      })
  }, [selectedStatusId])


  // 현재 상메 바꿔주는 함수
  const handleStatusChange = ({ selectedStatus, selectedStatusId }) => {
    setStatus(selectedStatus);
    setSelectedStatusId(selectedStatusId)
  };

  return (
    <div>
      <div className="p-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>현재상태메시지: {status}</button>
        <StatusList isOpen={isModalOpen} onClose={closeModal} statusList={statusList} changeStatus={handleStatusChange} />
      </div>
      {mailList.map((mail, index) => (
        <MailList key={index} mail={mail} />
      ))}
    </div>
  );
};

export default MailBox;