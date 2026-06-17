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
import { formatTeamCharge, formatTeamPeriod } from "../utils/teamDisplay";
import { calculateProgress, loadProjectTasks, saveProjectTasks } from "../utils/projectTasks";

//css
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
const ProgressSummary = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-left: 3.5%;
	margin-bottom: 18px;
`;
const ProgressLabel = styled.span`
	color: var(--Gray-7, #70716F);
	font-size: 18px;
	font-weight: 600;
`;
const ProgressTrack = styled.div`
	width: 360px;
	height: 8px;
	border-radius: 999px;
	background: #E0E0E0;
	overflow: hidden;
`;
const ProgressFill = styled.div`
	width: ${({ $progress }) => $progress}%;
	height: 100%;
	border-radius: 999px;
	background: #C0DA58;
`;
const ProgressValue = styled.span`
	color: #000;
	font-size: 18px;
	font-weight: 600;
`;
const TaskPanel = styled.div`
	margin-left: 3%;
	width: min(900px, 86%);
	display: flex;
	flex-direction: column;
	gap: 14px;
`;
const TaskForm = styled.form`
	display: grid;
	grid-template-columns: minmax(260px, 1fr) 180px 96px;
	gap: 10px;
	align-items: center;
`;
const TaskInput = styled.input`
	height: 44px;
	border-radius: 8px;
	border: 1px solid #C9C9C8;
	padding: 0 14px;
	font-size: 16px;
	outline: none;

	&:focus {
		border-color: #C0DA58;
		box-shadow: 0 0 0 3px rgba(192, 218, 88, 0.18);
	}
`;
const TaskSelect = styled.select`
	height: 44px;
	border-radius: 8px;
	border: 1px solid #C9C9C8;
	padding: 0 12px;
	font-size: 16px;
	background: #FFF;
	outline: none;
`;
const AddTaskButton = styled.button`
	height: 44px;
	border: none;
	border-radius: 8px;
	background: #C0DA58;
	color: #FFF;
	font-size: 16px;
	font-weight: 700;
	cursor: pointer;
`;
const TaskList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
const TaskItem = styled.div`
	display: grid;
	grid-template-columns: 28px minmax(220px, 1fr) 120px 44px;
	gap: 12px;
	align-items: center;
	min-height: 52px;
	padding: 10px 12px;
	border-radius: 8px;
	background: #FFF;
	box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
`;
const TaskCheckButton = styled.button`
	width: 24px;
	height: 24px;
	border-radius: 6px;
	border: none;
	background: ${({ $checked }) => $checked ? "#C0DA58" : "#E0E0E0"};
	cursor: pointer;
`;
const TaskTitle = styled.span`
	color: ${({ $checked }) => $checked ? "#70716F" : "#000"};
	font-size: 17px;
	font-weight: 500;
	text-decoration: ${({ $checked }) => $checked ? "line-through" : "none"};
`;
const TaskAssignee = styled.span`
	color: #70716F;
	font-size: 15px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const DeleteTaskButton = styled.button`
	width: 36px;
	height: 36px;
	border: none;
	border-radius: 8px;
	background: #F8F8F8;
	color: #70716F;
	font-size: 18px;
	cursor: pointer;
`;
const EmptyTaskText = styled.span`
	color: #70716F;
	font-size: 16px;
	padding: 8px 0;
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
  const [tasks, setTasks] = useState(() => loadProjectTasks(team));
  const [taskTitle, setTaskTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState(team.members[0]?.id ?? "");
  const progress = calculateProgress(tasks, 0);

  const updateTasks = (nextTasks) => {
	setTasks(nextTasks);
	saveProjectTasks(team, nextTasks);
  };

  const getMemberId = (member) => String(member.userPk ?? member.id ?? member.name);
  const selectedMember = team.members.find((member) => getMemberId(member) === String(assigneeId));

  const addTask = (e) => {
	e.preventDefault();
	const title = taskTitle.trim();
	if (!title) return;

	updateTasks([
		...tasks,
		{
			id: Date.now(),
			title,
			assigneeId,
			assigneeName: selectedMember?.name ?? "",
			checked: false,
		}
	]);
	setTaskTitle("");
  };

  const toggleTask = (taskId) => {
	updateTasks(tasks.map((task) => (
		task.id === taskId ? { ...task, checked: !task.checked } : task
	)));
  };

  const deleteTask = (taskId) => {
	updateTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getMemberTeams = (member) => {
	if (Array.isArray(member.join_team)) return member.join_team;
	if (typeof member.join_team === "string") return member.join_team.split(",").map(t => t.trim());
	if (member.department) return [member.department];
	return [];
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

          		<Item onClick={() => navigate("/alarm")}>
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
						<DataText>{formatTeamPeriod(team)}</DataText>
					</TextWapper>
					<TextWapper>
              			<InfoText>담당</InfoText>
              			<DataText>{formatTeamCharge(team) || "-"}</DataText>
            		</TextWapper>
            		<TextWapper>
						<InfoText>참여코드</InfoText>
						<DataText>{team.code}</DataText>
					</TextWapper>
					<TextWapper>
						<InfoText>참여자</InfoText>
						<UserWapper>
							{/* 멤버가 여러 명일 경우 대비해 배열로 렌더링 */}
							{team.members.length > 0 ? (
							team.members.map((member, index) => (
								<MemberRow key={index}>
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
							<DescriptionText>프로젝트 업무</DescriptionText>
						</TextWapper>
						<ProgressSummary>
							<ProgressLabel>진행률</ProgressLabel>
							<ProgressTrack>
								<ProgressFill $progress={progress} />
							</ProgressTrack>
							<ProgressValue>{progress}%</ProgressValue>
						</ProgressSummary>
						<TaskPanel>
							<TaskForm onSubmit={addTask}>
								<TaskInput
									value={taskTitle}
									onChange={(e) => setTaskTitle(e.target.value)}
									placeholder="업무 이름"
								/>
								<TaskSelect value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
									<option value="">담당자 없음</option>
									{team.members.map((member) => (
										<option key={getMemberId(member)} value={getMemberId(member)}>
											{member.name}
										</option>
									))}
								</TaskSelect>
								<AddTaskButton type="submit">추가</AddTaskButton>
							</TaskForm>
							<TaskList>
								{tasks.length > 0 ? tasks.map((task) => (
									<TaskItem key={task.id}>
										<TaskCheckButton
											type="button"
											$checked={task.checked}
											onClick={() => toggleTask(task.id)}
										/>
										<TaskTitle $checked={task.checked}>{task.title}</TaskTitle>
										<TaskAssignee>{task.assigneeName || "담당자 없음"}</TaskAssignee>
										<DeleteTaskButton type="button" onClick={() => deleteTask(task.id)}>×</DeleteTaskButton>
									</TaskItem>
								)) : (
									<EmptyTaskText>등록된 업무가 없습니다.</EmptyTaskText>
								)}
							</TaskList>
						</TaskPanel>
					</BottomWapper>
					<BottomWapper>
						<TextWapper>
							<VerticalLine />
							<DescriptionText>프로젝트 일정/구성</DescriptionText>
						</TextWapper>
						<TeamBox>
							{Object.entries(
								team.members.reduce((acc, member) => {
									// 배열이면 그대로, 문자열이면 split
									const teams = getMemberTeams(member);
									
									teams.forEach(teamKey => {
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
											{/* 첫 두 명만 표시 */}
											{members.slice(0, 2).map((member, i) => (
												<TextIconWapper key={i}>
													<MemberIcon src={user_icon} />
													<MemberName>{member.name}</MemberName>
												</TextIconWapper>
											))}
											{/* 3명 이상이면 +N 표시 */}
											{members.length > 2 && (
												<ExtraWapper>
													<ExtraIcon src={extra_icon} />
													<ExtraCount>{members.length - 2}</ExtraCount>
												</ExtraWapper>
											)}
										</MemberWapper>
									</TeamTextWapper>
									<TeamTextWapper>
										<TitleText>기한</TitleText>
										<TeamDeadLineText>
											{team.team_deadline?.find(d => d.join_team === teamName)?.deadline ?? "-"}
										</TeamDeadLineText>
									</TeamTextWapper>
									<TeamTextWapper>
										<TitleText>내용</TitleText>
										<ContentWapper>
											{team.team_explan
											.filter((t) => {
												const teams = Array.isArray(t.join_team)
													? t.join_team
													: String(t.join_team ?? "").split(",").map(t => t.trim());
												return teams.includes(teamName);
											})
											.slice(0, 2)  /* ← 추가 */
											.map((t, i) => (
												<TeamContentText key={i}>{t.explan}</TeamContentText>
											))}
										</ContentWapper>
									</TeamTextWapper>
								</TeamWapper>
							))}
						</TeamBox>
					</BottomWapper>
				</Wapper>
        	</ContentBox>
     	</PageLayout>
    </>
  );
}