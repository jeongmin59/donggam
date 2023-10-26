import React from "react";
import SpaceHeaderTemplate from "../components/spacepage/SpaceHeaderTemplate";
import ButtonTemplate from "../components/spacepage/ButtonTemplate";
import MyTrace from "../components/spacepage/MyTrace";

const SpacePage = () => {
  return(
    <div className="px-5">
      <SpaceHeaderTemplate />
      <MyTrace />
      <ButtonTemplate />
    </div>
  );
};

export default SpacePage;