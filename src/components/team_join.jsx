//packages
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//asset, styled-components
import backbtn from "../assets/back-button.svg";
import logo from "../assets/logo.svg";
import { GlobalStyle } from "../pages/homePage";
import { Container } from "./team_create";
import { Title } from "./team_create";
import { TeamNameInput } from "./team_create";
import { Label } from "./team_create";
import { InputWrapper } from "./team_create";
import { SumbitButton } from "./team_create";
import { BackButton } from "./team_create";
import { Form } from "./team_create";
import { Icon } from "./team_create";
import { Logo } from "./team_create";

//css
const TeamCodeInput = styled.input`
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

export default function TeamJoin() {
    const [teamCode, setTeamCode] = useState("");

    const navigate = useNavigate();

    const sendTeamData = async (e) => {
        e.preventDefault();

        if(!teamCode.trim()){
            alert("팀 코드를 작성해 주세요!");
            return;
        }
        
        try{
            const token = localStorage.getItem('token');
            const res = await fetch("/api/teams/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    inviteCode: teamCode
                }),
            });

            if(!res.ok){
                const errorData = await res.json();
                console.log("팀 참가 실패!", errorData);
                alert("팀 참가 실패: " + (errorData.error || "알 수 없는 오류"));
            }else{
                const data = await res.json();
                const joinedTeam = data.team;
                if (joinedTeam?.id) {
                    localStorage.setItem("teamId", String(joinedTeam.id));
                }
                console.log("팀 참가 완료!");
                alert("팀 참가 성공");
                navigate("/team-select", { state: { teamId: joinedTeam?.id, team: joinedTeam } });
            }
        }catch(err){
            console.error(err);
            alert("팀 참가 중 오류 발생");
        }
    }

    return(
        <>
            <GlobalStyle />
            <BackButton onClick={() => navigate("/project")}>
                <Icon src={backbtn} />
            </BackButton>
            <Container>
                <Logo src={logo} />
                <Title>참가하기</Title>
                <Form onSubmit={sendTeamData}>
                    <InputWrapper>
                        <TeamCodeInput type="text" placeholder="" value={teamCode} onChange={(e) => setTeamCode(e.target.value)} />
                        <Label>팀 코드</Label>
                    </InputWrapper>
                    <SumbitButton>참가하기</SumbitButton>
                </Form>
            </Container>
        </>
    );
}
