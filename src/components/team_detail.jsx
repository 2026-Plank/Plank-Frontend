//packages
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

//assets
import delete_icon from "../assets/x_icon.svg";
import edit_icon from "../assets/edit.svg";
import default_logo from "../assets/logo.svg";
import user_icon from "../assets/default_user_icon.svg";
import extra_icon from "../assets/over_member_icon.svg";
import add_icon from "../assets/add_icon.svg";

import symbol from '../assets/symbol.svg';
import home from '../assets/home.svg';
import in_home from '../assets/in_home.svg';
import calendar from '../assets/calendar.svg';
import in_calendar from '../assets/in_calendar.svg';
import pen from '../assets/pen.svg';
import in_pen from '../assets/in_pen.svg';
import chat from '../assets/chat.svg';
import in_chat from '../assets/in_chat.svg';
import icon from '../assets/icon.svg';
import in_icon from '../assets/in_icon.svg';
import alarm from '../assets/alarm.svg';
import setting from '../assets/setting.svg';
import logo from '../assets/logo.svg';
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

import { TextLine } from "./detail_page";
import { Wapper } from "./detail_page";
import { BackWapper } from "./detail_page";
import { BackText } from "./detail_page";
import { TextWapper } from "./detail_page";
import { VerticalLine } from "./detail_page";
import { DescriptionText } from "./detail_page";
import { BottomWapper } from "./detail_page";
import { TeamBox } from "./detail_page";
import { TeamWapper } from "./detail_page";
import { NameWapper } from "./detail_page";
import { TeamName } from "./detail_page";
import { TeamTextWapper } from "./detail_page";
import { TitleText } from "./detail_page";
import { MemberWapper } from "./detail_page";
import { TextIconWapper } from "./detail_page";
import { MemberIcon } from "./detail_page";
import { MemberName } from "./detail_page";
import { TeamDeadLineText } from "./detail_page";
import { ContentWapper } from "./detail_page";
import { TeamContentText } from "./detail_page";
import { ExtraWapper } from "./detail_page";
import { ExtraIcon } from "./detail_page";
import { ExtraCount } from "./detail_page";
import { ProjectName } from "./detail_page";
import { ExplanText } from "./detail_page";
import { apiRequest, mapApiTeam } from "../utils/api";
import { formatTeamPeriod, formatToday } from "../utils/teamDisplay";
import { calculateProgress, loadProjectTasks, saveProjectTasks } from "../utils/projectTasks";
//css
const TeamIcon = styled.img`
    width: 28px;
    height: 28px;
    aspect-ratio: 1/1;
`;
const TeamLogo = styled.img`
    width: 142px;
    height: 142px;
`;
const DateWapper = styled.div`
    display: flex;
    margin: 0 50px;
    text-align: center;
    align-items: center;
    justify-content: center;
`;
const DateBox = styled.div`
    display: flex;
    width: 145px;
    height: 35px;
    padding: 7px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: var(--Gray-4, #E0E0E0);
`;
const DateInput = styled.input`
    color: var(--black-1, #000);
    font-feature-settings: 'ss05' on;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.022px;
    width: 128px;
    border: none;
    outline: none;
    background: var(--Gray-4, #E0E0E0);
    text-align: center;
`;
const DateText = styled.span`
    margin: 0 5px;
    color: var(--black-1, #000);
    font-feature-settings: 'ss05' on;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.022px;
`;
const IconWapper = styled.div`
    margin: 0 10px;
    display: flex;
    width: ${({$size}) => $size}px;
    height: ${({$size}) => $size}px;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
    border-radius: 8px;
    background: var(--Gray-4, #E0E0E0);
    cursor: pointer;
`;
const DeleteIcon = styled.img`
    width: 24px;
    height: 24px;
    aspect-ratio: 1/1;
    background: var(--Gray-4, #E0E0E0);
    cursor: pointer;
`;
const DataText = styled.span`
    margin: 0 50px;
    color: var(--black-1, #000);
    font-feature-settings: 'ss05' on;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.022px;
`;
const EditIcon = styled.img`
    width: 26px;
    height: 26px;
    aspect-ratio: 1/1;
    cursor: pointer;
`;
const AddIcon = styled.img`
    width: 18px;
    height: 18px;
    aspect-ratio: 1/1;
    cursor: pointer;
    background: var(--Gray-4, #E0E0E0);
`;
const UserIcon = styled.img`
    width: 24px;
    height: 24px;
    aspect-ratio: 1/1;
`;
const InfoText = styled.span`
    color: var(--Gray-7, #70716F);
    font-feature-settings: 'ss05' on;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 80px;
    flex-shrink: 0;
`;
const MemberRow = styled.div`
    margin: 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const MemberList = styled.div`
    margin-left: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;
