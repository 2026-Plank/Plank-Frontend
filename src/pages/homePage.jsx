import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

// 이미지 임포트
import symbol from '../assets/symbol.svg';
import in_home from '../assets/in_home.svg';
import calendarIcon from '../assets/calendar.svg';
import pen from '../assets/pen.svg';
import chat from '../assets/chat.svg';
import icon from '../assets/icon.svg';
import alarm from '../assets/alarm.svg'; // 알림 아이콘
import setting from '../assets/setting.svg';
import logo from '../assets/logo.svg';
import profile from '../assets/profile.svg';
import calendar_left from '../assets/calendar_left.svg';
import calendar_right from '../assets/calendar_right.svg';
import week_left from '../assets/week_left.svg';
import week_right from '../assets/week_right.svg';
import addIcon from '../assets/add.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

export const GlobalStyle = createGlobalStyle`
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");
    * { font-family: "Pretendard Variable", Pretendard, sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #FFF; overflow-x: hidden; }
`;

/* --- Styled Components (생략 없이 유지) --- */
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

const Container = styled.div` display: flex; width: 100vw; height: 100vh; `;
const MainContent = styled.div` flex: 1; margin-left: 130px; display: grid; grid-template-columns: 380px 1fr; height: 100vh; `;
const LeftPanel = styled.div` border-right: 1px solid #EDEDED; padding: 60px 35px; display: flex; flex-direction: column; overflow-y: auto; `;
const MiddlePanel = styled.div` padding: 60px 80px; overflow-y: auto; `;

/* --- Mini Calendar & UI Components --- */
const MiniCalendar = ({ currentViewDate, setCurrentViewDate }) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevLast = new Date(year, month, 0).getDate();
    const dateArray = [];
    for (let i = firstDay - 1; i >= 0; i--) dateArray.push({ d: prevLast - i, current: false, other: true });
    for (let i = 1; i <= daysInMonth; i++) dateArray.push({ d: i, current: [15, 17, 20].includes(i), other: false });
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
const WeeklyNav = styled.div` display: flex; align-items: center; justify-content: space-between; margin: 30px 0; padding-bottom: 30px; border-bottom: 1px solid #F0F0F0; `;
const DayItem = styled.div` display: flex; flex-direction: column; align-items: center; gap: 8px; `;
const DayNum = styled.span` font-size: 18px; font-weight: 600; color: ${p => p.$active ? "#C0DA58" : "#BBB"}; `;
const DayDot = styled.div` width: 5px; height: 5px; background-color: #C0DA58; border-radius: 50%; visibility: ${p => p.$has ? "visible" : "hidden"}; `;
const TaskHeader = styled.div` display: flex; align-items: center; gap: 10px; margin-bottom: 25px; position: relative; h3 { font-size: 22px; font-weight: 700; } 
    .plus { width: 26px; height: 26px; border-radius: 50%; background: #F0F0F0; color: #777; font-size: 18px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; border: none; } `;
const ActionPopup = styled.div` position: absolute; left: 145px; top: 0; background: #FFF; border: 1px solid #EEE; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; padding: 8px; z-index: 20; min-width: 100px; `;
const ActionItem = styled.div` display: flex; align-items: center; gap: 10px; padding: 8px 12px; cursor: pointer; border-radius: 6px; font-size: 14px; font-weight: 500; color: #555; &:hover { background: #F9F9F8; } img { width: 16px; height: 16px; } `;
const TaskRow = styled.div` display: flex; align-items: center; margin-bottom: 18px; `;
const CustomCheckBox = styled.div` width: 20px; height: 20px; border-radius: 6px; margin-right: 15px; cursor: pointer; background-color: ${p => p.$deleteMode ? "#FF6B6B" : p.$checked ? "#C0DA58" : "#E2E2E2"}; transition: 0.2s; `;
const EditInput = styled.input` border: none; border-bottom: 1px solid #C0DA58; outline: none; font-size: 17px; font-weight: 500; width: 100%; `;

