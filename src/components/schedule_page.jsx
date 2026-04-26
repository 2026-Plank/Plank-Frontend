//packages
import styled from "styled-components"
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

//assets
import next_arrow from "../assets/arrow_previous.svg";
import previous_arrow from "../assets/arrow_previous.svg";
import down_icon from "../assets/down_icon.svg";

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
import { GlobalStyle } from "../pages/homePage";
import { Menu } from "../pages/homePage";
import { Symbol } from "../pages/homePage";
import { Logo } from "../pages/homePage";
import { Item } from "../pages/homePage";
import { Background } from "../pages/homePage";
import { Icon } from "../pages/homePage";
import { Text } from "../pages/homePage";
import { Line } from "../pages/homePage";

//css
export const PageLayout = styled.div`
    display: flex;
    height: 100vh;
`;
export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    margin-left: 130px;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
const MainBox = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
`;
const TopBox = styled.div`
    margin-left: 2%;
    display: flex;
    overflow-x: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
const TopScheduleBox = styled.div`
    display: flex;
    margin: 1% 1%;
    padding: 18px 50px 18px 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 16px;
    white-space: nowrap;
    flex-shrink: 0;   

    border-radius: 16px;
    border: 1px solid var(--Gray-5, #C9C9C8);
    background: #FFF;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

    &:hover{
        border: 1px solid var(--Light-Green-2, #C0DA58);
        background: #FFF;
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }
`;
const TopScheduleText = styled.span`
    color: var(--Gray-7, #70716F);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: default;

    ${TopScheduleBox}:hover & {
        color: var(--Light-Green-3, #90A442);
        cursor: default;
    }
`;
const TopTaskText = styled.span`
    color: var(--Gray-6, #959794);
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: default;
`;
const CalenderBox = styled.div`
    width: 420px;
    min-width: 280px;
    margin: 4% 1% 0 2%;
    flex-shrink: 0;
`;
const CalenderTopWapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const PreviousIcon = styled.img`
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    cursor: pointer;
`;
const NextIcon = styled.img`
    width: 30px;
    height: 30px;
    transform: rotate(180deg);
    flex-shrink: 0;
    aspect-ratio: 1/1;
    cursor: pointer;
`;
const MonthText = styled.span`
    color: var(--Light-Green-3, #90A442);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const CalenderWapper = styled.div`
    width: 100%;
    display: inline-flex;
    padding: 30px;
    flex-direction: column;
    gap: 10px;
    align-items:center;
    justify-content: center;
    margin-top: 5%;
    border-radius: 20px;
    border: 1px solid var(--Gray-5, #C9C9C8);
`;
const DateGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px 6px;
    margin: 10px;
`;
const DateCell = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    margin: 0 auto;
    border-radius: ${({ $isToday }) => ($isToday ? "50%" : "10%")};
    cursor: pointer;
    background: ${({ $count }) => {
        if ($count === 1) return "var(--Light-Green-4, #D7E697)";
        if ($count >= 2 && $count <= 4) return "var(--Light-Green-2, #C0DA58)";
        if ($count >= 5) return "var(--Light-Green-3, #90A442)";
        return "transparent";
    }};
    border: ${({ $isToday }) => $isToday ? "2px solid var(--Light-Green-4, #D7E697)" : "none"};
    color: ${({ $isCurrent, $count }) => {
        if ($count > 0) return "var(--white-1, #FFF)";
        return $isCurrent 
            ? "var(--Gray-7, #70716F)" 
            : "var(--Gray-5, #C9C9C8)";
    }};
`;
const TasksBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 8% 0 0 3%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
const TaskWapper = styled.div`
    margin-bottom: 10px;
    display: flex;
    width: 90%;
    height: 104px;
    padding-left: 24px;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 16px;
    border: 1px solid #B9B9B9;
    background: var(--white-1, #FFF);
`;
const TaskDate = styled.span`
    margin-right: 20px;
    align-self: center;
    color: var(--Light-Green-2, #C0DA58);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const TaskTextWapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const TaskText = styled.span`
    color: var(--Gray-8, #575856);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 5px;
`;
const DetailTastText = styled.span`
    color: var(--Gray-6, #959794);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
`;



export default function SchedulePage(){
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    
    const [currentYear, setCurrentYear] = useState(todayYear);
    const [currentMonth, setCurrentMonth] = useState(todayMonth);
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();
    
    // 1️⃣ 이전 달 채우기
    const dates = [];

    // 이전 달 빈칸으로 채우기 (날짜 없이)
    for (let i = firstDay - 1; i >= 0; i--) {
        dates.push({ day: prevLastDate - i, isCurrent: false });
    }
    // 현재 달 채우기
    for (let i = 1; i <= lastDate; i++) {
        dates.push({ day: i, isCurrent: true });
    }
    // 다음 달 채우기 (35칸 맞추기)
    const nextDays = 35 - dates.length;
    for (let i = 1; i <= nextDays; i++) {
        dates.push({ day: i, isCurrent: false });
    }

    const MonthMove = (value) => {
        const newDate = new Date(currentYear, currentMonth + value, 1);
        setCurrentYear(newDate.getFullYear());
        setCurrentMonth(newDate.getMonth());
    };

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

    //프로젝트 더미 데이터
    const scheduleData = [
        {schedule: "모든 프로젝트", tasks: 28}, //tasks는 할일 추가되면 숫자 증가 되어야함
        {schedule: "UI/UX 프로젝트", tasks: 7},
        {schedule: "서비스 혁신 프로젝트", tasks: 11},
        {schedule: "리디자인 프로젝트", tasks: 3},
        {schedule: "키오스크 분석 프로젝트", tasks: 5}
    ]
    //할일 더미 데이터
    const TaskData = [
        {date: "4/02", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/15", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/07", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/20", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/30", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/11", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/20", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/30", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/11", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/20", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/30", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/11", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/30", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/30", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "4/30", task: "리디자인 프로젝트", detail: "UX 리서치"},
        {date: "5/30", task: "리디자인 프로젝트", detail: "UX 리서치"},
    ];
    const taskCount = TaskData.reduce((acc, cur) => {
        const [m, d] = cur.date.split("/").map(Number);
        if (m === currentMonth + 1) {
            acc[d] = (acc[d] || 0) + 1;
        }
        return acc;
    }, {});

    return(
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu>
                    <Symbol className="symbol" src={symbol} />
                    <Logo className="logo" src={logo} />

                    {menus.map((menu) => {
                        const isActive = location.pathname === menu.path;

                        return (
                            <Item
                                key={menu.path}
                                onClick={() => navigate(menu.path)}
                            >
                                <Background $active={isActive} />

                                <Icon
                                    src={isActive ? menu.activeIcon : menu.icon}
                                />

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
                    <TopBox>
                        {scheduleData.map((data) => {
                            return(
                                <TopScheduleBox>
                                    <TopScheduleText>{data.schedule}</TopScheduleText>
                                    <TopTaskText>{data.tasks} tasks</TopTaskText>
                                </TopScheduleBox>
                            );
                        })}
                    </TopBox>
                    <MainBox>
                        <CalenderBox>
                            <CalenderTopWapper>
                                <PreviousIcon src={previous_arrow} onClick={() => MonthMove(-1)} />
                                <MonthText>{months[currentMonth]}</MonthText>
                                <NextIcon src={previous_arrow} onClick={() => MonthMove(1)} />
                            </CalenderTopWapper>
                            <CalenderWapper>
                            <DateGrid>
                                {dates.map((d, i) => {
                                    const count = d.isCurrent ? taskCount[d.day] || 0 : 0;
                                    return(
                                        <DateCell key={i} $isCurrent={d.isCurrent} $count={count} $isToday={d.isCurrent && d.day === todayDate 
                                            && currentMonth === todayMonth && currentYear === todayYear
                                        }>
                                            {d.day}
                                        </DateCell>
                                    );
                                })}
                            </DateGrid>
                            </CalenderWapper>
                        </CalenderBox>
                        <TasksBox>
                            {[...TaskData]
                                .filter((t) => {
                                    const m = Number(t.date.split("/")[0]);
                                    return m === currentMonth + 1;  // 현재 달만 표시
                                })
                                .sort((a, b) => {
                                    const aDate = Number(a.date.split("/")[1]);
                                    const bDate = Number(b.date.split("/")[1]);
                                    return aDate - bDate;
                                })
                                .map((t, idx) => {
                                    const date = t.date.split("/")[1];
                                    return (
                                        <TaskWapper key={idx}>
                                            <TaskDate>{date}</TaskDate>
                                            <TaskTextWapper>
                                                <TaskText>{t.task}</TaskText>
                                                <DetailTastText>{t.detail}</DetailTastText>
                                            </TaskTextWapper>
                                        </TaskWapper>
                                    );
                                })}
                        </TasksBox>
                    </MainBox>
                </ContentBox>
            </PageLayout>
        </>
    )
}