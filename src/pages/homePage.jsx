import React, { useEffect, useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

import symbol from "../assets/symbol.svg";
import in_home from "../assets/in_home.svg";
import calendarIcon from "../assets/calendar.svg";
import pen from "../assets/pen.svg";
import chat from "../assets/chat.svg";
import icon from "../assets/icon.svg";
import alarm from "../assets/alarm.svg";
import logo from "../assets/logo.svg";
import profile from "../assets/profile.svg";
import calendar_left from "../assets/calendar_left.svg";
import calendar_right from "../assets/calendar_right.svg";
import week_left from "../assets/week_left.svg";
import week_right from "../assets/week_right.svg";
import addIcon from "../assets/add.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import { apiRequest } from "../utils/api";

export const GlobalStyle = createGlobalStyle`
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");
    * { font-family: "Pretendard Variable", Pretendard, sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #FFF; overflow-x: hidden; }
`;

export const Menu = styled.div`
    height: 100vh; width: 130px; background-color: #F9F9F8; transition: 0.3s ease-in-out;
    display: flex; flex-direction: column; align-items: center; position: fixed; z-index: 10;
    &:hover { width: 300px; }
    &:hover .text { opacity: 1; transform: translateX(0); }
    &:hover .symbol { display: none; }
    &:hover .logo { display: block; }
`;
export const Symbol = styled.img` height: 70px; width: 62px; margin-top: 65px; margin-bottom: 50px; `;
export const Logo = styled.img` width: 132px; height: 65px; margin-top: 65px; margin-bottom: 50px; display: none; `;
export const Item = styled.div`
    width: 100%; height: 70px; display: flex; align-items: center; padding-left: 30px;
    position: relative; cursor: pointer; background-color: #F9F9F8;
`;
export const Background = styled.div`
    width: 52px; height: 52px; position: absolute; left: 37px; top: 50%; transform: translateY(-50%);
    background: #FFF; border-radius: 50%;
    box-shadow: ${({ $active }) => $active ? "0 0 20px rgba(192, 218, 88, 0.4)" : "none"};
    display: ${({ $active }) => ($active ? "block" : "none")};
    transition: 0.3s;
    ${Menu}:hover & { width: calc(100% - 40px); border-radius: 8px; left: 20px; }
`;
export const Icon = styled.img` width: 24px; height: 24px; margin-left: 21px; z-index: 2; `;
export const Text = styled.span`
    margin-left: 40px; font-size: 16px; color: #333; font-weight: 500;
    white-space: nowrap; opacity: 0; transform: translateX(-10px);
    transition: 0.3s; z-index: 2;
`;
export const Line = styled.div` width: 60px; height: 1px; background-color: #E5E5E5; margin: 30px 0; transition: 0.3s; ${Menu}:hover & { width: 240px; } `;

const Container = styled.div` display: flex; width: 100vw; height: 100vh; `;
const MainContent = styled.div` flex: 1; margin-left: 130px; display: grid; grid-template-columns: 380px 1fr; height: 100vh; `;
const LeftPanel = styled.div` border-right: 1px solid #EDEDED; padding: 60px 35px; display: flex; flex-direction: column; overflow-y: auto; `;
const MiddlePanel = styled.div` padding: 60px 80px; overflow-y: auto; `;

const Card = styled.div` background: #FFF; border: 1px solid #F3F3F3; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 20px; margin-top: 15px; `;
const CardDate = styled.div` font-size: 20px; font-weight: 700; color: #C0DA58; `;
const WeeklyNav = styled.div` display: flex; align-items: center; justify-content: space-between; margin: 30px 0; padding-bottom: 30px; border-bottom: 1px solid #F0F0F0; `;
const DayItem = styled.div` display: flex; flex-direction: column; align-items: center; gap: 8px; `;
const DayNum = styled.span` font-size: 18px; font-weight: 600; color: ${p => p.$active ? "#C0DA58" : "#BBB"}; `;
const DayDot = styled.div` width: 5px; height: 5px; background-color: #C0DA58; border-radius: 50%; visibility: ${p => p.$has ? "visible" : "hidden"}; `;
const TaskHeader = styled.div`
    display: flex; align-items: center; gap: 10px; margin-bottom: 25px; position: relative;
    h3 { font-size: 22px; font-weight: 700; }
    .plus {
        width: 26px; height: 26px; border-radius: 50%; background: #F0F0F0; color: #777;
        font-size: 18px; font-weight: 700; cursor: pointer; display: flex;
        align-items: center; justify-content: center; border: none;
    }
`;
const ActionPopup = styled.div`
    position: absolute; left: 145px; top: 0; background: #FFF; border: 1px solid #EEE;
    border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    display: flex; flex-direction: column; padding: 8px; z-index: 20; min-width: 100px;
`;
const ActionItem = styled.div`
    display: flex; align-items: center; gap: 10px; padding: 8px 12px; cursor: pointer;
    border-radius: 6px; font-size: 14px; font-weight: 500; color: #555;
    &:hover { background: #F9F9F8; }
    img { width: 16px; height: 16px; }
`;
const TaskRow = styled.div` display: flex; align-items: center; margin-bottom: 18px; `;
const CustomCheckBox = styled.button`
    width: 20px; height: 20px; border-radius: 6px; margin-right: 15px; border: 0;
    cursor: pointer; background-color: ${p => p.$deleteMode ? "#FF6B6B" : p.$checked ? "#C0DA58" : "#E2E2E2"};
    transition: 0.2s; flex: 0 0 auto;
`;
const EditInput = styled.input` border: none; border-bottom: 1px solid #C0DA58; outline: none; font-size: 17px; font-weight: 500; width: 100%; `;
const ErrorMessage = styled.div` color: #D9534F; font-size: 14px; font-weight: 600; margin-bottom: 15px; `;
const EmptyText = styled.div` color: #AAA; font-size: 15px; padding-left: 35px; margin-bottom: 18px; `;

const UI = {
    add: "\uCD94\uAC00",
    edit: "\uC218\uC815",
    remove: "\uC0AD\uC81C",
    inputPlaceholder: "\uD560\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694",
    user: "\uC0AC\uC6A9\uC790",
    subtitle: "\uC624\uB298\uC758 \uACFC\uC81C\uB97C \uD655\uC778\uD574\uC694",
    defaultProject: "\uAE30\uBCF8",
    todayEmptyTitle: "\uC624\uB298 \uB4F1\uB85D\uB41C \uACFC\uC81C\uAC00 \uC5C6\uC5B4\uC694",
    todayEmptyDesc: "\uCD94\uAC00\uD558\uBA74 \uC5EC\uAE30\uC5D0 \uBCF4\uC5EC\uC694.",
    projectEmpty: "\uCD94\uAC00\uB41C \uD504\uB85C\uC81D\uD2B8\uAC00 \uC5C6\uC5B4\uC694.",
    todoEmpty: "\uCD94\uAC00\uB41C \uD560 \uC77C\uC774 \uC5C6\uC5B4\uC694.",
    loadFail: "\uD648 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",
    saveFail: "\uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",
    deleteFail: "\uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const toDateKey = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const todayKey = () => toDateKey(new Date());

const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return String(date.getDate());
};

const getWeekLabel = (startDate) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 3);
    const month = d.getMonth() + 1;
    const week = Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7);
    return `${month}\uC6D4 ${week}\uC8FC\uCC28`;
};

