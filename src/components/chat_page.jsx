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
import back_icon from "../assets/back_icon.svg";

import { GlobalStyle } from "../pages/homePage";
import { PageLayout } from "./schedule_page";
import { ContentBox } from "./schedule_page";
import { API_BASE_URL, apiRequest } from "../utils/api";
import MenuLayout from "./menu_layout";

//css
export const Layout = styled.div`
    display: flex;
    height: 100vh;
    height: 100dvh;

    @media (max-width: 768px) {
        width: 100%;
        height: calc(100dvh - 64px - env(safe-area-inset-bottom));
        overflow: hidden;
    }
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

    @media (max-width: 768px) {
        width: 100%;
        align-items: center;
        box-sizing: border-box;
        flex-shrink: 0;
    }
`;
export const SearchBox = styled.input`
    width: 330px;
    border: none;
    outline: none;

    @media (max-width: 768px) {
        width: 100%;
        min-width: 0;
    }
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

    @media (max-width: 768px) {
        margin: 28px 0;
        flex-shrink: 0;
    }
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

    @media (max-width: 768px) {
        display: none;
    }
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

    @media (max-width: 768px) {
        top: 248px;
        left: 50%;
        transform: translateX(-50%);
    }
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

    @media (max-width: 768px) {
        display: ${({ $chatOpen }) => ($chatOpen ? "none" : "flex")};
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 16px 18px 22px;
        box-sizing: border-box;
        flex-direction: column;
        overflow: hidden;
    }
`;
export const TopBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin: 2% 0;

    @media (max-width: 768px) {
        margin: 0;
        padding: 14px 16px;
        min-height: 64px;
        box-sizing: border-box;
    }
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

    @media (max-width: 768px) {
        flex: 1;
        min-height: 0;
        padding-bottom: 10px;
    }
