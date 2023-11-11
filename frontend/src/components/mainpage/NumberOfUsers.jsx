import React from "react"; // eslint-disable-line no-unused-vars
const NumberOfUsers = ( {aroundPeopleCount}) => {
  return(
    <>
      {/* <div className="w-full absolute bottom-10 flex justify-center px-5 "> */}
      <div className="w-full absolute flex justify-center px-5 py-5">
        <p className="w-full py-2.5 bg-white rounded-2xl text-center text-[#97c1ff]">
          주변에 {aroundPeopleCount}명의 사용자가 있어요
        </p>
      </div>
    </>
  );
};


export default NumberOfUsers;
