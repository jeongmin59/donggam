import React from "react";
import CurrentLocation from "./CurrentLocation";
import CreateTrace from "./CreateTrace";

const SpaceHeaderTemplate = () => {
  return (
    <div className="mt-5">
      <CurrentLocation />
      <CreateTrace to="/space/upload" />
    </div>
  );
};

export default SpaceHeaderTemplate;