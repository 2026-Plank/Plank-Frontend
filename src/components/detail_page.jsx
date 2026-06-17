//packages
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

//assets
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
import setting from "../assets/setting.svg";
import logo from "../assets/logo.svg";
import user_icon from "../assets/default_user_icon.svg";
import extra_icon from "../assets/over_member_icon.svg";

import teamLogo from "../assets/logo.svg";
//components
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
import { formatTeamPeriod } from "../utils/teamDisplay";
import { calculateProgress, loadProjectTasks, saveProjectTasks } from "../utils/projectTasks";
import { apiRequest } from "../utils/api";
import FeedbackForm from "./feedback";

//css
export const TextLine = styled.div`
  width: 100%;
  height: 1px;
  background: #c9c9c8;
  margin-bottom: 0;
  margin-top: ${({ $margin_size }) => $margin_size}px;
  flex-shrink: 0;
`;
export const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  margin-left: 12%;
`;
export const BackWapper = styled.div`
  margin: 2%;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const BackText = styled.span`
  color: var(--Gray-7, #70716f);
  font-feature-settings: "ss05" on;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const ProjectIcon = styled.img`
  width: 28px;
  height: 28px;
  aspect-ratio: 1/1;
`;
const ProjectLogo = styled.img`
  width: 142px;
  height: 142px;
