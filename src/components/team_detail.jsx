//packages
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

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
import FeedbackForm from "./feedback.jsx";
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
import { apiRequest, toApiDate } from "../utils/api";
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
    width: 95px;
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
    width: 80px;
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
    width: ${({$width}) => $width};
    flex-shrink: 0;
`;
const MemberRow = styled.div`
    margin: 0 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 8px;
`;
const MemberBox = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    margin: 4px;
    border-radius: 6px;
    background: linear-gradient(135deg, #c0da58 0%, #a0ba38 100%);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: all 0.2s ease;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;
const MemberProfile = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #c0da58;
    font-size: 12px;
    flex-shrink: 0;
`;
const UserName = styled.span`
    color: #fff;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
`;
const RemoveButton = styled.button`
    background: rgba(255, 255, 255, 0.3);
    border: none;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.2s ease;
    &:hover {
        background: rgba(255, 255, 255, 0.6);
        transform: scale(1.1);
    }
`
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
    const [codeWidth, setCodeWidth] = useState(0);
    const chargeRef = useRef(null);
    const codeRef = useRef(null);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackTarget, setFeedbackTarget] = useState(null);
    const [isLoadingTeam, setIsLoadingTeam] = useState(false);
    const [inviteableFriends, setInviteableFriends] = useState([]);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [isLoadingFriends, setIsLoadingFriends] = useState(false);

    const calcWidth = (text, fontSize = 22) => {
        const min = 50;
        const max = 400;
        const estimated = text.length * (fontSize * 0.6);
        return Math.min(Math.max(estimated, min), max);
    };

    const team = {
        id: null,
        title: "프로젝트 명",
        period: "",
        charge: "",
        code: "",
        members: [],
        description: "",
        team_explan: [],
        ...(location.state?.team ?? {}),
    };
    const [title, setTitle] = useState(team.title);
    const from = location.state?.from;
    const editMode = location.state?.editMode || false;

    const periodParts = team.period?.split(" - ") ?? ["", ""];
    const [startPeriod, setStartPeriod] = useState(periodParts[0]);
    const [endPeriod, setEndPeriod] = useState(periodParts[1]);
    const [charge, setCharge] = useState(team.charge);
    const [code, setCode] = useState(team.code);
    const [description, setDescription] = useState(team.description);
    const [teamExplan, setTeamExplan] = useState(team.team_explan);
    const [members, setMembers] = useState(team.members);

    const teamId = team.id || localStorage.getItem("teamId");

    useEffect(() => {
        const loadTeamDetails = async () => {
            if (!teamId) return;
            setIsLoadingTeam(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/teams/${teamId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data.team;
                if (data) {
                    setTitle(data.name || data.dpName || team.title);
                    setCharge(data.dpLeader || '');
                    setCode(data.teamCode || '');
                    setDescription(data.dpName || data.name || '');
                    setMembers((data.members || []).map((member) => ({
                        id: member.id ?? member.USERID ?? member.userid,
                        name: member.name ?? member.NAME ?? member.email ?? "알 수 없는 사용자",
                        role: member.role ?? member.ROLE,
                        department: member.department,
                        jobDetail: member.jobDetail
                    })));
                    if (data.deadline) {
                        setStartPeriod(data.deadline);
                        setEndPeriod('');
                    }
                }
            } catch (error) {
                console.error('팀 정보 조회 실패', error);
            } finally {
                setIsLoadingTeam(false);
            }
        };

        loadTeamDetails();
    }, [teamId]);

    const loadInviteableFriends = async () => {
        if (!teamId) return;
        setIsLoadingFriends(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/teams/${teamId}/inviteable-friends`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInviteableFriends(response.data.friends || []);
        } catch (error) {
            console.error('초대 가능한 친구 조회 실패', error);
        } finally {
            setIsLoadingFriends(false);
        }
    };

    const handleOpenInviteModal = () => {
        loadInviteableFriends();
        setShowInviteModal(true);
    };

    const handleInviteFriend = async (friendId) => {
        if (!teamId) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `/api/teams/${teamId}/invite`,
                { friendId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('친구를 초대했어요!');
            setShowInviteModal(false);
            const response = await axios.get(`/api/teams/${teamId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data.team;
            setMembers((data.members || []).map((member) => ({
                id: member.id ?? member.USERID ?? member.userid,
                name: member.name ?? member.NAME ?? member.email ?? "알 수 없는 사용자",
                role: member.role ?? member.ROLE,
                department: member.department,
                jobDetail: member.jobDetail
            })));
        } catch (error) {
            alert(error.response?.data?.error || '초대 실패');
        }
    };

    const [teamGroups, setTeamGroups] = useState(() => {
        const acc = {};
        (team.members ?? []).forEach(member => {
            const teams = Array.isArray(member.join_team)
                ? member.join_team
                : member.join_team.split(",").map(t => t.trim());
            teams.forEach(teamKey => {
                if (!acc[teamKey]) acc[teamKey] = { members: [], period: "", explan: [], isNew: false };
                acc[teamKey].members.push(member);
            });
        });
        (team.team_deadline ?? []).forEach(d => {
            if (acc[d.join_team]) acc[d.join_team].period = d.deadline;
        });
        (team.team_explan ?? []).forEach(t => {
            if (acc[t.join_team]) acc[t.join_team].explan.push(t.explan);
        });
        return acc;
    });
    
    const AddTeam = () => {
        const newTeamName = `새 팀 ${Object.keys(teamGroups).length + 1}`;
        setTeamGroups(prev => ({ 
            ...prev, 
            [newTeamName]: { members: [], period: "", explan: [""], isNew: true }
        }));
    };
    
    const RenameTeam = (oldName, newName) => {
        if (!newName || oldName === newName) return;
        setTeamGroups(prev => {
            const updated = {};
            Object.entries(prev).forEach(([key, val]) => {
                updated[key === oldName ? newName : key] = val;
            });
            return updated;
        });
    };
    
    const UpdatePeriod = (teamName, value) => {
        setTeamGroups(prev => ({
            ...prev,
            [teamName]: { ...prev[teamName], period: value }
        }));
    };
    
    const UpdateExplan = (teamName, index, value) => {
        setTeamGroups(prev => {
            const updated = [...prev[teamName].explan];
            updated[index] = value;
            return { ...prev, [teamName]: { ...prev[teamName], explan: updated } };
        });
    };

    const DeleteMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const DeletePeriod = () => {
        setStartPeriod("");
        setEndPeriod("");
    };

    const SetData = async () => {
        if (!teamId) {
            navigate("/project");
            return;
        }

        try {
            await apiRequest(`/api/teams/${teamId}`, {
                method: "PUT",
                body: JSON.stringify({
                    name: title,
                    deadline: toApiDate(endPeriod || startPeriod),
                    dpLeader: charge,
                    teamCode: code,
                    dpName: description,
                    members,
                    teamExplan,
                }),
            });
            alert("수정 완료");
            navigate("/project");
        } catch (err) {
            console.error(err);
            alert(err.message || "수정 중 오류가 발생했습니다.");
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
                    <Item onClick={() => navigate("/notification")}>
                        <Background $active={isAlarmActive} />
                        <Icon src={alarm} />
                        <Text className="text">NOTIFICATIONS</Text>
                    </Item>
                </Menu>
                <ContentBox>
                    <BackWapper onClick={() => SetData()}>
                        <TeamIcon src={backIcon} />
                        <BackText>{editMode ? "수정 완료" : from === "create" ? "생성 완료" : "돌아가기"}</BackText>
                    </BackWapper>
                    <TextLine />
                    <Wapper>
                        <TeamLogo src={default_logo} />
                        <ProjectName>{title}</ProjectName>
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
                            <InfoText>담당</InfoText>
                            {editingCharge ? (
                                <DataInput
                                    value={charge}
                                    onChange={(e) => {
                                        setCharge(e.target.value);
                                        setChargeWidth(calcWidth(e.target.value));
                                    }}
                                    autoFocus
                                    $width={chargeWidth}
                                />
                            ) : (
                                <DataText ref={chargeRef}>{charge}</DataText>
                            )}
                            <EditIcon src={edit_icon} onClick={() => {
                                setChargeWidth(calcWidth(charge));
                                setEditingCharge(prev => !prev);
                            }} />
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
                                <DataText ref={codeRef}>{code}</DataText>
                            )}
                            <EditIcon src={edit_icon} onClick={() => {
                                setCodeWidth(codeRef.current?.offsetWidth ?? 100);
                                setEditingCode(prev => !prev);
                            }} />
                        </TextWapper>
                        <TextWapper>
                            <InfoText>참여자</InfoText>
                            <MemberRow>
                                {members.length > 0 ? (
                                    members.map((member, index) => (
                                        <MemberBox key={index}>
                                            <MemberProfile>
                                                {member.name.charAt(0)}
                                            </MemberProfile>
                                            <UserName>{member.name}</UserName>
                                            <RemoveButton onClick={() => DeleteMember(index)}>
                                                ×
                                            </RemoveButton>
                                        </MemberBox>
                                    ))
                                ) : (
                                    <UserName>-</UserName>
                                )}
                                <IconWapper $size={35} onClick={handleOpenInviteModal} style={{cursor: 'pointer', background: '#c0da58', borderRadius: '50%'}}>
                                    <AddIcon src={add_icon} />
                                </IconWapper>
                            </MemberRow>
                        </TextWapper>
                    </Wapper>
                    <TextLine $margin_size={30} />
                    <Wapper>
                        <BottomWapper>
                            <TextWapper>
                                <VerticalLine />
                                <DescriptionText>{team.title}</DescriptionText>
                            </TextWapper>
                            <ExplanText>{description || "-"}</ExplanText>
                        </BottomWapper>
                        <BottomWapper>
                            <TextWapper>
                                <VerticalLine />
                                <DescriptionText>프로젝트 일정/구성</DescriptionText>
                                <IconWapper $size={30} onClick={AddTeam} >
                                    <AddIcon src={edit_icon} />
                                </IconWapper>
                            </TextWapper>
                            <TeamBox>
                                {Object.entries(teamGroups).map(([teamName, group], index) => (
                                    <TeamWapper key={index}>
                                        <NameWapper>
                                            <TeamNameInput
                                                defaultValue={teamName}
                                                onBlur={(e) => RenameTeam(teamName, e.target.value)}
                                            />
                                        </NameWapper>
                                        <TeamTextWapper>
                                            <TitleText>참여자</TitleText>
                                            <MemberWapper>
                                                {group.members.slice(0, 2).map((member, i) => (
                                                    <TextIconWapper key={i}>
                                                        <MemberIcon src={user_icon} />
                                                        <MemberName>{member.name}</MemberName>
                                                    </TextIconWapper>
                                                ))}
                                                {group.members.length > 2 && (
                                                    <ExtraWapper>
                                                        <ExtraIcon src={extra_icon} />
                                                        <ExtraCount>{group.members.length - 2}</ExtraCount>
                                                    </ExtraWapper>
                                                )}
                                            </MemberWapper>
                                        </TeamTextWapper>
                                        <TeamTextWapper>
                                            <TitleText>기한</TitleText>
                                            {group.isNew ? (
                                                <TeamDeadLineInput
                                                    $isNew={group.isNew}
                                                    value={group.period}
                                                    onChange={(e) => UpdatePeriod(teamName, e.target.value)}
                                                />
                                            ) : (
                                                <TeamDeadLineInput value={group.period}
                                                    onChange={(e) => UpdatePeriod(teamName, e.target.value)} />
                                            )}
                                        </TeamTextWapper>
                                        <TeamTextWapper>
                                            <TitleText>내용</TitleText>
                                            <ContentWapper>
                                                {group.isNew ? (
                                                    group.explan.slice(0, 2).map((explan, i) => (
                                                        <TeamContentInput
                                                            $isNew={group.isNew}
                                                            key={i}
                                                            value={explan}
                                                            onChange={(e) => UpdateExplan(teamName, i, e.target.value)}
                                                        />
                                                    ))
                                                ) : (
                                                    group.explan.slice(0, 2).map((explan, i) => (
                                                        <TeamContentInput key={i} value={explan}
                                                            onChange={(e) => UpdateExplan(teamName, i, e.target.value)} />
                                                    ))
                                                )}
                                            </ContentWapper>
                                        </TeamTextWapper>
                                    </TeamWapper>
                                ))}
                            </TeamBox>
                        </BottomWapper>
                    </Wapper>
                </ContentBox>
            </PageLayout>
            {showFeedbackModal && feedbackTarget && (
                <FeedbackForm
                    toUserId={feedbackTarget.userId}
                    teamId={team.id}
                    onClose={() => setShowFeedbackModal(false)}
                    onSubmit={() => {
                        setShowFeedbackModal(false);
                    }}
                />
            )}
            {showInviteModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '400px',
                        maxHeight: '500px',
                        overflow: 'auto',
                        boxShadow: '0 0 20px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>
                            친구 초대
                        </div>
                        {isLoadingFriends ? (
                            <div>로딩 중...</div>
                        ) : inviteableFriends.length > 0 ? (
                            <div>
                                {inviteableFriends.map((friend) => (
                                    <div key={friend.id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px',
                                        borderBottom: '1px solid #eee'
                                    }}>
                                        <span>{friend.name}</span>
                                        <button
                                            onClick={() => handleInviteFriend(friend.id)}
                                            style={{
                                                background: '#c0da58',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '6px 12px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            초대
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>초대할 친구가 없어요.</div>
                        )}
                        <button
                            onClick={() => setShowInviteModal(false)}
                            style={{
                                marginTop: '16px',
                                background: '#e0e0e0',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}