import React from "react";
import TimeZone from "./TimeZone";
import TimeHeader from "./TimeHeader";

const TimeHeaderTemplate = ({ currentTime }) => {
  return (
    <div className="mt-3">
      <TimeZone />
      <TimeHeader currentTime={currentTime} />
    </div>
  );
};

export default TimeHeaderTemplate;