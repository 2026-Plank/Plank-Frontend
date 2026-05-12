import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import symbol from "../assets/symbol.svg";
import home from "../assets/home.svg";
import in_home from "../assets/in_home.svg";
import calendar from "../assets/calendar.svg";
import in_calendar from "../assets/in_calendar.svg";
import pen from "../assets/pen.svg";
import in_pen from "../assets/in_pen.svg";
import chat from "../assets/chat.svg";
import in_chat from "../assets/in_chat.svg";
import icon from "../assets/icon.svg";
import in_icon from "../assets/in_icon.svg";
import alarm from "../assets/alarm.svg";
import logo from "../assets/logo.svg";
import user_icon from "../assets/default_user_icon.svg";
import extra_icon from "../assets/over_member_icon.svg";
import teamLogo from "../assets/logo.svg";
import backIcon from "../assets/detail_back_icon.svg";

import { GlobalStyle } from "../pages/homePage";
import { Menu } from "../pages/homePage";
import { Symbol } from "../pages/homePage";
import { Logo } from "../pages/homePage";
import { Item } from "../pages/homePage";
import { Background } from "../pages/homePage";
import { Icon } from "../pages/homePage";
import { Text } from "../pages/homePage";
import { Line } from "../pages/homePage";
import { PageLayout } from "./schedule_page";
import { ContentBox } from "./schedule_page";

export const TextLine = styled.div`
  width: 100%;
  height: 1px;
  background: #c9c9c8;
  margin-bottom: 0;
  margin-top: ${({ $margin_size }) => $margin_size || 0}px;
  flex-shrink: 0;
`;

export const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  margin-left: 12%;
  margin-right: 6%;
`;

export const BackWapper = styled.div`
  margin: 2%;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const BackText = styled.span`
  color: #70716f;
  font-size: 20px;
  font-weight: 500;
`;

const ProjectIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const ProjectLogo = styled.img`
  width: 142px;
  height: 142px;
`;

export const ProjectName = styled.span`
  color: #2c2c2c;
  font-size: 40px;
  font-weight: 600;
  padding: 10px 0 32px 0;
`;

const InfoText = styled.span`
  color: #70716f;
  font-size: 22px;
  font-weight: 500;
  margin-right: 5%;
  width: 120px;
  flex-shrink: 0;
`;

const DataText = styled.span`
  color: #000;
  font-size: 22px;
  font-weight: 400;
`;

const UserWapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const TextWapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const UserIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const NameText = styled.span`
  margin: 0 10px;
  color: #000;
  font-size: 22px;
  font-weight: 400;
`;

export const VerticalLine = styled.div`
  width: 4px;
  height: 50px;
  background: #c0da58;
`;

export const ExplanText = styled.span`
  margin-left: 3.5%;
  color: #575856;
  font-size: 20px;
  font-weight: 400;
  line-height: 160%;
`;

export const DescriptionText = styled.span`
  margin-left: 28px;
  color: #000;
  font-size: 24px;
  font-weight: 600;
`;

export const BottomWapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const TeamBox = styled.div`
  display: flex;
  margin-left: 3%;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TeamWapper = styled.div`
  width: 380px;
  min-height: 210px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const NameWapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;

export const TeamName = styled.span`
  color: #000;
  font-size: 22px;
  font-weight: 600;
  line-height: 160%;
`;

export const TeamTextWapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 20px;
  position: relative;
`;

export const TitleText = styled.span`
  color: #70716f;
  font-size: 18px;
  font-weight: 500;
  width: 50px;
  flex-shrink: 0;
  margin-right: 20px;
`;

export const MemberWapper = styled.div`
  display: flex;
  white-space: nowrap;
`;

export const TextIconWapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MemberIcon = styled.img`
  width: 28px;
  height: 28px;
`;

export const MemberName = styled.span`
  margin: 0 5px;
  color: #000;
  font-size: 18px;
  font-weight: 400;
  white-space: nowrap;
