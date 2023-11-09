import React, { useEffect, useState } from 'react';
import MailList from './MailList';
import { getMailList, getStatusList } from '../../api/mailApi';
import { useRecoilValue } from 'recoil';
import { StatusMessageAtom, StatusMessageIdAtom } from '../../recoil/user/userAtom';
import StatusList from './StatusList';
import nullLogo from '../../assets/images/noMail.svg';
import MailFilter from './MailFilter';

const MailBox = () => {
  const nowStatus = useRecoilValue(StatusMessageAtom);
  const nowStatusId = useRecoilValue(StatusMessageIdAtom);
  const [status, setStatus] = useState(nowStatus);
  const [statusList, setStatusList] = useState([]);
  const [mailList, setMailList] = useState([]);

  const [selectedStatusId, setSelectedStatusId] = useState(nowStatusId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async() => {
    const statusData = await getStatusList();
    setStatusList(statusData.statusList);

    const mailData = await getMailList(selectedStatusId);
    setMailList(mailData.data.messageList);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // 선택된 상메 바꿔주는 함수
  const handleStatusChange = ({ selectedStatus, selectedStatusId }) => {
    setStatus(selectedStatus);
    setSelectedStatusId(selectedStatusId);
  };

  return (
    <div className="px-5">
      <div className="mt-8 mb-4 h-20">
        <button className="w-full  bg-sky-100 px-8 py-3 rounded-2xl justify-center items-center gap-2.5 inline-flex" onClick={openModal}>
          {status}
        </button>
        <StatusList isOpen={isModalOpen} onClose={closeModal} statusList={statusList} changeStatus={handleStatusChange} />
      </div>

      <MailFilter mailList={mailList}/>

      <div className="text-center">
        {mailList.length > 0 ? (
          <div className='mt-4 grid grid-cols-3 gap-4'>
            {mailList.map((mail, index) => (
              <MailList key={index} mail={mail} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col justify-center items-center">
            <img src={nullLogo} alt="구름" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MailBox;
