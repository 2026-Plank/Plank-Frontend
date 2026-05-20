import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

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

export const TeamNameInput = styled.input`
    display: flex;
    width: 538px;
    height: 90px;
    padding: 32px 24px;
    align-items: center;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
    border: none;
    outline: none;
`;

const DateField = styled.div`
    display: flex;
    width: 538px;
    height: 90px;
    padding: 32px 24px;
    align-items: center;
    position: relative;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
    cursor: pointer;
`;

const DateValue = styled.span`
    color: #111;
    font-size: 14px;
    line-height: 1;
`;

const DateCaption = styled.span`
    position: absolute;
    left: 16px;
    top: 18px;
    color: #70716f;
    font-size: 14px;
    pointer-events: none;
`;

const DateInput = styled.input`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    opacity: 0;
    pointer-events: none;

    &::-webkit-datetime-edit {
        display: none;
    }

    &::-webkit-calendar-picker-indicator {
        opacity: 0;
        cursor: pointer;
    }
`;

const DescriptionInput = styled.textarea`
    display: flex;
    width: 538px;
    min-height: 120px;
    padding: 32px 24px;
    align-items: center;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
    border: none;
    outline: none;
    resize: vertical;
    font: inherit;
`;

export const InputWrapper = styled.div`
    position: relative;
    width: 538px;
`;

export const Label = styled.label`
    position: absolute;
    left: 16px;
    top: 18px;
    color: #70716f;
    font-size: 14px;
    pointer-events: none;
`;

export const Title = styled.span`
    margin: 40px;
    color: #959794;
    font-size: 30px;
    font-weight: 600;
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

const DepartmentContainer = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    width: 538px;
    margin-bottom: 24px;
`;

const DepartmentButton = styled.button`
    padding: 12px 20px;
    border: 2px solid ${({ $selected }) => ($selected ? "#c0da58" : "#e0e0e0")};
    border-radius: 8px;
    background: ${({ $selected }) => ($selected ? "#c0da58" : "#fff")};
    color: ${({ $selected }) => ($selected ? "#fff" : "#666")};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        border-color: #c0da58;
    }
`;

const departments = ["프로젝트 기획", "UI 디자인", "개발", "품질 보증"];

export default function TeamCreate() {
    const navigate = useNavigate();
    const dateInputRef = useRef(null);
    const [teamName, setTeamName] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [department, setDepartment] = useState("");

    const openDatePicker = () => {
        if (dateInputRef.current?.showPicker) {
            dateInputRef.current.showPicker();
            return;
        }

        dateInputRef.current?.focus();
        dateInputRef.current?.click();
    };

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
                    description: projectDescription.trim(),
                    department: department || "기획자",
                }),
            });

            const team = mapApiTeam(data.team);
            if (team.id) {
                localStorage.setItem("teamId", String(team.id));
            }
            navigate("/team-select", {
                state: {
                    team,
                    teamId: team.id,
                    from: "create",
                    nextPath: "/team-modify",
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
                    <InputWrapper>
                        <Label>프로젝트 이름</Label>
                        <TeamNameInput
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label>마감일</Label>
                        <DateField onClick={openDatePicker}>
                            <DateCaption>마감일</DateCaption>
                            <DateValue>{endDate}</DateValue>
                            <DateInput
                                ref={dateInputRef}
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </DateField>
                    </InputWrapper>
                    <InputWrapper>
                        <Label>프로젝트 설명</Label>
                        <DescriptionInput
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                        />
                    </InputWrapper>
                    <div>
                        <Label style={{ position: "static", display: "block", margin: "10px 0" }}>
                            부서 선택
                        </Label>
                        <DepartmentContainer>
                            {departments.map((dept) => (
                                <DepartmentButton
                                    key={dept}
                                    type="button"
                                    $selected={department === dept}
                                    onClick={() => setDepartment(dept)}
                                >
                                    {dept}
                                </DepartmentButton>
                            ))}
                        </DepartmentContainer>
                    </div>
                    <SumbitButton type="submit">생성하기</SumbitButton>
                </Form>
            </Container>
        </>
    );
}
