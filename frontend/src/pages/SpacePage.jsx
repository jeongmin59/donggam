import React from "react";
import SpaceHeaderTemplate from "../components/spacepage/SpaceHeaderTemplate";
import ButtonTemplate from "../components/spacepage/ButtonTemplate";
import MyTrace from "../components/spacepage/MyTrace";
import Header from "../components/common/Header"

const SpacePage = () => {
  return(
    <>
      <SpaceHeaderTemplate />
      <MyTrace />
      <ButtonTemplate />
    </>
  );
};

export default SpacePage;