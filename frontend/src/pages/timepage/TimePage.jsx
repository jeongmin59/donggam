import React, { useEffect, useState } from "react";
import TimeBackground from "../../components/timepage/TimeBackground";
import CreateButton from "../../components/common/CreateButton";
import PhotoList from "../../components/timepage/PhotoList";
import BestPhoto from "../../components/timepage/BestPhoto";
import NavBar from "../../components/common/NavBar";

const TimePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getHours());
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [remainTime, setRemainTime] = useState("0시간 0분");
  const isBestTime =
    (currentTime >= 7 && currentTime < 10) ||
    (currentTime >= 11 && currentTime < 14) ||
    (currentTime >= 17 && currentTime < 20)
      ? false
      : true;

  const calculateTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    let targetHour, targetMinute;

    if (isBestTime) {
      if (currentHour >= 10 && currentHour < 11) {
        targetHour = 10;
        targetMinute = 59;
      } else if (currentHour >= 14 && currentHour < 17) {
        targetHour = 16;
        targetMinute = 59;
      } else if (currentHour >= 20 && currentHour < 24) {
        targetHour = 29;
        targetMinute = 59;
      } else if (currentHour >= 0 && currentHour < 7) {
        targetHour = 6;
        targetMinute = 59;
      }
      const timeDiffHour = targetHour - currentHour;
      const timeDiffMinute = targetMinute - currentMinute;
      setRemainTime(`${timeDiffHour}시간 ${timeDiffMinute}분`);
    } else if (!isBestTime) {
      if (currentHour >= 7 && currentHour < 10) {
        targetHour = 9;
        targetMinute = 59;
      } else if (currentHour >= 11 && currentHour < 14) {
        targetHour = 13;
        targetMinute = 59;
      } else if (currentHour >= 17 && currentHour < 20) {
        targetHour = 19;
        targetMinute = 59;
      }
      const timeDiffHour = targetHour - currentHour;
      const timeDiffMinute = targetMinute - currentMinute;
      setRemainTime(`${timeDiffHour}시간 ${timeDiffMinute}분`);
    }
  };

  useEffect(() => {
    setCurrentTime(new Date().getHours());
    // console.log("현재 시간!", currentTime);
    calculateTime();
  }, []);

  return (
    <>
      <TimeBackground
        currentTime={currentTime}
        totalParticipants={totalParticipants}
        isBestTime={isBestTime}
        remainTime={remainTime}
      />
      {isBestTime ? (
        <div>
          <PhotoList
            setTotalParticipants={setTotalParticipants}
            totalParticipants={totalParticipants}
            remainTime={remainTime}
            isBestTime={isBestTime}
          />
        </div>
      ) : (
        <div>
          <BestPhoto setTotalParticipants={setTotalParticipants} />
          {/* <img src={trophy} alt="트로피" className="fixed bottom-[12vh] right-4 z-50 w-20 h-20" /> */}
        </div>
      )}

      <NavBar />
    </>
  );
};

export default TimePage;
