import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { GlobalStyle } from "../pages/homePage";
import Menu from "./menu_layout";
import { apiRequest } from "../utils/api";

import previous_arrow from "../assets/arrow_previous.svg";

export const PageLayout = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f9f9f9;
`;

export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    margin-left: 130px;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    @media (max-width: 480px) {
        margin-left: 0;
        padding: 16px;
        height: auto;
        min-height: 100vh;
        overflow-y: visible;
        overflow-x: hidden;     /* ← 추가: 가로 스크롤 방지 */
        padding-bottom: 100px;
        box-sizing: border-box; /* ← 추가 */
    }
`;

const TopBox = styled.div`
    margin-left: 2%;
    margin-top: 24px;
    display: flex;
    overflow-x: auto;
    gap: 12px;
    padding-bottom: 12px;
    flex-shrink: 0; /* 자기 자신이 찌그러지지 않도록 설정 */

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    @media (max-width: 480px) {
        margin-left: 0;
        margin-top: 8px;
        padding-left: 4px;
        padding-right: 4px;
    }
`;

const TopScheduleBox = styled.div`
    display: flex;
    padding: 16px 32px;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    border-radius: 16px;
    white-space: nowrap;
    flex-shrink: 0;   

    border: 1px solid var(--Gray-5, #C9C9C8);
    background: #FFF;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

    &:hover{
        border: 1px solid var(--Light-Green-2, #C0DA58);
        background: #FFF;
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.30);
    }

    @media (max-width: 480px) {
        padding: 12px 20px;
    }
`;

const TopScheduleText = styled.span`
    color: var(--Gray-7, #70716F);
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: default;

    ${TopScheduleBox}:hover & {
        color: var(--Light-Green-3, #90A442);
        cursor: default;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;

const TopTaskText = styled.span`
    color: var(--Gray-6, #959794);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: default;

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const MainBox = styled.div`
    display: grid;
    grid-template-columns: minmax(320px, 460px) minmax(360px, 1fr);
    gap: 28px;
    padding: 24px;
    flex: 1; /* 남은 공간을 자연스럽게 채우도록 변경 */

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }

    @media (max-width: 480px) {
        padding: 12px 0px;
        gap: 20px;
        flex: none;
        width: 100%;
    }
`;

const Panel = styled.section`
    border: 1px solid #c9c9c8;
    border-radius: 20px;
    background: #fff;
    padding: 24px;

    @media (max-width: 480px) {
        padding: 16px;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;  
    }
`;

const SectionTitle = styled.h2`
    margin: 0;
    color: #575856;
    font-size: 24px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const SectionSub = styled.p`
    margin: 8px 0 0;
    color: #959794;
    font-size: 15px;

    @media (max-width: 480px) {
        font-size: 13px;
    }
`;

const CalendarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`;

const ArrowButton = styled.button`
    width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
`;

const ArrowIcon = styled.img`
    width: 30px;
    height: 30px;
    transform: ${({ $next }) => ($next ? "rotate(180deg)" : "none")};
`;

const MonthText = styled.div`
    color: #90a442;
    font-size: 24px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const WeekGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    margin-top: 16px;
`;

const WeekCell = styled.div`
    text-align: center;
    color: #959794;
    font-size: 14px;
    font-weight: 600;
`;

const DateGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    margin-top: 10px;
`;

const DateCell = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1;
    text-align: center;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-radius: ${({ $isToday }) => ($isToday ? "50%" : "10%")};
    cursor: pointer;
    background: ${({ $count }) => {
        if ($count === 1) return "var(--Light-Green-4, #D7E697)";
        if ($count >= 2 && $count <= 4) return "var(--Light-Green-2, #C0DA58)";
        if ($count >= 5) return "var(--Light-Green-3, #90A442)";
        return "transparent";
    }};
    border: ${({ $isToday, $count }) =>
        $isToday && $count === 0
            ? "2px solid var(--Light-Green-4, #D7E697)" : "none"
    };
    color: ${({ $isCurrent, $count }) => {
        if ($count > 0) return "#333";
        return $isCurrent 
            ? "var(--Gray-7, #70716F)" 
            : "var(--Gray-5, #C9C9C8)";
    }};

    @media (max-width: 480px) {
        min-width: 32px;
        min-height: 32px;
        font-size: 12px;
    }
`;

const DateNumber = styled.div`
    font-size: 16px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

const DateCount = styled.div`
    margin-top: 2px;
    font-size: 11px;

    @media (max-width: 480px) {
        font-size: 9px;
    }
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 24px;

    @media (max-width: 680px) {
        grid-template-columns: 1fr;
    }
`;

const Field = styled.label`
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #70716f;
    font-size: 14px;
    font-weight: 600;
`;

const Input = styled.input`
    border: 1px solid #d7d7d6;
    border-radius: 14px;
    padding: 14px 16px;
    font-size: 15px;
    outline: none;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: #90a442;
    }
