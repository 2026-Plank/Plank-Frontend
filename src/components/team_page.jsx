import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import searchIcon from "../assets/search_icon.png";
import menuIcon from "../assets/menu.svg";
import editIcon from "../assets/modify_icon.svg";
import deleteIcon from "../assets/delete_icon.svg";
import hideIcon from "../assets/hiding_down_icon.svg";

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

import { GlobalStyle, Menu, Symbol, Logo, Item, Background, Icon, Text, Line } from "../pages/homePage";
import { PageLayout, ContentBox } from "./schedule_page";
import { apiRequest, getAuthToken, mapApiTeam } from "../utils/api";

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 22px 30px 10px 20px;
`;

const SearchBox = styled.div`
  width: min(826px, 100%);
  height: 52px;
  padding: 0 20px 0 22px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid #c0da58;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
`;

const SearchIconImg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const JoinButton = styled.button`
  min-width: 146px;
  height: 52px;
  padding: 0 34px;
  border-radius: 100px;
  border: 1px solid #c0da58;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  color: #111;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
`;

const TeamBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 394px));
  gap: 20px;
  padding: 20px;
`;

const TeamBarContainer = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 418px;
  padding: 26px 32px 30px;
  justify-content: center;
  gap: 22px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

  &:hover {
    border: 1px solid #c0da58;
    box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.3), 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  }
`;

const EllipsisIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: auto;
  cursor: pointer;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TeamBarTitle = styled.h2`
  color: #111;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.35;
`;

const DetailBox = styled.div`
  display: flex;
  align-items: center;
`;

const LabelText = styled.span`
  width: 44px;
  color: #90a442;
  font-size: 16px;
  font-weight: 700;
`;

const TeamDetailText = styled.span`
  margin-left: 12px;
  color: #111;
  font-size: 16px;
  font-weight: 500;
`;

const ProgressText = styled.span`
  color: #111;
  text-align: right;
  font-size: 14px;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 2px;
  margin-top: 10px;
  background: #c9c9c8;
`;

const BarFill = styled.div`
  width: ${({ $progress }) => Math.min(Math.max(Number($progress) || 0, 0), 100)}%;
  height: 3px;
  background: #c0da58;
`;

const DetailText = styled.button`
  align-self: flex-end;
  border: 0;
  background: transparent;
  color: #70716f;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: #90a442;
  }
`;

const CreateButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c0da58;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  cursor: pointer;
`;

const CreateIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const MenuBox = styled.div`
  position: absolute;
  top: 62px;
  right: 28px;
  display: flex;
  width: 150px;
  padding: 12px 13px;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  z-index: 3;
`;

const MenuWapper = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const MenuText = styled.span`
  margin-left: 6px;
  color: #111;
  font-size: 14px;
  font-weight: 500;
`;

const MenuLine = styled.div`
  width: 100%;
  height: 0.5px;
  background: #c9c9c8;
`;

const CardTop = styled.div`
  display: flex;
  width: 100%;
`;

const HideWapper = styled.button`
  position: fixed;
  left: 150px;
  bottom: 60px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const HideText = styled.span`
  color: #70716f;
  font-size: 18px;
  font-weight: 500;
