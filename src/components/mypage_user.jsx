import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

// --- 이미지 임포트 ---
import profile from '../assets/profile.svg';

// --- 컴포넌트 임포트 ---
import Menu from "./menu"; // ★ 반응형 처리가 완료된 공통 Menu 컴포넌트 임포트

/* --- Global Styles --- */
export const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Pretendard Variable", Pretendard, sans-serif;
        margin: 0; padding: 0; box-sizing: border-box;
    }
    body { background-color: #FFF; overflow-x: hidden; }
`;

/* --- 메인 컨텐츠 영역 (반응형 수정) --- */
const MainContent = styled.div`
    margin-left: 130px; 
    padding: 100px; 
    min-height: 100vh;
    display: flex; 
    flex-direction: column; 
    align-items: center;
    box-sizing: border-box;

    @media (max-width: 480px) {
        margin-left: 0; /* 모바일 사이드바가 사라지므로 마진 제거 */
        padding: 40px 20px 100px; /* 상하좌우 패딩 축소 및 하단 탭바 공간(100px) 확보 */
    }
`;

const FormContainer = styled.div` 
    width: 100%; 
    max-width: 800px; 
    display: flex; 
    flex-direction: column; 
    gap: 40px; 

    @media (max-width: 480px) {
        gap: 24px; /* 모바일 요소 간격 축소 */
    }
`;

const ProfileWrapper = styled.div` 
    display: flex; 
    align-items: center; 
    gap: 25px; 
    margin-bottom: 20px; 

    @media (max-width: 480px) {
        gap: 16px;
        margin-bottom: 10px;
    }
`;

const ProfileCircle = styled.div`
    width: 100px; height: 100px; border-radius: 50%;
    background-image: url(${profile}); background-size: cover; background-position: center;
    background-repeat: no-repeat; background-color: #F0F0F0;

    @media (max-width: 480px) {
        width: 80px; height: 80px; /* 프로필 이미지 크기 최적화 */
    }
`;

const ChangePhotoButton = styled.button`
    padding: 10px 20px; background: none; border: 1px solid #EAEAEA; border-radius: 20px;
    color: #888; font-size: 14px; cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: 0.2s;
    &:hover { background-color: #F9F9F8; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }

    @media (max-width: 480px) {
        padding: 8px 16px;
        font-size: 13px;
    }
`;

const InputGroup = styled.div` display: flex; flex-direction: column; gap: 15px; `;
const Label = styled.label` font-size: 16px; font-weight: 700; color: #333; `;

const Input = styled.input`
    width: 100%; height: 56px; padding: 0 20px;
    border: 1px solid #F3F3F3;
    border-radius: 12px; background-color: #FFF;
    font-size: 15px; outline: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03); 
    transition: all 0.2s ease-in-out;

    &::placeholder { color: #CCC; }
    
    &:focus {
        border-color: #C0DA58;
        box-shadow: 0 4px 15px rgba(192, 218, 88, 0.15); 
    }

    @media (max-width: 480px) {
        height: 48px;
        padding: 0 16px;
        font-size: 14px;
    }
`;

const SaveButton = styled.button`
    width: 240px; height: 56px; background-color: #C0DA58; color: #FFF;
    font-size: 18px; font-weight: 700; border: none; border-radius: 12px;
    cursor: pointer; align-self: flex-end; margin-top: 20px;
    box-shadow: 0 4px 12px rgba(192, 218, 88, 0.2);
    transition: background-color 0.2s;
    &:hover { background-color: #ADC84B; }

    @media (max-width: 480px) {
        width: 100%; /* 모바일에서는 하단 꽉 찬 버튼으로 배치 */
        height: 52px;
        font-size: 16px;
        align-self: center;
        margin-top: 10px;
    }
`;

export default function MypageUser() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [statusMsg, setStatusMsg] = useState("");

    const handleSave = async () => {
        const body = {};

        if (name.trim() !== "") body.name = name;
        if (job.trim() !== "") body.job = job;
        if (statusMsg.trim() !== "") body.status = statusMsg;

        try {
            const data = await apiRequest("/api/users/profile", {
                method: "PUT",
                body: JSON.stringify(body)
            });
            console.log("응답:", data);

            const prevUser = JSON.parse(localStorage.getItem("user")) || {};
            const updatedUser = {
                ...prevUser,
                ...data.user
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            alert("저장 완료");
            navigate("/mypage");
        } catch (error) {
            console.error(error);
            alert("저장에 실패했습니다.");
        }
    };

    return (
        <>
            <GlobalStyle />
            {/* ★ 완성된 공통 반응형 메뉴 컴포넌트 주입 */}
            <Menu />

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
