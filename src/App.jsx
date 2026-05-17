// packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components & pages
import TeamCreate from "./components/team_create";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HomePage from "./pages/homePage";
import TeamJoin from "./components/team_join";
import TeamPage from "./components/team_page";
import SchedulePage from "./components/schedule_page";
import TeamDetailPage from "./components/detail_page";
import ChatPage from "./components/chat_page";
import Mypage from "./components/mypage";
import TeamSelectPage from "./components/team_select";
import ChatInfo from "./components/chat_info";
import TeamModify from "./components/team_detail";
import TeamDetailCreatePage from "./components/team_detail";
import Mypage_user from "./components/mypage_user";
import NotificationPage from "./components/nofitication";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/team-create" element={<TeamCreate />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/team-join" element={<TeamJoin />} />
        <Route path="/project" element={<TeamPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/detail-page" element={<TeamDetailPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/team-select" element={<TeamSelectPage />} />
        <Route path="/chatinfo" element={<ChatInfo />} />
        <Route path="/team-modify" element={<TeamModify />} />
        <Route path="/team-detail" element={<TeamDetailCreatePage />} />
        <Route path="/notification" element={ <NotificationPage /> } />
        <Route path="/mypage_user" element={<Mypage_user />} />

      </Routes>
    </Router>
  );
}

export default App;