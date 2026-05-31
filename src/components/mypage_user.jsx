import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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
import profile from "../assets/profile.svg";

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Pretendard Variable", Pretendard, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body { background-color: #FFF; overflow-x: hidden; }
`;

const Menu = styled.div`
    height: 100vh;
    width: 130px;
    background-color: #F9F9F8;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    &:hover { width: 316px; }
    &:hover .text { opacity: 1; transform: translateX(0); }
    &:hover .symbol { display: none; }
    &:hover .logo { display: block; }
`;

const Symbol = styled.img` height: 70px; width: 62px; margin-top: 65px; margin-bottom: 50px; `;
const Logo = styled.img` width: 132px; height: 65px; margin-top: 65px; margin-bottom: 50px; display: none; `;
const Item = styled.div` width: 100%; height: 70px; display: flex; align-items: center; padding-left: 30px; position: relative; cursor: pointer; `;
const Background = styled.div`
    width: 52px;
    height: 52px;
    position: absolute;
    left: 37px;
    top: 50%;
    transform: translateY(-50%);
    background: #FFF;
    border-radius: 50%;
    box-shadow: ${({ $active }) => $active ? "0 0 30px 2px rgba(192, 218, 88, 0.30)" : "none"};
    display: ${({ $active }) => ($active ? "block" : "none")};
    transition: 0.3s;
    ${Menu}:hover & { width: 272px; height: 52px; border-radius: 8px; left: 20px; }
`;
const Icon = styled.img` width: 28px; height: 28px; margin-left: 21px; z-index: 2; `;
const Text = styled.span` margin-left: 40px; font-size: 16px; color: #333; font-weight: 500; opacity: 0; transform: translateX(-10px); transition: 0.3s; z-index: 2; white-space: nowrap; `;
const Line = styled.div` width: 60px; height: 1px; background-color: #C9C9C8; margin: 40px 0; transition: 0.3s; ${Menu}:hover & { width: 240px; } `;

const MainContent = styled.div`
    margin-left: 130px;
    padding: 100px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormContainer = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const ProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 10px;
`;

const ProfileCircle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: url(${({ $src }) => $src || profile});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #F0F0F0;
`;

const ProfileTitle = styled.div`
    color: #333;
    font-size: 24px;
    font-weight: 800;
`;

const ProfileSub = styled.div`
    margin-top: 8px;
    color: #888;
    font-size: 14px;
`;

const InputGroup = styled.div` display: flex; flex-direction: column; gap: 12px; `;
const Label = styled.label` font-size: 16px; font-weight: 700; color: #333; `;
const CurrentValue = styled.span` margin-left: 8px; color: #999; font-size: 13px; font-weight: 500; `;

const Input = styled.input`
    width: 100%;
    height: 56px;
    padding: 0 20px;
    border: 1px solid #F3F3F3;
    border-radius: 12px;
    background-color: #FFF;
    font-size: 15px;
    outline: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
    transition: all 0.2s ease-in-out;
    &::placeholder { color: #AAA; }
    &:focus {
        border-color: #C0DA58;
        box-shadow: 0 4px 15px rgba(192, 218, 88, 0.15);
    }
`;

const SaveButton = styled.button`
    width: 240px;
    height: 56px;
    background-color: #C0DA58;
    color: #FFF;
    font-size: 18px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    align-self: flex-end;
    margin-top: 8px;
    box-shadow: 0 4px 12px rgba(192, 218, 88, 0.2);
    &:hover { background-color: #ADC84B; }
    &:disabled { background-color: #d4d4d4; cursor: not-allowed; box-shadow: none; }
`;

const HelperText = styled.p`
    color: ${({ $error }) => $error ? "#d9534f" : "#7e9640"};
    font-size: 14px;
    font-weight: 700;
`;

const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
};

export default function MypageUser() {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileData, setProfileData] = useState(null);
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const menus = [
        { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
        { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
        { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
        { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
        { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" }
    ];

    useEffect(() => {
        const loadProfile = async () => {
            const config = getAuthConfig();
            if (!config) {
                setError("로그인이 필요합니다.");
                return;
            }

            try {
                const response = await axios.get("/api/users/profile", config);
                setProfileData(response.data);
            } catch (loadError) {
                setError(loadError.response?.data?.error || "프로필 정보를 불러오지 못했습니다.");
            }
        };

        loadProfile();
    }, []);

    const handleSave = async () => {
        const config = getAuthConfig();
        if (!config) {
            setError("로그인이 필요합니다.");
            return;
        }

        const payload = {};
        if (name.trim()) payload.name = name.trim();
        if (job.trim()) payload.job = job.trim();
        if (statusMsg.trim()) payload.statusMessage = statusMsg.trim();

        if (!Object.keys(payload).length) {
            setError("수정할 내용을 한 가지 이상 입력해주세요.");
            setMessage("");
            return;
        }

        try {
            setSaving(true);
            setError("");
            const response = await axios.put("/api/users/profile", payload, config);
            setProfileData(response.data.user);
            setName("");
            setJob("");
            setStatusMsg("");
            setMessage("저장되었습니다.");
            setTimeout(() => navigate("/mypage"), 500);
        } catch (saveError) {
            setError(saveError.response?.data?.error || "프로필 수정에 실패했습니다.");
            setMessage("");
        } finally {
            setSaving(false);
        }
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
                        <ProfileCircle $src={profileData?.profile} />
                        <div>
                            <ProfileTitle>{profileData?.name || profileData?.userid || "내 프로필"}</ProfileTitle>
                            <ProfileSub>{profileData?.email || "프로필 정보를 불러오는 중입니다."}</ProfileSub>
                        </div>
                    </ProfileWrapper>

                    {error ? <HelperText $error>{error}</HelperText> : null}
                    {!error && message ? <HelperText>{message}</HelperText> : null}

                    <InputGroup>
                        <Label>이름 <CurrentValue>현재: {profileData?.name || "-"}</CurrentValue></Label>
                        <Input
                            type="text"
                            placeholder="변경할 이름만 입력하세요."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>직무 <CurrentValue>현재: {profileData?.job || "-"}</CurrentValue></Label>
                        <Input
                            type="text"
                            placeholder="변경할 직무만 입력하세요."
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>상태 메시지 <CurrentValue>현재: {profileData?.statusMessage || "-"}</CurrentValue></Label>
                        <Input
                            type="text"
                            placeholder="변경할 상태 메시지만 입력하세요."
                            value={statusMsg}
                            onChange={(e) => setStatusMsg(e.target.value)}
                        />
                    </InputGroup>

                    <SaveButton onClick={handleSave} disabled={saving}>{saving ? "저장 중..." : "저장"}</SaveButton>
                </FormContainer>
            </MainContent>
        </>
    );
}
