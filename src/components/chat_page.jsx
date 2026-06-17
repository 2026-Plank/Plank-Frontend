//packages
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//assets, components
import search from "../assets/search_icon.png";
import detail_down_icon from "../assets/state_down.svg";
import menu from "../assets/menu.svg";
import message_icon from "../assets/message.svg";
import user_icon from "../assets/default_user_icon.svg";

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

//css
export const Layout = styled.div`
    display: flex;
    height: 100vh;
`;
export const SearchWapper = styled.div`
    display: flex;
    width: 354px;
    height: 52px;
    padding: 13px 20px 13px 22px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;

    border-radius: 100px;
    border: 1px solid var(--Light-Green-2, #C0DA58);
    background: var(--white-1, #FFF);
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
`;
export const SearchBox = styled.input`
    width: 330px;
    border: none;
    outline: none;
`;
export const SearchIcon = styled.img`
    width: 24px;
    height: 24px;
    aspect-ratio: 1/1;
`;
export const InfoWapper = styled.div`
    margin: 10% 0 10% 0;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
`;
export const UserIcon = styled.img`
    width: ${({$size}) => $size}px;
    height: ${({$size}) => $size}px;
    border-radius: 126px;
`;
export const NameText = styled.span`
    color: var(--black-1, #000);
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 5px;
`;
export const StateBox = styled.div`
    display: flex;
    align-items: center;
    margin-left: 2%;
    cursor: pointer;
`;
export const StateDot = styled.div`
    cursor: pointer;
    width: 10px;
    height: 10px;
    aspect-ratio: 1/1;
    border-radius: 50px;
    margin: 0px 5px 0px 0px;

    background: #${({$color}) => $color};
`;
export const StateText = styled.span`
    color: var(--black-1, #000);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;
export const DetailIcon = styled.img`
    width: 18px;
    height: 18px;
    aspect-ratio: 1/1;
    cursor: pointer;
`;
export const HorizontalLine = styled.div`
    width: ${({$length}) => $length}%;
    height: 1px;
    background: #C9C9C8;
`;
export const VerticalLine = styled.div`
    width: 1px;
    height: 100%;
    background: #C9C9C8;
