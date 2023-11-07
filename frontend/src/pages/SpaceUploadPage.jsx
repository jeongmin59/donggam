import React, { useState } from "react";
import Header from "../components/common/Header";
import TraceUpload from "../components/spacepage/TraceUpload";
import LandmarkUpload from "../components/spacepage/LandmarkUpload";

const SpaceUploadpage = () => {
  const [activeTab, setActiveTab] = useState("trace")

  return (
    <>
      <Header title="방명록 등록하기" to="/space" />
      <div>
        <div className="flex justify-between pt-3 px-2">
          <div
            onClick={() => setActiveTab("trace")}
            className={`${activeTab === "trace" ? "active text-[var(--subColor2)]" : "text-gray-400"}
              w-[100%] flex justify-center py-2`}
          >
            <h2>방명록</h2>
          </div>
          <div
            onClick={() => setActiveTab("landmark")}
            className={`${activeTab === "landmark" ? "acitve text-[var(--subColor2)]" : "text-gray-400"}
              w-[100%]  flex justify-center py-2`}
          >
            <h2>랜드마크</h2>
          </div>
        </div>
        {activeTab === "trace" && <TraceUpload />}
        {activeTab === "landmark" && <LandmarkUpload />}
      </div>
    </>
  );
};

export default SpaceUploadpage;