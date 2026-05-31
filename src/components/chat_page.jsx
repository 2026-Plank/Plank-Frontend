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
import { apiRequest } from "../utils/api";

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
    margin: 10% 0 7% 0;
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
    margin: 12px 5px 5px;
`;
export const StateBox = styled.div`
    display: flex;
    align-items: center;
    margin-left: 2%;
    margin-top: 11px;
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
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
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
const TopUserWapper = styled(UserWapper)`
    gap: 22px;
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
const TopUserCharge = styled(UserCharge)`
    margin-left: 0;
    align-self: center;
    transform: translateY(7px);
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
    margin-top: 4px;
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
const EmptyText = styled.div`
    color: #70716F;
    font-size: 16px;
    text-align: center;
    margin: auto;
`;
export const NameWapper = styled.div`
    display: flex;
    height: 40px;
    margin-top: 7px;
    margin-bottom: 5px;
`;


//value 저장되어야함.
export const states = [
    { color: "3AB92C", label: "활동 중", value: "ONLINE"},
    { color: "F0CF19", label: "자리 비움", value: "IDLE"},
    { color: "F04419", label: "방해 금지", value: "DND"},
    { color: "B9B9B9", label: "오프라인", value: "OFFLINE"},
];

const getProfileSrc = (profile) => profile || user_icon;

const formatTime = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

const formatRelative = (value) => {
    if (!value) return "대화 없음";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "방금 전";
    if (minutes < 60) return minutes + "분 전";
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + "시간";
    return Math.floor(hours / 24) + "일";
};

const normalizeDirectChat = (item) => ({
    type: "direct",
    id: Number(item.userId || item.id),
    name: item.name || item.userid || item.email || "이름 없음",
    charge: item.job || "직무 미입력",
    lastMsg: item.lastMessage || "아직 대화가 없습니다.",
    time: formatRelative(item.lastTimestamp),
    lastTimestamp: item.lastTimestamp || null,
    state: item.presenceStatus || "ONLINE",
    profile: item.profile,
    unreadCount: Number(item.unreadCount || 0),
});

const normalizeGroupChat = (item) => ({
    type: "group",
    id: Number(item.groupId || item.id),
    name: item.name || "그룹 채팅",
    charge: "그룹",
    lastMsg: item.lastMessage || "아직 대화가 없습니다.",
    time: formatRelative(item.lastTimestamp),
    lastTimestamp: item.lastTimestamp || null,
    state: "ONLINE",
    profile: item.profile || null,
    unreadCount: Number(item.unreadCount || 0),
});