`;
export const StateMenu = styled.div`
    display: flex;
    width: 150px;
    height: 113px;
    padding: 0 13px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    position: absolute;
    top: 310px;
    left: 17%;
    z-index: 10; 

    border-radius: 12px;
    background: var(--white-1, #FFF);
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
`;
export const StateLine = styled.div`
    width: 124px;
    height: 0.5px;
    background: #C9C9C8;
`;
export const StateWapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const SideBox = styled.div`
    margin: 2%;
`;
export const TopBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin: 2% 0;
`;
const UserWapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;
export const UserName = styled.span`
    color: var(--black-1, #000);
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
export const UserCharge = styled.span`
    margin-left: 10px;
    color: var(--Gray-7, #70716F);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    justify-content: center;
    align-items: flex-end;
    align-self: flex-end;
`;
export const UserBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    overflow-y: auto;
`;
export const ChatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 8px;
    cursor: pointer;
    border-radius: 12px;
`;
export const ChatItemIconWrapper = styled.div`
    position: relative;
    flex-shrink: 0;
`;
export const ChatItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
`;
export const ChatItemTop = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;
export const ChatItemName = styled.span`
    color: var(--black-1, #000);
    font-size: 16px;
    font-weight: 600;
`;
export const ChatItemBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const ChatItemMsg = styled.span`
    color: var(--Gray-7, #70716F);
    font-size: 13px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const MenuIcon = styled.img`
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
export const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;  /* 추가 */
`;

const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    gap: 16px;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
const MessageRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 8px;
    justify-content: ${({ $isMine }) => $isMine ? "flex-end" : "flex-start"};
`;
const BubbleBox = styled.div`
    display: flex;
    padding: 14px 28px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    background: ${({ $isMine }) => $isMine ? "var(--Light-Green-4, #D3EB73)" : "var(--Gray-4, #E0E0E0)"};
    max-width: 600px;
`;

const BubbleText = styled.span`
    color: var(--black-1, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: pre-wrap;
    word-break: break-word;
    background: ${({ $isMine }) => $isMine ? "var(--Light-Green-4, #D3EB73)" : "var(--Gray-4, #E0E0E0)"};
`;
const TimeText = styled.span`
    color: var(--Gray-7, #70716F);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;
const UserMessageBox = styled.div`
    display: flex;
    height: 60px;
    padding: 13px 30px 13px 22px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    border: 1px solid var(--Light-Green-2, #C0DA58);
    background: var(--white-1, #FFF);
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

    flex-shrink: 0;
    margin: 0 20px 20px 20px;
`;
const MessageIcon = styled.img`
    width: 30px;
    height: 30px;
    aspect-ratio: 1/1;
`;
const MessageInput = styled.input`
    flex: 1;
    height: 50px;
    border: 0;
    outline: 0;
`;
export const NameWapper = styled.div`
    display: flex;
    height: 40px;
    margin-bottom: 5px;
`;


//value 저장되어야함.
export const states = [
    { color: "3AB92C", label: "활동 중", value: "ONLINE"},
    { color: "F0CF19", label: "자리비움", value: "IDLE"},
    { color: "F04419", label: "방해 금지", value: "DND"},
    { color: "B9B9B9", label: "오프라인", value: "OFFLINE"},
];

const LOCAL_CHAT_KEY = "plank-local-chat-messages";

const getToken = () => localStorage.getItem("token");

const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
        return {};
    }
};

const formatMessageTime = (value = new Date()) => {
    const date = new Date(value);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

const mapApiMessage = (message, currentUserId) => ({
    id: message.id,
    text: message.message,
    isMine: Number(message.senderId) === Number(currentUserId),
    time: formatMessageTime(message.timestamp),
});

const loadLocalMessages = () => {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_CHAT_KEY) || "{}");
    } catch {
        return {};
    }
};

const saveLocalMessages = (messages) => {
    localStorage.setItem(LOCAL_CHAT_KEY, JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent("plank-local-chat-sync", { detail: messages }));
};

export default function ChatPage(){
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

    const [openMenu, setOpenMenu] = useState(false);
    const [currentState, setCurrentState] = useState(states[0]);
    const menuRef = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    const handleStateChange = (state) => {
        setCurrentState(state);
        setOpenMenu(false);
    }

    //챗 내용
    const [sendChat, setSendChat] = useState("");

    //챗 정보 더미데이터
    const [chatList, setChatList] = useState(
        location.state?.chatList || [
            { id: 1, name: "박재영", charge: "디자이너", lastMsg: "넹", time: "1시간", state: "ONLINE" },
            { id: 2, name: "윤다경", charge: "개발자", lastMsg: "알겠습니다", time: "3시간", state: "IDLE" },
            { id: 3, name: "장시후", charge: "기획자", lastMsg: "네", time: "5시간", state: "DND" },
            { id: 4, name: "팀 프로젝트 A", charge: "그룹", lastMsg: "감사합니다", time: "14시간", state: "OFFLINE" },
        ]
    );
    // selectedChat도 삭제된 항목이면 첫번째로 초기화
    const [selectedChat, setSelectedChat] = useState(chatList[0]);

    const [allMessages, setAllMessages] = useState(() => {
        const saved = loadLocalMessages();
        if (Object.keys(saved).length) return saved;
        return {
        1: [{ id: 1, text: "안녕하세요!", isMine: false, time: "2:15 PM" }],
        2: [{ id: 1, text: "회의 언제예요?", isMine: false, time: "2:15 PM" }],
        3: [{ id: 1, text: "네", isMine: false, time: "2:15 PM" }],
        4: [{ id: 1, text: "감사합니다", isMine: false, time: "2:15 PM" }],
    }});

    const chatBoxRef = useRef();
    const token = getToken();
    const currentUser = getCurrentUser();
    const currentUserId = currentUser.id;

    useEffect(() => {
        if(chatBoxRef.current){
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [allMessages, selectedChat]);

    const loadConversations = async () => {
        if (!token) return;
        const res = await fetch("/api/chats/conversations", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;

        const data = await res.json();
        const direct = (data.conversations || []).map((item) => ({
            id: item.userId,
            apiType: "direct",
            name: item.name,
            charge: "개인",
            lastMsg: item.lastMessage || "",
            time: item.lastTimestamp ? formatMessageTime(item.lastTimestamp) : "",
            state: item.presenceStatus || "OFFLINE",
        }));
        const groups = (data.groups || []).map((item) => ({
            id: item.groupId,
            apiType: "group",
            name: item.name,
            charge: "그룹",
            lastMsg: item.lastMessage || "",
            time: item.lastTimestamp ? formatMessageTime(item.lastTimestamp) : "",
            state: "ONLINE",
        }));
        const nextList = [...direct, ...groups];
        if (!nextList.length) return;

        setChatList(nextList);
        setSelectedChat((prev) => nextList.find((item) => item.id === prev?.id && item.apiType === prev?.apiType) || nextList[0]);
    };

    const loadMessages = async (chatTarget = selectedChat) => {
        if (!token || !chatTarget) return;
        const url = chatTarget.apiType === "group"
            ? `/api/chats/groups/${chatTarget.id}/messages`
            : `/api/chats/${chatTarget.id}`;
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setAllMessages((prev) => ({
            ...prev,
            [chatTarget.id]: data.map((message) => mapApiMessage(message, currentUserId)),
        }));
    };

    useEffect(() => {
        loadConversations();
    }, []);

    useEffect(() => {
        loadMessages(selectedChat);
    }, [selectedChat?.id, selectedChat?.apiType]);

    useEffect(() => {
        if (!token) return;

        const events = new EventSource(`/api/chats/events?token=${encodeURIComponent(token)}`);
        const handleMessage = (event) => {
            const message = JSON.parse(event.data);
            const targetId = message.groupId || (Number(message.senderId) === Number(currentUserId) ? message.receiverId : message.senderId);

            setAllMessages((prev) => {
                const current = prev[targetId] || [];
                if (current.some((item) => item.id === message.id)) return prev;
                return {
                    ...prev,
                    [targetId]: [...current, mapApiMessage(message, currentUserId)],
                };
            });
            setChatList((prev) => prev.map((item) => (
                Number(item.id) === Number(targetId)
                    ? { ...item, lastMsg: message.message, time: formatMessageTime(message.timestamp) }
                    : item
            )));
        };

        events.addEventListener("chat:message", handleMessage);
        events.addEventListener("chat:group-message", handleMessage);

        const interval = setInterval(() => {
            loadMessages(selectedChat);
            loadConversations();
        }, 3000);

        return () => {
            events.close();
            clearInterval(interval);
        };
    }, [token, selectedChat?.id, selectedChat?.apiType, currentUserId]);

    useEffect(() => {
        if (token) return;

        const sync = (event) => {
            setAllMessages(event.detail || loadLocalMessages());
        };
        const storageSync = (event) => {
            if (event.key === LOCAL_CHAT_KEY) setAllMessages(loadLocalMessages());
        };

        window.addEventListener("plank-local-chat-sync", sync);
        window.addEventListener("storage", storageSync);
        return () => {
            window.removeEventListener("plank-local-chat-sync", sync);
            window.removeEventListener("storage", storageSync);
        };
    }, [token]);
    
    const SendChat = async () => {
        if(sendChat.trim() === "") return;
        const text = sendChat.trim();
        setSendChat("");

        if (token && selectedChat?.apiType) {
            const url = selectedChat.apiType === "group"
                ? `/api/chats/groups/${selectedChat.id}/messages`
                : "/api/chats";
            const body = selectedChat.apiType === "group"
                ? { message: text }
                : { receiverId: selectedChat.id, message: text };

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                const data = await res.json();
                const chat = data.chat;
                setAllMessages(prev => {
                    const current = prev[selectedChat.id] || [];
                    if (current.some((item) => item.id === chat.id)) return prev;
                    return {
                        ...prev,
                        [selectedChat.id]: [...current, mapApiMessage(chat, currentUserId)]
                    };
                });
                setChatList(prev => prev.map(item => item.id === selectedChat.id ? { ...item, lastMsg: text, time: formatMessageTime(chat.timestamp) } : item));
            }
            return;
        }

        const now = new Date();
        const time = formatMessageTime(now);
        const nextMessages = {
            ...allMessages,
            [selectedChat.id]: [...(allMessages[selectedChat.id] || []), { id: Date.now(), text, isMine: true, time }]
        };
        setAllMessages(nextMessages);
        saveLocalMessages(nextMessages);
        setChatList(prev => prev.map(item => item.id === selectedChat.id ? { ...item, lastMsg: text, time: "방금" } : item));
    };

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
                        <Layout>
                            <SideBox>
                                <SearchWapper>
                                    <SearchBox type="search" />
                                    <SearchIcon src={search} />
                                </SearchWapper>
                                <InfoWapper>
                                    <UserIcon $size={126} src={user_icon} />
                                    <NameWapper>
                                        <NameText>이민지</NameText>
                                        <UserCharge>디자이너</UserCharge>
                                    </NameWapper>
                                    <StateBox onClick={() => setOpenMenu(prev => !prev)}>
                                        <StateDot $color={currentState.color} />
                                        <StateText style={{cursor: "pointer"}}>{currentState.label}</StateText>
                                        <DetailIcon src={detail_down_icon} />
                                    </StateBox>
                                </InfoWapper>
                                {openMenu && (
                                    <StateMenu ref={menuRef}>
                                        {states
                                            .filter(s => s.label !== currentState.label)
                                            .map((state, i, arr) => (
                                            <>
                                                    <StateWapper key={state.label} onClick={() => handleStateChange(state)} style={{cursor: "pointer"}} >
                                                        <StateDot $color={state.color} />
                                                        <StateText>{state.label}</StateText>
                                                    </StateWapper>
                                                    {i < arr.length - 1 && <StateLine /> }
                                            </> 
                                            ))
                                        }
                                    </StateMenu>
                                )}
                                <HorizontalLine $length={100} />

                                {/* 이게 chatlist 변경시 바뀌는 내용 */}
                                <UserBox>
                                    {chatList.map((item) => (
                                        <ChatItem key={item.id} onClick={() => setSelectedChat(item)}>
                                            <ChatItemIconWrapper>
                                                <UserIcon $size={60} src={user_icon} />
                                            </ChatItemIconWrapper>
                                            <ChatItemInfo>
                                                <ChatItemTop>
                                                    <StateDot $color={states.find(s => s.value === item.state)?.color} />
                                                    <ChatItemName>{item.name}</ChatItemName>
                                                </ChatItemTop>
                                                <ChatItemBottom>
                                                    <ChatItemMsg>{item.lastMsg} · {item.time}</ChatItemMsg>
                                                </ChatItemBottom>
                                            </ChatItemInfo>
                                        </ChatItem>
                                    ))}
                                </UserBox>
                            </SideBox>
                            <VerticalLine />
                            <RightBox>
                                {/* 여기가 채팅 사용자의 정보가 들어가야됨. */}
                                <TopBox>
                                    <UserWapper>
                                        <UserIcon $size={60} src={user_icon} />
                                        <UserName>{selectedChat.name}</UserName>
                                        <UserCharge>{selectedChat.charge}</UserCharge>
                                    </UserWapper>
                                    <MenuIcon src={menu} onClick={() => navigate("/chatinfo", {state: {selectedChat, chatList}})} />
                                </TopBox>
                                <HorizontalLine $length={100} />
                                {/* 메세지 창 */}
                                <ChatBox ref={chatBoxRef}>
                                    {(allMessages[selectedChat.id] || []).map((msg) => (
                                        <MessageRow key={msg.id} $isMine={msg.isMine}>
                                            {!msg.isMine && <UserIcon $size={60} src={user_icon} />}
                                            {!msg.isMine && <BubbleBox $isMine={msg.isMine}>
                                                <BubbleText $isMine={msg.isMine}>{msg.text}</BubbleText>
                                            </BubbleBox>}
                                            {!msg.isMine && <TimeText>{msg.time}</TimeText>}

                                            {msg.isMine && <TimeText>{msg.time}</TimeText>}
                                            {msg.isMine && <BubbleBox $isMine={msg.isMine}>
                                                <BubbleText $isMine={msg.isMine}>{msg.text}</BubbleText>
                                            </BubbleBox>}
                                            {msg.isMine && <UserIcon $size={60} src={user_icon} />}
                                        </MessageRow>
                                    ))}
                                </ChatBox>
                                {/* 메세지 보내는 바 */}
                                <UserMessageBox>
                                    <MessageInput type="text" value={sendChat} onChange={(e) => setSendChat(e.target.value)}
                                        onKeyDown={(e) => {if (e.key === "Enter") SendChat();}} />
                                    <MessageIcon src={message_icon} onClick={SendChat} />
                                </UserMessageBox>
                            </RightBox>
                        </Layout>
                    </ContentBox>
                </PageLayout>
        </>
    )
}
