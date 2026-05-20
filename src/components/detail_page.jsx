import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import userIcon from "../assets/default_user_icon.svg";
import extraIcon from "../assets/over_member_icon.svg";
import teamLogo from "../assets/logo.svg";
import backIcon from "../assets/detail_back_icon.svg";

import { GlobalStyle, Menu, Symbol, Logo, Item, Background, Icon, Text, Line } from "../pages/homePage";
import { PageLayout, ContentBox } from "./schedule_page";
import { apiRequest, getAuthToken, mapApiTeam } from "../utils/api";

export const TextLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: ${({ $margin_size = 0 }) => $margin_size}px;
  background: #e3e3e1;
  flex-shrink: 0;
`;

export const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  width: min(1120px, calc(100% - 96px));
  margin: 56px auto 0;
`;

export const BackWapper = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin: 28px 0 24px 32px;
  padding: 6px;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

export const BackText = styled.span`
  color: #70716f;
  font-size: 18px;
  font-weight: 500;
`;

const ProjectIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ProjectLogo = styled.img`
  width: 104px;
  height: 104px;
  object-fit: contain;
  border-radius: 12px;
`;

export const ProjectName = styled.span`
  color: #2c2c2c;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.35;
  padding: 28px 0 18px;
`;

const InfoText = styled.span`
  width: 84px;
  color: #70716f;
  font-size: 16px;
  font-weight: 600;
  flex-shrink: 0;
`;

const DataText = styled.span`
  color: #222;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
`;

const InlineActionButton = styled.button`
  height: 36px;
  margin-left: 12px;
  padding: 0 14px;
  border: 1px solid #c0da58;
  border-radius: 8px;
  background: #fff;
  color: #708626;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    border-color: #d7d7d6;
    color: #959794;
    cursor: not-allowed;
  }
`;

const UserWapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 10px;
`;

export const TextWapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 34px;
`;

const UserIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const NameText = styled.span`
  color: #222;
  font-size: 16px;
  font-weight: 500;
`;

export const VerticalLine = styled.div`
  width: 3px;
  height: 36px;
  border-radius: 10px;
  background: #c0da58;
  flex-shrink: 0;
`;

export const ExplanText = styled.span`
  margin: 6px 0 0 24px;
  color: #575856;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.65;
`;

export const DescriptionText = styled.span`
  margin-left: 18px;
  color: #111;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
`;

export const BottomWapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 36px;
`;

export const TeamBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
  width: 100%;
  padding-left: 24px;
`;

export const TeamWapper = styled.div`
  min-height: 198px;
  padding: 18px 22px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

export const NameWapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const TeamName = styled.span`
  color: #111;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
`;

export const TeamTextWapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin: 7px 0;
`;

export const TitleText = styled.span`
  width: 44px;
  color: #70716f;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  flex-shrink: 0;
`;

export const MemberWapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 10px;
  min-width: 0;
`;

export const TextIconWapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const MemberIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const MemberName = styled.span`
  color: #111;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
`;

export const TeamDeadLineText = styled.span`
  color: #111;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
`;

export const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const TeamContentText = styled.span`
  color: #111;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.45;
  word-break: keep-all;
`;

export const ExtraWapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
`;

export const ExtraIcon = styled.img`
  width: 16px;
  height: 16px;
  transform: rotate(-90deg);
`;

export const ExtraCount = styled.span`
  color: #111;
  font-size: 15px;
  font-weight: 500;
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

const EmptyText = styled.span`
  color: #959794;
  font-size: 15px;
  font-weight: 500;
`;

const FeedbackPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-left: 24px;
  margin-bottom: 56px;
`;

const FeedbackForm = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const FeedbackTargetSelect = styled.select`
  width: 180px;
  height: 82px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #fff;
  color: #222;
  font-size: 15px;
  font-weight: 600;
  outline: none;

  &:focus {
    border-color: #c0da58;
    box-shadow: 0 0 18px rgba(192, 218, 88, 0.22);
  }
`;

const FeedbackInput = styled.textarea`
  flex: 1;
  min-height: 82px;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  outline: none;
  resize: vertical;
  font-size: 15px;
  line-height: 1.5;

  &:focus {
    border-color: #c0da58;
    box-shadow: 0 0 18px rgba(192, 218, 88, 0.22);
  }
`;

