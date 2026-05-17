import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import axios from "axios";

import plankLogo from "../assets/logo.svg";
import backIcon from "../assets/back-button.svg";
import { GlobalStyle } from "../pages/homePage";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 42px 24px;
  background: #fff;
`;

const Panel = styled.div`
  width: min(960px, 82vw);
  min-height: 504px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 0 30px 3px rgba(192, 218, 88, 0.4);
  position: relative;
  padding: 44px 72px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 28px;
  left: 28px;
  width: 36px;
  height: 36px;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const BackImg = styled.img`
  width: 18px;
  height: 18px;
`;

const Logo = styled.img`
  display: block;
  width: 220px;
  height: auto;
  margin: 0 auto 16px;
`;

const Title = styled.h1`
  margin: 0;
  color: #959794;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  max-width: 690px;
  margin: 44px auto 0;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const RoleCard = styled.button`
  height: 138px;
  padding: 24px 18px;
  border-radius: 10px;
  border: 1px solid ${({ $active }) => ($active ? "#c0da58" : "#d8d8d7")};
  background: ${({ $active }) => ($active ? "#fff" : "#fbfbfb")};
  box-shadow: ${({ $active }) => ($active ? "0 0 24px rgba(192, 218, 88, 0.45)" : "none")};
  cursor: pointer;
`;

const RoleName = styled.div`
  margin-bottom: 24px;
  color: #111;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
`;

const DetailInput = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #d8d8d7;
  border-radius: 7px;
  padding: 0 12px;
  outline: none;
  font-size: 12px;

  &:focus {
    border-color: #c0da58;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(338px, 80%);
  height: 56px;
  margin: 40px auto 0;
  border: none;
  border-radius: 8px;
  background: #c0da58;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const Message = styled.div`
  margin-top: 18px;
  color: ${({ $error }) => ($error ? "#d9534f" : "#7e9640")};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export default function TeamSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const teamId = location.state?.teamId || localStorage.getItem("teamId");
  const roles = useMemo(() => ["개발자", "디자이너", "기획자"], []);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [details, setDetails] = useState(Object.fromEntries(roles.map((role) => [role, ""])));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!teamId) {
      setError("팀 정보를 찾지 못했습니다. 다시 참여해주세요.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/teams/${teamId}/members/me/department`,
        { department: selectedRole, jobDetail: details[selectedRole] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/project");
    } catch (selectError) {
      setError(selectError.response?.data?.error || "부서 선택 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Page>
        <Panel>
          <BackButton type="button" onClick={() => navigate("/team-join")}>
            <BackImg src={backIcon} alt="back" />
          </BackButton>
          <Logo src={plankLogo} alt="plank" />
          <Title>부서 선택</Title>
          <RoleGrid>
            {roles.map((role) => (
              <RoleCard
                key={role}
                type="button"
                $active={selectedRole === role}
                onClick={() => setSelectedRole(role)}
              >
                <RoleName>{role}</RoleName>
                <DetailInput
                  placeholder="상세 직무 입력"
                  value={details[role]}
                  onChange={(event) => setDetails((prev) => ({ ...prev, [role]: event.target.value }))}
                  onClick={(event) => event.stopPropagation()}
                />
              </RoleCard>
            ))}
          </RoleGrid>
          <SubmitButton type="button" onClick={handleSubmit} disabled={saving}>
            {saving ? "저장 중..." : "선택 완료"}
          </SubmitButton>
          {error ? <Message $error>{error}</Message> : null}
        </Panel>
      </Page>
    </>
  );
}
