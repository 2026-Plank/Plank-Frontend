import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

// 이미지 임포트
import symbol from '../assets/symbol.svg';
import home from '../assets/home.svg';
import in_home from '../assets/in_home.svg';
import calendar from '../assets/calendar.svg';
import in_calendar from '../assets/in_calendar.svg';
import pen from '../assets/pen.svg';
import in_pen from '../assets/in_pen.svg';
import chat from '../assets/chat.svg';
import in_chat from '../assets/in_chat.svg';
import icon from '../assets/icon.svg';
import in_icon from '../assets/in_icon.svg';
import alarm from '../assets/alarm.svg';
import setting from '../assets/setting.svg';
import logo from '../assets/logo.svg';
import manage from '../assets/manage.svg';
import profile from '../assets/profile.svg';
import edit_icon from '../assets/edit_icon.svg';

// 하단 리스트 아이콘
import mypage_message from '../assets/mypage_message.svg';
import mypage_user from '../assets/mypage_user.svg';
import mypage_info from '../assets/mypage_info.svg';
import mypage_question from '../assets/mypage_question.svg';
import mypage_logout from '../assets/mypage_logout.svg';
import Nofitication from "./nofitication";

/* --- Global Styles --- */
export const GlobalStyle = createGlobalStyle`
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");
    * {
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        margin: 0; padding: 0; box-sizing: border-box;
    }
    body { background-color: #FFF; overflow-x: hidden; }
`;

/* --- [절대 수정 금지] 메뉴바 스타일 --- */
const Menu = styled.div`
    height: 100vh; width: 130px; background-color: #F9F9F8; transition: 0.3s ease-in-out;
    overflow: hidden; display: flex; flex-direction: column; align-items: center;
    position: fixed; z-index: 10;
    &:hover { width: 316px; }
    &:hover .text { opacity: 1; transform: translateX(0); }
    &:hover .symbol { display: none; }
    &:hover .logo { display: block; }
`;
const Symbol = styled.img` height: 70px; width: 62px; margin-top: 65px; margin-bottom: 50px; `;
const Logo = styled.img` width: 132px; height: 65px; margin-top: 65px; margin-bottom: 50px; display: none; `;
const Item = styled.div` width: 100%; height: 70px; display: flex; align-items: center; padding-left: 30px; position: relative; cursor: pointer; `;
const Background = styled.div`
    width: 52px; height: 52px; position: absolute; left: 37px; top: 50%; transform: translateY(-50%);
    background: #FFF; border-radius: 50%;
    box-shadow: ${({ $active }) => $active ? "0 0 30px 2px rgba(192, 218, 88, 0.30)" : "none"};
    display: ${({ $active }) => ($active ? "block" : "none")};
    transition: 0.3s;
    ${Menu}:hover & { width: 272px; height: 52px; border-radius: 8px; left: 20px; }
`;

const StateMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;

  width: 160px;
  background: #fff;
  border-radius: 12px;
  padding: 8px 0;

  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  z-index: 999;
`;

const StateItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #${props => props.color};
`;

const Label = styled.span`
  font-size: 14px;
  color: #333;
`;

const Icon = styled.img` width: 28px; height: 28px; margin-left: 21px; z-index: 2; `;
const Text = styled.span` margin-left: 40px; font-size: 16px; color: #333; font-weight: 500; opacity: 0; transform: translateX(-10px); transition: 0.3s; z-index: 2; white-space: nowrap; `;
const Line = styled.div` width: 60px; height: 1px; background-color: #C9C9C8; margin: 40px 0; transition: 0.3s; ${Menu}:hover & { width: 240px; } `;

/* --- 메인 컨텐츠 영역 --- */
const MainContent = styled.div`
    margin-left: 130px; padding: 60px; min-height: 100vh;
    display: flex; flex-direction: column; align-items: center;
`;

const ManageIcon = styled.img`
    width: 32px; height: 32px; cursor: pointer; align-self: flex-end;
    margin-top: -30px; margin-bottom: 30px;
`;

const Hr = styled.hr`
    width: calc(100% + 120px); border: none; height: 1px;
    background-color: #D9D9D9; margin-bottom: 40px;
`;

const CenterSection = styled.div`
    width: 100%; max-width: 1000px;
`;

/* 프로필 섹션 */
const ProfileSection = styled.div`
    width: 100%; padding: 10px 0; display: flex; align-items: center; 
    position: relative; margin-bottom: 40px;
`;
const ProfileImg = styled.img` width: 100px; height: 100px; border-radius: 50%; object-fit: cover; `;
const ProfileInfo = styled.div`
    margin-left: 25px;
    .name-row { display: flex; align-items: baseline; gap: 8px; }
    .name { font-size: 24px; font-weight: 700; color: #333; }
    .job { font-size: 14px; color: #AAA; }
    .status-msg { font-size: 16px; color: #666; margin-top: 8px; }
    .active-status { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #333; margin-top: 10px; font-weight: 500; }
    .dot { width: 8px; height: 8px; background-color: #84C043; border-radius: 50%; }
`;
const EditBtn = styled.img` position: absolute; right: 0; top: 10px; width: 24px; cursor: pointer; `;

/* 프로젝트 통계 */
const StatsContainer = styled.div`
    width: 100%; border: 1px solid #E0E0E0; border-radius: 20px;
    display: flex; padding: 30px 0; margin-bottom: 50px;
    background-color: #FFF; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); 
`;
const StatBox = styled.div`
    flex: 1; text-align: center; border-right: ${props => props.$last ? "none" : "1px solid #E0E0E0"};
    .count { font-size: 32px; font-weight: 700; color: #D9E99E; margin-bottom: 5px; }
    .label { font-size: 14px; color: #888; }
`;