const MemberBox = styled.div`
    display: flex;
    width: 160px;
    height: 40px;
    padding: 10px 16px;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-radius: 8px;
    background: var(--Gray-4, #E0E0E0);
    margin-right: 10px;
    box-sizing: border-box;
`;
const UserName = styled.span`
    color: var(--black-1, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const EmptyText = styled.span`
    color: var(--Gray-7, #70716F);
    font-family: Pretendard;
    font-size: 18px;
`;
const InviteWrapper = styled.div`
    position: relative;
`;
const AddMemberButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: var(--Gray-4, #E0E0E0);
    color: #000;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
`;
const InviteMenu = styled.div`
    position: absolute;
    top: 48px;
    left: 0;
    width: 280px;
    max-height: 260px;
    overflow-y: auto;
    padding: 10px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.12);
    z-index: 30;
`;
const InviteItem = styled.button`
    width: 100%;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    text-align: left;

    &:hover {
        background: #F9F9F8;
    }
`;
const DataInput = styled.input`
    margin-left: 50px;
    color: var(--black-1, #000);
    font-feature-settings: 'ss05' on;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.022px;
    border: none;
    outline: none;
    padding: 0;
    width: ${({ $width }) => $width}px;  
`;
const TeamNameInput = styled.input`
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-weight: 600;
    border: none;
    outline: none;
    background: transparent;
    text-align: center;
    width: 100%;
`;
const TeamDeadLineInput = styled.input`
    color: var(--black-1, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 400;
    border: none;
    outline: none;
    background: transparent;
    position: absolute;
    left: 60px;
    width: 150px;
    border-bottom: ${({ $isNew }) => $isNew ? "1px solid #000" : "none"};
`;
const TeamContentInput = styled.input`
    color: var(--black-1, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 400;
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    border-bottom: ${({ $isNew }) => $isNew ? "1px solid #000" : "none"};
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
const TaskActionButton = styled.button`
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
const TaskAssignee = styled.span`
    color: #70716F;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const TaskTitle = styled.span`
    color: ${({ $checked }) => $checked ? "#70716F" : "#000"};
    font-size: 17px;
    font-weight: 500;
    text-decoration: ${({ $checked }) => $checked ? "line-through" : "none"};
`;
const SmallTaskButton = styled.button`
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: #F8F8F8;
    color: #70716F;
    font-size: ${({ $large }) => $large ? "18px" : "14px"};
    cursor: pointer;
`;
const EmptyTaskText = styled.span`
    color: #70716F;
    font-size: 16px;
    padding: 8px 0;
`;

const getPeriodParts = (period) => {
    const text = String(period || "").trim();
    if (!text) return [formatToday(), ""];
    const parts = text.includes("~")
        ? text.split(/\s*~\s*/).filter(Boolean)
        : text.split(/\s+-\s+/).filter(Boolean);
    if (parts.length >= 2) return [parts[0], parts.slice(1).join(" ~ ")];
    return [formatToday(), parts[0] || ""];
};

const getMemberTeams = (member) => {
    if (Array.isArray(member.join_team)) return member.join_team.filter(Boolean);
    if (typeof member.join_team === "string") return member.join_team.split(",").map(t => t.trim()).filter(Boolean);
    if (member.department) return [member.department];
    return [];
};

const buildInitialGroups = (team) => {
    const acc = {};
    (team.members ?? []).forEach(member => {
        const teams = getMemberTeams(member);
        const groupNames = teams.length ? teams : ["전체"];
        groupNames.forEach(teamKey => {
            if (!acc[teamKey]) acc[teamKey] = { members: [], period: "", explan: [], isNew: false };
            acc[teamKey].members.push(member);
        });
    });

    (team.team_deadline ?? []).forEach(d => {
        if (!acc[d.join_team]) acc[d.join_team] = { members: [], period: "", explan: [], isNew: false };
        acc[d.join_team].period = d.deadline;
    });
    (team.team_explan ?? []).forEach(t => {
        if (!acc[t.join_team]) acc[t.join_team] = { members: [], period: "", explan: [], isNew: false };
        acc[t.join_team].explan.push(t.explan);
    });

    return acc;
};

const loadStoredTeam = () => {
    try {
        return JSON.parse(sessionStorage.getItem("plank-selected-team") || "null");
    } catch {
        return null;
    }
};

const rememberTeam = (team) => {
    sessionStorage.setItem("plank-selected-team", JSON.stringify(team));
};

export default function TeamDetailCreatePage(){
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
        { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
        { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
        { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
        { path: "/mypage", icon: icon, activeIcon: in_icon, label: "MY PAGE" }
    ];
    const isAlarmActive = location.pathname === "/notification";

    const [editingCharge, setEditingCharge] = useState(false);
    const [editingCode, setEditingCode] = useState(false);
    const [chargeWidth, setChargeWidth] = useState(0);
    const [codeWidth, setCodeWidth] = useState(100);
    const chargeRef = useRef(null);
    const codeRef = useRef(null);

    // 텍스트 길이 기반 너비 계산
    const calcWidth = (text, fontSize = 22) => {
        const min = 50;
        const max = 400;  // ← 최대 길이
        const estimated = text.length * (fontSize * 0.6);
        return Math.min(Math.max(estimated, min), max);
    };

    // title, logo는 고정 표시용
    const initialTeam = {
        id: null,
        title: "프로젝트 명",
        period: "",
        charge: "",
        code: "",
        members: [],
        description: "",
        team_explan: [],
        ...(location.state?.team ?? loadStoredTeam() ?? {}),
    };
    const [team, setTeam] = useState(initialTeam);
    const from = location.state?.from;

    // 수정 가능한 필드만 state로
    const periodParts = getPeriodParts(formatTeamPeriod(team));
    const [startPeriod, setStartPeriod] = useState(periodParts[0]);
    const [endPeriod, setEndPeriod] = useState(periodParts[1]);
    const [charge, setCharge] = useState(team.charge);
    const [code, setCode] = useState(team.code);
    const [description, setDescription] = useState(team.description);
    const [teamExplan, setTeamExplan] = useState(team.team_explan);
    const [members, setMembers] = useState(team.members);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [invitableFriends, setInvitableFriends] = useState([]);
    const [inviteError, setInviteError] = useState("");
    const [tasks, setTasks] = useState(() => loadProjectTasks(team));
    const [taskTitle, setTaskTitle] = useState("");
    const [taskAssignee, setTaskAssignee] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const progress = calculateProgress(tasks, 0);

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
                assigneeName: taskAssignee.trim(),
                checked: false,
            }
        ]);
        setTaskTitle("");
        setTaskAssignee("");
    };

    const startEditTask = (task) => {
        setEditingTaskId(task.id);
        setTaskTitle(task.title);
        setTaskAssignee(task.assigneeName || "");
    };

    const saveEditTask = (e) => {
        e.preventDefault();
        const title = taskTitle.trim();
        if (!title || !editingTaskId) return;
        updateTasks(tasks.map((task) => (
            task.id === editingTaskId
                ? { ...task, title, assigneeName: taskAssignee.trim() }
                : task
        )));
        setEditingTaskId(null);
        setTaskTitle("");
        setTaskAssignee("");
    };

    const cancelEditTask = () => {
        setEditingTaskId(null);
        setTaskTitle("");
        setTaskAssignee("");
    };

    const toggleTask = (taskId) => {
        updateTasks(tasks.map((task) => (
            task.id === taskId ? { ...task, checked: !task.checked } : task
        )));
    };

    const deleteTask = (taskId) => {
        updateTasks(tasks.filter((task) => task.id !== taskId));
        if (editingTaskId === taskId) cancelEditTask();
    };

    const DeleteMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const DeletePeriod = () => {
        setStartPeriod(formatToday());
        setEndPeriod("");
    };

    const LoadInvitableFriends = async () => {
        if (!team.id) {
            setInviteError("프로젝트 생성 완료 후 친구를 초대할 수 있습니다.");
            setInviteOpen(true);
            return;
        }
        try {
            const data = await apiRequest(`/api/teams/${team.id}/inviteable-friends`);
            setInvitableFriends(data.friends || []);
            setInviteError("");
            setInviteOpen(true);
        } catch (error) {
            setInviteError(error.message || "초대 가능한 친구를 불러오지 못했습니다.");
            setInviteOpen(true);
        }
    };

    const InviteFriend = async (friend) => {
        try {
            const friendId = friend.userid || friend.id || friend.userPk;
            const data = await apiRequest(`/api/teams/${team.id}/invite`, {
                method: "POST",
                body: JSON.stringify({ friendId }),
            });
            if (data.team) setTeam(prev => ({ ...prev, ...mapApiTeam(data.team) }));
            setMembers(prev => {
                const next = [
                    ...prev,
                    {
                        id: friend.userid || friend.id,
                        userPk: friend.userPk,
                        name: friend.name || friend.userid || friend.email || "이름 없음",
                        email: friend.email,
                    }
                ];
                rememberTeam({ ...team, members: next });
                return next;
            });
            setInvitableFriends(prev => prev.filter(item => String(item.userid || item.id || item.userPk) !== String(friendId)));
        } catch (error) {
            setInviteError(error.message || "친구 초대에 실패했습니다.");
        }
    };

    const SetData = async () => {
        try{
            const res = await fetch("host이름/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: team.id,
                    title: team.title,
                    period: `${startPeriod} - ${endPeriod}`,
                    charge,
                    code,
                    description,
                    members,
                    teamExplan,
                }),
            });
    
            if(res.ok){
                console.log("팀 세부사항 설정 성공");
                alert("팀 설정 성공");
                navigate("/project");
            }else{
                console.log("팀 세부사항 설정 실패");
                alert("팀 설정 실패");
            }
        }catch(err){
            console.error(err);
        }
    };

    return(
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu>
                    <Symbol className="symbol" src={symbol} />
                    <Logo className="logo" src={logo} />
                    {menus.map((menu) => {
                        const isActive = location.pathname === menu.path 
                        || (menu.path === "/project" && location.pathname === "/team-modify");
                        return (
                            <Item key={menu.path} onClick={() => navigate(menu.path)} >
                                <Background $active={isActive} />
                                <Icon src={isActive ? menu.activeIcon : menu.icon} />
                                <Text className="text">{menu.label}</Text>
                            </Item>
                        );
                    })}
                    <Line />
                    {/* 🔔 알림 */}
                    <Item onClick={() => navigate("/notification")}>
                        <Background $active={isAlarmActive} />
                        <Icon src={alarm} />
                        <Text className="text">NOTIFICATIONS</Text>
                    </Item>
                </Menu>
                <ContentBox>
                    <BackWapper onClick={() => navigate("/project")}>
                        <TeamIcon src={backIcon} />
                        <BackText>{from === "create" ? "생성 완료" : "돌아가기"}</BackText>
                    </BackWapper>
                    <TextLine />
                    <Wapper>
                        <TeamLogo src={default_logo} />
                        <ProjectName>{team.title}</ProjectName>
                        <TextWapper>
                            <InfoText>기간</InfoText>
                            <DateWapper>
                                <DateBox>
                                    <DateInput type="text" value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} />
                                </DateBox>
                                <DateText>-</DateText>
                                <DateBox>
                                    <DateInput type="text" value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} />
                                </DateBox>
                                <IconWapper $size={35} onClick={DeletePeriod}>
                                    <DeleteIcon src={delete_icon} />
                                </IconWapper>
                            </DateWapper>
                        </TextWapper>
                        <TextWapper>
                            <InfoText>참여코드</InfoText>
                            {editingCode ? (
                                <DataInput
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    autoFocus
                                    $width={codeWidth}
                                />
                            ) : (
                                <DataText
                                    ref={codeRef}
                                >{code}</DataText>
                            )}
                            <EditIcon src={edit_icon} onClick={() => {
                                setCodeWidth(codeRef.current?.offsetWidth ?? 100);
                                setEditingCode(prev => !prev);
                            }} />
                        </TextWapper>
                        <TextWapper>
                            <InfoText>참여자</InfoText>
                            <MemberList>
                                {members.length > 0 ? (
                                    members.map((member, index) => (
                                        <MemberBox key={index}>
                                            <UserIcon src={user_icon} />
                                            <UserName>{member.name}</UserName>
                                            <DeleteIcon src={delete_icon} onClick={() => DeleteMember(index)} />
                                        </MemberBox>
                                    ))
                                ) : (
                                    <EmptyText>참여자 없음</EmptyText>
                                )}
                                <InviteWrapper>
                                    <AddMemberButton type="button" onClick={LoadInvitableFriends}>+</AddMemberButton>
                                    {inviteOpen && (
                                        <InviteMenu>
                                            {inviteError && <EmptyText>{inviteError}</EmptyText>}
                                            {!inviteError && invitableFriends.length === 0 && <EmptyText>초대 가능한 친구가 없습니다.</EmptyText>}
                                            {!inviteError && invitableFriends.map((friend) => (
                                                <InviteItem key={friend.userPk || friend.userid || friend.id} type="button" onClick={() => InviteFriend(friend)}>
                                                    <span>{friend.name || friend.userid || friend.email}</span>
                                                    <span>초대</span>
                                                </InviteItem>
                                            ))}
                                        </InviteMenu>
                                    )}
                                </InviteWrapper>
                            </MemberList>
                        </TextWapper>
                    </Wapper>
                    <TextLine $margin_size={30} />
                    <Wapper>
                        {description && description !== team.title && (
                            <BottomWapper>
                                <TextWapper>
                                    <VerticalLine />
                                    <DescriptionText>프로젝트 설명</DescriptionText>
                                </TextWapper>
                                <ExplanText>{description}</ExplanText>
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
                                        value={taskAssignee}
                                        onChange={(e) => setTaskAssignee(e.target.value)}
                                        placeholder="담당자"
                                        list="team-member-names"
                                    />
                                    <datalist id="team-member-names">
                                        {members.map((member) => (
                                            <option key={member.userPk ?? member.id ?? member.name} value={member.name} />
                                        ))}
                                    </datalist>
                                    <TaskInput
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        placeholder="담당 내용"
                                    />
                                    <TaskActionButton type="submit">{editingTaskId ? "저장" : "추가"}</TaskActionButton>
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
                                            <SmallTaskButton type="button" onClick={() => startEditTask(task)}>수정</SmallTaskButton>
                                            <SmallTaskButton $large type="button" onClick={() => deleteTask(task.id)}>×</SmallTaskButton>
                                        </TaskItem>
                                    )) : (
                                        <EmptyTaskText>등록된 업무가 없습니다.</EmptyTaskText>
                                    )}
                                </TaskList>
                            </TaskPanel>
                        </BottomWapper>
                    </Wapper>
                </ContentBox>
            </PageLayout>
        </>
    )
}
