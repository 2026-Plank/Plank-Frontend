import React, { useEffect, useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Menu from "../components/menu_layout";
import { PageLayout, ContentBox } from "../components/schedule_page";
import { apiRequest, getAuthToken } from "../utils/api";

import profile from "../assets/profile.svg";
import calendar_left from "../assets/calendar_left.svg";
import calendar_right from "../assets/calendar_right.svg";
import week_left from "../assets/week_left.svg";
import week_right from "../assets/week_right.svg";
import addIcon from "../assets/add.svg";
import editIcon from "../assets/modify_icon.svg";
import deleteIcon from "../assets/delete.svg";

export const GlobalStyle = createGlobalStyle`
    * { font-family: "Pretendard Variable", Pretendard, sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #FFF; overflow-x: hidden; }
`;

const MainContent = styled.div`
    display: grid;
    grid-template-columns: 380px 1fr;
    min-height: 100%;
    width: 100%;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const LeftPanel = styled.div`
    border-right: 1px solid #EDEDED;
    padding: 60px 35px;
    display: flex;
    flex-direction: column;

    @media (max-width: 480px) {
        border-right: none;
        border-bottom: 1px solid #EDEDED;
        padding: 20px;
    }
`;

const MiddlePanel = styled.div`
    padding: 60px 80px;

    @media (max-width: 480px) {
        padding: 20px;
    }
`;

const Card = styled.div`
    background: #FFF;
    border: 1px solid #F3F3F3;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 15px;
`;

const CardDate = styled.div`
    min-width: 34px;
    font-size: 20px;
    font-weight: 700;
    color: #C0DA58;
`;

const WeeklyNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0;
    padding-bottom: 30px;
    border-bottom: 1px solid #F0F0F0;
`;

const DayItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const DayNum = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: ${p => p.$active ? "#C0DA58" : "#BBB"};
`;

const DayDot = styled.div`
    width: 5px;
    height: 5px;
    background-color: #C0DA58;
    border-radius: 50%;
    visibility: ${p => p.$has ? "visible" : "hidden"};
`;

const TaskHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 25px;
    position: relative;

    h3 {
        font-size: 22px;
        font-weight: 700;
    }

    .plus {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #F0F0F0;
        color: #777;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
    }
`;

const ActionPopup = styled.div`
    position: absolute;
    left: 145px;
    top: 0;
    background: #FFF;
    border: 1px solid #EEE;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    padding: 8px;
    z-index: 20;
    min-width: 100px;
`;

const ActionItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #555;

    &:hover {
        background: #F9F9F8;
    }

    img {
        width: 16px;
        height: 16px;
    }
`;

const TaskRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 18px;
`;

const CustomCheckBox = styled.button`
    width: 20px;
    height: 20px;
    border: 0;
    border-radius: 6px;
    margin-right: 15px;
    cursor: pointer;
    background-color: ${p => p.$deleteMode ? "#FF6B6B" : p.$checked ? "#C0DA58" : "#E2E2E2"};
    transition: 0.2s;
    flex-shrink: 0;
`;

const EditInput = styled.input`
    border: none;
    border-bottom: 1px solid #C0DA58;
    outline: none;
    font-size: 17px;
    font-weight: 500;
    width: 100%;
`;

const EmptyText = styled.p`
    color: #999;
    font-size: 15px;
`;

const toDateKey = (value) => {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const formatTime = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" });
};

const isProjectType = (schedule) => ["Project", "Schedule", "ProjectTodo"].includes(schedule.type);

const normalizeTask = (schedule) => ({
    id: schedule.id,
    text: schedule.title,
    checked: schedule.status === "Done",
    kind: "schedule",
    raw: schedule,
});

const normalizeProject = (team) => ({
    id: `team-${team.id}`,
    rawId: team.id,
    text: team.name || team.title || "프로젝트",
    checked: Number(team.progress || 0) >= 100,
    kind: "team",
    raw: team,
});

const MiniCalendar = ({ currentViewDate, setCurrentViewDate, calendarMarks }) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevLast = new Date(year, month, 0).getDate();
    const dateArray = [];

    for (let i = firstDay - 1; i >= 0; i--) dateArray.push({ d: prevLast - i, other: true });
    for (let i = 1; i <= daysInMonth; i++) {
        const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        dateArray.push({ d: i, current: Boolean(calendarMarks[key]), other: false });
    }
    while (dateArray.length < 42) dateArray.push({ d: dateArray.length - (firstDay + daysInMonth) + 1, other: true });

    return (
        <div style={{ marginTop: "30px", borderTop: "1px solid #EEE", paddingTop: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <img src={calendar_left} style={{ width: 24, height: 24, cursor: "pointer" }} onClick={() => setCurrentViewDate(new Date(year, month - 1, 1))} alt="left" />
                <span style={{ color: "#C0DA58", fontWeight: 700, fontSize: "18px" }}>{monthNames[month]}</span>
                <img src={calendar_right} style={{ width: 24, height: 24, cursor: "pointer" }} onClick={() => setCurrentViewDate(new Date(year, month + 1, 1))} alt="right" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", rowGap: "15px" }}>
                {days.map(day => <span key={day} style={{ fontSize: "10px", color: "#BBB", fontWeight: 800 }}>{day}</span>)}
                {dateArray.map((item, idx) => (
                    <div key={idx} style={{ fontSize: "12px", color: item.other ? "#DDD" : "#555", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {item.d}
                        {item.current && !item.other && <div style={{ width: 4, height: 4, backgroundColor: "#C0DA58", borderRadius: "50%", marginTop: 4 }} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function HomePage() {
    const [currentViewDate, setCurrentViewDate] = useState(new Date());
    const [weekStartDate, setWeekStartDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() - d.getDay());
        return d;
    });
    const [openPopup, setOpenPopup] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [deleteMode, setDeleteMode] = useState(null);
    const [addingTo, setAddingTo] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [dashboardProjects, setDashboardProjects] = useState([]);
    const [calendarMarks, setCalendarMarks] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const scheduleProjects = useMemo(() => schedules.filter(isProjectType).map(normalizeTask), [schedules]);
    const projects = useMemo(() => [...dashboardProjects, ...scheduleProjects], [dashboardProjects, scheduleProjects]);
    const todos = useMemo(() => schedules.filter((schedule) => !isProjectType(schedule)).map(normalizeTask), [schedules]);
    const upcomingSchedules = useMemo(
        () => schedules.filter((schedule) => schedule.targetDate >= toDateKey(new Date())).slice(0, 3),
        [schedules]
    );

    const loadDashboard = async () => {
        if (!getAuthToken()) {
            setError("로그인이 필요합니다.");
            return;
        }

        setLoading(true);
        try {
            const [data, teamData] = await Promise.all([
                apiRequest("/api/home"),
                apiRequest("/api/teams"),
            ]);
            setProfileData(data.user || null);
            setSchedules(Array.isArray(data.schedules) ? data.schedules : []);
            setDashboardProjects(Array.isArray(teamData?.teams) ? teamData.teams.map(normalizeProject) : []);
            setCalendarMarks(data.calendarMarks || {});
            setError("");
        } catch (loadError) {
            setError(loadError.message || "홈 데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const getWeekLabel = (startDate) => {
        const d = new Date(startDate);
        d.setDate(d.getDate() + 3);
        const month = d.getMonth() + 1;
        const week = Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7);
        return `${month}월 ${week}주차`;
    };

    const weekDates = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(weekStartDate);
        d.setDate(weekStartDate.getDate() + i);
        const key = toDateKey(d);
        return { day: d.getDate(), full: d.toDateString(), event: Boolean(calendarMarks[key]) };
    });

    const updateScheduleLocal = (id, updater) => {
        setSchedules((prev) => prev.map((schedule) => schedule.id === id ? updater(schedule) : schedule));
    };

    const handleBoxClick = async (id, section) => {
        if (deleteMode === section) {
            try {
                const projectItem = section === "project" ? projects.find((item) => item.id === id) : null;

                if (projectItem?.kind === "team") {
                    await apiRequest(`/api/teams/${projectItem.rawId}`, { method: "DELETE" });
                    setDashboardProjects((prev) => prev.filter((project) => project.id !== id));
                } else {
                    await apiRequest(`/api/schedules/${id}`, { method: "DELETE" });
                    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
                }
                setDeleteMode(null);
            } catch (err) {
                alert(err.message);
                setDeleteMode(null);
            }
            return;
        }

        if (section === "project" && projects.find((item) => item.id === id)?.kind === "team") {
            return;
        }

        const current = schedules.find((schedule) => schedule.id === id);
        if (!current) return;
        const nextStatus = current.status === "Done" ? "Wait" : "Done";
        updateScheduleLocal(id, (schedule) => ({ ...schedule, status: nextStatus }));
        try {
            await apiRequest(`/api/schedules/${id}`, {
                method: "PUT",
                body: JSON.stringify({ status: nextStatus }),
            });
        } catch (err) {
            updateScheduleLocal(id, (schedule) => ({ ...schedule, status: current.status }));
            alert(err.message);
        }
    };

    const handleTextClick = (id, section) => {
        if (editMode === section) setEditingId(id);
    };

    const handleEditComplete = async (id, newText) => {
        const title = newText.trim();
        setEditingId(null);
        if (!title) return;

        const current = schedules.find((schedule) => schedule.id === id);
        updateScheduleLocal(id, (schedule) => ({ ...schedule, title }));
        try {
            await apiRequest(`/api/schedules/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title }),
            });
        } catch (err) {
            if (current) updateScheduleLocal(id, () => current);
            alert(err.message);
        }
    };

    const handleAddItem = async (event, section) => {
        if (event.key !== "Enter") return;
        const title = event.target.value.trim();
        if (!title) return;

        try {
            const created = await apiRequest("/api/schedules", {
                method: "POST",
                body: JSON.stringify({
                    type: section === "project" ? "Project" : "Task",
                    title,
                    description: "",
                    dpName: section === "project" ? "프로젝트" : "개인 업무",
                    targetDate: toDateKey(new Date()),
                }),
            });
            const next = created.schedule || created;
            setSchedules((prev) => [...prev, next]);
            setAddingTo(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const renderSection = (section) => {
        const items = section === "project" ? projects : todos;
        const title = section === "project" ? "PROJECT" : "TODO";

        return (
            <div key={section} style={{ marginTop: 40 }}>
                <TaskHeader onClick={(e) => e.stopPropagation()}>
                    <h3>{title}</h3>
                    <button className="plus" onClick={() => setOpenPopup(openPopup === section ? null : section)}>+</button>
                    {openPopup === section && (
                        <ActionPopup>
                            <ActionItem onClick={() => { setAddingTo(section); setOpenPopup(null); }}><img src={addIcon} alt="" />추가</ActionItem>
                            <ActionItem onClick={() => { setEditMode(section); setOpenPopup(null); }}><img src={editIcon} alt="" />수정</ActionItem>
                            <ActionItem onClick={() => { setDeleteMode(section); setOpenPopup(null); }}><img src={deleteIcon} alt="" />삭제</ActionItem>
                        </ActionPopup>
                    )}
                </TaskHeader>
                {!items.length && addingTo !== section && <EmptyText>등록된 항목이 없습니다.</EmptyText>}
                {items.map(item => (
                    <TaskRow key={item.id} onClick={(e) => e.stopPropagation()}>
                        <CustomCheckBox type="button" $checked={item.checked} $deleteMode={deleteMode === section} onClick={() => handleBoxClick(item.id, section)} />
                        {editingId === item.id ? (
                            <EditInput autoFocus defaultValue={item.text} onKeyDown={(e) => e.key === "Enter" && handleEditComplete(item.id, e.target.value)} onBlur={(e) => handleEditComplete(item.id, e.target.value)} />
                        ) : (
                            <span
                                style={{ fontSize: 17, fontWeight: 500, cursor: editMode === section && item.kind !== "team" ? "text" : "default" }}
                                onClick={() => item.kind !== "team" && handleTextClick(item.id, section)}
                            >
                                {item.text}
                            </span>
                        )}
                    </TaskRow>
                ))}
                {addingTo === section && (
                    <TaskRow onClick={(e) => e.stopPropagation()}>
                        <CustomCheckBox type="button" $checked={false} />
                        <EditInput autoFocus placeholder="내용을 입력하세요." onKeyDown={(e) => handleAddItem(e, section)} />
                    </TaskRow>
                )}
            </div>
        );
    };

    return (
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu />
                <ContentBox>
                    <MainContent>
                        <LeftPanel>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={profile} style={{ width: 80, height: 80, borderRadius: "50%" }} alt="profile" />
                                <div style={{ marginLeft: 15 }}>
                                    <div style={{ fontSize: 22, fontWeight: 700 }}>{profileData?.name || profileData?.userid || "사용자"}</div>
                                    <div style={{ color: "#999", fontSize: 14 }}>{profileData?.job || profileData?.email || ""}</div>
                                </div>
                            </div>
                            <MiniCalendar currentViewDate={currentViewDate} setCurrentViewDate={setCurrentViewDate} calendarMarks={calendarMarks} />
                            <div style={{ marginTop: "30px" }}>
                                {upcomingSchedules.map((schedule) => (
                                    <Card key={schedule.id}>
                                        <CardDate>{formatTime(schedule.targetDate)}</CardDate>
                                        <div style={{ marginLeft: 20 }}>
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>{schedule.title}</div>
                                            <div style={{ fontSize: 12, color: "#AAA" }}>{schedule.dpName || schedule.type}</div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </LeftPanel>

                        <MiddlePanel>
                            <h2 style={{ fontSize: 32, fontWeight: 800 }}>Today</h2>
                            <p style={{ color: "#AAA", marginTop: 5 }}>{getWeekLabel(weekStartDate)}</p>
                            <WeeklyNav>
                                <img src={week_left} style={{ width: 42, height: 42, cursor: "pointer" }} onClick={() => { const d = new Date(weekStartDate); d.setDate(d.getDate() - 7); setWeekStartDate(d); }} alt="prev" />
                                {weekDates.map((item, idx) => (
                                    <DayItem key={idx}><DayNum $active={item.full === new Date().toDateString()}>{item.day}</DayNum><DayDot $has={item.event} /></DayItem>
                                ))}
                                <img src={week_right} style={{ width: 42, height: 42, cursor: "pointer" }} onClick={() => { const d = new Date(weekStartDate); d.setDate(d.getDate() + 7); setWeekStartDate(d); }} alt="next" />
                            </WeeklyNav>

                            {loading && <EmptyText>데이터를 불러오는 중입니다.</EmptyText>}
                            {error && <EmptyText>{error}</EmptyText>}
                            {["project", "todo"].map(renderSection)}
                        </MiddlePanel>
                    </MainContent>
                </ContentBox>
            </PageLayout>
        </>
    );
}