`;

const Select = styled.select`
    border: 1px solid #d7d7d6;
    border-radius: 14px;
    padding: 14px 16px;
    font-size: 15px;
    outline: none;
    background: #fff;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: #90a442;
    }
`;

const TextArea = styled.textarea`
    border: 1px solid #d7d7d6;
    border-radius: 14px;
    padding: 14px 16px;
    font-size: 15px;
    min-height: 110px;
    resize: vertical;
    outline: none;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: #90a442;
    }
`;

const FullWidth = styled.div`
    grid-column: 1 / -1;
`;

const ActionRow = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 16px;
    flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
    border: none;
    border-radius: 14px;
    padding: 14px 20px;
    background: #c0da58;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    flex: 1;
    min-width: 90px;
`;

const SecondaryButton = styled.button`
    border: 1px solid #c9c9c8;
    border-radius: 14px;
    padding: 14px 20px;
    background: #fff;
    color: #70716f;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    flex: 1;
    min-width: 75px;
`;

const MetaRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    gap: 12px;
`;

const Message = styled.div`
    color: ${({ $error }) => ($error ? "#d9534f" : "#90a442")};
    font-size: 14px;
    font-weight: 600;
`;

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
`;

const TaskCard = styled.div`
    border: 1px solid #e6e6e5;
    border-radius: 18px;
    padding: 18px 20px;
    background: #fff;

    @media (max-width: 480px) {
        padding: 14px;
    }
`;

const TaskTop = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
`;

const TaskDate = styled.div`
    color: #90a442;
    font-size: 16px;
    font-weight: 700;
`;

const TaskTitle = styled.div`
    margin-top: 4px;
    color: #575856;
    font-size: 18px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

const TaskDesc = styled.div`
    margin-top: 8px;
    color: #70716f;
    font-size: 14px;
    line-height: 1.5;
`;

const BadgeRow = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 10px;
    flex-wrap: wrap;
`;

const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 6px 10px;
    background: #f5f8e8;
    color: #6f8240;
    font-size: 12px;
    font-weight: 700;
`;

const CardActions = styled.div`
    display: flex;
    gap: 8px;
`;

const SmallButton = styled.button`
    border: 1px solid #d9d9d8;
    background: #fff;
    color: #70716f;
    border-radius: 12px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
`;

const EmptyState = styled.div`
    margin-top: 20px;
    border: 1px dashed #d7d7d6;
    border-radius: 18px;
    padding: 28px 20px;
    text-align: center;
    color: #959794;
`;

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const initialForm = {
    title: "",
    description: "",
    dpName: "",
    type: "Task",
    targetDate: ""
};

const toDateKey = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const formatDateLabel = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return `${date.getMonth() + 1}/${String(date.getDate()).padStart(2, "0")}`;
};