`;

export const TeamDeadLineText = styled.span`
  color: #000;
  font-size: 18px;
  font-weight: 400;
`;

export const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TeamContentText = styled.span`
  color: #000;
  font-size: 18px;
  font-weight: 400;
  width: 100%;
`;

export const ExtraWapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  margin: 0 5px;
`;

export const ExtraIcon = styled.img`
  width: 18px;
  height: 18px;
  transform: rotate(-90deg);
`;

export const ExtraCount = styled.span`
  margin-left: 2px;
  color: #000;
  font-size: 18px;
  font-weight: 400;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
`;

const FeedbackSection = styled.div`
  margin: 32px 0 56px 0;
  padding: 24px;
  border: 1px solid #e6e6e5;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
`;

const FeedbackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const FeedbackCard = styled.div`
  border: 1px solid #ececeb;
  border-radius: 18px;
  padding: 18px;
  background: #fcfcfb;
`;

const FeedbackName = styled.div`
  color: #2c2c2c;
  font-size: 18px;
  font-weight: 700;
`;

const FeedbackInput = styled.textarea`
  width: 100%;
  min-height: 110px;
  margin-top: 12px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #ddd;
  outline: none;
  resize: vertical;
  font-size: 14px;
  font-family: Pretendard;
`;

const FeedbackSelect = styled.select`
  width: 100%;
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
`;

const FeedbackButton = styled.button`
  margin-top: 12px;
  border: none;
  border-radius: 14px;
  padding: 12px 16px;
  background: #c0da58;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const FeedbackItem = styled.div`
  border: 1px solid #ececeb;
  border-radius: 16px;
  padding: 16px;
`;

const FeedbackItemTitle = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 700;
`;

const FeedbackItemMeta = styled.div`
  margin-top: 6px;
  color: #8b8b8a;
  font-size: 13px;
`;

const FeedbackItemBody = styled.div`
  margin-top: 8px;
  color: #575856;
  font-size: 14px;
  line-height: 1.6;
`;

const FeedbackMessage = styled.div`
  margin-top: 12px;
  color: ${({ $error }) => ($error ? "#d9534f" : "#7e9640")};
  font-size: 14px;
  font-weight: 600;
`;

