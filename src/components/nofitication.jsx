//packages
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

//assets
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

//components
import { GlobalStyle } from "../pages/homePage";
import Menu from "./menu";
import { PageLayout, ContentBox } from "./schedule_page";

//css
const HeaderBox = styled.div`
    margin: 40px 0 20px 0; /* 불필요한 좌측 마진 10% 제거 -> ContentBox 기본 패딩에 맞춤 */
    
    @media (max-width: 480px) {
        margin: 20px 0 12px 0;
    }
`;

const HeaderText = styled.span`
    color: var(--black-1, #000);
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const AlarmBox = styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px; /* 마진 대신 gap으로 요소 간격 제어 */
    width: 100%;
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

    @media (max-width: 480px) {
        font-size: 15px;
    }
`;

const AlarmWapper = styled.div`
    display: flex;
    width: 100%; /* ★ 1200px 고정을 해제하여 모바일 튕김 현상 방지 */
    max-width: 1200px;
    min-height: 96px; /* 고정 height 대신 텍스트 양에 맞춰 유연하게 변하도록 min-height 지정 */
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
    gap: 4px; /* 타이틀과 서브텍스트 사이 간격 고정 */
    flex: 1;
    min-width: 0; /* 내부 긴 텍스트 말줄임이나 깨짐 방지용 */
`;

const MessageText = styled.span`
    color: var(--Gray-6, #959794);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    word-break: keep-all; /* 모바일에서 단어 단위로 예쁘게 줄바꿈 */

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

const StateText = styled.span`
    color: var(--Gray-7, #70716F);
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    white-space: nowrap; /* 읽음/안읽음 표시 글자 쪼개짐 방지 */

    @media (max-width: 480px) {
        font-size: 11px;
    }
`;

const messageState = [
    {value: "안 읽음", state: "NOREAD"},
    {value: "읽음", state: "READ"}
];

export default function NotificationPage() {
    const navigate = useNavigate();

    // message 더미데이터 로컬스토리지대신 db로 가능하게 변경
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("notifications");
        return saved ? JSON.parse(saved) : [
          {headertext: "프로젝트 마감", message: "UI/UX 개선 프로젝트의 마감일이 3일 남았습니다.", state: "NOREAD", send: "project"},
          {headertext: "피드백", message: "피드백이 추가되었습니다.", state: "NOREAD", send: "chat"},
          {headertext: "채팅", message: "안녕하세요 반갑습니다.", state: "NOREAD", send: "chat"},
          {headertext: "채팅", message: "채팅이 왔습니다.", state: "NOREAD", send: "chat"},
        ];
    });

    // 알림 정보 저장되는 로직으로 변경
    useEffect(() => {
        localStorage.setItem("notifications", JSON.stringify(messages));
    }, [messages]);

    const handleRead = (index, send) => {
        setMessages((prev) =>
          prev.map((msg, i) => (i === index ? { ...msg, state: "READ" } : msg))
        );
        navigate(`/${send}`);
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
                        {messages.map((message, index) => (
                            <AlarmWapper key={index} onClick={() => handleRead(index, message.send)}>
                                <TextWapper>
                                    <NotificationText>{message.headertext}</NotificationText>
                                    <MessageText>{message.message}</MessageText>
                                </TextWapper>
                                <StateText>{messageState.find(item => item.state === message.state)?.value}</StateText>
                            </AlarmWapper>
                        ))}
                    </AlarmBox>
                </ContentBox>
            </PageLayout>
        </>
    );
}