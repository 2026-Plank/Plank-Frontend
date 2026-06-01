import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import backbtn from "../assets/back-button.svg";
import logo from "../assets/logo.svg";
import { GlobalStyle } from "../pages/homePage";
import { apiRequest, getAuthToken, mapApiTeam } from "../utils/api";

// team_create에서 기존 컴포넌트 임포트
import { 
  BackButton as BaseBackButton, 
  Container as BaseContainer, 
  Form as BaseForm, 
  Icon,
  Label, 
  Logo as BaseLogo, 
  SumbitButton as BaseSumbitButton, 
  Title,
  FloatingWrapper
} from "./team_create";

// ★ 모바일에서 튕기지 않도록 인풋 박스 반응형 수정
const TeamCodeInput = styled.input`
  display: flex;
  width: 100%; /* 고정 너비 해제 */
  max-width: 538px; /* 데스크톱 최대 크기 제한 */
  height: 90px;
  padding: 32px 24px;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
  border: none;
  outline: none;
  box-sizing: border-box;

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

  @media (max-width: 480px) {
    height: 64px; /* 모바일 전용 높이 단축 */
    padding: 20px 16px;
    font-size: 15px;

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 4px;
      font-size: 10px;
    }
  }
`;

// ★ team_create에서 가져온 컴포넌트들이 모바일에서 깨지지 않도록 재스타일링 (오버라이딩)
const Container = styled(BaseContainer)`
  @media (max-width: 480px) {
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
  }
`;

const Form = styled(BaseForm)`
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SumbitButton = styled(BaseSumbitButton)`
  @media (max-width: 480px) {
    width: 100%;
    max-width: 538px;
    height: 54px;
    font-size: 16px;
    margin-top: 24px;
  }
`;

const Logo = styled(BaseLogo)`
  @media (max-width: 480px) {
    width: 120px;
    height: auto;
    margin-bottom: 20px;
  }
`;

const BackButton = styled(BaseBackButton)`
  @media (max-width: 480px) {
    top: 20px;
    left: 20px;
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
          <FloatingWrapper>
            <TeamCodeInput
              type="text"
              placeholder=" "
              value={teamCode}
              onChange={(event) => setTeamCode(event.target.value)}
            />
            <Label>팀 코드</Label>
          </FloatingWrapper>
          <SumbitButton type="submit">참가하기</SumbitButton>
        </Form>
      </Container>
    </>
  );
}