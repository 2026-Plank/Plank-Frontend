import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import addIcon from "../assets/add_icon.svg";
import searchIcon from "../assets/search_icon.png";
import menuIcon from "../assets/menu.svg";
import editIcon from "../assets/modify_icon.svg";
import deleteIcon from "../assets/delete_icon.svg";
import hidingDownIcon from "../assets/hiding_down_icon.svg";
import symbol from "../assets/symbol.svg";
import home from "../assets/home.svg";
import in_home from "../assets/in_home.svg";
import calendar from "../assets/calendar.svg";
import in_calendar from "../assets/in_calendar.svg";
import pen from "../assets/pen.svg";
import in_pen from "../assets/in_pen.svg";
import chat from "../assets/chat.svg";
import in_chat from "../assets/in_chat.svg";
import icon from "../assets/icon.svg";
import in_icon from "../assets/in_icon.svg";
import alarm from "../assets/alarm.svg";
import logo from "../assets/logo.svg";

import { GlobalStyle } from "../pages/homePage";
import { Menu, Symbol, Logo, Item, Background, Icon, Text, Line } from "../pages/homePage";
import { PageLayout, ContentBox } from "./schedule_page";

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px 34px 26px;
`;

const SearchBox = styled.div`
  width: min(620px, 52vw);
  height: 36px;
  border: 1px solid #c0da58;
  border-radius: 999px;
  display: flex;
  align-items: center;
  padding: 0 18px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: 0;
  outline: 0;
  font-size: 14px;
`;

const SearchImg = styled.img`
  width: 17px;
  height: 17px;
`;

const JoinButton = styled.button`
  margin-left: auto;
  width: 116px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid #c0da58;
  background: #fff;
  color: #111;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 26px;
  padding: 0 34px 24px;
`;

const Card = styled.article`
  position: relative;
  min-height: 210px;
  padding: 46px 28px 22px;
  border: 1px solid ${({ $featured }) => ($featured ? "#c0da58" : "transparent")};
  border-radius: 10px;
  background: #fff;
  box-shadow: ${({ $featured }) =>
    $featured ? "0 0 18px rgba(192, 218, 88, 0.45)" : "0 0 11.9px 2px rgba(0, 0, 0, 0.08)"};
`;

const CardTitle = styled.h2`
  margin: 0 0 18px;
  color: #111;
  font-size: 18px;
  font-weight: 800;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 20px;
  right: 24px;
  width: 30px;
  height: 30px;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const MenuImg = styled.img`
  width: 18px;
  height: 18px;
`;

const MenuLayer = styled.div`
  position: absolute;
  top: 46px;
  right: 28px;
  width: 118px;
  padding: 8px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.14);
  z-index: 2;
`;

const MenuAction = styled.button`
  width: 100%;
  height: 32px;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #555;
  font-size: 12px;
  cursor: pointer;
`;

const ActionIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const MetaLine = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
  color: #111;
  font-size: 13px;
`;

const MetaLabel = styled.span`
  color: #90a442;
  font-weight: 700;
`;

const ProgressTop = styled.div`
  margin-top: 34px;
  color: #111;
  text-align: right;
  font-size: 11px;
`;

const ProgressTrack = styled.div`
  height: 2px;
  margin-top: 10px;
  background: #c9c9c8;
`;

const ProgressBar = styled.div`
  width: ${({ $value }) => $value}%;
  height: 100%;
  background: #c0da58;
`;

const DetailButton = styled.button`
  display: block;
  margin: 30px 0 0 auto;
  border: 0;
  background: transparent;
  color: #555;
  font-size: 12px;
  cursor: pointer;
`;

const HiddenToggle = styled.button`
  margin: 0 34px 80px;
  border: 0;
  background: transparent;
  color: #70716f;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HiddenIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const FloatingAdd = styled.button`
  position: fixed;
  right: 38px;
  bottom: 38px;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  border: 1px solid #c0da58;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FloatingImg = styled.img`
  width: 28px;
  height: 28px;
`;

const Message = styled.div`
  padding: 0 34px 20px;
  color: ${({ $error }) => ($error ? "#d9534f" : "#7e9640")};
  font-size: 14px;
  font-weight: 600;
`;

const EmptyState = styled.div`
  margin: 0 34px 28px;
  padding: 48px 20px;
  border: 1px dashed #d8d8d7;
  border-radius: 10px;
  text-align: center;
  color: #90908f;
