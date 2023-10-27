import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MailboxPage from "./pages/MailboxPage";
import TimePage from "./pages/TimePage"
import TimeUploadpage from "./pages/TimeUploadPage";
import LoginRediect from "./components/loginpage/LoginRediect";
import SpacePage from "./pages/SpacePage";
import ProfilePage from "./pages/ProfilePage";
import NearbyTracePage from "./pages/NearbyTracePage";
import NearbyLandmarkPage from "./pages/NearbyLandmarkPage";
import SpaceUploadpage from "./pages/SpaceUploadPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/kakao/callback" element={<LoginRediect />} />
        <Route path="/mailbox/:userId" element={<MailboxPage />} />
        <Route path="/time" element={<TimePage />} />
        <Route path="/time/upload" element={<TimeUploadpage />} />
        <Route path="/space" element={<SpacePage />} />
        <Route path="/space/trace" element={<NearbyTracePage />} />
        <Route path="/space/landmark" element={<NearbyLandmarkPage />} />
        <Route path="/space/upload" element={<SpaceUploadpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
