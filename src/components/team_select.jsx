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

import plankLogo from "../assets/logo.svg";
import backIcon from "../assets/back-button.svg";
import { GlobalStyle } from "../pages/homePage";
import { BackButton, Icon, Logo, SumbitButton, Title } from "./team_create";
import { apiRequest } from "../utils/api";

const Wapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f9f9f8;
  padding: 20px 0;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 90%;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 0 30px 3px rgba(192, 218, 88, 0.4);
  box-sizing: border-box;
  padding-bottom: 45px; /* ★ 버튼 아래로 흰색 보더 박스가 넉넉하게 감싸도록 하단 패딩 확보 */

  @media (max-width: 480px) {
    width: 92%; 
    min-height: unset;
    height: auto;
    padding: 20px 0 35px; /* 모바일에서도 아래 보더가 버튼을 폭 감싸 안도록 설정 */
  }
`;

const TopWapper = styled.div`
  margin: 20px 0 0 20px;
  align-self: flex-start;
  @media (max-width: 480px) {
    margin: 10px 16px 0;
  }
`;

const MainWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const SelectForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RoleBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    padding: 20px 24px;
    margin: 20px 0 10px; /* ★ 아래 버튼과의 컴팩트한 배치를 위해 마진 살짝 축소 */
    
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
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
  transition: all 0.2s ease-in-out;

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

  @media (max-width: 480px) {
    width: 240px;
    height: 150px;
    flex-shrink: 0;
    padding: 16px 20px;
  }
`;

const RoleTitle = styled.span`
  align-self: stretch;
  color: #000;
  text-align: center;
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 18px;
  }
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

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px 10px;
    margin-top: 12px;
  }
`;

/* ★ 외부에서 가져온 SumbitButton컴포넌트를 덮어씌워 가로 너비를 슬림하게 교정 */
const StyledSubmitButton = styled(SumbitButton)`
  width: 320px; /* ★ 데스크톱에서 과하게 넓어지지 않도록 고정 크기 슬림화 */
  margin-top: 20px;
  
  @media (max-width: 480px) {
    width: 65%; /* ★ 모바일 화면 크기에 기죽지 않고 콤팩트한 비율 유지 */
    max-width: 280px;
    height: 50px; /* 버튼 높이 살짝 슬림화 */
    font-size: 16px;
    margin-top: 15px;
  }
`;

const roles = ["개발자", "디자이너", "기획자"];

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
