import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import plankLogo from "../assets/logo.svg";
import backIcon from "../assets/back-button.svg";
import { GlobalStyle } from "../pages/homePage";
import { BackButton, Icon, Logo, SumbitButton, Title } from "./team_create";
import { apiRequest } from "../utils/api";

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
  min-height: 80%;
  align-items: center;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 0 30px 3px rgba(192, 218, 88, 0.4);
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

const SelectForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoleBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  width: 100%;
`;

const RoleCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 160px;
  gap: 10px;
  padding: 20px 28px 51px;
  border-radius: 20px;
  border: 1px solid #c9c9c8;
  background: #f8f8f8;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    `
      border: 1px solid #c0da58;
      background: #fff;
      box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.40);
    `}

  &:hover {
    border: 1px solid #c0da58;
    background: #fff;
    box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.4);
  }
`;

const RoleTitle = styled.span`
  align-self: stretch;
  color: #000;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
`;

const RoleInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 12px;
  color: #70716f;
  font-size: 18px;
  border: 1px solid #c9c9c8;
  background: #fff;
  outline: none;
  margin-top: 20px;
`;

const roles = ["개발자", "디자이너", "기획자"];

export default function TeamSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const teamId = location.state?.teamId || location.state?.team?.id;
  const [selectedRole, setSelectedRole] = useState(null);
  const [details, setDetails] = useState(Object.fromEntries(roles.map((role) => [role, ""])));

  const sendSelectedRole = async (event) => {
    event.preventDefault();

    if (!selectedRole) {
      alert("부서를 선택해 주세요.");
      return;
    }

    if (!teamId) {
      navigate("/project");
      return;
    }

    try {
      await apiRequest(`/api/teams/${teamId}/members/me/department`, {
        method: "PATCH",
        body: JSON.stringify({
          department: selectedRole,
          jobDetail: details[selectedRole],
        }),
      });
      navigate("/project");
    } catch (error) {
      alert(error.message || "부서 선택 저장에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wapper>
        <Container>
          <TopWapper>
            <BackButton onClick={() => navigate("/team-join")}>
              <Icon src={backIcon} />
            </BackButton>
          </TopWapper>
          <MainWapper>
            <Logo src={plankLogo} />
            <Title>부서 선택</Title>
            <SelectForm onSubmit={sendSelectedRole}>
              <RoleBox>
                {roles.map((role) => (
                  <RoleCard key={role} $active={selectedRole === role} onClick={() => setSelectedRole(role)}>
                    <RoleTitle>{role}</RoleTitle>
                    <RoleInput
                      placeholder="상세 직무 입력"
                      value={details[role]}
                      onChange={(event) => setDetails((prev) => ({ ...prev, [role]: event.target.value }))}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </RoleCard>
                ))}
              </RoleBox>
              <SumbitButton type="submit">선택 완료</SumbitButton>
            </SelectForm>
          </MainWapper>
        </Container>
      </Wapper>
    </>
  );
}
