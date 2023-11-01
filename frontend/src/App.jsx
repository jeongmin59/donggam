import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ChattingPage from "./pages/ChattinPage";
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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/kakao/callback" element={<LoginRediect />} />
        <Route path="/chatting/:userId" element={<ChattingPage />} />
        <Route path="/mailbox" element={<MailboxPage />} />
        <Route path="/time" element={<TimePage />} />
        <Route path="/time/upload" element={<PhotoUploadPage />} />
        <Route path="/time/:imageId" element={<PhotoDetailPage />} />
        <Route path="/space" element={<SpacePage />} />
        <Route path="/space/trace" element={<NearbyTracePage />} />
        <Route path="/space/landmark" element={<NearbyLandmarkPage />} />
        <Route path="/space/upload" element={<SpaceUploadpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
