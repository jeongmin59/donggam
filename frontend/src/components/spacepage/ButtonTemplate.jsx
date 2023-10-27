import React from "react";
import FindingTraceButton from "./FindingTraceButton";
import FindingLandmarkButton from "./FindingLandmarkButton";

const ButtonTemplate = () => {
  return(
    <div className="px-5 fixed bottom-3 left-0 right-0">
      <FindingTraceButton to="/space/trace"/>
      <FindingLandmarkButton to="/space/landmark" />
    </div>
  );
};

export default ButtonTemplate;