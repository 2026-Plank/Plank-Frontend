import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { GlobalStyle } from "../pages/homePage";
import Menu from "./menu_layout";
import { PageLayout, ContentBox } from "./schedule_page";
import { apiRequest, getAuthToken } from "../utils/api";

const HeaderBox = styled.div`
    margin: 40px 0 20px 0;

    @media (max-width: 480px) {
        margin: 20px 0 12px 0;
    }
`;

const HeaderText = styled.span`
    color: var(--black-1, #000);
    font-size: 26px;
    font-weight: 600;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const AlarmBox = styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    align-items: center;
`;

const NotificationText = styled.span`
    color: var(--Gray-6, #959794);
    font-size: 18px;
    font-weight: 600;
    line-height: 140%;

    @media (max-width: 480px) {
        font-size: 15px;
    }
`;

const AlarmWapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    min-height: 96px;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    border-radius: 16px;
    background: var(--white-1, #FFF);
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border: 1px solid transparent;

    &:hover,
    &:active {
        border: 1px solid var(--Light-Green-2, #C0DA58);
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }

    &:hover ${NotificationText},
    &:active ${NotificationText}{
        color: var(--Light-Green-3, #90A442);
    }

    @media (max-width: 480px) {
        padding: 16px;
        min-height: auto;
        border-radius: 12px;
        gap: 12px;
    }
`;

const TextWapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
`;

const MessageText = styled.span`
    color: var(--Gray-6, #959794);
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
    word-break: keep-all;

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

const StateText = styled.span`
    color: var(--Gray-7, #70716F);
    font-size: 13px;
    font-weight: 600;
    line-height: 140%;
    white-space: nowrap;

    @media (max-width: 480px) {
        font-size: 11px;
    }
`;

const EmptyText = styled.p`
    color: #959794;
    font-size: 15px;
`;

const getHeaderText = (type) => {
    switch (type) {
        case "project_deadline":
            return "프로젝트 마감";
        case "task_deadline":
            return "업무 마감";
        case "feedback":
            return "피드백";
        case "chat":
            return "채팅";
        default:
            return "알림";
    }
};

const getActionPath = (notification) => {
    if (notification.actionPath) return notification.actionPath;
    if (notification.type === "chat") return "/chat";
    if (notification.targetType === "team") return "/project";
    if (notification.targetType === "schedule") return "/schedule";
    return "/notification";
};

const fetcher = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("로그인이 필요합니다.");
    return apiRequest(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
};

export default function NotificationPage() {
    const navigate = useNavigate();
    const { message, error, loading } = useSWR(
        getAuthToken() ? "/api/notifications" : null, // 로그인 되었을 때만 요청
        fetcher,
        {
            revalidateOnFocus: true, // 유저가 브라우저 탭을 다시 볼 때 자동으로 새 알림 갱신
            dedupingInterval: 5000   // 5초 안의 반복 요청은 캐시로 처리해서 백엔드 부담 줄임
        }
    );
    // const [messages, setMessages] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const messages = Array.isArray(data) ? data : data?.notifications || [];
    // useEffect(() => {
    //     const loadNotifications = async () => {
    //         if (!getAuthToken()) {
    //             setError("로그인이 필요합니다.");
    //             return;
    //         }

    //         setLoading(true);
    //         try {
    //             const data = await apiRequest("/api/notifications");
    //             setMessages(Array.isArray(data) ? data : data.notifications || []);
    //             setError("");
    //         } catch (err) {
    //             setError(err.message || "알림을 불러오지 못했습니다.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadNotifications();
    // }, []);

    const handleRead = async (notification) => {
        if (!notification.isRead) {
            // ⭐️ SWR 낙관적 업데이트 (서버 응답을 기다리지 않고 화면부터 즉시 '읽음'으로 표시)
            mutate(
                (prev) => {
                    const list = Array.isArray(prev) ? prev : prev?.notifications || [];
                    const updated = list.map((msg) => msg.id === notification.id ? { ...msg, isRead: true } : msg);
                    return Array.isArray(prev) ? updated : { ...prev, notifications: updated };
                },
                false // 우선 서버 검증 없이 화면부터 바로 바꿈
            );

            try {
                await apiRequest(`/api/notifications/${notification.id}/read`, { method: "PUT" });
                mutate(); // 서버에 잘 반영되었는지 최종 확인 동기화
            } catch (err) {
                console.error(err);
            }
        }
        navigate(getActionPath(notification));
    };

    return (
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu />
                <ContentBox>
                    <HeaderBox>
                        <HeaderText>알림</HeaderText>
                    </HeaderBox>
                    <AlarmBox>
                        {loading && <EmptyText>알림을 불러오는 중입니다.</EmptyText>}
                        {error && <EmptyText>{error}</EmptyText>}
                        {!loading && !error && messages.length === 0 && <EmptyText>새 알림이 없습니다.</EmptyText>}
                        {messages.map((message) => (
                            <AlarmWapper key={message.id} onClick={() => handleRead(message)}>
                                <TextWapper>
                                    <NotificationText>{getHeaderText(message.type)}</NotificationText>
                                    <MessageText>{message.message}</MessageText>
                                </TextWapper>
                                <StateText>{message.isRead ? "읽음" : "안 읽음"}</StateText>
                            </AlarmWapper>
                        ))}
                    </AlarmBox>
                </ContentBox>
            </PageLayout>
        </>
    );
}
