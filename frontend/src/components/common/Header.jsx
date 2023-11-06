import { useNavigate } from "react-router-dom";
import BackBtn from "../../assets/common/back-btn.svg";

const Header = ({ title, to }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(to);
  }

  return (
    <>
      {/* <div 
        className="header w-100 h-[100px] flex justify-center items-center pt-[30px] bg-white relative shadow-md"> */}
      <div
        className="header w-100 h-[100px] flex justify-center items-center pt-[30px] relative shadow-md">
        <div className="absolute left-5" onClick={navigateTo}>
          <img src={BackBtn} alt="뒤로가기버튼" />
        </div>
        <h2 className="text-center text-black">{title}</h2>
      </div>
    </>
  )
}

export default Header;