const makeDisplayText = (item) => {
    if (!item?.title) return "";
    if (item.title.trim().startsWith("[")) return item.title;
    if (item.type === "ProjectTodo") {
        const projectName = item.dpName ? `${item.dpName} 프로젝트` : "프로젝트";
        return `[${projectName}] ${item.title}`;
    }
    return `[${item.dpName || UI.defaultProject}] ${item.title}`;
};

const isProjectItem = (item) => item.type === "Schedule" || item.type === "Project" || item.type === "ProjectTodo";

const MiniCalendar = ({ currentViewDate, setCurrentViewDate, calendarMarks }) => {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevLast = new Date(year, month, 0).getDate();
    const dateArray = [];

    for (let i = firstDay - 1; i >= 0; i -= 1) dateArray.push({ d: prevLast - i, key: "", other: true });
    for (let i = 1; i <= daysInMonth; i += 1) {
        const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        dateArray.push({ d: i, key, other: false });
    }
    while (dateArray.length < 42) dateArray.push({ d: dateArray.length - (firstDay + daysInMonth) + 1, key: "", other: true });

    return (
        <div style={{ marginTop: "30px", borderTop: "1px solid #EEE", paddingTop: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <img src={calendar_left} style={{ width: 24, height: 24, cursor: "pointer" }} onClick={() => setCurrentViewDate(new Date(year, month - 1, 1))} alt="left" />
                <span style={{ color: "#C0DA58", fontWeight: 700, fontSize: "18px" }}>{monthNames[month]}</span>
                <img src={calendar_right} style={{ width: 24, height: 24, cursor: "pointer" }} onClick={() => setCurrentViewDate(new Date(year, month + 1, 1))} alt="right" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", rowGap: "15px" }}>
                {dayNames.map(day => <span key={day} style={{ fontSize: "10px", color: "#BBB", fontWeight: 800 }}>{day}</span>)}
                {dateArray.map((item, idx) => (
                    <div key={`${item.d}-${idx}`} style={{ fontSize: "12px", color: item.other ? "#DDD" : "#555", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {item.d}
                        {!item.other && calendarMarks[item.key] ? <div style={{ width: 4, height: 4, backgroundColor: "#C0DA58", borderRadius: "50%", marginTop: 4 }} /> : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function HomePage() {
    const navigate = useNavigate();
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
    const [dashboard, setDashboard] = useState({
        user: null,
        todaySchedules: [],
        upcomingSchedules: [],
        calendarMarks: {}
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {
        setLoading(true);
        setError("");
        try {
            const teamId = localStorage.getItem("teamId");
            const query = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
            const data = await apiRequest(`/api/home${query}`);
            setDashboard({
                user: data.user || null,
                todaySchedules: data.todaySchedules || [],
                upcomingSchedules: data.upcomingSchedules || [],
                calendarMarks: data.calendarMarks || {}
            });
        } catch (loadError) {
            setError(loadError.data?.error || loadError.message || UI.loadFail);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const projects = useMemo(
        () => dashboard.upcomingSchedules.filter(isProjectItem),
        [dashboard.upcomingSchedules]
    );
    const todos = useMemo(
        () => dashboard.upcomingSchedules.filter((item) => !isProjectItem(item)),
        [dashboard.upcomingSchedules]
    );

    const weekDates = useMemo(() => Array.from({ length: 6 }, (_, i) => {
        const d = new Date(weekStartDate);
        d.setDate(weekStartDate.getDate() + i);
        const key = toDateKey(d);
        return { day: d.getDate(), full: d.toDateString(), event: Boolean(dashboard.calendarMarks[key]) };
    }), [weekStartDate, dashboard.calendarMarks]);

    const updateItem = (id, updates) => {
        setDashboard((prev) => ({
            ...prev,
            todaySchedules: prev.todaySchedules.map((item) => item.id === id ? { ...item, ...updates } : item),
            upcomingSchedules: prev.upcomingSchedules.map((item) => item.id === id ? { ...item, ...updates } : item)
        }));
    };

    const removeItem = (id) => {
        setDashboard((prev) => ({
            ...prev,
            todaySchedules: prev.todaySchedules.filter((item) => item.id !== id),
            upcomingSchedules: prev.upcomingSchedules.filter((item) => item.id !== id)
        }));
    };

    const handleBoxClick = async (item, section) => {
        if (deleteMode === section) {
            removeItem(item.id);
            try {
                await apiRequest(`/api/schedules/${item.id}`, { method: "DELETE" });
                await loadDashboard();
            } catch (deleteError) {
                setError(deleteError.data?.error || deleteError.message || UI.deleteFail);
                await loadDashboard();
            }
            return;
        }

        const nextStatus = item.status === "Done" ? "Wait" : "Done";
        updateItem(item.id, { status: nextStatus });
        try {
            await apiRequest(`/api/schedules/${item.id}`, {
                method: "PUT",
                body: JSON.stringify({ status: nextStatus })
            });
            await loadDashboard();
        } catch (saveError) {
            setError(saveError.data?.error || saveError.message || UI.saveFail);
            await loadDashboard();
        }
    };

    const handleTextClick = (id, section) => {
        if (editMode === section) setEditingId(id);
    };

    const handleEditComplete = async (item, newTitle) => {
        const title = newTitle.trim();
        setEditingId(null);
        if (!title || title === item.title) return;

        updateItem(item.id, { title });
        try {
            await apiRequest(`/api/schedules/${item.id}`, {
                method: "PUT",
                body: JSON.stringify({ title })
            });
            await loadDashboard();
        } catch (saveError) {
            setError(saveError.data?.error || saveError.message || UI.saveFail);
            await loadDashboard();
        }
    };

    const handleAddItem = async (event, section) => {
        if (event.key !== "Enter") return;
        const title = event.target.value.trim();
        if (!title) return;

        try {
            const storedTeamId = localStorage.getItem("teamId");
            await apiRequest("/api/schedules", {
                method: "POST",
                body: JSON.stringify({
                    type: section === "project" ? "Schedule" : "Task",
                    title,
                    description: "",
                    dpName: section === "project" ? "프로젝트" : "Todo",
                    targetDate: todayKey(),
                    ...(storedTeamId ? { teamId: Number(storedTeamId) } : {})
                })
            });
            setAddingTo(null);
            await loadDashboard();
        } catch (saveError) {
            setError(saveError.data?.error || saveError.message || UI.saveFail);
        }
    };

    const clearModes = () => {
        setOpenPopup(null);
        setEditMode(null);
        setDeleteMode(null);
        setAddingTo(null);
        setEditingId(null);
    };

    return (
        <Container onClick={clearModes}>
            <GlobalStyle />
            <Menu onClick={(e) => e.stopPropagation()}>
                <Symbol className="symbol" src={symbol} />
                <Logo className="logo" src={logo} />
                <Item onClick={() => navigate("/homepage")}><Background $active={true} /><Icon src={in_home} /><Text className="text">HOME</Text></Item>
                <Item onClick={() => navigate("/schedule")}><Background $active={false} /><Icon src={calendarIcon} /><Text className="text">SCHEDULE</Text></Item>
                <Item onClick={() => navigate("/project")}><Background $active={false} /><Icon src={pen} /><Text className="text">PROJECT</Text></Item>
                <Item onClick={() => navigate("/chat")}><Background $active={false} /><Icon src={chat} /><Text className="text">CHATTING</Text></Item>
                <Item onClick={() => navigate("/mypage")}><Background $active={false} /><Icon src={icon} /><Text className="text">MY PAGE</Text></Item>
                <Line />
                <Item onClick={() => navigate("/notification")}><Icon src={alarm} /><Text className="text">NOTIFICATIONS</Text></Item>
            </Menu>

            <MainContent>
                <LeftPanel>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={profile} style={{ width: 80, height: 80, borderRadius: "50%" }} alt="profile" />
                        <div style={{ marginLeft: 15 }}>
                            <div style={{ fontSize: 22, fontWeight: 700 }}>{dashboard.user?.name || dashboard.user?.userid || UI.user}</div>
                            <div style={{ color: "#999", fontSize: 14 }}>{dashboard.user?.job || dashboard.user?.statusMessage || UI.subtitle}</div>
                        </div>
                    </div>
                    <MiniCalendar currentViewDate={currentViewDate} setCurrentViewDate={setCurrentViewDate} calendarMarks={dashboard.calendarMarks} />
                    <div style={{ marginTop: "30px" }}>
                        {dashboard.todaySchedules.length ? dashboard.todaySchedules.slice(0, 3).map((item) => (
                            <Card key={item.id}>
                                <CardDate>{formatDate(item.targetDate)}</CardDate>
                                <div style={{ marginLeft: 20, minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.title}</div>
                                    <div style={{ fontSize: 12, color: "#AAA" }}>{item.dpName || UI.defaultProject}</div>
                                </div>
                            </Card>
                        )) : (
                            <Card>
                                <CardDate>{formatDate(new Date())}</CardDate>
                                <div style={{ marginLeft: 20 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{UI.todayEmptyTitle}</div>
                                    <div style={{ fontSize: 12, color: "#AAA" }}>{UI.todayEmptyDesc}</div>
                                </div>
                            </Card>
                        )}
                    </div>
                </LeftPanel>

                <MiddlePanel>
                    <h2 style={{ fontSize: 32, fontWeight: 800 }}>Today</h2>
                    <p style={{ color: "#AAA", marginTop: 5 }}>{getWeekLabel(weekStartDate)}</p>
                    <WeeklyNav>
                        <img src={week_left} style={{ width: 42, height: 42, cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setWeekStartDate((prev) => { const next = new Date(prev); next.setDate(next.getDate() - 7); return next; }); }} alt="prev" />
                        {weekDates.map((item, idx) => (
                            <DayItem key={idx}><DayNum $active={item.full === new Date().toDateString()}>{item.day}</DayNum><DayDot $has={item.event} /></DayItem>
                        ))}
                        <img src={week_right} style={{ width: 42, height: 42, cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setWeekStartDate((prev) => { const next = new Date(prev); next.setDate(next.getDate() + 7); return next; }); }} alt="next" />
                    </WeeklyNav>

                    {error ? <ErrorMessage>{error}</ErrorMessage> : null}

                    {["project", "todo"].map(section => {
                        const items = section === "project" ? projects : todos;
                        return (
                            <div key={section} style={{ marginTop: 40 }}>
                                <TaskHeader onClick={(e) => e.stopPropagation()}>
                                    <h3>{section.toUpperCase()}</h3>
                                    <button className="plus" onClick={() => setOpenPopup(openPopup === section ? null : section)}>+</button>
                                    {openPopup === section && (
                                        <ActionPopup>
                                            <ActionItem onClick={() => { setAddingTo(section); setOpenPopup(null); }}><img src={addIcon} alt="" />{UI.add}</ActionItem>
                                            <ActionItem onClick={() => { setEditMode(section); setOpenPopup(null); }}><img src={editIcon} alt="" />{UI.edit}</ActionItem>
                                            <ActionItem onClick={() => { setDeleteMode(section); setOpenPopup(null); }}><img src={deleteIcon} alt="" />{UI.remove}</ActionItem>
                                        </ActionPopup>
                                    )}
                                </TaskHeader>
                                {!loading && items.length === 0 && addingTo !== section ? <EmptyText>{section === "project" ? UI.projectEmpty : UI.todoEmpty}</EmptyText> : null}
                                {items.map(item => (
                                    <TaskRow key={item.id} onClick={(e) => e.stopPropagation()}>
                                        <CustomCheckBox
                                            type="button"
                                            $checked={item.status === "Done"}
                                            $deleteMode={deleteMode === section}
                                            onClick={() => handleBoxClick(item, section)}
                                        />
                                        {editingId === item.id ? (
                                            <EditInput
                                                autoFocus
                                                defaultValue={item.title}
                                                onKeyDown={(e) => e.key === "Enter" && handleEditComplete(item, e.target.value)}
                                                onBlur={(e) => handleEditComplete(item, e.target.value)}
                                            />
                                        ) : (
                                            <span style={{ fontSize: 17, fontWeight: 500, cursor: editMode === section ? "text" : "default" }} onClick={() => handleTextClick(item.id, section)}>
                                                {makeDisplayText(item)}
                                            </span>
                                        )}
                                    </TaskRow>
                                ))}
                                {addingTo === section && (
                                    <TaskRow onClick={(e) => e.stopPropagation()}>
                                        <CustomCheckBox type="button" $checked={false} tabIndex={-1} />
                                        <EditInput autoFocus placeholder={UI.inputPlaceholder} onKeyDown={(e) => handleAddItem(e, section)} />
                                    </TaskRow>
                                )}
                            </div>
                        );
                    })}
                </MiddlePanel>
            </MainContent>
        </Container>
    );
}