export default function SchedulePage() {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState(toDateKey(today));
    const [form, setForm] = useState({
        ...initialForm,
        targetDate: toDateKey(today)
    });
    const [editingId, setEditingId] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const teamId = localStorage.getItem("teamId") || "";

    const loadSchedules = async () => {
        setLoading(true);
        setError("");
        try {
            const url = teamId ? `/api/schedules/${teamId}` : "/api/schedules";
            const data = await apiRequest(url);
            setSchedules(data.schedules || []);
        } catch (loadError) {
            setError(loadError.response?.data?.error || "일정을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    const scheduleCounts = useMemo(() => {
        const counts = { "모든 프로젝트": schedules.length };
        schedules.forEach((item) => {
            const key = item.dpName || "기본 프로젝트";
            counts[key] = (counts[key] || 0) + 1;
        });
        return Object.entries(counts).map(([schedule, tasks]) => ({ schedule, tasks }));
    }, [schedules]);

    const taskCount = useMemo(() => {
        return schedules.reduce((acc, item) => {
            const date = new Date(item.targetDate);
            if (Number.isNaN(date.getTime())) return acc;
            if (date.getFullYear() !== currentYear || date.getMonth() !== currentMonth) return acc;
            const day = date.getDate();
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        }, {});
    }, [schedules, currentMonth, currentYear]);

    const filteredSchedules = useMemo(() => {
        return [...schedules]
            .filter((item) => {
                const dateKey = toDateKey(item.targetDate);
                if (!selectedDate) {
                    const date = new Date(item.targetDate);
                    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
                }
                return dateKey === selectedDate;
            })
            .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));
    }, [schedules, selectedDate, currentMonth, currentYear]);

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();
    const dates = [];

    for (let i = firstDay - 1; i >= 0; i -= 1) {
        dates.push({ day: prevLastDate - i, isCurrent: false });
    }
    for (let i = 1; i <= lastDate; i += 1) {
        dates.push({ day: i, isCurrent: true });
    }
    while (dates.length < 35) {
        dates.push({ day: dates.length - lastDate - firstDay + 1, isCurrent: false });
    }

    const moveMonth = (value) => {
        const newDate = new Date(currentYear, currentMonth + value, 1);
        setCurrentYear(newDate.getFullYear());
        setCurrentMonth(newDate.getMonth());
        setSelectedDate("");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({
            ...initialForm,
            targetDate: selectedDate || toDateKey(today)
        });
    };

    const handleSubmit = async () => {
        setMessage("");
        setError("");

        if (!form.title || !form.targetDate) {
            setError("일정명과 날짜를 입력해주세요.");
            return;
        }

        const payload = {
            title: form.title,
            description: form.description,
            dpName: form.dpName || "기본 프로젝트",
            type: form.type,
            targetDate: form.targetDate
        };
        if (teamId) {
            payload.teamId = teamId;
        }

        try {
            if (editingId) {
                await apiRequest(`/api/schedules/${editingId}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
                setMessage("일정을 수정했어요.");
            } else {
                await apiRequest("/api/schedules", {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
                setMessage("일정을 추가했어요.");
            }
            await loadSchedules();
            setSelectedDate(form.targetDate);
            resetForm();
        } catch (submitError) {
            setError(submitError.response?.data?.error || "일정 저장에 실패했습니다.");
        }
    };

    const handleEdit = (schedule) => {
        setEditingId(schedule.id);
        setForm({
            title: schedule.title || "",
            description: schedule.description || "",
            dpName: schedule.dpName || "",
            type: schedule.type || "Task",
            targetDate: toDateKey(schedule.targetDate)
        });
        setSelectedDate(toDateKey(schedule.targetDate));
    };

    const handleDelete = async (id) => {
        try {
            await apiRequest(`/api/schedules/${id}`, { method: "DELETE" });
            setMessage("일정을 삭제했어요.");
            setError("");
            if (editingId === id) {
                resetForm();
            }
            await loadSchedules();
        } catch (deleteError) {
            setError(deleteError.response?.data?.error || "일정 삭제에 실패했습니다.");
        }
    };

    return (
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu />
                <ContentBox>
                    {/* 상단 프로젝트 요약 박스 (모바일 가로 스크롤 가능) */}
                    <TopBox>
                        {scheduleCounts.map((data) => (
                            <TopScheduleBox key={data.schedule}>
                                <TopScheduleText>{data.schedule}</TopScheduleText>
                                <TopTaskText>{data.tasks} tasks</TopTaskText>
                            </TopScheduleBox>
                        ))}
                    </TopBox>

                    <MainBox>
                        <Panel>
                            <SectionTitle>일정 캘린더</SectionTitle>
                            <SectionSub>날짜를 누르면 해당 날짜 일정만 볼 수 있어요.</SectionSub>

                            <CalendarHeader>
                                <ArrowButton onClick={() => moveMonth(-1)}>
                                    <ArrowIcon src={previous_arrow} alt="previous month" />
                                </ArrowButton>
                                <MonthText>{months[currentMonth]} {currentYear}</MonthText>
                                <ArrowButton onClick={() => moveMonth(1)}>
                                    <ArrowIcon src={previous_arrow} alt="next month" $next />
                                </ArrowButton>
                            </CalendarHeader>

                            <WeekGrid>
                                {weekdays.map((day) => (
                                    <WeekCell key={day}>{day}</WeekCell>
                                ))}
                            </WeekGrid>

                            <DateGrid>
                                {dates.map((item, index) => {
                                    const dateKey = item.isCurrent
                                        ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(item.day).padStart(2, "0")}`
                                        : "";
                                    return (
                                        <DateCell
                                            key={`${item.day}-${index}`}
                                            type="button"
                                            $isCurrent={item.isCurrent}
                                            $count={item.isCurrent ? taskCount[item.day] || 0 : 0}
                                            $selected={item.isCurrent && selectedDate === dateKey}
                                            $isToday={
                                                item.isCurrent &&
                                                item.day === today.getDate() &&
                                                currentMonth === today.getMonth() &&
                                                currentYear === today.getFullYear()
                                            }
                                            onClick={() => {
                                                if (item.isCurrent) {
                                                    setSelectedDate(dateKey);
                                                    setForm((prev) => ({ ...prev, targetDate: dateKey }));
                                                }
                                            }}
                                        >
                                            <DateNumber>{item.day}</DateNumber>
                                            {item.isCurrent && (taskCount[item.day] || 0) > 0 ? (
                                                <DateCount>{taskCount[item.day]}개</DateCount>
                                            ) : null}
                                        </DateCell>
                                    );
                                })}
                            </DateGrid>
                        </Panel>

                        <Panel>
                            <SectionTitle>{editingId ? "일정 수정" : "일정 추가"}</SectionTitle>
                            <SectionSub>{teamId ? `현재 teamId는 ${teamId}입니다.` : "아직 팀이 없어도 일정을 먼저 등록할 수 있어요."}</SectionSub>

                            <FormGrid>
                                <Field>
                                    일정명
                                    <Input name="title" value={form.title} onChange={handleChange} placeholder="예: 주간 회의" />
                                </Field>
                                <Field>
                                    프로젝트명
                                    <Input name="dpName" value={form.dpName} onChange={handleChange} placeholder="예: UI/UX 프로젝트" />
                                </Field>
                                <Field>
                                    일정 유형
                                    <Select name="type" value={form.type} onChange={handleChange}>
                                        <option value="Task">Task</option>
                                        <option value="Schedule">Schedule</option>
                                    </Select>
                                </Field>
                                <Field>
                                    날짜
                                    <Input type="date" name="targetDate" value={form.targetDate} onChange={handleChange} />
                                </Field>
                                <FullWidth>
                                    <Field>
                                        상세 설명
                                        <TextArea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="일정 설명을 적어주세요."
                                        />
                                    </Field>
                                </FullWidth>
                            </FormGrid>

                            <ActionRow>
                                <PrimaryButton type="button" onClick={handleSubmit}>
                                    {editingId ? "수정 저장" : "일정 추가"}
                                </PrimaryButton>
                                <SecondaryButton type="button" onClick={resetForm}>
                                    초기화
                                </SecondaryButton>
                                <SecondaryButton type="button" onClick={loadSchedules}>
                                    새로고침
                                </SecondaryButton>
                            </ActionRow>

                            <MetaRow>
                                <div>
                                    <SectionTitle style={{ fontSize: "20px" }}>
                                        {selectedDate ? `${selectedDate} 일정` : `${months[currentMonth]} 일정`}
                                    </SectionTitle>
                                </div>
                                {loading ? <Message>불러오는 중...</Message> : null}
                            </MetaRow>

                            {error ? <Message $error>{error}</Message> : null}
                            {!error && message ? <Message>{message}</Message> : null}

                            {filteredSchedules.length ? (
                                <TaskList>
                                    {filteredSchedules.map((item) => (
                                        <TaskCard key={item.id}>
                                            <TaskTop>
                                                <div>
                                                    <TaskDate>{formatDateLabel(item.targetDate)}</TaskDate>
                                                    <TaskTitle>{item.title}</TaskTitle>
                                                </div>
                                                <CardActions>
                                                    <SmallButton type="button" onClick={() => handleEdit(item)}>수정</SmallButton>
                                                    <SmallButton type="button" onClick={() => handleDelete(item.id)}>삭제</SmallButton>
                                                </CardActions>
                                            </TaskTop>
                                            <BadgeRow>
                                                <Badge>{item.dpName || "기본 프로젝트"}</Badge>
                                                <Badge>{item.type || "TASK"}</Badge>
                                                <Badge>{item.status || "Wait"}</Badge>
                                            </BadgeRow>
                                            <TaskDesc>{item.description || "상세 설명이 없습니다."}</TaskDesc>
                                        </TaskCard>
                                    ))}
                                </TaskList>
                            ) : (
                                <EmptyState>
                                    {selectedDate ? "선택한 날짜에 등록된 일정이 없어요." : "이번 달 일정이 아직 없어요."}
                                </EmptyState>
                            )}
                        </Panel>
                    </MainBox>
                </ContentBox>
            </PageLayout>
        </>
    );
}