/* 하단 메뉴 리스트 */
const MenuList = styled.div` width: 100%; `;
const MenuListItem = styled.div`
    display: flex; align-items: center; padding: 20px 0;
    font-size: 17px; color: #333; cursor: pointer; 
    border-bottom: ${props => props.$border ? "1px solid #EBEBEB" : "none"};
    
    img { width: 24px; height: 24px; margin-right: 15px; }
    &:hover { font-weight: 600; }
`;

export default function MyPage() {
    const navigate = useNavigate();
    const location = useLocation();

    let user = null;

    try {
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedUser !== "undefined") {
            user = JSON.parse(storedUser);
        }
    } catch (e) {
        console.error("user 파싱 실패", e);
    }

    // 상태 목록
    const statusList = [
        { color: "3AB92C", label: "활동 중", value: "ONLINE" },
        { color: "F0CF19", label: "자리비움", value: "IDLE" },
        { color: "F04419", label: "방해 금지", value: "DND" },
        { color: "B9B9B9", label: "오프라인", value: "OFFLINE" },
    ];

    // 현재 상태
    const [currentState, setCurrentState] = useState(statusList[0]); // 기본 오프라인
    const [openMenu, setOpenMenu] = useState(false);


    const [stats, setStats] = useState({
        total: 0,
        progress: 0,
        done: 0
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:3000/api/teams", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const teams = data.teams || [];

                setStats({
                    total: teams.length,
                    progress: teams.filter(t => t.progress < 100).length,
                    done: teams.filter(t => t.progress === 100).length
                });
            })
            .catch(err => console.error(err));
    }, []);

    // 로그아웃 처리 함수
    const handleLogout = () => {
        // 필요 시 로컬스토리지 토큰 삭제 등 추가 가능
        // localStorage.removeItem("token"); 
        alert("로그아웃 되었습니다.");
        navigate("/"); // 로그인 페이지 경로 (보통 / 혹은 /login)
    };

    const menus = [
        { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
        { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
        { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
        { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
        { path: "/mypage", icon: icon, activeIcon: in_icon, label: "MY PAGE" }
    ];

    return (
        <>
            <GlobalStyle />
            <Menu>
                <Symbol className="symbol" src={symbol} />
                <Logo className="logo" src={logo} />
                {menus.map((m) => (
                    <Item key={m.path} onClick={() => navigate(m.path)}>
                        <Background $active={location.pathname === m.path} />
                        <Icon src={location.pathname === m.path ? m.activeIcon : m.icon} />
                        <Text className="text">{m.label}</Text>
                    </Item>
                ))}
                <Line />
                <Item onClick={() => navigate("/notification")}><Icon src={alarm} /><Text className="text">NOTIFICATIONS</Text></Item>
            </Menu>

            <MainContent>
                <ManageIcon src={setting} onClick={() => navigate("/setting")} />
                <Hr />

                <CenterSection>
                    <ProfileSection>
                        <ProfileImg src={profile} alt="Profile" />
                        <ProfileInfo>
                            <div className="name-row">
                                <span className="name">{user?.name || "이름없음"}</span>
                                <span className="job">{user?.job || "사용자"}</span>
                            </div>
                            <div style={{ position: "relative" }}>
                                <div className="active-status" onClick={() => setOpenMenu(prev => !prev)}>
                                    <div
                                        className="dot"
                                        style={{ backgroundColor: currentState.color }}
                                    />
                                    {currentState.label} ⌵
                                </div>

                                {openMenu && (
                                    <StateMenu>
                                        {statusList.map(s => (
                                            <StateItem
                                                key={s.value}
                                                onClick={() => {
                                                    setCurrentState(s);
                                                    setOpenMenu(false);
                                                }}
                                            >
                                                <Dot color={s.color} />
                                                <Label>{s.label}</Label>
                                            </StateItem>
                                        ))}
                                    </StateMenu>
                                )}
                            </div>
                        </ProfileInfo>
                        <EditBtn src={edit_icon} alt="Edit" />
                    </ProfileSection>

                    <StatsContainer>
                        <StatBox>
                            <div className="count">{stats.total}</div>
                            <div className="label">프로젝트</div>
                        </StatBox>
                        <StatBox>
                            <div className="count">{stats.progress}</div>
                            <div className="label">진행중</div>
                        </StatBox>
                        <StatBox $last>
                            <div className="count">{stats.done}</div>
                            <div className="label">종료</div>
                        </StatBox>
                    </StatsContainer>

                    <MenuList>
                        <MenuListItem><img src={mypage_message} alt="Notice" /> 공지 사항</MenuListItem>
                        <MenuListItem onClick={() => navigate("/mypage_user")} $border><img src={mypage_user} alt="Account" /> 계정 관리</MenuListItem>

                        <MenuListItem style={{ marginTop: "20px" }}><img src={mypage_info} alt="Info" /> 정보</MenuListItem>
                        <MenuListItem $border><img src={mypage_question} alt="Question" /> 문의하기</MenuListItem>

                        {/* 로그아웃 클릭 이벤트 적용 */}
                        <MenuListItem
                            style={{ marginTop: "20px", color: "#666" }}
                            onClick={handleLogout}
                        >
                            <img src={mypage_logout} alt="Logout" /> 로그아웃
                        </MenuListItem>
                    </MenuList>
                </CenterSection>
            </MainContent>
        </>
    );
}