export default function HomePage() {
    const navigate = useNavigate();
    const [currentViewDate, setCurrentViewDate] = useState(new Date());
    const [weekStartDate, setWeekStartDate] = useState(() => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); return d; });

    const [openPopup, setOpenPopup] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [deleteMode, setDeleteMode] = useState(null);
    const [addingTo, setAddingTo] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const [projects, setProjects] = useState([
        { id: 1, text: "[UIUX 개선 프로젝트] 기획서 작성", checked: true },
        { id: 2, text: "[UIUX 개선 프로젝트] 그래픽 디자인", checked: false },
        { id: 3, text: "[키오스크 개선 프로젝트] 휴리스틱 평가", checked: false },
    ]);
    const [todos, setTodos] = useState([
        { id: 4, text: "[시각디자인] 주제선정", checked: true },
        { id: 5, text: "[시각디자인] 브랜드 핵심가치", checked: true },
        { id: 6, text: "[DD] 기존 모바일 앱 분석", checked: false },
    ]);

    const getWeekLabel = (startDate) => {
        const d = new Date(startDate); d.setDate(d.getDate() + 3);
        const month = d.getMonth() + 1;
        const week = Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7);
        return `${month}월 ${week}주차`;
    };

    const weekDates = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(weekStartDate); d.setDate(weekStartDate.getDate() + i);
        return { day: d.getDate(), full: d.toDateString(), event: [15, 17, 20].includes(d.getDate()) };
    });

    const handleBoxClick = (id, section) => {
        if (deleteMode === section) {
            if (section === 'project') setProjects(projects.filter(p => p.id !== id));
            else setTodos(todos.filter(t => t.id !== id));
        } else {
            if (section === 'project') setProjects(projects.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
            else setTodos(todos.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
        }
    };

    const handleTextClick = (id, section) => { if (editMode === section) setEditingId(id); };
    const handleEditComplete = (id, newText, section) => {
        if (section === 'project') setProjects(projects.map(p => p.id === id ? { ...p, text: newText } : p));
        else setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));
        setEditingId(null);
    };
    const handleAddItem = (e, section) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            const newItem = { id: Date.now(), text: e.target.value, checked: false };
            if (section === 'project') setProjects([...projects, newItem]);
            else setTodos([...todos, newItem]);
            setAddingTo(null);
        }
    };

    return (
        <Container onClick={() => {setOpenPopup(null); setEditMode(null); setDeleteMode(null); setAddingTo(null); setEditingId(null);}}>
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
                            <div style={{ fontSize: 22, fontWeight: 700 }}>이민지</div>
                            <div style={{ color: '#999', fontSize: 14 }}>디자이너</div>
                        </div>
                    </div>
                    <MiniCalendar currentViewDate={currentViewDate} setCurrentViewDate={setCurrentViewDate} />
                    <div style={{ marginTop: '30px' }}>
                        {[15, 18, 20].map(d => (
                            <Card key={d}><CardDate>{d}</CardDate><div style={{marginLeft:20}}><div style={{fontSize:14, fontWeight:600}}>프로젝트 업무</div><div style={{fontSize:12, color:'#AAA'}}>세부 내용</div></div></Card>
                        ))}
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
                                <button className="plus" onClick={() => setOpenPopup(openPopup === section ? null : section)}>+</button>
                                {openPopup === section && (
                                    <ActionPopup>
                                        <ActionItem onClick={() => { setAddingTo(section); setOpenPopup(null); }}><img src={addIcon} alt="" />추가</ActionItem>
                                        <ActionItem onClick={() => { setEditMode(section); setOpenPopup(null); }}><img src={editIcon} alt="" />수정</ActionItem>
                                        <ActionItem onClick={() => { setDeleteMode(section); setOpenPopup(null); }}><img src={deleteIcon} alt="" />삭제</ActionItem>
                                    </ActionPopup>
                                )}
                            </TaskHeader>
                            {(section === 'project' ? projects : todos).map(item => (
                                <TaskRow key={item.id} onClick={(e) => e.stopPropagation()}>
                                    <CustomCheckBox $checked={item.checked} $deleteMode={deleteMode === section} onClick={() => handleBoxClick(item.id, section)} />
                                    {editingId === item.id ? (
                                        <EditInput autoFocus defaultValue={item.text} onKeyDown={(e) => e.key === 'Enter' && handleEditComplete(item.id, e.target.value, section)} onBlur={(e) => handleEditComplete(item.id, e.target.value, section)} />
                                    ) : (
                                        <span style={{ fontSize: 17, fontWeight: 500, cursor: editMode === section ? 'text' : 'default' }} onClick={() => handleTextClick(item.id, section)}>{item.text}</span>
                                    )}
                                </TaskRow>
                            ))}
                            {addingTo === section && (
                                <TaskRow onClick={(e) => e.stopPropagation()}>
                                    <CustomCheckBox $checked={false} />
                                    <EditInput autoFocus placeholder="내용을 입력하세요..." onKeyDown={(e) => handleAddItem(e, section)} />
                                </TaskRow>
                            )}
                        </div>
                    ))}
                </MiddlePanel>
            </MainContent>
        </Container>
    );
}