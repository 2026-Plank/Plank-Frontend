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
        ...(location.state?.team ?? {}),
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

    const [teamGroups, setTeamGroups] = useState(() => buildInitialGroups(team));

    useEffect(() => {
        setTeamGroups(buildInitialGroups({ ...team, members, description }));
    }, [members]);
    
    const AddTeam = () => {
        const newTeamName = `새 팀 ${Object.keys(teamGroups).length + 1}`;
        setTeamGroups(prev => ({ 
            ...prev, 
            [newTeamName]: { members: [], period: "", explan: [""], isNew: true }  /* ← isNew 추가 */
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
            setMembers(prev => [
                ...prev,
                {
                    id: friend.userid || friend.id,
                    userPk: friend.userPk,
                    name: friend.name || friend.userid || friend.email || "이름 없음",
                    email: friend.email,
                }
            ]);
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
                                <IconWapper $size={30} onClick={AddTeam} >
                                    <AddIcon src={add_icon} />
                                </IconWapper>
                            </TextWapper>
                            <TeamBox>
                                {Object.keys(teamGroups).length === 0 && (
                                    <EmptyText>등록된 일정/구성이 없습니다.</EmptyText>
                                )}
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
        </>
    )
}