export default function TeamDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [teamFeedbacks, setTeamFeedbacks] = useState([]);
  const [feedbackForm, setFeedbackForm] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [memberUserMap, setMemberUserMap] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const menus = [
    { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
    { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
    { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
    { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
    { path: "/mypage", icon: icon, activeIcon: in_icon, label: "MY PAGE" }
  ];

  const isAlarmActive = location.pathname === "/notification";

  const initialTeam = {
    id: location.state?.team?.id || localStorage.getItem("teamId") || null,
    title: location.state?.team?.title || "프로젝트 명",
    period: location.state?.team?.period || "",
    charge: location.state?.team?.charge || "",
    code: location.state?.team?.code || "",
    members: location.state?.team?.members || [],
    description: location.state?.team?.description || "",
    team_explan: location.state?.team?.team_explan || [],
    team_deadline: location.state?.team?.team_deadline || [],
    logo: location.state?.team?.logo || null
  };

  const [team, setTeam] = useState(initialTeam);
  const teamId = initialTeam.id;

  const authConfig = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      const config = authConfig();
      if (!config) return;
      try {
        const response = await axios.get('/api/users/profile', config);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('현재 사용자 정보 조회 실패', error);
      }
    };

    const loadTeamDetails = async () => {
      if (!teamId) return;
      const config = authConfig();
      if (!config) return;
      try {
        const response = await axios.get(`/api/teams/${teamId}`, config);
        const data = response.data.team;
        if (data) {
          const normalizedMembers = (data.members || []).map((member) => ({
            id: member.id ?? member.USERID ?? member.userid ?? null,
            role: member.role ?? member.ROLE ?? null,
            name: member.name ?? member.NAME ?? member.email ?? member.userid ?? '알 수 없는 사용자',
            email: member.email ?? null,
            join_team: member.join_team ?? member.JOIN_TEAM ?? null
          }));
          setTeam((prev) => ({
            ...prev,
            title: data.name || prev.title,
            period: data.deadline || prev.period,
            charge: data.dpLeader || prev.charge,
            code: data.teamCode || prev.code,
            description: data.dpName || prev.description,
            members: normalizedMembers
          }));
        }
      } catch (error) {
        console.error("팀 정보 조회 실패", error);
      }
    };

    loadCurrentUser();
    loadTeamDetails();
  }, [teamId]);

  const getMemberKey = (member, index) => {
    return `${member.id ?? member.userid ?? member.email ?? member.name ?? "member"}-${index}`;
  };

  const resolveMemberUserId = async (member, index) => {
    if (member.id) return member.id;
    if (member.userid) return member.userid;

    const memberKey = getMemberKey(member, index);
    if (memberUserMap[memberKey]?.id) {
      return memberUserMap[memberKey].id;
    }

    const config = authConfig();
    if (!config || !member.name) return null;

    const response = await axios.get(
      `/api/users/search?keyword=${encodeURIComponent(member.name)}`,
      config
    );
    const exactMatch = (response.data.users || []).find((user) => user.name === member.name);
    if (exactMatch) {
      setMemberUserMap((prev) => ({
        ...prev,
        [memberKey]: exactMatch
      }));
      return exactMatch.id;
    }
    return null;
  };

  const loadTeamFeedbacks = async () => {
    if (!team.id) return;
    const config = authConfig();
    if (!config) return;
    try {
      const response = await axios.get(`/api/feedbacks/team/${team.id}`, config);
      setTeamFeedbacks(response.data.feedbacks || []);
    } catch (error) {
      setFeedbackError(error.response?.data?.error || "팀 피드백을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    loadTeamFeedbacks();
  }, [team.id]);

  useEffect(() => {
    const config = authConfig();
    if (!config || !team.members?.length) return;

    const resolveMembers = async () => {
      const entries = await Promise.all(
        team.members.map(async (member, index) => {
          if (member.id) {
            return [getMemberKey(member, index), member];
          }
          if (!member.name) {
            return [getMemberKey(member, index), null];
          }
          try {
            const response = await axios.get(
              `/api/users/search?keyword=${encodeURIComponent(member.name)}`,
              config
            );
            const exactMatch = (response.data.users || []).find((user) => user.name === member.name) || null;
            return [getMemberKey(member, index), exactMatch];
          } catch {
            return [getMemberKey(member, index), null];
          }
        })
      );

      setMemberUserMap(Object.fromEntries(entries.filter(([, value]) => value)));
    };

    resolveMembers();
  }, [team.members]);

  const updateFeedbackForm = (memberKey, key, value) => {
    setFeedbackForm((prev) => ({
      ...prev,
      [memberKey]: {
        rating: 5,
        content: "",
        ...prev[memberKey],
        [key]: value
      }
    }));
  };

  const submitFeedback = async (member, index) => {
    const config = authConfig();
    if (!config) {
      setFeedbackError("로그인이 필요합니다.");
      return;
    }
    const memberKey = getMemberKey(member, index);
    const form = feedbackForm[memberKey] || {};
    if (!form.content?.trim()) {
      setFeedbackError("피드백 내용을 입력해주세요.");
      return;
    }
    const toUserId = await resolveMemberUserId(member, index);
    if (!toUserId) {
      setFeedbackError(`${member.name || member.email || member.id || '대상'}님의 사용자 정보를 찾지 못했습니다. 회원가입된 계정 이름과 팀원 이름이 같은지 확인해주세요.`);
      return;
    }
    try {
      await axios.post("/api/feedbacks", {
        toUserId,
        teamId: team.id || null,
        content: form.content,
        rating: Number(form.rating || 5)
      }, config);
      setFeedbackMessage(`${member.name || member.email || member.id || '대상'}님에게 피드백을 남겼어요.`);
      setFeedbackError("");
      setFeedbackForm((prev) => ({
        ...prev,
        [memberKey]: { rating: 5, content: "" }
      }));
      await loadTeamFeedbacks();
    } catch (error) {
      setFeedbackError(error.response?.data?.error || "피드백 등록에 실패했습니다.");
    }
  };

  const feedbackTargets = currentUser
    ? team.members.filter((member) => Number(member.id) !== Number(currentUser.id))
    : team.members;

  return (
    <>
      <GlobalStyle />
      <PageLayout>
        <Menu>
          <Symbol className="symbol" src={symbol} />
          <Logo className="logo" src={logo} />
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <Item key={menu.path} onClick={() => navigate(menu.path)}>
                <Background $active={isActive} />
                <Icon src={isActive ? menu.activeIcon : menu.icon} />
                <Text className="text">{menu.label}</Text>
              </Item>
            );
          })}
          <Line />
          <Item onClick={() => navigate("/notification")}>
            <Background $active={isAlarmActive} />
            <Icon src={alarm} />
            <Text className="text">NOTIFICATIONS</Text>
          </Item>
        </Menu>

        <ContentBox>
          <BackWapper onClick={() => navigate("/project")}>
            <ProjectIcon src={backIcon} />
            <BackText>돌아가기</BackText>
          </BackWapper>
          <TextLine />

          <Wapper>
            <ProjectLogo src={team.logo ?? teamLogo} />
            <ProjectName>{team.title}</ProjectName>
            <TextWapper>
              <InfoText>기간</InfoText>
              <DataText>{team.period || "-"}</DataText>
            </TextWapper>
            <TextWapper>
              <InfoText>담당</InfoText>
              <DataText>{team.charge || "-"}</DataText>
            </TextWapper>
            <TextWapper>
              <InfoText>참여코드</InfoText>
              <DataText>{team.code || "-"}</DataText>
            </TextWapper>
            <TextWapper>
              <InfoText>참여자</InfoText>
              <UserWapper>
                {team.members.length > 0 ? (
                  team.members.map((member, index) => (
                    <MemberRow key={member.id ?? index}>
                      <UserIcon src={user_icon} />
                      <NameText>{member.name}</NameText>
                    </MemberRow>
                  ))
                ) : (
                  <NameText>-</NameText>
                )}
              </UserWapper>
            </TextWapper>
          </Wapper>

          <TextLine $margin_size={10} />

          <Wapper>
            <BottomWapper>
              <TextWapper>
                <VerticalLine />
                <DescriptionText>{team.title}</DescriptionText>
              </TextWapper>
              <ExplanText>{team.description || "-"}</ExplanText>
            </BottomWapper>

            <BottomWapper>
              <TextWapper>
                <VerticalLine />
                <DescriptionText>프로젝트 일정/구성</DescriptionText>
              </TextWapper>
              <TeamBox>
                {Object.entries(
                  team.members.reduce((acc, member) => {
                    const teams = Array.isArray(member.join_team)
                      ? member.join_team
                      : `${member.join_team || member.department || member.role || ""}`.split(",").map((item) => item.trim()).filter(Boolean);
                    teams.forEach((teamKey) => {
                      if (!acc[teamKey]) acc[teamKey] = [];
                      acc[teamKey].push(member);
                    });
                    return acc;
                  }, {})
                ).map(([teamName, members], index) => (
                  <TeamWapper key={index}>
                    <NameWapper>
                      <TeamName>{teamName}</TeamName>
                    </NameWapper>
                    <TeamTextWapper>
                      <TitleText>참여자</TitleText>
                      <MemberWapper>
                        {members.slice(0, 2).map((member, i) => (
                          <TextIconWapper key={i}>
                            <MemberIcon src={user_icon} />
                            <MemberName>{member.name}</MemberName>
                          </TextIconWapper>
                        ))}
                        {members.length > 2 ? (
                          <ExtraWapper>
                            <ExtraIcon src={extra_icon} />
                            <ExtraCount>{members.length - 2}</ExtraCount>
                          </ExtraWapper>
                        ) : null}
                      </MemberWapper>
                    </TeamTextWapper>
                    <TeamTextWapper>
                      <TitleText>기한</TitleText>
                      <TeamDeadLineText>
                        {team.team_deadline?.find((item) => item.join_team === teamName)?.deadline ?? "-"}
                      </TeamDeadLineText>
                    </TeamTextWapper>
                    <TeamTextWapper>
                      <TitleText>내용</TitleText>
                      <ContentWapper>
                        {team.team_explan
                          .filter((item) => {
                            const teams = Array.isArray(item.join_team)
                              ? item.join_team
                              : `${item.join_team || ""}`.split(",").map((value) => value.trim());
                            return teams.includes(teamName);
                          })
                          .slice(0, 2)
                          .map((item, i) => (
                            <TeamContentText key={i}>{item.explan}</TeamContentText>
                          ))}
                      </ContentWapper>
                    </TeamTextWapper>
                  </TeamWapper>
                ))}
              </TeamBox>
            </BottomWapper>
          </Wapper>

          <Wapper>
            <FeedbackSection>
              <TextWapper>
                <VerticalLine />
                <DescriptionText>팀원 피드백</DescriptionText>
              </TextWapper>
              {feedbackError ? <FeedbackMessage $error>{feedbackError}</FeedbackMessage> : null}
              {!feedbackError && feedbackMessage ? <FeedbackMessage>{feedbackMessage}</FeedbackMessage> : null}

              <FeedbackGrid>
                {feedbackTargets.length > 0 ? (
                  feedbackTargets.map((member, index) => {
                    const memberKey = getMemberKey(member, index);
                    const displayName = member.name || member.email || member.id || "알 수 없는 사용자";
                    return (
                      <FeedbackCard key={memberKey}>
                        <FeedbackName>{displayName}</FeedbackName>
                        <FeedbackItemMeta>
                          {member.email || memberUserMap[memberKey]?.email || "사용자 매칭 확인 중"}
                        </FeedbackItemMeta>
                        <FeedbackSelect
                          value={feedbackForm[memberKey]?.rating || 5}
                          onChange={(e) => updateFeedbackForm(memberKey, "rating", e.target.value)}
                        >
                          <option value={5}>5점</option>
                          <option value={4}>4점</option>
                          <option value={3}>3점</option>
                          <option value={2}>2점</option>
                          <option value={1}>1점</option>
                        </FeedbackSelect>
                        <FeedbackInput
                          placeholder={`${displayName}님에게 남길 피드백을 적어주세요.`}
                          value={feedbackForm[memberKey]?.content || ""}
                          onChange={(e) => updateFeedbackForm(memberKey, "content", e.target.value)}
                        />
                        <FeedbackButton type="button" onClick={() => submitFeedback(member, index)}>
                          피드백 보내기
                        </FeedbackButton>
                      </FeedbackCard>
                    );
                  })
                ) : (
                  <FeedbackCard>
                    <FeedbackItemBody>현재 팀에 본인을 제외한 피드백 대상이 없습니다.</FeedbackItemBody>
                  </FeedbackCard>
                )}
              </FeedbackGrid>

              <FeedbackList>
                {teamFeedbacks.map((feedback) => (
                  <FeedbackItem key={feedback.id}>
                    <FeedbackItemTitle>
                      {feedback.fromUser?.name || feedback.fromUser?.userid || "알 수 없는 사용자"} {"->"} {feedback.toUser?.name || feedback.toUser?.userid || "알 수 없는 사용자"}
                    </FeedbackItemTitle>
                    <FeedbackItemMeta>{feedback.rating}/5 · 팀 피드백</FeedbackItemMeta>
                    <FeedbackItemBody>{feedback.content}</FeedbackItemBody>
                  </FeedbackItem>
                ))}
              </FeedbackList>
            </FeedbackSection>
          </Wapper>
        </ContentBox>
      </PageLayout>
    </>
  );
}
