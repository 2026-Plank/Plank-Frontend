//packages
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
//assets
import plank_logo from "../assets/logo.svg";
import back_icon from "../assets/back-button.svg";
//componets
import { GlobalStyle } from "../pages/homePage";
import { Title } from "./team_create";
import { SumbitButton } from "./team_create";
import { BackButton } from "./team_create";
import { Icon } from "./team_create";
import { Logo } from "./team_create";
//css
const Wapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Container = styled.div`
    width: 90%;
    height: 80%;
    justfiy-content: center;
    align-items: center;
    border-radius: 30px;
    background: #FFF;
    box-shadow: 0 0 30px 3px rgba(192, 218, 88, 0.40);
`;
const TopWapper = styled.div`
    margin: 20px 0;
`;
const MainWapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const RoleBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 40px 0 40px 0;
    width: 80%;
`;
const RoleCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 160px;
    gap: 10px;
    padding: 20px 28px 51px 28px;
    border-radius: 20px;
    border: 1px solid var(--Gray-5, #C9C9C8);
    background: var(--Gray-3, #F8F8F8);
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    border-color: ${({ $active }) => $active ? "#C0DA58" : "var(--Gray-5, #C9C9C8)"};
    background: ${({ $active }) => $active ? "#FFF" : "var(--Gray-3, #F8F8F8)"};

    &:hover{
        border-radius: 20px;
        border: 1px solid var(--Light-Green-2, #C0DA58);
        background: var(--white-1, #FFF);
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.40);
    }
`;

const RoleTitle = styled.span`
    align-self: stretch;
    color: var(--black-1, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-ailgn: center;
`;

const RoleInput = styled.input`
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 12px;
    color: var(--Gray-7, #70716F);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: 1px solid var(--Gray-5, #C9C9C8);
    background: var(--white-1, #FFF);
    outline: none;
    margin-top: 20px;
`;



export default function TeamSelectPage(){
    const navigate = useNavigate();
    const location = useLocation();

    const roles = ["개발자", "디자이너", "기획자"]; // API에서 받아온 데이터로 교체
    const [selectedRole, setSelectedRole] = useState(null);
    const [details, setDetails] = useState(
        Object.fromEntries(roles.map((role) => [role, ""]))
    );
    const teamId = location.state?.teamId ?? location.state?.team?.id;

    const saveSelection = async () => {
        if (!selectedRole) {
            alert("부서를 선택해 주세요!");
            return;
        }

        const jobDetail = details[selectedRole].trim();
        const payload = { department: selectedRole, jobDetail };

        localStorage.setItem("plank-last-team-role", JSON.stringify(payload));

        if (teamId) {
            const token = localStorage.getItem("token");
            try {
                await fetch(`/api/teams/${teamId}/members/me/department`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify(payload),
                });
            } catch (err) {
                console.error(err);
            }
        }

        navigate("/project");
    };

    return(
        <>
            <GlobalStyle />
            <Wapper>
                <Container>
                    <TopWapper>
                        <BackButton onClick={() => navigate("/team-join")}>
                            <Icon src={back_icon} />
                        </BackButton>
                    </TopWapper>
                    <MainWapper>
                        <Logo src={plank_logo} />
                        <Title>부서 선택</Title>
                        <RoleBox>
                            {roles.map((role) => (
                                <RoleCard
                                    key={role}
                                    $active={selectedRole === role}
                                    onClick={() => setSelectedRole(role)}
                                >
                                    <RoleTitle>{role}</RoleTitle>
                                    <RoleInput
                                        placeholder="맡을 업무 내용"
                                        value={details[role]}
                                        onChange={(e) => setDetails(prev => ({ ...prev, [role]: e.target.value }))}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </RoleCard>
                            ))}
                        </RoleBox>
                        <SumbitButton type="button" onClick={saveSelection}>선택 완료</SumbitButton>
                    </MainWapper>
                </Container>
            </Wapper>
        </>
    )
}