`;
export const ProjectName = styled.span`
  color: var(--Grey-grey-12, #2c2c2c);
  font-feature-settings: "ss05" on;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 10px 0 32px 0;
`;
const InfoText = styled.span`
  color: var(--Gray-7, #70716f);
  font-feature-settings: "ss05" on;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 5%;
  width: 7%;
`;
const DataText = styled.span`
  color: var(--black-1, #000);
  font-feature-settings: "ss05" on;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.022px;

`;
const UserWapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const TextWapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const UserIcon = styled.img`
	width: 28px;
	height: 28px;
	aspect-ratio: 1/1;
`;
const NameText = styled.span`
	margin: 0 10px;
	color: var(--black-1, #000);
	font-family: Pretendard;
	font-size: 22px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	align-items: center;
`;
export const VerticalLine = styled.div`
  width: 4px;
  height: 50px;
  background: #c0da58;
`;
export const ExplanText = styled.span`
	margin-left: 3.5%;
	color: var(--Gray-8, #575856);
	font-feature-settings: 'ss05' on;
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: 160%; /* 32px */
	letter-spacing: -0.15px;
`;
export const DescriptionText = styled.span`
  margin-left: 28px;
  align-items: center;
  color: var(--black-1, #000);
  font-feature-settings: "ss05" on;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.15px;
`;
export const BottomWapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
`;
export const TeamBox = styled.div`
	display: flex;
	margin-left: 3%;
	overflow-x: auto;
    padding-bottom: 10px;
	scrollbar-width: none;        /* ← Firefox */
    &::-webkit-scrollbar {
        display: none;            /* ← Chrome, Safari */
    }
`;
export const TeamWapper = styled.div`
	width: 380px;
	height: 210px;
	border-radius: 20px;
	background: #FFF;
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
	font-family: Pretendard;
	font-size: 22px;
	font-style: normal;
	font-weight: 600;
	line-height: 160%; /* 38.4px */
	letter-spacing: -0.15px;
`;
export const TeamTextWapper = styled.div`
	display: flex;
	align-items: center;
	margin: 10px 20px;
    position: relative;
`;
export const TitleText = styled.span`
	color: var(--Gray-7, #70716F);
	font-feature-settings: 'ss05' on;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
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
	aspect-ratio: 1/1;
`;
export const MemberName = styled.span`
	margin: 0 5px;
	color: var(--black-1, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	white-space: nowrap;
`;
export const TeamDeadLineText = styled.span`
	color: var(--black-1, #000);
	font-feature-settings: 'ss05' on;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: -0.022px;
`;
export const ContentWapper = styled.div`
	display: flex;
	flex-direction: column;
`;
export const TeamContentText = styled.span`
	color: var(--black-1, #000);
	font-feature-settings: 'ss05' on;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: -0.022px;
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
	aspect-ratio: 1/1;
`;
export const ExtraCount = styled.span`
	margin-left: 2px;
	color: var(--black-1, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
const MemberRow = styled.div`
	display: flex;
	align-items: center;

`;
const FeedbackButton = styled.button`
	padding: 4px 8px;
	border: none;
	border-radius: 6px;
	background: #F0F0F0;
	color: #575856;
	font-size: 13px;
	cursor: pointer;
`;
const FeedbackHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;
const FeedbackList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-left: 3.5%;
	width: min(760px, 86%);
`;
const FeedbackItem = styled.div`
	padding: 14px 16px;
	border-radius: 8px;
	background: #F8F8F8;
`;
const FeedbackMeta = styled.div`
	display: flex;
	gap: 8px;
	color: #70716F;
	font-size: 13px;
	margin-bottom: 6px;
`;
const FeedbackContent = styled.div`
	color: #000;
	font-size: 17px;
	line-height: 1.5;
	white-space: pre-wrap;
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
	grid-template-columns: 180px minmax(260px, 1fr) 96px;
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
	grid-template-columns: 28px 140px minmax(220px, 1fr) 44px 44px;
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
const EditTaskButton = styled.button`
	width: 36px;
	height: 36px;
	border: none;
	border-radius: 8px;
	background: #F8F8F8;
	color: #70716F;
	font-size: 14px;
	cursor: pointer;
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

const EmptyDescriptionText = styled.span`
	margin-left: 3.5%;
	color: var(--Gray-8, #575856);
	font-size: 18px;
`;

const formatFeedbackTime = (value) => {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleString("ko-KR", {
		timeZone: "Asia/Seoul",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const loadStoredTeam = () => {
	try {
		return JSON.parse(sessionStorage.getItem("plank-selected-team") || "null");
	} catch {
		return null;
	}
};

export default function TeamDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
    {
      path: "/schedule",
      icon: calendar,
      activeIcon: in_calendar,
      label: "SCHEDULE",
    },
    { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
    { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
    { path: "/mypage", icon: icon, activeIcon: in_icon, label: "MY PAGE" },
  ];

  const isAlarmActive = location.pathname === "/alarm";

  // TeamPage에서 넘겨준 팀 데이터 수신
  const team = {
    id: null,
    title: "프로젝트 명",
    period: "",
    charge: "",
    code: "",
    members: [],
    description: "",
	team_explan: [],
	team_deadline: [],
    ...(location.state?.team ?? loadStoredTeam() ?? {}), // ← 전달된 값으로 덮어쓰기
  };
  const [tasks, setTasks] = useState(() => loadProjectTasks(team));
  const [taskTitle, setTaskTitle] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const progress = calculateProgress(tasks, 0);

  const loadFeedbacks = async () => {
	if (!team.id) return;
	const data = await apiRequest(`/api/feedbacks/team/${team.id}`);
	setFeedbacks(data.feedbacks || []);
  };

  useEffect(() => {
	loadFeedbacks().catch(() => setFeedbacks([]));
  }, [team.id]);

  const updateTasks = (nextTasks) => {
	setTasks(nextTasks);
	saveProjectTasks(team, nextTasks);
  };

  const addTask = (e) => {
	e.preventDefault();
	const title = taskTitle.trim();
	if (!title) return;

	updateTasks([
		...tasks,
		{
			id: Date.now(),
			title,
			assigneeName: assigneeName.trim(),
			checked: false,
		}
	]);
	setTaskTitle("");
	setAssigneeName("");
  };

  const toggleTask = (taskId) => {
	updateTasks(tasks.map((task) => (
		task.id === taskId ? { ...task, checked: !task.checked } : task
	)));
  };

  const deleteTask = (taskId) => {
	updateTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEditTask = (task) => {
	setEditingTaskId(task.id);
	setTaskTitle(task.title);
	setAssigneeName(task.assigneeName || "");
  };

  const saveEditTask = (e) => {
	e.preventDefault();
	const title = taskTitle.trim();
	if (!title || !editingTaskId) return;
	updateTasks(tasks.map((task) => (
		task.id === editingTaskId
			? { ...task, title, assigneeName: assigneeName.trim() }
			: task
	)));
	setEditingTaskId(null);
	setTaskTitle("");
	setAssigneeName("");
  };

  const cancelEditTask = () => {
	setEditingTaskId(null);
	setTaskTitle("");
	setAssigneeName("");
  };

  return (
    <>
		<GlobalStyle />
		{feedbackOpen && (
			<FeedbackForm
				teamId={team.id}
				onClose={() => setFeedbackOpen(false)}
				onSubmit={loadFeedbacks}
			/>
		)}
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
					{team.description && team.description !== team.title && (
						<BottomWapper>
							<TextWapper>
								<VerticalLine />
								<DescriptionText>프로젝트 설명</DescriptionText>
							</TextWapper>
							<ExplanText>{team.description}</ExplanText>
						</BottomWapper>
					)}
					<BottomWapper>
						<TextWapper>
							<VerticalLine />
							<DescriptionText>프로젝트 일정/구성</DescriptionText>
						</TextWapper>
						<ProgressSummary>
							<ProgressLabel>진행률</ProgressLabel>
							<ProgressTrack>
								<ProgressFill $progress={progress} />
							</ProgressTrack>
							<ProgressValue>{progress}%</ProgressValue>
						</ProgressSummary>
						<TaskPanel>
							<TaskForm onSubmit={editingTaskId ? saveEditTask : addTask}>
								<TaskInput
									value={assigneeName}
									onChange={(e) => setAssigneeName(e.target.value)}
									placeholder="담당자"
									list="project-member-names"
								/>
								<datalist id="project-member-names">
									{team.members.map((member) => (
										<option key={member.userPk ?? member.id ?? member.name} value={member.name} />
									))}
								</datalist>
								<TaskInput
									value={taskTitle}
									onChange={(e) => setTaskTitle(e.target.value)}
									placeholder="담당 내용"
								/>
								<AddTaskButton type="submit">{editingTaskId ? "저장" : "추가"}</AddTaskButton>
							</TaskForm>
							{editingTaskId && <EmptyTaskText onClick={cancelEditTask} style={{ cursor: "pointer" }}>수정 취소</EmptyTaskText>}
							<TaskList>
								{tasks.length > 0 ? tasks.map((task) => (
									<TaskItem key={task.id}>
										<TaskCheckButton
											type="button"
											$checked={task.checked}
											onClick={() => toggleTask(task.id)}
										/>
										<TaskAssignee>{task.assigneeName || "담당자 없음"}</TaskAssignee>
										<TaskTitle $checked={task.checked}>{task.title}</TaskTitle>
										<EditTaskButton type="button" onClick={() => startEditTask(task)}>수정</EditTaskButton>
										<DeleteTaskButton type="button" onClick={() => deleteTask(task.id)}>×</DeleteTaskButton>
									</TaskItem>
								)) : (
									<EmptyTaskText>등록된 업무가 없습니다.</EmptyTaskText>
								)}
							</TaskList>
						</TaskPanel>
					</BottomWapper>
					<BottomWapper>
						<FeedbackHeader>
							<TextWapper>
								<VerticalLine />
								<DescriptionText>피드백</DescriptionText>
							</TextWapper>
							<FeedbackButton type="button" onClick={() => setFeedbackOpen(true)}>+</FeedbackButton>
						</FeedbackHeader>
						<FeedbackList>
							{feedbacks.length > 0 ? feedbacks.map((feedback) => (
								<FeedbackItem key={feedback.id}>
									<FeedbackMeta>
										<span>{feedback.fromUser?.name || feedback.fromUser?.userid || "알 수 없는 사용자"}</span>
										<span>{formatFeedbackTime(feedback.createdAt)}</span>
									</FeedbackMeta>
									<FeedbackContent>{feedback.content}</FeedbackContent>
								</FeedbackItem>
							)) : (
								<EmptyTaskText>아직 등록된 피드백이 없습니다.</EmptyTaskText>
							)}
						</FeedbackList>
					</BottomWapper>
				</Wapper>
        	</ContentBox>
     	</PageLayout>
    </>
  );
}
