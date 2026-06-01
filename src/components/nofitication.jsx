import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

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
import { apiRequest } from "../utils/api";

const HeaderBox = styled.div`
    margin: 8% 0 1% 10%;
`;

const HeaderText = styled.span`
    color: var(--black-1, #000);
    font-size: 26px;
    font-weight: 600;
`;

const AlarmBox = styled.div`
    margin: 8% 0 1% 10%;
    display: flex;
    flex-direction: column;
`;

const NotificationText = styled.span`
    color: var(--Gray-6, #959794);
    font-size: 18px;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: 0.15px;
`;

const AlarmWapper = styled.button`
    margin-bottom: 10px;
    display: flex;
    width: min(1200px, calc(100% - 48px));
    min-height: 96px;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid transparent;
    border-radius: 16px;
    background: var(--white-1, #FFF);
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    text-align: left;

    &:hover,
    &:active {
        border-color: var(--Light-Green-2, #C0DA58);
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }

    &:hover ${NotificationText},
    &:active ${NotificationText} {
        color: var(--Light-Green-3, #90A442);
    }
`;

const TextWapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 0;
`;

const MessageText = styled.span`
    color: var(--Gray-6, #959794);
    font-size: 12px;
    font-weight: 500;
    line-height: 140%;
`;

const StateText = styled.span`
    color: var(--Gray-7, #70716F);
    font-size: 12px;
    font-weight: 600;
    line-height: 140%;
    white-space: nowrap;
`;

const EmptyText = styled.div`
    width: min(1200px, calc(100% - 48px));
    padding: 36px 24px;
    border-radius: 16px;
    background: #fff;
    color: #959794;
    text-align: center;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
`;

const getNotificationTitle = (notification) => {
    if (notification.type === "chat") return "채팅";
    if (notification.type === "project_deadline") return "프로젝트";
    if (notification.type === "task_deadline") return "일정";
    if (notification.type === "project_invite") return "프로젝트 초대";
    if (notification.type === "project_created") return "프로젝트";
    if (notification.type === "project_member_joined") return "프로젝트 참여";
    if (notification.type === "friend_request") return "친구 요청";
    if (notification.type === "friend_accepted") return "친구";
    return "알림";
};

const getActionPath = (notification) => {
    if (notification.actionPath) return notification.actionPath;
    if (notification.type === "chat") return "/chat";
    if (notification.targetType === "team") return "/project";
    if (notification.targetType === "schedule") return "/schedule";
    if (notification.targetType === "friend") return "/mypage";
    return "/notification";
};

export default function NotificationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const menus = [
        { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
        { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
        { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
        { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
        { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" }
    ];

    useEffect(() => {
        const loadNotifications = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await apiRequest("/api/notifications");
                setMessages(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "알림을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    const handleRead = async (notification) => {
        try {
            await apiRequest(`/api/notifications/${notification.id}/read`, { method: "PUT" });
            setMessages((prev) =>
                prev.map((msg) => (msg.id === notification.id ? { ...msg, isRead: 1 } : msg))
            );
            navigate(getActionPath(notification));
        } catch (err) {
            setError(err.message || "알림 읽음 처리에 실패했습니다.");
        }
    };

    return (
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu>
                    <Symbol className="symbol" src={symbol} />
                    <Logo className="logo" src={logo} />
                    {menus.map((menu) => (
                        <Item key={menu.path} onClick={() => navigate(menu.path)}>
                            <Background $active={location.pathname === menu.path} />
                            <Icon src={location.pathname === menu.path ? menu.activeIcon : menu.icon} />
                            <Text className="text">{menu.label}</Text>
                        </Item>
                    ))}
                    <Line />
                    <Item onClick={() => navigate("/notification")}>
                        <Background $active={location.pathname === "/notification"} />
                        <Icon src={alarm} />
                        <Text className="text">NOTIFICATIONS</Text>
                    </Item>
                </Menu>
                <ContentBox>
                    <HeaderBox>
                        <HeaderText>알림</HeaderText>
                    </HeaderBox>
                    <AlarmBox>
                        {loading && <EmptyText>알림을 불러오는 중입니다.</EmptyText>}
                        {error && <EmptyText>{error}</EmptyText>}
                        {!loading && !error && messages.length === 0 && <EmptyText>새 알림이 없습니다.</EmptyText>}
                        {!loading && !error && messages.map((message) => (
                            <AlarmWapper key={message.id} type="button" onClick={() => handleRead(message)}>
                                <TextWapper>
                                    <NotificationText>{getNotificationTitle(message)}</NotificationText>
                                    <MessageText>{message.message}</MessageText>
                                </TextWapper>
                                <StateText>{Number(message.isRead) ? "읽음" : "안 읽음"}</StateText>
                            </AlarmWapper>
                        ))}
                    </AlarmBox>
                </ContentBox>
            </PageLayout>
        </>
    );
}
