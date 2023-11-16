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
import { AccessTokenAtom } from './recoil/user/userAtom';
import { useRecoilValue } from "recoil";
import TutorialPage from "./pages/TutorialPage";
import TraceDetailPage from "./pages/TraceDetailPage";
import MyTracePage from "./pages/MyTracePage";
import LandmarkDetailPage from "./pages/LandmarkDetailPage";
import ChatPage from './pages/ChatPage.jsx';
import './firebase.js';

function App() {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      console.log("Service Worker registered with scope : ", registration.scope);
    })
    .catch(error => {
      console.log("Service Worker registration failed : ", error);
    })
  }

  const isLoggedIn = useRecoilValue(AccessTokenAtom);

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
            <Route path="/chat" element={<ChatPage />} />

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