const FeedbackButton = styled.button`
  width: 96px;
  height: 82px;
  border: 0;
  border-radius: 10px;
  background: #c0da58;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #c9c9c8;
    cursor: not-allowed;
  }
`;

const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeedbackItem = styled.article`
  padding: 14px 16px;
  border: 1px solid #eeeeec;
  border-radius: 10px;
  background: #fff;
`;

const FeedbackMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  color: #70716f;
  font-size: 13px;
  font-weight: 600;
`;

const FeedbackContent = styled.p`
  color: #222;
  font-size: 15px;
  line-height: 1.55;
  white-space: pre-wrap;
`;

const InvitePanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding-left: 24px;
`;

const InviteList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`;

const InviteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #eeeeec;
  border-radius: 10px;
  background: #fff;
`;

const InviteUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const InviteText = styled.div`
  min-width: 0;
`;

const InviteName = styled.div`
  color: #222;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InviteMeta = styled.div`
  margin-top: 3px;
  color: #8a8a89;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InviteMessage = styled.div`
  color: ${({ $error }) => ($error ? "#f04419" : "#708626")};
  font-size: 14px;
  font-weight: 700;
`;

const fallbackTeam = {
  id: 1,
  title: "올리브영 리디자인 프로젝트",
  period: "03/01 - 06/01",
  charge: "UI 디자인",
  code: "x82olew",
  description: "프로젝트 설명",
  logo: teamLogo,
  members: [
    { name: "이민지", join_team: ["디자이너"] },
    { name: "박미주", join_team: ["디자이너"] },
    { name: "윤다경", join_team: ["기획자", "개발자"] },
    { name: "박재영", join_team: ["기획자"] },
    { name: "장시후", join_team: ["개발자"] },
    { name: "윤건", join_team: ["기획자", "개발자"] },
  ],
  team_explan: [
    { join_team: "기획자", explan: "아이디어 제작" },
    { join_team: "기획자", explan: "구체적인 페이지 또는 기능 설명" },
    { join_team: "개발자", explan: "디자인 피드백" },
    { join_team: "개발자", explan: "프로토타입 개발" },
    { join_team: "디자이너", explan: "페르소나 제작" },
    { join_team: "디자이너", explan: "프로토타입 제작" },
  ],
  team_deadline: [
    { join_team: "기획자", deadline: "03/01 - 04/01" },
    { join_team: "개발자", deadline: "05/01 - 06/01" },
    { join_team: "디자이너", deadline: "04/01 - 05/01" },
  ],
};

const menus = [
  { path: "/homepage", icon: home, activeIcon: in_home, label: "HOME" },
  { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
  { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
  { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
  { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" },
];

const toList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
};

const getGroupName = (item) => {
  if (!item) return "";
  return item.join_team ?? item.team ?? item.name ?? "";
};

const getGroupContent = (item) => item?.explan ?? item?.content ?? item?.description ?? "";

function buildGroups(team) {
  const groups = new Map();

  team.team_deadline.forEach((item) => {
    const groupNames = toList(getGroupName(item));
    groupNames.forEach((groupName) => {
      if (!groups.has(groupName)) groups.set(groupName, { name: groupName, members: [], contents: [], deadline: "-" });
      groups.get(groupName).deadline = item.deadline || item.period || "-";
    });
  });

  team.team_explan.forEach((item) => {
    const content = getGroupContent(item);
    const groupNames = toList(getGroupName(item));
    groupNames.forEach((groupName) => {
      if (!groups.has(groupName)) groups.set(groupName, { name: groupName, members: [], contents: [], deadline: "-" });
      if (content) groups.get(groupName).contents.push(content);
    });
  });

  team.members.forEach((member) => {
    toList(member.join_team).forEach((groupName) => {
      if (!groups.has(groupName)) groups.set(groupName, { name: groupName, members: [], contents: [], deadline: "-" });
      groups.get(groupName).members.push(member);
    });
  });

  return [...groups.values()];
}

export default function TeamDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverTeam, setServerTeam] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackTargetId, setFeedbackTargetId] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [inviteableFriends, setInviteableFriends] = useState([]);
  const [inviteLoadingId, setInviteLoadingId] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteError, setInviteError] = useState("");

  const team = {
    ...fallbackTeam,
    ...(serverTeam ?? location.state?.team ?? {}),
  };

  const normalizedTeam = {
    ...team,
    members: Array.isArray(team.members) ? team.members : [],
    team_explan: Array.isArray(team.team_explan) ? team.team_explan : [],
    team_deadline: Array.isArray(team.team_deadline) ? team.team_deadline : [],
  };
  const groups = buildGroups(normalizedTeam);
  const isAlarmActive = location.pathname === "/notification";
  const canUseServer = Boolean(getAuthToken() && normalizedTeam.id);
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentMember = normalizedTeam.members.find((member) => {
    const memberPk = member.userPk ?? member.userId;
    return String(memberPk) === String(currentUser?.id) || String(member.id) === String(currentUser?.userId);
  });
  const canInviteFriends = canUseServer && currentMember?.role === "Admin";
  const feedbackTargets = normalizedTeam.members.filter((member) => {
    const memberPk = member.userPk ?? member.userId ?? member.id;
    return String(memberPk) !== String(currentUser?.id) && String(member.id) !== String(currentUser?.userId);
  });

  useEffect(() => {
    const teamId = location.state?.team?.id;
    if (!getAuthToken() || !teamId) return;

    const loadDetail = async () => {
      try {
        const data = await apiRequest(`/api/teams/${teamId}`);
        if (data?.team) {
          setServerTeam(mapApiTeam(data.team));
        }
      } catch (error) {
        console.error("프로젝트 상세 정보를 불러오지 못했습니다.", error);
      }
    };

    loadDetail();
  }, [location.state?.team?.id]);

  useEffect(() => {
    if (!canUseServer) return;

    const loadFeedbacks = async () => {
      try {
        const data = await apiRequest(`/api/feedbacks/team/${normalizedTeam.id}`);
        setFeedbacks(Array.isArray(data?.feedbacks) ? data.feedbacks : []);
      } catch (error) {
        console.error("피드백을 불러오지 못했습니다.", error);
      }
    };

    loadFeedbacks();
  }, [canUseServer, normalizedTeam.id]);

  useEffect(() => {
    if (!canInviteFriends) {
      setInviteableFriends([]);
      return;
    }

    const loadInviteableFriends = async () => {
      try {
        const data = await apiRequest(`/api/teams/${normalizedTeam.id}/inviteable-friends`);
        setInviteableFriends(Array.isArray(data?.friends) ? data.friends : []);
      } catch (error) {
        setInviteError(error.message || "초대 가능한 친구를 불러오지 못했습니다.");
      }
    };

    loadInviteableFriends();
  }, [canInviteFriends, normalizedTeam.id]);

  const submitFeedback = async (event) => {
    event.preventDefault();
    const content = feedbackText.trim();
    if (!content) return;
    if (!feedbackTargetId) {
      alert("피드백을 받을 팀원을 선택해주세요.");
      return;
    }

    if (!canUseServer) {
      alert("로그인 후 서버에 저장된 프로젝트에서 피드백을 남길 수 있습니다.");
      return;
    }

    setFeedbackLoading(true);
    try {
      const data = await apiRequest("/api/feedbacks", {
        method: "POST",
        body: JSON.stringify({
          teamId: normalizedTeam.id,
          toUserId: feedbackTargetId,
          content,
        }),
      });
      if (data?.feedback) {
        setFeedbacks((prev) => [data.feedback, ...prev]);
      }
      setFeedbackText("");
      setFeedbackTargetId("");
    } catch (error) {
      alert(error.message || "피드백 등록에 실패했습니다.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const inviteFriend = async (friendId) => {
    if (!canInviteFriends || !friendId) return;

    setInviteLoadingId(String(friendId));
    setInviteMessage("");
    setInviteError("");
    try {
      await apiRequest(`/api/teams/${normalizedTeam.id}/invite`, {
        method: "POST",
        body: JSON.stringify({ friendId }),
      });
      const [teamData, friendsData] = await Promise.all([
        apiRequest(`/api/teams/${normalizedTeam.id}`),
        apiRequest(`/api/teams/${normalizedTeam.id}/inviteable-friends`),
      ]);
      if (teamData?.team) {
        setServerTeam(mapApiTeam(teamData.team));
      }
      setInviteableFriends(Array.isArray(friendsData?.friends) ? friendsData.friends : []);
      setInviteMessage("친구를 프로젝트에 초대했습니다.");
    } catch (error) {
      setInviteError(error.message || "친구 초대에 실패했습니다.");
    } finally {
      setInviteLoadingId("");
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageLayout>
        <Menu>
          <Symbol className="symbol" src={symbol} />
          <Logo className="logo" src={logo} />

          {menus.map((menu) => {
            const isActive = location.pathname === menu.path || (menu.path === "/project" && location.pathname === "/detail-page");
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
          <BackWapper type="button" onClick={() => navigate("/project")}>
            <ProjectIcon src={backIcon} alt="" />
            <BackText>돌아가기</BackText>
          </BackWapper>
          <TextLine />

          <Wapper>
            <DetailHeader>
              <ProjectLogo src={normalizedTeam.logo ?? teamLogo} alt="" />
              <ProjectName>{normalizedTeam.title || "프로젝트 명"}</ProjectName>
            </DetailHeader>

            <TextWapper>
              <InfoText>기간</InfoText>
              <DataText>{normalizedTeam.period || "-"}</DataText>
            </TextWapper>
            <TextWapper>
              <InfoText>담당</InfoText>
              <DataText>{normalizedTeam.charge || "-"}</DataText>
            </TextWapper>
            <TextWapper>
              <InfoText>참여코드</InfoText>
              <DataText>{normalizedTeam.code || "-"}</DataText>
            </TextWapper>
            <TextWapper>
              <InfoText>참여자</InfoText>
              <UserWapper>
                {normalizedTeam.members.length > 0 ? (
                  normalizedTeam.members.map((member, index) => (
                    <MemberRow key={`${member.name ?? "member"}-${index}`}>
                      <UserIcon src={userIcon} alt="" />
                      <NameText>{member.name || "이름 없음"}</NameText>
                    </MemberRow>
                  ))
                ) : (
                  <EmptyText>-</EmptyText>
                )}
              </UserWapper>
              {canInviteFriends && (
                <InlineActionButton
                  type="button"
                  onClick={() => navigate("/team-modify", { state: { team: normalizedTeam, from: "detail" } })}
                >
                  친구 초대
                </InlineActionButton>
              )}
            </TextWapper>
          </Wapper>

          <TextLine $margin_size={48} />

          <Wapper>
            <BottomWapper>
              <TextWapper>
                <VerticalLine />
                <DescriptionText>{normalizedTeam.title || "프로젝트 명"}</DescriptionText>
              </TextWapper>
              <ExplanText>{normalizedTeam.description || "프로젝트 설명"}</ExplanText>
            </BottomWapper>

            <BottomWapper>
              <TextWapper>
                <VerticalLine />
                <DescriptionText>프로젝트 일정/구성</DescriptionText>
              </TextWapper>

              <TeamBox>
                {groups.length > 0 ? (
                  groups.map((group) => (
                    <TeamWapper key={group.name}>
                      <NameWapper>
                        <TeamName>{group.name}</TeamName>
                      </NameWapper>

                      <TeamTextWapper>
                        <TitleText>참여자</TitleText>
                        <MemberWapper>
                          {group.members.length > 0 ? (
                            <>
                              {group.members.slice(0, 2).map((member, index) => (
                                <TextIconWapper key={`${group.name}-${member.name}-${index}`}>
                                  <MemberIcon src={userIcon} alt="" />
                                  <MemberName>{member.name || "이름 없음"}</MemberName>
                                </TextIconWapper>
                              ))}
                              {group.members.length > 2 && (
                                <ExtraWapper>
                                  <ExtraIcon src={extraIcon} alt="" />
                                  <ExtraCount>{group.members.length - 2}</ExtraCount>
                                </ExtraWapper>
                              )}
                            </>
                          ) : (
                            <EmptyText>-</EmptyText>
                          )}
                        </MemberWapper>
                      </TeamTextWapper>

                      <TeamTextWapper>
                        <TitleText>기한</TitleText>
                        <TeamDeadLineText>{group.deadline}</TeamDeadLineText>
                      </TeamTextWapper>

                      <TeamTextWapper>
                        <TitleText>내용</TitleText>
                        <ContentWapper>
                          {group.contents.length > 0 ? (
                            group.contents.slice(0, 2).map((content, index) => (
                              <TeamContentText key={`${group.name}-content-${index}`}>{content}</TeamContentText>
                            ))
                          ) : (
                            <EmptyText>-</EmptyText>
                          )}
                        </ContentWapper>
                      </TeamTextWapper>
                    </TeamWapper>
                  ))
                ) : (
                  <EmptyText>등록된 일정/구성이 없습니다.</EmptyText>
                )}
              </TeamBox>
            </BottomWapper>

            {canInviteFriends && (
              <BottomWapper>
                <TextWapper>
                  <VerticalLine />
                  <DescriptionText>친구 초대</DescriptionText>
                </TextWapper>

                <InvitePanel>
                  {inviteError ? <InviteMessage $error>{inviteError}</InviteMessage> : null}
                  {!inviteError && inviteMessage ? <InviteMessage>{inviteMessage}</InviteMessage> : null}
                  <InviteList>
                    {inviteableFriends.length > 0 ? (
                      inviteableFriends.map((friend) => (
                        <InviteItem key={friend.id}>
                          <InviteUser>
                            <UserIcon src={userIcon} alt="" />
                            <InviteText>
                              <InviteName>{friend.name || friend.userid}</InviteName>
                              <InviteMeta>{friend.email || friend.userid}</InviteMeta>
                            </InviteText>
                          </InviteUser>
                          <InlineActionButton
                            type="button"
                            disabled={inviteLoadingId === String(friend.id)}
                            onClick={() => inviteFriend(friend.id)}
                          >
                            {inviteLoadingId === String(friend.id) ? "초대 중" : "초대"}
                          </InlineActionButton>
                        </InviteItem>
                      ))
                    ) : (
                      <EmptyText>초대할 수 있는 친구가 없습니다.</EmptyText>
                    )}
                  </InviteList>
                </InvitePanel>
              </BottomWapper>
            )}

            <BottomWapper>
              <TextWapper>
                <VerticalLine />
                <DescriptionText>피드백</DescriptionText>
              </TextWapper>

              <FeedbackPanel>
                <FeedbackForm onSubmit={submitFeedback}>
                  <FeedbackTargetSelect
                    value={feedbackTargetId}
                    onChange={(event) => setFeedbackTargetId(event.target.value)}
                    disabled={feedbackLoading}
                  >
                    <option value="">팀원 선택</option>
                    {feedbackTargets.map((member) => (
                      <option key={member.userPk ?? member.id} value={member.userPk ?? member.id}>
                        {member.name || member.id}
                      </option>
                    ))}
                  </FeedbackTargetSelect>
                  <FeedbackInput
                    value={feedbackText}
                    onChange={(event) => setFeedbackText(event.target.value)}
                    placeholder="프로젝트에 대한 피드백을 댓글처럼 남겨주세요."
                  />
                  <FeedbackButton type="submit" disabled={feedbackLoading || !feedbackText.trim() || !feedbackTargetId}>
                    등록
                  </FeedbackButton>
                </FeedbackForm>

                <FeedbackList>
                  {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                      <FeedbackItem key={feedback.id}>
                        <FeedbackMeta>
                          <span>{feedback.fromUser?.name || feedback.fromUser?.userid || "작성자"}</span>
                          <span>{feedback.createdAt ? new Date(feedback.createdAt).toLocaleString() : ""}</span>
                        </FeedbackMeta>
                        <FeedbackContent>{feedback.content}</FeedbackContent>
                      </FeedbackItem>
                    ))
                  ) : (
                    <EmptyText>아직 등록된 피드백이 없습니다.</EmptyText>
                  )}
                </FeedbackList>
              </FeedbackPanel>
            </BottomWapper>
          </Wapper>
        </ContentBox>
      </PageLayout>
    </>
  );
}
