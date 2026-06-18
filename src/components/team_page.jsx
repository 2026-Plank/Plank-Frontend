//packages
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

//assets, components
import searchIcon from "../assets/search_icon.png";
import createIcon from "../assets/add_icon.svg";
import menuIcon from "../assets/menu.svg";
import modifyIcon from "../assets/modify_icon.svg";
import hidingIcon from "../assets/hiding_icon.svg";
import deleteIcon from "../assets/delete_icon.svg";
import hideIcon from "../assets/hiding_down_icon.svg";

import { GlobalStyle } from "../pages/homePage";
import MenuLayout from "./menu_layout";
import { PageLayout } from "./schedule_page";
import { ContentBox } from "./schedule_page";
import { formatTeamPeriod } from "../utils/teamDisplay";
import { calculateProgress, loadProjectTasks } from "../utils/projectTasks";
import { apiRequest, mapApiTeam } from "../utils/api";

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 16px;
    gap: 10px;
    box-sizing: border-box;
  }
`;
const SearchBox = styled.div`
  display: flex;
  width: min(826px, calc(100% - 220px));
  height: 52px;
  padding: 13px 20px 13px 22px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 100px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  background: var(--white-1, #fff);
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex: 1;
    width: auto;
    min-width: 0;
    padding: 12px 14px;
  }
`;
const SearchInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
`;
const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
  margin-left: 10px;
  cursor: pointer;
