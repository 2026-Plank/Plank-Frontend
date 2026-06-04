import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Backbtn from "../assets/back-button.svg";
import logo from "../assets/logo.svg";
import { GlobalStyle } from "../pages/homePage";
import { apiRequest, getAuthToken, mapApiTeam, toApiDate } from "../utils/api";

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
    const [endDate, setEndDate] = useState("");
    const [department, setDepartment] = useState("");

    const sendTeamData = async (e) => {
        e.preventDefault();

        if (!teamName.trim() || !endDate.trim()) {
            alert("프로젝트 이름과 기간을 작성해 주세요.");
            return;
        }

        if (!getAuthToken()) {
            alert("로그인 후 프로젝트를 생성할 수 있습니다.");
            return;
        }

        try {
            const data = await apiRequest("/api/teams/create", {
                method: "POST",
                body: JSON.stringify({
                    name: teamName.trim(),
                    deadline: toApiDate(endDate),
                    department: department || "기획",
                }),
            });

            const team = mapApiTeam(data.team);
            navigate("/team-select", {
                state: {
                    team,
                    teamId: team.id,
                    from: "create",
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
    );
}