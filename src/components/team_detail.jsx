import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
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
import backIcon from "../assets/detail_back_icon.svg";
import userIcon from "../assets/default_user_icon.svg";

import { GlobalStyle, Menu, Symbol, Logo, Item, Background, Icon, Text, Line } from "../pages/homePage";
import { PageLayout, ContentBox } from "./schedule_page";
import { apiRequest, mapApiTeam, toApiDate } from "../utils/api";

const menus = [
  { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
  { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
  { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
  { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
  { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" },
];

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 40px 20px;
  border-bottom: 1px solid #e3e3e1;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: #70716f;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const SaveButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 8px;
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

const Shell = styled.div`
  width: min(1120px, calc(100% - 96px));
  margin: 38px auto 64px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 28px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  border: 1px solid #eeeeec;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.05);
  padding: 24px;
`;

const PanelTitle = styled.h2`
  margin: 0 0 20px;
  color: #222;
  font-size: 22px;
  font-weight: 800;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  color: #70716f;
  font-size: 14px;
  font-weight: 700;
`;

const Input = styled.input`
  height: 48px;
  padding: 0 14px;
  border: 1px solid #dfdfdd;
  border-radius: 8px;
  outline: none;
  color: #222;
  font-size: 15px;

  &:focus {
    border-color: #c0da58;
    box-shadow: 0 0 0 4px rgba(192, 218, 88, 0.16);
  }
`;

const Textarea = styled.textarea`
  min-height: 150px;
  padding: 14px;
  border: 1px solid #dfdfdd;
  border-radius: 8px;
  outline: none;
  color: #222;
  font-size: 15px;
  line-height: 1.55;
  resize: vertical;

  &:focus {
    border-color: #c0da58;
    box-shadow: 0 0 0 4px rgba(192, 218, 88, 0.16);
  }
`;

const FullField = styled(Field)`
  grid-column: 1 / -1;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid #eeeeec;
  border-radius: 10px;
  background: #fdfdfc;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const MemberIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const MemberText = styled.div`
  min-width: 0;
`;

const MemberName = styled.div`
  color: #222;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemberSub = styled.div`
  margin-top: 3px;
  color: #8a8a89;
  font-size: 12px;
`;

const GhostButton = styled.button`
  height: 34px;
  padding: 0 12px;
  border: 1px solid #dfdfdd;
  border-radius: 8px;
  background: #fff;
  color: #70716f;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

const DangerButton = styled(GhostButton)`
  color: #f04419;
  border-color: rgba(240, 68, 25, 0.35);
`;

const InviteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const Message = styled.div`
  margin-top: 14px;
  color: ${({ $error }) => ($error ? "#f04419" : "#708626")};
  font-size: 14px;
  font-weight: 700;
`;

const EmptyText = styled.div`
  padding: 16px 0;
  color: #8a8a89;
  font-size: 14px;
  text-align: center;
`;

const getMemberId = (member) => member?.id ?? member?.userid ?? member?.USERID;

const getDateInputValue = (value) => {
  if (!value) return "";
  const trimmed = String(value).replace(/^~\s*/, "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const parts = trimmed.split(/[./-]/).filter(Boolean);
  if (parts.length === 2) {
    const year = new Date().getFullYear();
    return `${year}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
  }
  return "";
};

export default function TeamDetailCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAlarmActive = location.pathname === "/notification";
  const routeTeam = location.state?.team || null;
  const teamId = routeTeam?.id || localStorage.getItem("teamId");

  const [form, setForm] = useState({
    name: routeTeam?.title || routeTeam?.name || "",
    deadline: getDateInputValue(routeTeam?.period || routeTeam?.deadline),
    dpLeader: routeTeam?.charge || routeTeam?.dpLeader || "",
    teamCode: routeTeam?.code || routeTeam?.teamCode || "",
    dpName: routeTeam?.description || routeTeam?.dpName || "",
  });
  const [members, setMembers] = useState(routeTeam?.members || []);
  const [originalMemberIds, setOriginalMemberIds] = useState([]);
  const [inviteableFriends, setInviteableFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const normalizedMembers = useMemo(() => members.map((member) => ({
    ...member,
    id: getMemberId(member),
    name: member.name || member.NAME || member.userid || member.id || "이름 없음",
    role: member.role || member.ROLE || "User",
    department: member.department || member.DEPARTMENT || "",
  })), [members]);

  const loadTeam = async () => {
    if (!teamId) return;
    setLoading(true);
    try {
      const data = await apiRequest(`/api/teams/${teamId}`);
      const mapped = mapApiTeam(data.team);
      setForm({
        name: data.team?.name || mapped.title || "",
        deadline: getDateInputValue(data.team?.deadline || mapped.period),
        dpLeader: data.team?.dpLeader || mapped.charge || "",
        teamCode: data.team?.teamCode || mapped.code || "",
        dpName: data.team?.dpName || mapped.description || "",
      });
      const nextMembers = data.team?.members || [];
      setMembers(nextMembers);
      setOriginalMemberIds(nextMembers.map((member) => String(getMemberId(member))).filter(Boolean));
    } catch (err) {
      setError(err.message || "프로젝트 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const loadInviteableFriends = async () => {
    if (!teamId) return;
    try {
      const data = await apiRequest(`/api/teams/${teamId}/inviteable-friends`);
      setInviteableFriends(data.friends || []);
    } catch (err) {
      setError(err.message || "초대 가능한 친구를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    loadTeam();
    loadInviteableFriends();
  }, [teamId]);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const removeMember = (memberId) => {
    setMembers((prev) => prev.filter((member) => String(getMemberId(member)) !== String(memberId)));
  };

  const inviteFriend = async (friendId) => {
    if (!teamId) return;
    try {
      await apiRequest(`/api/teams/${teamId}/invite`, {
        method: "POST",
        body: JSON.stringify({ friendId }),
      });
      setMessage("친구를 프로젝트에 초대했습니다.");
      setError("");
      await loadTeam();
      await loadInviteableFriends();
    } catch (err) {
      setError(err.message || "친구 초대에 실패했습니다.");
    }
  };

  const saveTeam = async () => {
    if (!teamId) {
      navigate("/project");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");
    try {
      const remainingIds = new Set(members.map((member) => String(getMemberId(member))).filter(Boolean));
      const removedIds = originalMemberIds.filter((memberId) => !remainingIds.has(memberId));

      await Promise.all(removedIds.map((memberId) =>
        apiRequest(`/api/teams/${teamId}/members/${encodeURIComponent(memberId)}`, { method: "DELETE" })
      ));

      await apiRequest(`/api/teams/${teamId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          deadline: toApiDate(form.deadline),
          dpLeader: form.dpLeader,
          teamCode: form.teamCode,
          dpName: form.dpName,
        }),
      });

      setMessage("프로젝트를 수정했습니다.");
      await loadTeam();
      setTimeout(() => navigate("/project"), 500);
    } catch (err) {
      setError(err.message || "프로젝트 수정 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
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
            const isActive = location.pathname === menu.path || (menu.path === "/project" && location.pathname === "/team-modify");
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
          <Header>
            <BackButton type="button" onClick={() => navigate("/project")}>
              <BackIcon src={backIcon} alt="" />
              프로젝트로 돌아가기
            </BackButton>
            <SaveButton type="button" onClick={saveTeam} disabled={saving || loading}>
              {saving ? "저장 중" : "수정 저장"}
            </SaveButton>
          </Header>

          <Shell>
            <Panel>
              <PanelTitle>프로젝트 정보 수정</PanelTitle>
              <FormGrid>
                <Field>
                  <Label>프로젝트 이름</Label>
                  <Input value={form.name} onChange={(event) => setField("name", event.target.value)} />
                </Field>
                <Field>
                  <Label>마감일</Label>
                  <Input type="date" value={form.deadline} onChange={(event) => setField("deadline", event.target.value)} />
                </Field>
                <Field>
                  <Label>담당자</Label>
                  <Input value={form.dpLeader} onChange={(event) => setField("dpLeader", event.target.value)} />
                </Field>
                <Field>
                  <Label>참여 코드</Label>
                  <Input value={form.teamCode} onChange={(event) => setField("teamCode", event.target.value)} />
                </Field>
                <FullField>
                  <Label>프로젝트 설명</Label>
                  <Textarea value={form.dpName} onChange={(event) => setField("dpName", event.target.value)} />
                </FullField>
              </FormGrid>
              {message && <Message>{message}</Message>}
              {error && <Message $error>{error}</Message>}
            </Panel>

            <div>
              <Panel>
                <PanelTitle>참여자 관리</PanelTitle>
                <MemberList>
                  {normalizedMembers.length ? normalizedMembers.map((member) => (
                    <MemberItem key={member.id}>
                      <MemberInfo>
                        <MemberIcon src={userIcon} alt="" />
                        <MemberText>
                          <MemberName>{member.name}</MemberName>
                          <MemberSub>{member.role}{member.department ? ` · ${member.department}` : ""}</MemberSub>
                        </MemberText>
                      </MemberInfo>
                      {member.role !== "Admin" && (
                        <DangerButton type="button" onClick={() => removeMember(member.id)}>제거</DangerButton>
                      )}
                    </MemberItem>
                  )) : <EmptyText>참여자가 없습니다.</EmptyText>}
                </MemberList>
              </Panel>

              <Panel style={{ marginTop: 20 }}>
                <PanelTitle>친구 초대</PanelTitle>
                <InviteList>
                  {inviteableFriends.length ? inviteableFriends.map((friend) => (
                    <MemberItem key={friend.id}>
                      <MemberInfo>
                        <MemberIcon src={userIcon} alt="" />
                        <MemberText>
                          <MemberName>{friend.name || friend.userid}</MemberName>
                          <MemberSub>{friend.email || friend.userid}</MemberSub>
                        </MemberText>
                      </MemberInfo>
                      <GhostButton type="button" onClick={() => inviteFriend(friend.id)}>초대</GhostButton>
                    </MemberItem>
                  )) : <EmptyText>초대할 수 있는 친구가 없습니다.</EmptyText>}
                </InviteList>
              </Panel>
            </div>
          </Shell>
        </ContentBox>
      </PageLayout>
    </>
  );
}
