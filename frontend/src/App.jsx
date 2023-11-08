import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MailboxPage from "./pages/MailboxPage";
import TimePage from "./pages/timepage/TimePage"
import PhotoUploadPage from "./pages/timepage/PhotoUploadPage";
import PhotoDetailPage from "./pages/timepage/PhotoDetailPage";
import LoginRediect from "./components/loginpage/LoginRediect";
import SpacePage from "./pages/SpacePage";
import NearbyTracePage from "./pages/NearbyTracePage";
import NearbyLandmarkPage from "./pages/NearbyLandmarkPage";
import SpaceUploadpage from "./pages/SpaceUploadPage";
import ProfilePage from "./pages/ProfilePage";
import ChatRoomPage from "./pages/ChatRoomPage";
import ChattingPage from './pages/ChattingPage';
import { AccessTokenAtom, checkAccessTokenExpiration } from './recoil/user/userAtom';
import { useRecoilValue } from "recoil";
import TutorialPage from "./pages/TutorialPage";
import TraceDetailPage from "./pages/TraceDetailPage";
import MyTracePage from "./pages/MyTracePage";
import LandmarkDetailPage from "./pages/LandmarkDetailPage";

function App() {

  const isLoggedIn = () => {
    if (checkAccessTokenExpiration()) {
      return useRecoilValue(AccessTokenAtom);
    } else {
      return false;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인이 필요한 페이지 */}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* 채팅 페이지 */}
            <Route path="/chatroom" element={<ChatRoomPage />} />
            <Route path="/chatting/:roomId" element={<ChattingPage />} />

            {/* 쪽지 페이지 */}
            <Route path="/mailbox" element={<MailboxPage />} />

            {/* 시간 페이지 */}
            <Route path="/time" element={<TimePage />} />
            <Route path="/time/upload" element={<PhotoUploadPage />} />
            <Route path="/time/:imageId" element={<PhotoDetailPage />} />

            {/* 공간페이지 */}
            <Route path="/space" element={<SpacePage />} />
            <Route path="/space/trace" element={<NearbyTracePage />} />
            <Route path="/space/trace/:traceId" element={<TraceDetailPage />} />
            <Route path="/space/landmark" element={<NearbyLandmarkPage />} />
            <Route path="/space/landmark/:landmarkId" element={<LandmarkDetailPage />} />
            <Route path="/space/upload" element={<SpaceUploadpage />} />
            <Route path="/mytrace" element={<MyTracePage />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}

        {/* 로그인 없이 접근 가능한 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/kakao/callback" element={<LoginRediect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
