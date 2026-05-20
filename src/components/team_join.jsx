import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import backbtn from "../assets/back-button.svg";
import logo from "../assets/logo.svg";
import { GlobalStyle } from "../pages/homePage";
import { BackButton, Container, Form, Icon, InputWrapper, Label, Logo, SumbitButton, TeamNameInput, Title } from "./team_create";
import { apiRequest, getAuthToken, mapApiTeam } from "../utils/api";

const TeamCodeInput = styled.input`
  display: flex;
  width: 538px;
  height: 90px;
  padding: 32px 24px;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
  border: none;
  outline: none;

  &:focus {
    border-color: #c0da58;
    box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.3);
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 8px;
    font-size: 12px;
    color: #70716f;
  }
`;

export default function TeamJoin() {
  const [teamCode, setTeamCode] = useState("");
  const navigate = useNavigate();

  const sendTeamData = async (event) => {
    event.preventDefault();

    if (!teamCode.trim()) {
      alert("프로젝트 코드를 작성해 주세요.");
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
      if (team.id) {
        localStorage.setItem("teamId", String(team.id));
      }
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
      <Container>
        <Logo src={logo} />
        <Title>참가하기</Title>
        <Form onSubmit={sendTeamData}>
          <InputWrapper>
            <TeamCodeInput
              type="text"
              placeholder=" "
              value={teamCode}
              onChange={(event) => setTeamCode(event.target.value)}
            />
            <Label>팀 코드</Label>
          </InputWrapper>
          <SumbitButton type="submit">참가하기</SumbitButton>
        </Form>
      </Container>
    </>
  );
}
