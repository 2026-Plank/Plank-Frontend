//packages
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//assets, components
import Backbtn from '../assets/back-button.svg';
import logo from '../assets/logo.svg';
import { GlobalStyle } from "../pages/homePage";
import { formatToday } from "../utils/teamDisplay";

//css
export const Container = styled.div`
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
export const Form = styled.form`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;
export const TeamNameInput = styled.input`
    display: flex;
    width: 538px;
    height: 90px;
    padding: 32px 24px;
    align-items: center;
    gap: 10px;

    border-radius: 12px;
    background: #FFF;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
    border: none;
    outline: none;
    &:focus {
        border-color: #C0DA58;
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }
    &:focus + label,
    &:not(:placeholder-shown) + label {
        top: 8px;
        font-size: 12px;
        color: var(--Gray-7, #70716F);
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }
`;
const DateInput = styled.input`
    display: flex;
    width: 538px;
    height: 90px;
    padding: 32px 24px;
    align-items: center;
    gap: 10px;

    border-radius: 12px;
    background: #FFF;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
    border: none;
    outline: none;
    &:focus {
        border-color: #C0DA58;
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }
    &:focus + label,
    &:not(:placeholder-shown) + label {
        top: 8px;
        font-size: 12px;
        color: var(--Gray-7, #70716F);
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }
`;
export const InputWrapper = styled.div`
    position: relative;
    width: 538px;
`;
export const Label = styled.label`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--Gray-7, #70716F);
    font-size: 16px;
    pointer-events: none;
    transition: all 0.2s ease;
`;
export const Title = styled.span`
    margin: 40px;
    color: #959794;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
export const SumbitButton = styled.button`
    display: flex;
    width: 538px;
    height: 92px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;
    cursor: pointer;
    margin: 40px 0;

    border-radius: 12px;
    background: var(--Light-Green-2, #C0DA58);
    box-shadow: 0 0 29.5px 2px rgba(0, 0, 0, 0.08);

    color: var(--white-1, #FFF);
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
export const BackButton = styled.button`
    width: 96px;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Icon = styled.img`
    width: 32px;
    height: 64px;
`;
export const Logo = styled.img`
    width: 324px;
    height: 136px;
`;



export default function TeamCreate(){
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");
    const [endDate, setDate] = useState("");
    const buildPeriod = (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "";
        if (/[-~]/.test(trimmed)) return trimmed;
        return `${formatToday()} ~ ${trimmed}`;
    };

    //일정 입력 통일되게 맞추는 함수
    const formatPeriod = (value) => {
        if (!value) return null;
    
        // 구분자(-, ~) 기준으로 시작/끝 분리
        const parts = value.split(/[-~]/);
        if (parts.length !== 2) return null;
    
        const formatPart = (part) => {
            // 숫자만 추출 (., / 제거)
            const nums = part.trim().replace(/[./]/g, "-").split("-");
            if (nums.length !== 2) return null;
    
            let [month, day] = nums;
            if (!month || !day) return null;
    
            month = month.trim().padStart(2, "0");
            day = day.trim().padStart(2, "0");
    
            return `${month}/${day}`;
        };
    
        const start = formatPart(parts[0]);
        const end = formatPart(parts[1]);
    
        if (!start || !end) return null;
    
        return `${start} - ${end}`;  // 03/01-06/01 형식
    };

    const sendTeamData = async (e) => {
        e.preventDefault();
        const randomCode = Math.random().toString(36).substring(2, 10).toLowerCase();
        navigate("/team-modify", {
            state: {
                team: {
                    id: null,
                    title: teamName,
                    period: buildPeriod(endDate),
                    code: randomCode,
                    charge: "",
                    members: [],
                    description: "",
                    team_explan: [],
                    team_deadline: [],
                },
                from: "create"
            }
        });
    
        // if (!teamName.trim() || !endDate.trim()) {
        //     alert("프로젝트 이름과 기간을 작성해 주세요!");
        //     return;
        // }
    
        // const formattedPeriod = formatPeriod(endDate);
    
        // if (!formattedPeriod) {
        //     alert("기간 형식이 올바르지 않습니다! (예: 03/01-06/01)");
        //     return;
        // }
    
        // try {
        //     const res = await fetch("host이름/team", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({
        //             teamName,
        //             period: formattedPeriod  // "03/01-06/01" 형식으로 저장
        //         }),
        //     });
    
        //     if (res.ok) {
        //         console.log("팀 생성 완료!");
        //         alert("팀 생성 완료");
        //         const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        //         navigate("/team-modify", {
        //             state: {
        //                 team: {
        //                     id: null,
        //                     title: teamName,
        //                     period: formattedPeriod,
        //                     code: randomCode,
        //                     charge: "",
        //                     members: [],
        //                     description: "",
        //                     team_explan: [],
        //                     team_deadline: [],
        //                 }
        //             }
        //         });
        //     } else {
        //         console.log("팀 생성 실패!");
        //         alert("팀 생성 실패");
        //     }
        // } catch (err) {
        //     console.error(err);
        // }
    };

    return(
        <>
            <GlobalStyle />
                <BackButton onClick={() => navigate("/project")}>
                    <Icon src={Backbtn} />
                </BackButton>
                <Container>
                    <Logo src={logo} />
                    <Title>생성하기</Title>
                    <Form onSubmit={sendTeamData}>
                        <InputWrapper>
                            <TeamNameInput type="text" placeholder="" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                            <Label>프로젝트 이름</Label>
                        </InputWrapper>
                        <InputWrapper>
                            <DateInput type="text" placeholder="" value={endDate} onChange={(e) => setDate(e.target.value)} />
                            <Label>기간</Label>
                        </InputWrapper>
                        <SumbitButton type="submit">생성하기</SumbitButton>
                    </Form>
                </Container>
        </>
    )
}