`;
const JoinButton = styled.button`
  margin-right: 30px;
  cursor: pointer;
  width: 157px;
  height: 52px;
  padding: 14px 43px 14px 44px;
  justify-content: center;
  align-items: center;

  border-radius: 100px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  background: var(--white-1, #fff);
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

  color: var(--black-1, #000);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 768px) {
    width: auto;
    min-width: 92px;
    margin-right: 0;
    padding: 0 18px;
    font-size: 15px;
    flex-shrink: 0;
  }
`;
const TeamBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 20px;

  @media (max-width: 768px) {
    margin: 8px 16px 96px;
    grid-template-columns: 1fr;
  }
`;
const TeamBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 394px;
  height: 418px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 16px;
  background: var(--white-1, #fff);
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

  &:hover {
    border-radius: 16px;
    border: 1px solid var(--Light-Green-2, #C0DA58);
    background: var(--white-1, #FFF);
    box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30), 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    max-width: none;
    height: auto;
    min-height: 320px;
    padding: 18px 10px;
  }
`;
const EllipsisIcon = styled.img`
  width: 24px;
  height: 24px;
  justify-content: flex-end;
  margin-left: auto;
  aspect-ratio: 1/1;
  cursor: pointer;
`;
const TextBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const TeamBarTitle = styled.span`
  align-self: stretch;
  color: var(--black-1, #000);
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const DetailBox = styled.div``;
const PeriodText = styled.span`
  color: var(--Light-Green-3, #90a442);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const TeamDetailText = styled.span`
  margin-left: 12px;
  color: var(--black-1, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const ChargeText = styled.span`
  color: var(--Light-Green-3, #90a442);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ProgressText = styled.span`
  color: var(--black-1, #000);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 70%;
`;
const BarWapper = styled.div`
  align-items: center;

`;
const ProgressBar = styled.div`
  width: min(290px, 72vw);
  height: 2px;
  background: #c9c9c8;
  border-radius: 10px;
`;
const BarFill = styled.div`
  align-items: center;
  width: ${({ $progress }) => $progress}%;
  height: 3px;
  background: #c0da58;
  border-radius: 40px;
`;
const DetailText = styled.span`
  color: var(--Gray-7, #70716f);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  margin-left: 60%;
  margin-top: 20px;

  cursor: pointer;

  &:hover {
    color: var(--Light-Green-3, #90a442);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
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
  border: none;

  border-radius: 42.5px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  background: var(--white-1, #fff);
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

  cursor: pointer;

  @media (max-width: 768px) {
    right: 18px;
    bottom: calc(82px + env(safe-area-inset-bottom));
    width: 56px;
    height: 56px;
  }
`;
const CreateIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const MenuBox = styled.div`
  position: absolute;
  top: 100px;
  right: 50px;
  display: flex;
  width: 150px;
  height: 113px;
  padding: 0 13px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 12px;
  background: var(--white-1, #fff);
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
`;
const MenuWapper = styled.div`
  display: flex;
  cursor: pointer;
`;
const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
  aspect-ratio: 1/1;
`;
const MenuText = styled.span`
  margin-left: 5px;
  color: var(--black-1, #000);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const MenuLine = styled.div`
  width: 124px;
  height: 0.5px;
  background: #c9c9c8;
`;
const Wapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;
const HideWapper = styled.div`
  display: flex;
  position: fixed;
  left: 150px;
  bottom: 60px;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  @media (max-width: 768px) {
    left: 18px;
    bottom: calc(98px + env(safe-area-inset-bottom));
  }
`;
const HideText = styled.span`
  color: var(--Gray-7, #70716F);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const HideIcon = styled.img`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
`;
const EmptyText = styled.p`
  margin: 40px 20px;
  color: #70716f;
  font-size: 16px;
`;

const fetchTeamDetail = async (team) => {
  if (!team?.id) return team;
  try {
    const data = await apiRequest(`/api/teams/${team.id}`);
    return mapApiTeam(data.team || team);
  } catch {
    return team;
  }
};

const rememberSelectedTeam = (team) => {
  sessionStorage.setItem("plank-selected-team", JSON.stringify(team));
};

export default function TeamPage() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showHidden, setShowHidden] = useState(false);
  const hiddenCount = teams.filter((t) => t.hidden).length;
  const visibleTeams = teams.filter((t) => showHidden ? t.hidden : !t.hidden);


  const [openMenuId, setOpenMenuId] = useState(null);

  const menuRef = useRef();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      try {
        const data = await apiRequest("/api/teams");
        const baseTeams = (data.teams || []).map(mapApiTeam);
        const detailedTeams = await Promise.all(baseTeams.map(fetchTeamDetail));
        setTeams(detailedTeams);
        setError("");
      } catch (err) {
        setError(err.message || "프로젝트를 불러오지 못했습니다.");
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = () => {
    console.log("검색어:", search);
  };
  const handleHide = (id) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, hidden: true } : t))
    );
    setOpenMenuId(null);
  };

  const handleDeleteTeam = async (team) => {
    if (!team?.id) return;
    try {
      await apiRequest(`/api/teams/${team.id}`, { method: "DELETE" });
      setTeams((prev) => prev.filter((t) => t.id !== team.id));
      setOpenMenuId(null);
    } catch (err) {
      alert(err.message || "프로젝트 삭제에 실패했습니다.");
    }
  };

  const openTeamModify = async (team) => {
    const detailedTeam = await fetchTeamDetail(team);
    rememberSelectedTeam(detailedTeam);
    navigate("/team-modify", { state: { team: detailedTeam }, from: "project" });
  };

  const openTeamDetail = async (team) => {
    const detailedTeam = await fetchTeamDetail(team);
    rememberSelectedTeam(detailedTeam);
    navigate("/detail-page", { state: { team: detailedTeam } });
  };

  return (
    <>
      <GlobalStyle />
      <PageLayout>
        <MenuLayout />
        <ContentBox>
          <HeaderBar>
            <SearchBox>
              <SearchInput
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <SearchIcon src={searchIcon} onClick={handleSearch} />
            </SearchBox>
            <JoinButton onClick={() => navigate("/team-join")}>
              참가하기
            </JoinButton>
          </HeaderBar>
          {loading && <EmptyText>프로젝트를 불러오는 중입니다.</EmptyText>}
          {!loading && error && <EmptyText>{error}</EmptyText>}
          {!loading && !error && visibleTeams.length === 0 && <EmptyText>프로젝트가 없습니다.</EmptyText>}
          <TeamBox>
            {visibleTeams.map((team) => {
              const projectTasks = loadProjectTasks(team);
              const progress = calculateProgress(projectTasks, 0);

              return (
              <TeamBarContainer key={team.id}>
                <Wapper>
                  <EllipsisIcon
                    src={menuIcon}
                    onClick={() =>
                      setOpenMenuId((prev) =>
                        prev === team.id ? null : team.id
                      )
                    }
                  />
                </Wapper>

                {openMenuId === team.id && (
                  <MenuBox ref={menuRef}>
                    <MenuWapper onClick={() => openTeamModify(team)}>
                      <MenuIcon src={modifyIcon} />
                      <MenuText>수정</MenuText>
                    </MenuWapper>
                    <MenuLine />
                    <MenuWapper onClick={() => handleHide(team.id)}>
                      <MenuIcon src={hidingIcon} />
                      <MenuText>숨김</MenuText>
                    </MenuWapper>
                    <MenuLine />
                    <MenuWapper onClick={() => handleDeleteTeam(team)}>
                      <MenuIcon src={deleteIcon} />
                      <MenuText>삭제</MenuText>
                    </MenuWapper>
                  </MenuBox>
                )}

                <TextBox>
                  <TeamBarTitle>{team.title}</TeamBarTitle>
                  <DetailBox>
                    <PeriodText>기간</PeriodText>
                    <TeamDetailText>{formatTeamPeriod(team)}</TeamDetailText>
                  </DetailBox>
                </TextBox>

                <ProgressText>{progress}%</ProgressText>
                <BarWapper>
                  <ProgressBar>
                    <BarFill $progress={progress} />
                  </ProgressBar>
                </BarWapper>

                <DetailText onClick={() => openTeamDetail(team)}>
                  자세히 보기
                </DetailText>
              </TeamBarContainer>
            )})}
          </TeamBox>
          <HideWapper onClick={() => setShowHidden((prev) => !prev)}>
              <HideText>숨김 ({hiddenCount})</HideText>
              <HideIcon src={hideIcon} style={{ transform: showHidden ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </HideWapper>
          <CreateButton onClick={() => navigate("/team-create")}>
            <CreateIcon src={createIcon} />
          </CreateButton>
        </ContentBox>
      </PageLayout>
    </>
  );
}
