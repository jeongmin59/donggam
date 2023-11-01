import React from "react";
import TimeZone from "./TimeZone";
import TimeHeader from "./TimeHeader";
import TimeParticipant from "./TimeParticipant";

const TimeHeaderTemplate = ({ currentTime }) => {
  return (
    <div className="mt-3">
      <TimeZone />
      <TimeHeader currentTime={currentTime} />
      <TimeParticipant currentTime={currentTime} />
    </div>
  );
};

export default TimeHeaderTemplate;