`;

const HideIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const menus = [
  { path: "/homepage", icon: home, activeIcon: in_home, label: "HOME" },
  { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
  { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
  { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
  { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" },
];

const initialTeams = [
  {
    id: 1,
    title: "올리브영 리디자인 프로젝트",
    period: "03/01 - 06/01",
    code: "x82olew",
    charge: "UI 디자인",
    progress: 65,
    description: "프로젝트 설명",
    members: [
      { name: "이민지", join_team: ["디자이너"] },
      { name: "박미주", join_team: ["디자이너"] },
      { name: "윤다경", join_team: ["기획자", "개발자"] },
      { name: "박재영", join_team: ["기획자"] },
      { name: "장시후", join_team: ["개발자"] },
      { name: "윤건", join_team: ["기획자", "개발자"] },
    ],
    team_explan: [
      { join_team: "기획자", explan: "아이디어 제작" },
      { join_team: "기획자", explan: "구체적인 페이지 또는 기능 설명" },
      { join_team: "개발자", explan: "디자인 피드백" },
      { join_team: "개발자", explan: "프로토타입 개발" },
      { join_team: "디자이너", explan: "페르소나 제작" },
      { join_team: "디자이너", explan: "프로토타입 제작" },
    ],
    team_deadline: [
      { join_team: "기획자", deadline: "03/01 - 04/01" },
      { join_team: "개발자", deadline: "05/01 - 06/01" },
      { join_team: "디자이너", deadline: "04/01 - 05/01" },
    ],
    hidden: false,
  },
  {
    id: 2,
    title: "서비스 개선 프로젝트",
    period: "04/01 - 07/01",
    code: "svc407",
    charge: "백엔드 개발",
    progress: 30,
    description: "서비스 흐름과 API 구조를 개선하는 프로젝트입니다.",
    members: [
      { name: "김하준", join_team: ["개발자"] },
      { name: "최서연", join_team: ["기획자"] },
    ],
    team_explan: [
      { join_team: "기획자", explan: "요구사항 정리" },
      { join_team: "개발자", explan: "API 개선" },
    ],
    team_deadline: [
      { join_team: "기획자", deadline: "04/01 - 04/20" },
      { join_team: "개발자", deadline: "04/21 - 07/01" },
    ],
    hidden: false,
  },
];

export default function TeamPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [teams, setTeams] = useState(initialTeams);
  const [showHidden, setShowHidden] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [search, setSearch] = useState("");
  const menuRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const hiddenCount = teams.filter((team) => team.hidden).length;
  const visibleTeams = teams
    .filter((team) => (showHidden ? team.hidden : !team.hidden))
    .filter((team) => team.title.toLowerCase().includes(search.trim().toLowerCase()));

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!getAuthToken()) return;

    const loadTeams = async () => {
      setIsLoading(true);
      try {
        const data = await apiRequest("/api/teams");
        if (Array.isArray(data?.teams)) {
          setTeams(data.teams.map(mapApiTeam));
        }
      } catch (error) {
        console.error("프로젝트 목록을 불러오지 못했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeams();
  }, []);

  const handleHide = (id) => {
    setTeams((prev) => prev.map((team) => (team.id === id ? { ...team, hidden: true } : team)));
    setOpenMenuId(null);
  };

  const handleDelete = async (id) => {
    try {
      if (getAuthToken() && id) {
        await apiRequest(`/api/teams/${id}`, { method: "DELETE" });
      }
      setTeams((prev) => prev.filter((team) => team.id !== id));
    } catch (error) {
      alert(error.message || "프로젝트 삭제에 실패했습니다.");
    }
    setOpenMenuId(null);
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
          <HeaderBar>
            <SearchBox>
              <SearchInput
                type="search"
                aria-label="프로젝트 검색"
                placeholder="프로젝트 검색"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <SearchIconImg src={searchIcon} alt="" />
            </SearchBox>

            <JoinButton type="button" onClick={() => navigate("/team-join")}>
              참가하기
            </JoinButton>
          </HeaderBar>

          <TeamBox>
            {isLoading && <TeamBarTitle>프로젝트를 불러오는 중입니다.</TeamBarTitle>}
            {visibleTeams.map((team) => (
              <TeamBarContainer key={team.id}>
                <CardTop>
                  <EllipsisIcon
                    src={menuIcon}
                    alt="프로젝트 메뉴"
                    onClick={() => setOpenMenuId((prev) => (prev === team.id ? null : team.id))}
                  />
                </CardTop>

                {openMenuId === team.id && (
                  <MenuBox ref={menuRef}>
                    <MenuWapper
                      type="button"
                      onClick={() => navigate("/team-modify", { state: { team }, from: "project" })}
                    >
                      <MenuIcon src={editIcon} alt="" />
                      <MenuText>수정</MenuText>
                    </MenuWapper>
                    <MenuLine />
                    <MenuWapper type="button" onClick={() => handleHide(team.id)}>
                      <MenuIcon src={hideIcon} alt="" />
                      <MenuText>숨김</MenuText>
                    </MenuWapper>
                    <MenuLine />
                    <MenuWapper type="button" onClick={() => handleDelete(team.id)}>
                      <MenuIcon src={deleteIcon} alt="" />
                      <MenuText>삭제</MenuText>
                    </MenuWapper>
                  </MenuBox>
                )}

                <TextBox>
                  <TeamBarTitle>{team.title}</TeamBarTitle>
                  <DetailBox>
                    <LabelText>기간</LabelText>
                    <TeamDetailText>{team.period}</TeamDetailText>
                  </DetailBox>
                  <DetailBox>
                    <LabelText>담당</LabelText>
                    <TeamDetailText>{team.charge}</TeamDetailText>
                  </DetailBox>
                </TextBox>

                <ProgressText>{team.progress}%</ProgressText>
                <ProgressBar>
                  <BarFill $progress={team.progress} />
                </ProgressBar>

                <DetailText type="button" onClick={() => navigate("/detail-page", { state: { team } })}>
                  자세히 보기
                </DetailText>
              </TeamBarContainer>
            ))}
          </TeamBox>

          <HideWapper type="button" onClick={() => setShowHidden((prev) => !prev)}>
            <HideText>숨김 ({hiddenCount})</HideText>
            <HideIcon
              src={hideIcon}
              alt=""
              style={{
                transform: showHidden ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </HideWapper>

          <CreateButton type="button" onClick={() => navigate("/team-create")}>
            <CreateIcon src={editIcon} alt="프로젝트 생성" />
          </CreateButton>
        </ContentBox>
      </PageLayout>
    </>
  );
}