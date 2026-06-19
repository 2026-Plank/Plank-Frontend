import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

// 이미지 임포트
import symbol from '../assets/symbol.svg';
import in_home from '../assets/in_home.svg';
import home from '../assets/home.svg';
import calendarIcon from '../assets/calendar.svg';
import in_calendar from '../assets/in_calendar.svg';
import pen from '../assets/pen.svg';
import in_pen from '../assets/in_pen.svg';
import chat from '../assets/chat.svg';
import in_chat from '../assets/in_chat.svg';
import icon from '../assets/icon.svg';
import in_icon from '../assets/in_icon.svg';
import alarm from '../assets/alarm.svg'; // 알림 아이콘
import logo from '../assets/logo.svg';
import profile from '../assets/profile.svg';
import calendar_left from '../assets/calendar_left.svg';
import calendar_right from '../assets/calendar_right.svg';
import week_left from '../assets/week_left.svg';
import week_right from '../assets/week_right.svg';
import { apiRequest, mapApiTeam } from "../utils/api";
import { calculateProgress, loadProjectTasks } from "../utils/projectTasks";

export const GlobalStyle = createGlobalStyle`
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");
    * { font-family: "Pretendard Variable", Pretendard, sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #root { width: 100%; min-height: 100%; }
    body { background-color: #FFF; overflow-x: hidden; }
    input[type="search"] {
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
    }
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
        display: none;
    }
`;

/* --- Styled Components (생략 없이 유지) --- */
export const Menu = styled.div`
    height: 100vh; height: 100dvh; width: 130px; background-color: #F9F9F8; transition: 0.3s ease-in-out;
    display: flex; flex-direction: column; align-items: center; position: fixed; z-index: 10;
    &:hover { width: 300px; }
    &:hover .text { opacity: 1; transform: translateX(0); }
    &:hover .symbol { display: none; }
    &:hover .logo { display: block; }
    @media (max-width: 768px) {
        display: none;
    }
`;
export const Symbol = styled.img` height: 70px; width: 62px; margin-top: 65px; margin-bottom: 50px; `;
export const Logo = styled.img` width: 132px; height: 65px; margin-top: 65px; margin-bottom: 50px; display: none; `;
export const Item = styled.div` width: 100%; height: 70px; display: flex; align-items: center; padding-left: 30px; position: relative; cursor: pointer;
    background-color: #F9F9F8;
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

const Container = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;

    @media (max-width: 768px) {
        display: block;
        padding-bottom: calc(76px + env(safe-area-inset-bottom));
        overflow-x: hidden;
    }
`;
const MainContent = styled.div`
    flex: 1;
    margin-left: 130px;
    display: grid;
    grid-template-columns: 380px minmax(0, 1fr);
    height: 100vh;
    height: 100dvh;
    min-width: 0;

    @media (max-width: 768px) {
        margin-left: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
        min-height: 100vh;
        min-height: 100dvh;
    }
`;
const LeftPanel = styled.div`
    border-right: 1px solid #EDEDED;
    padding: 60px 35px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    min-width: 0;

    @media (max-width: 768px) {
        border-right: 0;
        border-bottom: 1px solid #EDEDED;
        padding: calc(24px + env(safe-area-inset-top)) 20px 24px;
        overflow: visible;
    }
`;
const MiddlePanel = styled.div`
    padding: 60px 80px;
    overflow-y: auto;
    min-width: 0;

    @media (max-width: 768px) {
        padding: 28px 20px 24px;
        overflow: visible;
    }
`;

/* --- Mini Calendar & UI Components --- */
const toDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const formatCardDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(-2);
    return String(date.getDate()).padStart(2, "0");
};

const normalizeScheduleDate = (value) => {
    if (!value) return "";
    const text = String(value);
    if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return text.slice(0, 10);
    return toDateKey(date);
};

const buildCalendarMarks = (schedules = []) => schedules.reduce((marks, schedule) => {
    const key = normalizeScheduleDate(schedule.targetDate);
    if (key) marks[key] = (marks[key] || 0) + 1;
    return marks;
}, {});

