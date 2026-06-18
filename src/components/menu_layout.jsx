import { useNavigate, useLocation } from "react-router-dom"; // ★ useLocation 임포트 추가
import { useState, useEffect } from "react";
import styled from "styled-components";

//assets
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

//styled-components
const MenuBox = styled.div`
    height: 100vh; width: 130px; background-color: #F9F9F8; transition: 0.3s ease-in-out;
    display: flex; flex-direction: column; align-items: center; position: fixed; z-index: 10;
    &:hover { width: 300px; }
    &:hover .text { opacity: 1; transform: translateX(0); }
    &:hover .symbol { display: none; }
    &:hover .logo { display: block; }
    /* 모바일: 사이드바 숨김 */
    @media (max-width: 480px) {
        display: none;
    }
`;
const Symbol = styled.img` height: 70px; width: 62px; margin-top: 65px; margin-bottom: 50px; `;
const Logo = styled.img` width: 132px; height: 65px; margin-top: 65px; margin-bottom: 50px; display: none; `;
const Item = styled.div` width: 100%; height: 70px; display: flex; align-items: center; padding-left: 30px; position: relative; cursor: pointer;
    background-color: #F9F9F8;
`;
const Background = styled.div`
    width: 52px; height: 52px; position: absolute; left: 37px; top: 50%; transform: translateY(-50%);
    background: #FFF; border-radius: 50%;
    box-shadow: ${({ $active }) => $active ? "0 0 20px rgba(192, 218, 88, 0.4)" : "none"};
    display: ${({ $active }) => ($active ? "block" : "none")};
    transition: 0.3s;
    ${MenuBox}:hover & { width: calc(100% - 40px); border-radius: 8px; left: 20px; }
`;
const Icon = styled.img` width: 24px; height: 24px; margin-left: 21px; z-index: 2; `;
const Text = styled.span` 
    margin-left: 40px; font-size: 16px; color: #333; font-weight: 500; 
    white-space: nowrap; opacity: 0; transform: translateX(-10px); 
    transition: 0.3s; z-index: 2; 
`;
const Line = styled.div` width: 60px; height: 1px; background-color: #E5E5E5; margin: 30px 0; transition: 0.3s; ${MenuBox}:hover & { width: 240px; } `;

// 하단 탭바 (모바일 전용)
const BottomTabBar = styled.nav`
    display: none;
 
    @media (max-width: 480px) {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 64px;
        background-color: #F9F9F8;
        border-top: 1px solid #E5E5E5;
        z-index: 10;
        align-items: center;
        justify-content: space-around;
        padding: 0 4px; /* 양 끝단 터짐 방지 패딩 */
    }
`;
 
const TabItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex: 1;
    height: 100%;
    cursor: pointer;
    position: relative;
`;
 
const TabActiveBar = styled.div`
    position: absolute;
    top: 0;
    width: 24px;
    height: 2px;
    border-radius: 0 0 2px 2px;
    background: ${({ $active }) => ($active ? "#c0da58" : "transparent")};
`;
 
const TabIcon = styled.img`
    width: 22px;
    height: 22px;
`;
 
const TabText = styled.span`
    font-size: 9px;
    font-weight: 500;
    color: ${({ $active }) => ($active ? "#90a442" : "#aaa")};
    white-space: nowrap;
`;

export default function MenuLayout() {
    const navigate = useNavigate();
    const location = useLocation(); // ★ 선언문 추가

    const menus = [
        { path: "/homepage", icon: home, activeIcon: in_home, label: "HOME" },
        { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
        { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
        { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
        { path: "/mypage", icon: icon, activeIcon: in_icon, label: "MY PAGE" }
    ];
    
    const isAlarmActive = location.pathname === "/notification";

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!isMobile && (
                <MenuBox onClick={(e) => e.stopPropagation()}>
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
                        <Background $active={isAlarmActive} />
                        <Icon src={alarm} />
                        <Text className="text">NOTIFICATIONS</Text>
                    </Item>
                </MenuBox>
            )}
            
            {isMobile && (
                <BottomTabBar>
                    {menus.map((menu) => {
                        const isActive = location.pathname === menu.path;
                        return (
                            <TabItem key={menu.path} onClick={() => navigate(menu.path)}>
                                <TabActiveBar $active={isActive} />
                                <TabIcon src={isActive ? menu.activeIcon : menu.icon} />
                                <TabText $active={isActive}>{menu.label}</TabText>
                            </TabItem>
                        );
                    })}
                    
                    {/* ★ 모바일 하단 탭바용 알림 메뉴 항목 */}
                    <TabItem onClick={() => navigate("/notification")}>
                        <TabActiveBar $active={isAlarmActive} />
                        {/* 필요 시 alarm 활성화 아이콘을 분리해 지정할 수 있습니다 */}
                        <TabIcon src={alarm} style={{ filter: isAlarmActive ? "invert(62%) sepia(51%) saturate(415%) hue-rotate(33deg) brightness(95%) contrast(89%)" : "none" }} />
                        <TabText $active={isAlarmActive}>ALARM</TabText>
                    </TabItem>
                </BottomTabBar>
            )}
        </>
    );
}
