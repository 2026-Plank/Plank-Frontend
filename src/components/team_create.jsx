import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Backbtn from "../assets/back-button.svg";
import logo from "../assets/logo.svg";
import { GlobalStyle } from "../pages/homePage";
import { formatToday } from "../utils/teamDisplay";

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
export const InputWrapper = styled.div`
    position: relative;
    width: 538px;
    margin-top: 30px;
    border-radius: 16px;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
    transition: all 0.2s ease;

    &:focus-within {
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.5);
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;
const Input = styled.input`
    width: 100%;
    height: 90px;
    border-radius: 16px;
    border: none;
    outline: none;
    font-size: 22px;
    padding: 25px;
    background: transparent;

    @media (max-width: 600px) {
        width: 100%;
        height: 70px;
        padding: 24px 16px;
        font-size: 20px;
    }
`;
export const Label = styled.label`
    position: absolute;
    left: 25px;
    top: 50%;
    transform: translateY(-50%);
    color: #70716F;
    font-size: 16px;
    pointer-events: none;
    transition: all 0.2s ease;

    @media (max-width: 600px) {
        top: 50%;
        font-size: 14px;
    }
`;
export const FloatingWrapper = styled(InputWrapper)`
    input:focus + label,
    input:not(:placeholder-shown) + label {
        margin-top: 5px;
        top: 10px;
        font-size: 12px;
    }
`

export const Title = styled.span`
    margin: 40px;
    color: #959794;
    font-size: 30px;
    font-weight: 600;

    @media (max-width: 600px) {
        font-size: 22px;
        margin: 24px;
    }
`;

export const SumbitButton = styled.button`
    display: flex;
    width: 538px;
    height: 92px;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    margin: 40px 0 16px;
    border-radius: 12px;
    background: #c0da58;
    box-shadow: 0 0 29.5px 2px rgba(0, 0, 0, 0.08);
    color: #fff;
    font-size: 28px;
    font-weight: 600;

    @media (max-width: 600px) {
        width: 100%;
        height: 68px;
        font-size: 20px;
        margin: 24px 0 12px;
    }
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

    @media (max-width: 600px) {
        width: 60px;
    }
`;

export const Icon = styled.img`
    width: 32px;
    height: 64px;

    @media (max-width: 600px) {
        width: 20px;
        height: 40px;
    }
`;

export const Logo = styled.img`
    width: 324px;
    height: 136px;

    @media (max-width: 600px) {
        width: 200px;
        height: 84px;
    }
`;

export default function TeamCreate() {
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
            });
        } catch (err) {
            alert(err.message || "프로젝트 생성에 실패했습니다.");
            console.error(err);
        }
    };

    return (
        <>
            <GlobalStyle />
            <BackButton onClick={() => navigate("/project")}>
                <Icon src={Backbtn} />
            </BackButton>
            <Container>
                <Logo src={logo} />
                <Title>프로젝트 생성</Title>
                <Form onSubmit={sendTeamData}>
                    <FloatingWrapper>
                        <Input
                            type="text"
                            value={teamName}
                            placeholder=" "
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <Label>프로젝트 이름</Label>
                    </FloatingWrapper>
                    <FloatingWrapper>
                        <Input
                            type="text"
                            value={endDate}
                            placeholder=" "
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <Label>마감일</Label>
                    </FloatingWrapper>
                    <FloatingWrapper>
                        <Input
                            type="text"
                            value={department}
                            placeholder=" "
                            onChange={(e) => setDepartment(e.target.value)} 
                        />
                        <Label>부서 입력</Label>
                    </FloatingWrapper>
                    <SumbitButton type="submit">생성하기</SumbitButton>
                </Form>
            </Container>
        </>
    )
}
