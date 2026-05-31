import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import backbtn from "../assets/back-button.svg";
import logo from "../assets/logo.svg";
import { GlobalStyle } from "../pages/homePage";
import { BackButton, Container, Form, Icon, InputWrapper, Label, Logo, SumbitButton } from "./team_create";
import { apiRequest, getAuthToken, mapApiTeam } from "../utils/api";

const TeamCodeInput = styled.input`
  display: flex;
  width: 538px;
  height: 90px;
  padding: 42px 24px 16px;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
  border: none;
  outline: none;
  font-size: 16px;

  &:focus {
    border-color: #c0da58;
    box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.3);
  }
`;

const JoinForm = styled(Form)`
  margin-top: 58px;
`;

const JoinButton = styled(SumbitButton)`
  margin-top: 48px;
`;

const JoinContainer = styled(Container)`
  margin-top: 64px;
`;

export default function TeamJoin() {
  const [teamCode, setTeamCode] = useState("");
  const navigate = useNavigate();

  const sendTeamData = async (event) => {
    event.preventDefault();

    if (!teamCode.trim()) {
      alert("프로젝트 코드를 입력해주세요.");
      return;
    }

    if (!getAuthToken()) {
      alert("로그인 후 프로젝트에 참가할 수 있습니다.");
      return;
    }

    try {
      const data = await apiRequest("/api/teams/join", {
        method: "POST",
        body: JSON.stringify({ inviteCode: teamCode.trim() }),
      });
      const team = mapApiTeam(data.team);
      if (team.id) localStorage.setItem("teamId", team.id);
      navigate("/team-select", { state: { team, teamId: team.id, from: "join" } });
    } catch (error) {
      alert(error.message || "프로젝트 참가에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackButton onClick={() => navigate("/project")}>
        <Icon src={backbtn} />
      </BackButton>
      <JoinContainer>
        <Logo src={logo} />
        <span style={{ margin: 40, color: "#959794", fontSize: 30, fontWeight: 600 }}>참가하기</span>
        <JoinForm onSubmit={sendTeamData}>
          <InputWrapper>
            <Label>팀 코드</Label>
            <TeamCodeInput
              type="text"
              value={teamCode}
              onChange={(event) => setTeamCode(event.target.value)}
            />
          </InputWrapper>
          <JoinButton type="submit">참가하기</JoinButton>
        </JoinForm>
      </JoinContainer>
    </>
  );
}
