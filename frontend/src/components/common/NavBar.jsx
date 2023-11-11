import React from "react";
import mainPageIcon from "../../assets/icons/main-page-icon.svg"
import timePageIcon from "../../assets/icons/time-page-icon.svg"
import spacePageIcon from "../../assets/icons/space-page-icon.svg"
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleMainPageClick = () => {
    navigate('/');
  };

  const handleTimePageClick = () => {
    navigate('/time');
  };

  const handleSpacePageClick = () => {
    navigate('/space');
  };

  return (
    <>
      <div className="w-full fixed flex items-center justify-center px-5 bottom-5">
        <div className="nav-shadow rounded-[50px] bg-white flex py-4 px-10 w-full justify-between space-x-2">
          <img src={timePageIcon} alt="Time Page" onClick={handleTimePageClick} />
          <img src={mainPageIcon} alt="Main Page" onClick={handleMainPageClick} />
          <img src={spacePageIcon} alt="Space Page" onClick={handleSpacePageClick} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
