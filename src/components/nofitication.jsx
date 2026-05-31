//packages
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

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

//components
import { GlobalStyle, Menu, Symbol, Logo, Item, Background, Icon, Text, Line } from "../pages/homePage";
import { PageLayout, ContentBox } from "./schedule_page";
import { apiRequest } from "../utils/api";

//css
const HeaderBox = styled.div`
    margin: 8% 0 1% 10%;
`;
const HeaderText = styled.span`
    color: var(--black-1, #000);
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const AlarmBox = styled.div`
    margin: 8% 0 1% 10%;
    display: flex;
    flex-direction: column;
`;
const NotificationText = styled.span`
    color: var(--Gray-6, #959794);
    font-feature-settings: 'ss05' on;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: 0.15px;
`;
const AlarmWapper = styled.div`
    margin-bottom: 10px;
    display: flex;
    width: 1200px;
    height: 96px;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    background: var(--white-1, #FFF);
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
    cursor: pointer;

    &:hover,
    &:active {
        border-radius: 16px;
        border: 1px solid var(--Light-Green-2, #C0DA58);
        background: var(--white-1, #FFF);
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }
    &:hover ${NotificationText},
    &:active ${NotificationText}{
        color: var(--Light-Green-3, #90A442);
    }
`;
const TextWapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    flex: 1;
`;
const MessageText = styled.span`
    margin-top: 6px;
    color: var(--Gray-6, #959794);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
`;
const StateText = styled.span`
    color: var(--Gray-7, #70716F);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    white-space: nowrap;
`;
const ActionRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;
const ActionButton = styled.button`
    height: 36px;
    padding: 0 14px;
    border-radius: 12px;
    border: ${({ $secondary }) => ($secondary ? "1px solid #ddd" : "none")};
    background: ${({ $secondary }) => ($secondary ? "#fff" : "#c0da58")};
    color: ${({ $secondary }) => ($secondary ? "#70716F" : "#fff")};
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
`;
const EmptyText = styled.div`
    width: 1200px;
    height: 96px;
    padding: 24px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
    color: #959794;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`;
const ErrorText = styled.div`
    width: 1200px;
    margin-bottom: 10px;
    color: #d9534f;
    font-size: 14px;
    font-weight: 600;
`;

const menus = [
    { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
    { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
    { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
    { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
    { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" }
];

const hasBrokenText = (value) => /[?]{2,}|�|쒓|移|梨|뚮|섏|듬|占/.test(String(value || ""));

const normalizeType = (type = "") => String(type).toLowerCase();

const getNotificationTitle = (notification) => {
    const type = normalizeType(notification.type);
    if (type.includes("chat")) return "\uCC44\uD305";
    if (type.includes("feedback")) return "\uD53C\uB4DC\uBC31";
    if (type === "project_created") return "프로젝트 생성";
    if (type === "project_invite") return "프로젝트 초대";
    if (type === "project_member_joined") return "프로젝트 참가";
    if (type === "project_deadline") return "프로젝트 마감";
    if (type === "task_deadline") return "과제 마감";
    if (type.includes("project")) return "프로젝트";
    if (type === "friend_request") return "\uCE5C\uAD6C \uC694\uCCAD";
    if (type === "friend_accepted") return "\uCE5C\uAD6C \uC218\uB77D";
    return "\uC54C\uB9BC";
};

const getFallbackMessage = (type) => {
    if (type.includes("chat")) return "\uCC44\uD305\uC774 \uC654\uC2B5\uB2C8\uB2E4.";
    if (type.includes("feedback")) return "\uD53C\uB4DC\uBC31\uC774 \uCD94\uAC00\uB418\uC5C8\uC2B5\uB2C8\uB2E4.";
    if (type === "task_deadline") return "마감이 임박한 과제가 있습니다.";
    if (type.includes("project")) return "프로젝트 관련 알림이 도착했습니다.";
    if (type === "friend_request") return "\uC0C8 \uCE5C\uAD6C \uC694\uCCAD\uC774 \uB3C4\uCC29\uD588\uC2B5\uB2C8\uB2E4.";
    if (type === "friend_accepted") return "\uCE5C\uAD6C \uC694\uCCAD\uC774 \uC218\uB77D\uB418\uC5C8\uC2B5\uB2C8\uB2E4.";
    return "\uC0C8 \uC54C\uB9BC\uC774 \uB3C4\uCC29\uD588\uC2B5\uB2C8\uB2E4.";
};

const getNotificationMessage = (notification) => {
    const type = normalizeType(notification.type);
    if (!hasBrokenText(notification.message)) return notification.message;
    return getFallbackMessage(type);
};

const getNotificationPath = (notification) => {
    if (notification.actionPath) return notification.actionPath;
    const type = normalizeType(notification.type);
    if (type.includes("chat")) return "/chat";
    if (type === "task_deadline") return "/schedule";
    if (type.includes("project")) return "/project";
    if (type.includes("feedback")) return "/mypage";
    if (type.includes("friend")) return "/mypage";
    return null;
};

export default function NotificationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [notifications, setNotifications] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadData = async () => {
        const [notificationData, requestData] = await Promise.all([
            apiRequest("/api/notifications"),
            apiRequest("/api/users/friends/requests"),
        ]);
        setNotifications(Array.isArray(notificationData) ? notificationData : []);
        setRequests(requestData.requests || []);
    };

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        loadData()
            .catch((loadError) => {
                if (mounted) setError(loadError.message || "\uC54C\uB9BC\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, []);

    const handleAccept = async (event, relationId) => {
        event.stopPropagation();
        try {
            await apiRequest(`/api/users/friends/${relationId}/accept`, { method: "PUT" });
            await loadData();
        } catch (acceptError) {
            setError(acceptError.message || "\uCE5C\uAD6C \uC694\uCCAD \uC218\uB77D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
        }
    };

    const handleReject = async (event, relationId) => {
        event.stopPropagation();
        try {
            await apiRequest(`/api/users/friends/${relationId}`, { method: "DELETE" });
            await loadData();
        } catch (rejectError) {
            setError(rejectError.message || "\uCE5C\uAD6C \uC694\uCCAD \uAC70\uC808\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
        }
    };

    const handleRead = async (notification) => {
        try {
            if (!notification.isRead) {
                await apiRequest(`/api/notifications/${notification.id}/read`, { method: "PUT" });
                setNotifications((prev) => prev.map((item) => (
                    item.id === notification.id ? { ...item, isRead: true } : item
                )));
            }
        } catch {
            // Reading failure should not block navigation.
        }

        const path = getNotificationPath(notification);
        if (path) navigate(path);
    };

    const visibleNotifications = notifications.filter((notification) => normalizeType(notification.type) !== "friend_request");
    const hasItems = requests.length > 0 || visibleNotifications.length > 0;

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
                        <HeaderText>{"\uC54C\uB9BC"}</HeaderText>
                    </HeaderBox>
                    <AlarmBox>
                        {error && <ErrorText>{error}</ErrorText>}
                        {loading && <EmptyText>{"\uC54C\uB9BC\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4."}</EmptyText>}
                        {!loading && !hasItems && <EmptyText>{"\uC544\uC9C1 \uC54C\uB9BC\uC774 \uC5C6\uC5B4\uC694."}</EmptyText>}

                        {!loading && requests.map((request) => {
                            const user = request.user || {};
                            const name = user.name || user.userid || user.email || "\uC774\uB984 \uC5C6\uC74C";
                            return (
                                <AlarmWapper key={`request-${request.relationId}`}>
                                    <TextWapper>
                                        <NotificationText>{"\uCE5C\uAD6C \uC694\uCCAD"}</NotificationText>
                                        <MessageText>{`${name}\uB2D8\uC774 \uCE5C\uAD6C \uC694\uCCAD\uC744 \uBCF4\uB0C8\uC2B5\uB2C8\uB2E4.`}</MessageText>
                                    </TextWapper>
                                    <ActionRow>
                                        <ActionButton type="button" onClick={(event) => handleAccept(event, request.relationId)}>{"\uC218\uB77D"}</ActionButton>
                                        <ActionButton type="button" $secondary onClick={(event) => handleReject(event, request.relationId)}>{"\uAC70\uC808"}</ActionButton>
                                    </ActionRow>
                                </AlarmWapper>
                            );
                        })}

                        {!loading && visibleNotifications.map((notification) => (
                            <AlarmWapper key={`notification-${notification.id}`} onClick={() => handleRead(notification)}>
                                <TextWapper>
                                    <NotificationText>{getNotificationTitle(notification)}</NotificationText>
                                    <MessageText>{getNotificationMessage(notification)}</MessageText>
                                </TextWapper>
                                <StateText>{notification.isRead ? "\uC77D\uC74C" : "\uC548 \uC77D\uC74C"}</StateText>
                            </AlarmWapper>
                        ))}
                    </AlarmBox>
                </ContentBox>
            </PageLayout>
        </>
    );
}