const mapScheduleToTask = (schedule) => ({
    id: `schedule-${schedule.id}`,
    scheduleId: schedule.id,
    text: `[${schedule.dpName || schedule.type || "일정"}] ${schedule.title}`,
    checked: schedule.status === "Done",
    targetDate: normalizeScheduleDate(schedule.targetDate),
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
    for (let i = firstDay - 1; i >= 0; i--) dateArray.push({ d: prevLast - i, current: false, other: true });
    for (let i = 1; i <= daysInMonth; i++) {
        const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        dateArray.push({ d: i, current: Boolean(calendarMarks?.[key]), other: false });
    }
    while (dateArray.length < 42) dateArray.push({ d: dateArray.length - (firstDay + daysInMonth) + 1, current: false, other: true });

    return (
        <div style={{ marginTop: '30px', borderTop: '1px solid #EEE', paddingTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <img src={calendar_left} style={{ width: 24, height: 24, cursor: 'pointer' }} onClick={() => setCurrentViewDate(new Date(year, month - 1, 1))} alt="left" />
                <span style={{ color: '#C0DA58', fontWeight: 700, fontSize: '18px' }}>{monthNames[month]}</span>
                <img src={calendar_right} style={{ width: 24, height: 24, cursor: 'pointer' }} onClick={() => setCurrentViewDate(new Date(year, month + 1, 1))} alt="right" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', rowGap: '15px' }}>
                {days.map(day => <span key={day} style={{ fontSize: '10px', color: '#BBB', fontWeight: 800 }}>{day}</span>)}
                {dateArray.map((item, idx) => (
                    <div key={idx} style={{ fontSize: '12px', color: item.other ? '#DDD' : '#555', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {item.d}
                        {item.current && !item.other && <div style={{ width: 4, height: 4, backgroundColor: '#C0DA58', borderRadius: '50%', marginTop: 4 }} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Card = styled.div` background: #FFF; border: 1px solid #F3F3F3; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 20px; margin-top: 15px; `;
const CardDate = styled.div` font-size: 20px; font-weight: 700; color: #C0DA58; `;
const WeeklyNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 30px 0;
    padding-bottom: 30px;
    border-bottom: 1px solid #F0F0F0;

    @media (max-width: 768px) {
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 20px;
        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }
`;
const DayItem = styled.div` display: flex; flex-direction: column; align-items: center; gap: 8px; `;
const DayNum = styled.span` font-size: 18px; font-weight: 600; color: ${p => p.$active ? "#C0DA58" : "#BBB"}; `;
const DayDot = styled.div` width: 5px; height: 5px; background-color: #C0DA58; border-radius: 50%; visibility: ${p => p.$has ? "visible" : "hidden"}; `;
const TaskHeader = styled.div` display: flex; align-items: center; gap: 10px; margin-bottom: 25px; position: relative; h3 { font-size: 22px; font-weight: 700; } 
    .plus { width: 26px; height: 26px; border-radius: 50%; background: #F0F0F0; color: #777; font-size: 18px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; border: none; } `;
const TaskRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    min-width: 0;

    span {
        overflow-wrap: anywhere;
        text-align: left;
    }
`;
const CustomCheckBox = styled.div` width: 20px; height: 20px; border-radius: 6px; margin-right: 15px; cursor: pointer; background-color: ${p => p.$checked ? "#C0DA58" : "#E2E2E2"}; transition: 0.2s; `;
const EmptyText = styled.div` color: #AAA; font-size: 15px; margin: 8px 0 18px; `;
const BottomTabBar = styled.nav`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: calc(64px + env(safe-area-inset-bottom));
        padding: 0 4px env(safe-area-inset-bottom);
        background-color: #F9F9F8;
        border-top: 1px solid #E5E5E5;
        z-index: 30;
        align-items: center;
        justify-content: space-around;
    }
`;
const TabItem = styled.button`
    display: flex;
    flex: 1;
    height: 64px;
    border: 0;
    background: transparent;
    cursor: pointer;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;
const TabActiveBar = styled.div`
    position: absolute;
    top: 0;
    width: 24px;
    height: 2px;
    border-radius: 0 0 2px 2px;
    background: ${({ $active }) => ($active ? "#c0da58" : "transparent")};
`;
const TabIcon = styled.img`
    width: 22px;
    height: 22px;
`;
const TabText = styled.span`
    color: ${({ $active }) => ($active ? "#90a442" : "#AAA")};
    font-size: 9px;
    font-weight: 500;
    white-space: nowrap;
`;

export default function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const mobileMenus = [
        { path: "/homepage", icon: home, activeIcon: in_home, label: "HOME" },
        { path: "/schedule", icon: calendarIcon, activeIcon: in_calendar, label: "SCHEDULE" },
        { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
        { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
        { path: "/mypage", icon: icon, activeIcon: in_icon, label: "MY PAGE" },
    ];
    const [currentViewDate, setCurrentViewDate] = useState(new Date());
    const [weekStartDate, setWeekStartDate] = useState(() => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); return d; });

    const [profileInfo, setProfileInfo] = useState({ name: "사용자", job: "" });
    const [calendarMarks, setCalendarMarks] = useState({});
    const [upcomingSchedules, setUpcomingSchedules] = useState([]);
    const [projects, setProjects] = useState([]);
    const [todos, setTodos] = useState([]);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const loadHomeDashboard = async () => {
            try {
                const [homeData, teamData, scheduleData] = await Promise.all([
                    apiRequest("/api/home").catch(() => ({})),
                    apiRequest("/api/teams"),
                    apiRequest("/api/schedules"),
                ]);
                const user = homeData.user || {};
                const teamItems = (teamData.teams || []).map(mapApiTeam).map((team) => {
                    const tasks = loadProjectTasks(team);
                    const total = tasks.length || Number(team.raw?.taskTotal || 0);
                    const done = tasks.length
                        ? tasks.filter((task) => task.checked).length
                        : Number(team.raw?.taskDone || 0);
                    const progress = calculateProgress(tasks, Number(team.progress || 0));
                    return {
                        id: `project-${team.id}`,
                        text: `[${team.title}] ${done}/${total} 완료`,
                        checked: total > 0 && done >= total,
                        progress,
                    };
                });

                const schedules = (scheduleData.schedules || []).map((schedule) => ({
                    ...schedule,
                    targetDate: normalizeScheduleDate(schedule.targetDate),
                })).sort((a, b) => String(a.targetDate).localeCompare(String(b.targetDate)) || Number(a.id) - Number(b.id));
                const todayKey = toDateKey(new Date());
                const todaySchedules = schedules.filter((schedule) => schedule.targetDate === todayKey);
                const upcoming = schedules.filter((schedule) => schedule.targetDate >= todayKey).slice(0, 5);
                const todoSource = todaySchedules.length ? todaySchedules : upcoming;

                setProfileInfo({
                    name: user.name || user.userid || "사용자",
                    job: user.profile || user.department || "",
                });
                setProjects(teamItems);
                setTodos(todoSource.map(mapScheduleToTask));
                setUpcomingSchedules(upcoming.slice(0, 3));
                setCalendarMarks(buildCalendarMarks(schedules));
                setLoadError("");
            } catch (error) {
                setProjects([]);
                setTodos([]);
                setUpcomingSchedules([]);
                setCalendarMarks({});
                setLoadError(error.message || "홈 데이터를 불러오지 못했습니다.");
            }
        };

        loadHomeDashboard();
    }, []);

    const getWeekLabel = (startDate) => {
        const d = new Date(startDate); d.setDate(d.getDate() + 3);
        const month = d.getMonth() + 1;
        const week = Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7);
        return `${month}월 ${week}주차`;
    };

    const weekDates = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(weekStartDate); d.setDate(weekStartDate.getDate() + i);
        return { day: d.getDate(), full: d.toDateString(), event: Boolean(calendarMarks[toDateKey(d)]) };
    });

    const handleBoxClick = async (id, section) => {
        if (section === 'project') return;

        const target = todos.find((todo) => todo.id === id);
        if (!target?.scheduleId) return;

        const nextChecked = !target.checked;
        setTodos((prev) => prev.map((todo) => (
            todo.id === id ? { ...todo, checked: nextChecked } : todo
        )));

        try {
            await apiRequest(`/api/schedules/${target.scheduleId}`, {
                method: "PUT",
                body: JSON.stringify({ status: nextChecked ? "Done" : "Wait" }),
            });
        } catch (error) {
            setTodos((prev) => prev.map((todo) => (
                todo.id === id ? { ...todo, checked: target.checked } : todo
            )));
            alert(error.message || "TODO 완료 상태를 저장하지 못했습니다.");
        }
    };

    return (
        <Container>
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
                {/* 에러 지점 해결: alarm 아이콘을 사용 */}
                <Item onClick={() => navigate("/notification")}><Icon src={alarm} /><Text className="text">NOTIFICATIONS</Text></Item>
            </Menu>

            <MainContent>
                <LeftPanel>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={profile} style={{ width: 80, height: 80, borderRadius: '50%' }} alt="p" />
                        <div style={{ marginLeft: 15 }}>
                            <div style={{ fontSize: 22, fontWeight: 700 }}>{profileInfo.name}</div>
                            <div style={{ color: '#999', fontSize: 14 }}>{profileInfo.job || "프로필"}</div>
                        </div>
                    </div>
                    <MiniCalendar currentViewDate={currentViewDate} setCurrentViewDate={setCurrentViewDate} calendarMarks={calendarMarks} />
                    <div style={{ marginTop: '30px' }}>
                        {upcomingSchedules.map(item => (
                            <Card key={item.id}><CardDate>{formatCardDate(item.targetDate)}</CardDate><div style={{marginLeft:20}}><div style={{fontSize:14, fontWeight:600}}>{item.title}</div><div style={{fontSize:12, color:'#AAA'}}>{item.dpName || item.type}</div></div></Card>
                        ))}
                        {!upcomingSchedules.length && <EmptyText>{loadError || "예정된 일정이 없습니다."}</EmptyText>}
                    </div>
                </LeftPanel>

                <MiddlePanel>
                    <h2 style={{ fontSize: 32, fontWeight: 800 }}>Today</h2>
                    <p style={{ color: '#AAA', marginTop: 5 }}>{getWeekLabel(weekStartDate)}</p>
                    <WeeklyNav>
                        <img src={week_left} style={{ width: 42, height: 42, cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setWeekStartDate(new Date(weekStartDate.setDate(weekStartDate.getDate() - 7))); }} alt="prev" />
                        {weekDates.map((item, idx) => (
                            <DayItem key={idx}><DayNum $active={item.full === new Date().toDateString()}>{item.day}</DayNum><DayDot $has={item.event} /></DayItem>
                        ))}
                        <img src={week_right} style={{ width: 42, height: 42, cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setWeekStartDate(new Date(weekStartDate.setDate(weekStartDate.getDate() + 7))); }} alt="next" />
                    </WeeklyNav>

                    {['project', 'todo'].map(section => (
                        <div key={section} style={{marginTop: 40}}>
                            <TaskHeader onClick={(e) => e.stopPropagation()}>
                                <h3>{section.toUpperCase()}</h3>
                                <button
                                    className="plus"
                                    type="button"
                                    onClick={() => navigate(section === 'project' ? "/project" : "/schedule")}
                                >
                                    +
                                </button>
                            </TaskHeader>
                            {loadError && section === 'project' && <EmptyText>{loadError}</EmptyText>}
                            {!loadError && (section === 'project' ? projects : todos).length === 0 && (
                                <EmptyText>{section === 'project' ? "진행 중인 프로젝트 업무가 없습니다." : "오늘 할 일이 없습니다."}</EmptyText>
                            )}
                            {(section === 'project' ? projects : todos).map(item => (
                                <TaskRow key={item.id} onClick={(e) => e.stopPropagation()}>
                                    {section === 'todo' && (
                                        <CustomCheckBox $checked={item.checked} onClick={() => handleBoxClick(item.id, section)} />
                                    )}
                                    <span style={{ fontSize: 17, fontWeight: 500 }}>{item.text}</span>
                                </TaskRow>
                            ))}
                        </div>
                    ))}
                </MiddlePanel>
            </MainContent>
            <BottomTabBar>
                {mobileMenus.map((menu) => {
                    const isActive = location.pathname.toLowerCase() === menu.path.toLowerCase();
                    return (
                        <TabItem key={menu.path} type="button" onClick={() => navigate(menu.path)}>
                            <TabActiveBar $active={isActive} />
                            <TabIcon src={isActive ? menu.activeIcon : menu.icon} alt="" />
                            <TabText $active={isActive}>{menu.label}</TabText>
                        </TabItem>
                    );
                })}
                <TabItem type="button" onClick={() => navigate("/notification")}>
                    <TabActiveBar $active={location.pathname === "/notification"} />
                    <TabIcon src={alarm} alt="" />
                    <TabText $active={location.pathname === "/notification"}>ALARM</TabText>
                </TabItem>
            </BottomTabBar>
        </Container>
    );
}