`;
export const ChatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 8px;
    cursor: pointer;
    border-radius: 12px;

    &:hover {
        background: #F9F9F8;
    }

    @media (max-width: 768px) {
        padding: 14px 8px;
        min-height: 72px;
    }
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

    @media (max-width: 768px) {
        display: ${({ $chatOpen }) => ($chatOpen ? "flex" : "none")};
        width: 100%;
        height: 100%;
        flex: none;
    }
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

    @media (max-width: 768px) {
        padding: 16px 14px;
        gap: 12px;
    }
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

    @media (max-width: 768px) {
        max-width: min(72vw, 320px);
        padding: 11px 16px;
        border-radius: 18px;
    }
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

    @media (max-width: 768px) {
        font-size: 15px;
        line-height: 1.35;
    }
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

    @media (max-width: 768px) {
        height: 54px;
        margin: 0 14px 14px;
        padding: 10px 16px;
        border-radius: 18px;
    }
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
    min-width: 0;
    font-size: 16px;
`;
export const NameWapper = styled.div`
    display: flex;
    height: 40px;
    margin-bottom: 5px;
`;
const BackButton = styled.button`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        width: 38px;
        height: 38px;
        border: 0;
        background: transparent;
        padding: 0;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;

        img {
            width: 28px;
            height: 28px;
        }
    }
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

const normalizeProfileInfo = (user = {}) => ({
    name: user.name || user.userid || user.userId || user.email || "사용자",
    job: user.job || user.department || user.statusMessage || "프로필",
    presenceStatus: user.presenceStatus,
});

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

const getChatKey = (chatTarget) => {
    if (!chatTarget) return "";
    return `${chatTarget.apiType || "local"}:${chatTarget.id}`;
};

export default function ChatPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const token = getToken();

    const [openMenu, setOpenMenu] = useState(false);
    const [currentState, setCurrentState] = useState(states[0]);
    const [profileInfo, setProfileInfo] = useState(() => normalizeProfileInfo(getCurrentUser()));
    const [chatOpen, setChatOpen] = useState(false);
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
        token ? [] : (location.state?.chatList || [
            { id: 1, name: "박재영", charge: "디자이너", lastMsg: "넹", time: "1시간", state: "ONLINE" },
            { id: 2, name: "윤다경", charge: "개발자", lastMsg: "알겠습니다", time: "3시간", state: "IDLE" },
            { id: 3, name: "장시후", charge: "기획자", lastMsg: "네", time: "5시간", state: "DND" },
            { id: 4, name: "팀 프로젝트 A", charge: "그룹", lastMsg: "감사합니다", time: "14시간", state: "OFFLINE" },
        ])
    );
    // selectedChat도 삭제된 항목이면 첫번째로 초기화
    const [selectedChat, setSelectedChat] = useState(chatList[0] || null);

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
    const currentUser = getCurrentUser();
    const currentUserId = currentUser.id;

    useEffect(() => {
        const storedUser = getCurrentUser();
        setProfileInfo(normalizeProfileInfo(storedUser));

        if (!token) return;

        apiRequest("/api/users/profile")
            .then((profile) => {
                if (!profile) return;

                const nextUser = { ...storedUser, ...profile };
                localStorage.setItem("user", JSON.stringify(nextUser));
                setProfileInfo(normalizeProfileInfo(nextUser));

                const nextState = states.find((state) => state.value === nextUser.presenceStatus);
                if (nextState) setCurrentState(nextState);
            })
            .catch(() => {
                setProfileInfo(normalizeProfileInfo(storedUser));
            });
    }, [token]);

    useEffect(() => {
        if(chatBoxRef.current){
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [allMessages, selectedChat]);

    const loadConversations = async () => {
        if (!token) return;
        const data = await apiRequest("/api/chats/conversations");
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
        const data = await apiRequest(url);
        setAllMessages((prev) => ({
            ...prev,
            [getChatKey(chatTarget)]: data.map((message) => mapApiMessage(message, currentUserId)),
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

        const events = new EventSource(`${API_BASE_URL}/api/chats/events?token=${encodeURIComponent(token)}`);
        const handleMessage = (event) => {
            const message = JSON.parse(event.data);
            const targetId = message.groupId || (Number(message.senderId) === Number(currentUserId) ? message.receiverId : message.senderId);
            const targetType = message.groupId ? "group" : "direct";
            const targetKey = `${targetType}:${targetId}`;

            setAllMessages((prev) => {
                const current = prev[targetKey] || [];
                if (current.some((item) => item.id === message.id)) return prev;
                return {
                    ...prev,
                    [targetKey]: [...current, mapApiMessage(message, currentUserId)],
                };
            });
            setChatList((prev) => prev.map((item) => (
                item.apiType === targetType && Number(item.id) === Number(targetId)
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
        if(sendChat.trim() === "" || !selectedChat) return;
        const text = sendChat.trim();
        setSendChat("");

        if (token && selectedChat?.apiType) {
            const url = selectedChat.apiType === "group"
                ? `/api/chats/groups/${selectedChat.id}/messages`
                : "/api/chats";
            const body = selectedChat.apiType === "group"
                ? { message: text }
                : { receiverId: selectedChat.id, message: text };

            const data = await apiRequest(url, {
                method: "POST",
                body: JSON.stringify(body),
            });
            const chat = data.chat;
            const chatKey = getChatKey(selectedChat);
            setAllMessages(prev => {
                const current = prev[chatKey] || [];
                if (current.some((item) => item.id === chat.id)) return prev;
                return {
                    ...prev,
                    [chatKey]: [...current, mapApiMessage(chat, currentUserId)]
                };
            });
            setChatList(prev => prev.map(item => item.id === selectedChat.id && item.apiType === selectedChat.apiType ? { ...item, lastMsg: text, time: formatMessageTime(chat.timestamp) } : item));
            return;
        }

        const now = new Date();
        const time = formatMessageTime(now);
        const chatKey = getChatKey(selectedChat);
        const nextMessages = {
            ...allMessages,
            [chatKey]: [...(allMessages[chatKey] || []), { id: Date.now(), text, isMine: true, time }]
        };
        setAllMessages(nextMessages);
        saveLocalMessages(nextMessages);
        setChatList(prev => prev.map(item => item.id === selectedChat.id ? { ...item, lastMsg: text, time: "방금" } : item));
    };

    return(
        <>
            <GlobalStyle />
                <PageLayout>
                    <MenuLayout />
                    <ContentBox>
                        <Layout>
                            <SideBox $chatOpen={chatOpen}>
                                <SearchWapper>
                                    <SearchBox type="search" />
                                    <SearchIcon src={search} />
                                </SearchWapper>
                                <InfoWapper>
                                    <UserIcon $size={126} src={user_icon} />
                                    <NameWapper>
                                        <NameText>{profileInfo.name}</NameText>
                                        <UserCharge>{profileInfo.job}</UserCharge>
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
                                        <ChatItem
                                            key={`${item.apiType || "local"}-${item.id}`}
                                            onClick={() => {
                                                setSelectedChat(item);
                                                setChatOpen(true);
                                            }}
                                        >
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
                            <RightBox $chatOpen={chatOpen}>
                                {/* 여기가 채팅 사용자의 정보가 들어가야됨. */}
                                <TopBox>
                                    {selectedChat ? (
                                        <UserWapper>
                                            <BackButton type="button" onClick={() => setChatOpen(false)}>
                                                <img src={back_icon} alt="채팅 목록으로 돌아가기" />
                                            </BackButton>
                                            <UserIcon $size={60} src={user_icon} />
                                            <UserName>{selectedChat.name}</UserName>
                                            <UserCharge>{selectedChat.charge}</UserCharge>
                                        </UserWapper>
                                    ) : (
                                        <UserName>채팅방 없음</UserName>
                                    )}
                                    {selectedChat && <MenuIcon src={menu} onClick={() => navigate("/chatinfo", {state: {selectedChat, chatList}})} />}
                                </TopBox>
                                <HorizontalLine $length={100} />
                                {/* 메세지 창 */}
                                <ChatBox ref={chatBoxRef}>
                                    {(selectedChat ? allMessages[getChatKey(selectedChat)] || allMessages[selectedChat.id] || [] : []).map((msg) => (
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
