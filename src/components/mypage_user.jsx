import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

// --- 이미지 임포트 ---
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
import logo from '../assets/logo.svg';
import profile from '../assets/profile.svg';

/* --- Global Styles --- */
export const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Pretendard Variable", Pretendard, sans-serif;
        margin: 0; padding: 0; box-sizing: border-box;
    }
    body { background-color: #FFF; overflow-x: hidden; }
`;

/* --- 메뉴바 스타일 (생략 없이 유지) --- */
const Menu = styled.div`
    height: 100vh; width: 130px; background-color: #F9F9F8; transition: 0.3s ease-in-out;
    overflow: hidden; display: flex; flex-direction: column; align-items: center;
    position: fixed; top: 0; left: 0; z-index: 100;
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
const Icon = styled.img` width: 28px; height: 28px; margin-left: 21px; z-index: 2; `;
const Text = styled.span` margin-left: 40px; font-size: 16px; color: #333; font-weight: 500; opacity: 0; transform: translateX(-10px); transition: 0.3s; z-index: 2; white-space: nowrap; `;
const Line = styled.div` width: 60px; height: 1px; background-color: #C9C9C8; margin: 40px 0; transition: 0.3s; ${Menu}:hover & { width: 240px; } `;

/* --- 메인 컨텐츠 영역 --- */
const MainContent = styled.div`
    margin-left: 130px; padding: 100px; min-height: 100vh;
    display: flex; flex-direction: column; align-items: center;
`;

const FormContainer = styled.div` width: 100%; max-width: 800px; display: flex; flex-direction: column; gap: 40px; `;

const ProfileWrapper = styled.div` display: flex; align-items: center; gap: 25px; margin-bottom: 20px; `;
const ProfileCircle = styled.div`
    width: 100px; height: 100px; border-radius: 50%;
    background-image: url(${profile}); background-size: cover; background-position: center;
    background-repeat: no-repeat; background-color: #F0F0F0;
`;

const ChangePhotoButton = styled.button`
    padding: 10px 20px; background: none; border: 1px solid #EAEAEA; border-radius: 20px;
    color: #888; font-size: 14px; cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: 0.2s;
    &:hover { background-color: #F9F9F8; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`;

const InputGroup = styled.div` display: flex; flex-direction: column; gap: 15px; `;
const Label = styled.label` font-size: 16px; font-weight: 700; color: #333; `;

const Input = styled.input`
    width: 100%; height: 56px; padding: 0 20px;
    border: 1px solid #F3F3F3; /* 테두리를 조금 더 연하게 변경 */
    border-radius: 12px; background-color: #FFF;
    font-size: 15px; outline: none;
    
    /* 🛠 수정 포인트: 인풋창에 섀도우 추가 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03); 
    transition: all 0.2s ease-in-out;

    &::placeholder { color: #CCC; }
    
    &:focus {
        border-color: #C0DA58;
        /* 포커스 시 섀도우를 조금 더 강조 */
        box-shadow: 0 4px 15px rgba(192, 218, 88, 0.15); 
    }
`;

const SaveButton = styled.button`
    width: 240px; height: 56px; background-color: #C0DA58; color: #FFF;
    font-size: 18px; font-weight: 700; border: none; border-radius: 12px;
    cursor: pointer; align-self: flex-end; margin-top: 20px;
    box-shadow: 0 4px 12px rgba(192, 218, 88, 0.2);
    &:hover { background-color: #ADC84B; }
`;

export default function mypage_user() {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [statusMsg, setStatusMsg] = useState("");

    const menus = [
        { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
        { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
        { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
        { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
        { path: "/mypage", icon: icon, activeIcon: in_icon, label: "MY PAGE" }
    ];

    const handleSave = async () => {
        const token = localStorage.getItem("token");

        const body = {};

        if (name.trim() !== "") body.name = name;
        if (job.trim() !== "") body.job = job;
        if (statusMsg.trim() !== "") body.status = statusMsg;

        const res = await fetch("http://localhost:3000/api/users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        console.log("응답:", data);

        const prevUser = JSON.parse(localStorage.getItem("user")) || {};

        const updatedUser = {
            ...prevUser,
            ...data.user
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("저장 완료");
        navigate("/mypage");
    };

    return (
        <>
            <GlobalStyle />
            <Menu>
                <Symbol className="symbol" src={symbol} />
                <Logo className="logo" src={logo} />
                {menus.map((m) => {
                    const isActive = location.pathname === m.path || (m.path === "/mypage" && location.pathname === "/mypage_user");
                    return (
                        <Item key={m.path} onClick={() => navigate(m.path)}>
                            <Background $active={isActive} />
                            <Icon src={isActive ? m.activeIcon : m.icon} />
                            <Text className="text">{m.label}</Text>
                        </Item>
                    );
                })}
                <Line />
                <Item onClick={() => navigate("/notification")}>
                    <Icon src={alarm} />
                    <Text className="text">NOTIFICATIONS</Text>
                </Item>
            </Menu>

            <MainContent>
                <FormContainer>
                    <ProfileWrapper>
                        <ProfileCircle />
                        <ChangePhotoButton>사진 변경</ChangePhotoButton>
                    </ProfileWrapper>

                    <InputGroup>
                        <Label>이름</Label>
                        <Input
                            type="text" placeholder="이름을 입력해주세요."
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>직무</Label>
                        <Input
                            type="text" placeholder="직무를 입력해주세요."
                            value={job} onChange={(e) => setJob(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>상태 메시지</Label>
                        <Input
                            type="text" placeholder="상태 메시지를 작성해주세요."
                            value={statusMsg} onChange={(e) => setStatusMsg(e.target.value)}
                        />
                    </InputGroup>

                    <SaveButton onClick={handleSave}>저장</SaveButton>
                </FormContainer>
            </MainContent>
        </>
    );
}