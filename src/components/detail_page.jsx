import styled from "styled-components";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import userIcon from "../assets/default_user_icon.svg";
import extraIcon from "../assets/over_member_icon.svg";
import teamLogo from "../assets/logo.svg";
import backIcon from "../assets/detail_back_icon.svg";

import { GlobalStyle } from "../pages/homePage";
import Menu from "./menu_layout";
import { PageLayout, ContentBox } from "./schedule_page";
import { apiRequest, getAuthToken, mapApiTeam } from "../utils/api";

export const TextLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: ${({ $margin_size = 0 }) => $margin_size}px;
  background: #e3e3e1;
  flex-shrink: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: min(1120px, calc(100% - 96px));
  margin: 56px auto 0;
`;

export const BackWrapper = styled.button`
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

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 10px;
`;

export const TextWrapper = styled.div`
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

export const BottomWrapper = styled.div`
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

export const TeamWrapper = styled.div`
  min-height: 198px;
  padding: 18px 22px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

export const NameWrapper = styled.div`
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

export const TeamTextWrapper = styled.div`
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

export const MemberWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 10px;
  min-width: 0;
`;

export const TextIconWrapper = styled.div`
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

export const ContentWrapper = styled.div`
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

export const ExtraWrapper = styled.div`
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
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const team = {
    ...fallbackTeam,
    ...(serverTeam ?? location.state?.team ?? {}),
  };

  const normalizedTeam = useMemo(() => ({
    ...team,
    members: Array.isArray(team.members) ? team.members : [],
    team_explan: Array.isArray(team.team_explan) ? team.team_explan : [],
    team_deadline: Array.isArray(team.team_deadline) ? team.team_deadline : [],
  }), [serverTeam, location.state?.team]);

  // 최적화: 타이핑 시 리렌더링되어도 buildGroups 연산이 재수행되지 않음
  const groups = useMemo(() => buildGroups(normalizedTeam), [normalizedTeam]);
  const canUseServer = Boolean(getAuthToken() && normalizedTeam.id);

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

  const submitFeedback = async (event) => {
    event.preventDefault();
    const content = feedbackText.trim();
    if (!content) return;

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
          content,
        }),
      });
      if (data?.feedback) {
        setFeedbacks((prev) => [data.feedback, ...prev]);
      }
      setFeedbackText("");
    } catch (error) {
      alert(error.message || "피드백 등록에 실패했습니다.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageLayout>
        <Menu />

        <ContentBox>
          <BackWrapper type="button" onClick={() => navigate("/project")}>
            <ProjectIcon src={backIcon} alt="뒤로가기" />
            <BackText>돌아가기</BackText>
          </BackWrapper>
          <TextLine />

          <Wrapper>
            <DetailHeader>
              <ProjectLogo src={normalizedTeam.logo ?? teamLogo} alt="프로젝트 로고" />
              <ProjectName>{normalizedTeam.title || "프로젝트 명"}</ProjectName>
            </DetailHeader>

            <TextWrapper>
              <InfoText>기간</InfoText>
              <DataText>{normalizedTeam.period || "-"}</DataText>
            </TextWrapper>
            <TextWrapper>
              <InfoText>담당</InfoText>
              <DataText>{normalizedTeam.charge || "-"}</DataText>
            </TextWrapper>
            <TextWrapper>
              <InfoText>참여코드</InfoText>
              <DataText>{normalizedTeam.code || "-"}</DataText>
            </TextWrapper>
            <TextWrapper>
              <InfoText>참여자</InfoText>
              <UserWrapper>
                {normalizedTeam.members.length > 0 ? (
                  normalizedTeam.members.map((member, index) => (
                    <MemberRow key={`${member.name ?? "member"}-${index}`}>
                      <UserIcon src={userIcon} alt="유저 아이콘" />
                      <NameText>{member.name || "이름 없음"}</NameText>
                    </MemberRow>
                  ))
                ) : (
                  <EmptyText>-</EmptyText>
                )}
              </UserWrapper>
            </TextWrapper>
          </Wrapper>

          <TextLine $margin_size={48} />

          <Wrapper>
            <BottomWrapper>
              <TextWrapper>
                <VerticalLine />
                <DescriptionText>{normalizedTeam.title || "프로젝트 명"}</DescriptionText>
              </TextWrapper>
              <ExplanText>{normalizedTeam.description || "프로젝트 설명"}</ExplanText>
            </BottomWrapper>

            <BottomWrapper>
              <TextWrapper>
                <VerticalLine />
                <DescriptionText>프로젝트 일정/구성</DescriptionText>
              </TextWrapper>

              <TeamBox>
                {groups.length > 0 ? (
                  groups.map((group) => (
                    <TeamWrapper key={group.name}>
                      <NameWrapper>
                        <TeamName>{group.name}</TeamName>
                      </NameWrapper>

                      <TeamTextWrapper>
                        <TitleText>참여자</TitleText>
                        <MemberWrapper>
                          {group.members.length > 0 ? (
                            <>
                              {group.members.slice(0, 2).map((member, index) => (
                                <TextIconWrapper key={`${group.name}-${member.name}-${index}`}>
                                  <MemberIcon src={userIcon} alt="멤버 아이콘" />
                                  <MemberName>{member.name || "이름 없음"}</MemberName>
                                </TextIconWrapper>
                              ))}
                              {group.members.length > 2 && (
                                <ExtraWrapper>
                                  <ExtraIcon src={extraIcon} alt="더보기" />
                                  <ExtraCount>{group.members.length - 2}</ExtraCount>
                                </ExtraWrapper>
                              )}
                            </>
                          ) : (
                            <EmptyText>-</EmptyText>
                          )}
                        </MemberWrapper>
                      </TeamTextWrapper>

                      <TeamTextWrapper>
                        <TitleText>기한</TitleText>
                        <TeamDeadLineText>{group.deadline}</TeamDeadLineText>
                      </TeamTextWrapper>

                      <TeamTextWrapper>
                        <TitleText>내용</TitleText>
                        <ContentWrapper>
                          {group.contents.length > 0 ? (
                            group.contents.slice(0, 2).map((content, index) => (
                              <TeamContentText key={`${group.name}-content-${index}`}>{content}</TeamContentText>
                            ))
                          ) : (
                            <EmptyText>-</EmptyText>
                          )}
                        </ContentWrapper>
                      </TeamTextWrapper>
                    </TeamWrapper>
                  ))
                ) : (
                  <EmptyText>등록된 일정/구성이 없습니다.</EmptyText>
                )}
              </TeamBox>
            </BottomWrapper>

            <BottomWrapper>
              <TextWrapper>
                <VerticalLine />
                <DescriptionText>피드백</DescriptionText>
              </TextWrapper>

              <FeedbackPanel>
                <FeedbackForm onSubmit={submitFeedback}>
                  <FeedbackInput
                    value={feedbackText}
                    onChange={(event) => setFeedbackText(event.target.value)}
                    placeholder="프로젝트에 대한 피드백을 댓글처럼 남겨주세요."
                  />
                  <FeedbackButton type="submit" disabled={feedbackLoading || !feedbackText.trim()}>
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
            </BottomWrapper>
          </Wrapper>
        </ContentBox>
      </PageLayout>
    </>
  );
}