const normalizeFriendChat = (friend) => {
    const user = friend.user || friend;
    return {
        type: "direct",
        id: Number(user.id),
        name: user.name || user.userid || user.email || "\uC774\uB984 \uC5C6\uC74C",
        charge: user.job || "\uC9C1\uBB34 \uBBF8\uC785\uB825",
        lastMsg: "\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
        time: "\uB300\uD654 \uC5C6\uC74C",
        lastTimestamp: null,
        state: user.presenceStatus || "ONLINE",
        profile: user.profile,
        unreadCount: 0,
    };
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
    const [profile, setProfile] = useState(null);
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);

    const chatBoxRef = useRef();

    const loadChatList = async () => {
        const [profileData, friendsData, conversationData] = await Promise.all([
            apiRequest("/api/users/profile"),
            apiRequest("/api/users/friends"),
            apiRequest("/api/chats/conversations"),
        ]);

        const groups = (conversationData.groups || []).map(normalizeGroupChat);
        const conversations = (conversationData.conversations || []).map(normalizeDirectChat);
        const conversationById = new Map(conversations.map((item) => [item.id, item]));
        const friends = (friendsData.friends || [])
            .map(normalizeFriendChat)
            .filter((item) => item.id)
            .map((item) => ({
                ...item,
                ...(conversationById.get(item.id) || {}),
            }));
        const friendIds = new Set(friends.map((item) => item.id));
        const extraConversations = conversations.filter((item) => !friendIds.has(item.id));
        const nextList = [...groups, ...friends, ...extraConversations];

        setProfile(profileData);
        setCurrentState(states.find((state) => state.value === profileData?.presenceStatus) || states[0]);
        setChatList(nextList);
        setSelectedChat((current) => {
            const target = current || location.state?.selectedChat;
            if (!target) return null;
            return nextList.find((item) => item.id === Number(target.id) && (!target.type || item.type === target.type)) || null;
        });
    };

    useEffect(() => {
        loadChatList().catch(() => {
            setProfile(null);
            setChatList([]);
            setSelectedChat(null);
        });
    }, []);

    useEffect(() => {
        if (!selectedChat?.id) {
            setMessages([]);
            return;
        }

        const loadMessages = async () => {
            const data = selectedChat.type === "group"
                ? await apiRequest("/api/chats/groups/" + selectedChat.id + "/messages")
                : await apiRequest("/api/chats/" + selectedChat.id);
            setMessages(Array.isArray(data) ? data : []);
        };

        loadMessages().catch(() => setMessages([]));
    }, [selectedChat?.id, selectedChat?.type]);

    useEffect(() => {
        if(chatBoxRef.current){
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages, selectedChat]);
    
    const SendChat = async () => {
        if(sendChat.trim() === "" || !selectedChat?.id) return;
        const message = sendChat.trim();
        setSendChat("");

        const data = selectedChat.type === "group"
            ? await apiRequest("/api/chats/groups/" + selectedChat.id + "/messages", {
                method: "POST",
                body: JSON.stringify({ message }),
            })
            : await apiRequest("/api/chats", {
                method: "POST",
                body: JSON.stringify({ receiverId: selectedChat.id, message }),
            });

        if (data?.chat) {
            setMessages((prev) => [...prev, data.chat]);
        }
        loadChatList().catch(() => {});
    };

    const myName = profile?.name || profile?.userid || "내 프로필";
    const myCharge = profile?.job || "직무 미입력";
    const currentUserId = Number(profile?.id);

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
                                    <UserIcon $size={126} src={getProfileSrc(profile?.profile)} />
                                    <NameWapper>
                                        <NameText>{myName}</NameText>
                                        <UserCharge>{myCharge}</UserCharge>
                                    </NameWapper>
                                    <StateBox onClick={() => setOpenMenu(prev => !prev)}>
                                        <StateDot $color={currentState.color} />
                                        <StateText style={{cursor: "pointer"}}>{currentState.label}</StateText>
                                        <DetailIcon src={detail_down_icon} />
                                    </StateBox>
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
                                </InfoWapper>
                                <HorizontalLine $length={100} />

                                {/* 이게 chatlist 변경시 바뀌는 내용 */}
                                <UserBox>
                                    {chatList.map((item) => (
                                        <ChatItem key={item.type + "-" + item.id} onClick={() => setSelectedChat(item)}>
                                            <ChatItemIconWrapper>
                                                <UserIcon $size={60} src={getProfileSrc(item.profile)} />
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
                                    <TopUserWapper>
                                        {selectedChat && <UserIcon $size={60} src={getProfileSrc(selectedChat.profile)} />}
                                        <UserName style={!selectedChat ? { marginLeft: "20px" } : undefined}>{selectedChat?.name || "\uCC44\uD305"}</UserName>
                                        <TopUserCharge>{selectedChat?.charge || ""}</TopUserCharge>
                                    </TopUserWapper>
                                    {selectedChat && <MenuIcon src={menu} onClick={() => navigate("/chatinfo", {state: {selectedChat, chatList}})} />}
                                </TopBox>
                                <HorizontalLine $length={100} />
                                {/* 메세지 창 */}
                                <ChatBox ref={chatBoxRef}>
                                    {!selectedChat && <EmptyText>{"\uC67C\uCABD\uC5D0\uC11C \uB300\uD654 \uC0C1\uB300\uB97C \uC120\uD0DD\uD558\uC138\uC694."}</EmptyText>}
                                    {selectedChat && messages.map((msg) => {
                                        const isMine = Number(msg.senderId) === currentUserId;
                                        return (
                                        <MessageRow key={msg.id || String(msg.senderId) + String(msg.timestamp)} $isMine={isMine}>
                                            {!isMine && <UserIcon $size={60} src={getProfileSrc(selectedChat.profile)} />}
                                            {!isMine && <BubbleBox $isMine={isMine}>
                                                <BubbleText $isMine={isMine}>{msg.message}</BubbleText>
                                            </BubbleBox>}
                                            {!isMine && <TimeText>{formatTime(msg.timestamp)}</TimeText>}

                                            {isMine && <TimeText>{formatTime(msg.timestamp)}</TimeText>}
                                            {isMine && <BubbleBox $isMine={isMine}>
                                                <BubbleText $isMine={isMine}>{msg.message}</BubbleText>
                                            </BubbleBox>}
                                            {isMine && <UserIcon $size={60} src={getProfileSrc(profile?.profile)} />}
                                        </MessageRow>
                                        );
                                    })}
                                </ChatBox>
                                {/* 메세지 보내는 바 */}
                                <UserMessageBox>
                                    <MessageInput
                                        type="text"
                                        value={sendChat}
                                        disabled={!selectedChat}
                                        placeholder={selectedChat ? "\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694" : "\uB300\uD654 \uC0C1\uB300\uB97C \uC120\uD0DD\uD558\uC138\uC694"}
                                        onChange={(e) => setSendChat(e.target.value)}
                                        onKeyDown={(e) => {if (e.key === "Enter") SendChat();}}
                                    />
                                    <MessageIcon src={message_icon} onClick={SendChat} />
                                </UserMessageBox>
                            </RightBox>
                        </Layout>
                    </ContentBox>
                </PageLayout>
        </>
    )
}