`;

const formatShortDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
};

const toDetailState = (team) => ({
  id: team.id,
  title: team.name,
  period: team.deadline ? `03/01 - ${formatShortDate(team.deadline)}` : "",
  code: team.teamCode,
  charge: team.dpLeader,
  members: [],
  description: team.dpName || team.name,
  team_explan: [],
  team_deadline: []
});

export default function TeamPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [teams, setTeams] = useState([]);
  const [scheduleCountsByTeam, setScheduleCountsByTeam] = useState({});
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [error, setError] = useState("");

  const menus = [
    { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
    { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
    { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
    { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
    { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" }
  ];

  const filteredTeams = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery) return teams;
    return teams.filter((team) => `${team.name} ${team.dpName} ${team.dpLeader}`.toLowerCase().includes(lowerQuery));
  }, [query, teams]);

  const loadTeams = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.get("/api/teams", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const nextTeams = response.data.teams || [];
      setTeams(nextTeams);
      setError("");

      const scheduleEntries = await Promise.all(
        nextTeams.map(async (team) => {
          try {
            const scheduleResponse = await axios.get(`/api/schedules/${team.id}`);
            return [team.id, scheduleResponse.data.schedules?.length || 0];
          } catch {
            return [team.id, 0];
          }
        })
      );
      setScheduleCountsByTeam(Object.fromEntries(scheduleEntries));
    } catch (loadError) {
      setError(loadError.response?.data?.error || "프로젝트 목록을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const openDetail = (team) => {
    localStorage.setItem("teamId", String(team.id));
    navigate("/detail-page", { state: { team: toDetailState(team) } });
  };

  const editTeam = (team) => {
    localStorage.setItem("teamId", String(team.id));
    navigate("/team-detail", { state: { team: toDetailState(team), editMode: true } });
  };

  const deleteTeam = async (teamId) => {
    if (!window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
      setOpenMenuId(null);
    } catch (deleteError) {
      setError(deleteError.response?.data?.error || "프로젝트 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageLayout>
        <Menu>
          <Symbol className="symbol" src={symbol} />
          <Logo className="logo" src={logo} />
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <Item key={menu.path} onClick={() => navigate(menu.path)}>
                <Background $active={isActive} />
                <Icon src={isActive ? menu.activeIcon : menu.icon} />
                <Text className="text">{menu.label}</Text>
              </Item>
            );
          })}
          <Line />
          <Item onClick={() => navigate("/notification")}>
            <Icon src={alarm} />
            <Text className="text">NOTIFICATIONS</Text>
          </Item>
        </Menu>

        <ContentBox>
          <Toolbar>
            <SearchBox>
              <SearchInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="프로젝트 검색"
              />
              <SearchImg src={searchIcon} alt="" />
            </SearchBox>
            <JoinButton type="button" onClick={() => navigate("/team-join")}>
              참가하기
            </JoinButton>
          </Toolbar>

          {error ? <Message $error>{error}</Message> : null}

          {filteredTeams.length ? (
            <Grid>
              {filteredTeams.map((team, index) => {
                const scheduleCount = scheduleCountsByTeam[team.id] || 0;
                const progress = Math.min(scheduleCount * 10, 100);
                return (
                  <Card key={team.id} $featured={index === 0}>
                    <MenuButton type="button" onClick={() => setOpenMenuId(openMenuId === team.id ? null : team.id)}>
                      <MenuImg src={menuIcon} alt="menu" />
                    </MenuButton>
                    {openMenuId === team.id ? (
                      <MenuLayer>
                        <MenuAction type="button" onClick={() => editTeam(team)}>
                          <ActionIcon src={editIcon} alt="" />
                          수정
                        </MenuAction>
                        <MenuAction type="button" onClick={() => navigator.clipboard.writeText(team.teamCode || "")}>
                          <ActionIcon src={addIcon} alt="" />
                          초대
                        </MenuAction>
                        <MenuAction type="button" onClick={() => deleteTeam(team.id)}>
                          <ActionIcon src={deleteIcon} alt="" />
                          삭제
                        </MenuAction>
                      </MenuLayer>
                    ) : null}
                    <CardTitle>{team.name}</CardTitle>
                    <MetaLine>
                      <MetaLabel>기간</MetaLabel>
                      <span>03/01 - {formatShortDate(team.deadline)}</span>
                    </MetaLine>
                    <MetaLine>
                      <MetaLabel>담당</MetaLabel>
                      <span>{team.dpName || "UX 분석"}</span>
                    </MetaLine>
                    <ProgressTop>{progress}%</ProgressTop>
                    <ProgressTrack>
                      <ProgressBar $value={progress} />
                    </ProgressTrack>
                    <DetailButton type="button" onClick={() => openDetail(team)}>
                      자세히 보기
                    </DetailButton>
                  </Card>
                );
              })}
            </Grid>
          ) : (
            <EmptyState>표시할 프로젝트가 없습니다.</EmptyState>
          )}

          <HiddenToggle type="button">
            숨김 (2)
            <HiddenIcon src={hidingDownIcon} alt="" />
          </HiddenToggle>
          <FloatingAdd type="button" onClick={() => navigate("/team-create")}>
            <FloatingImg src={addIcon} alt="프로젝트 생성" />
          </FloatingAdd>
        </ContentBox>
      </PageLayout>
    </>
  );
}
