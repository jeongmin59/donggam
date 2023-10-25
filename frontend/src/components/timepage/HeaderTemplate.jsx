import React from "react";
import TimeZone from "./TimeZone";
import TimeHeader from "./TimeHeader";

const HeaderTemplate = ({ currentTime }) => {
  return (
    <>
      <TimeZone />
      <TimeHeader currentTime={currentTime} />
    </>
  );
};

export default HeaderTemplate;