import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import search from "../assets/search_icon.png";
import detail_down_icon from "../assets/state_down.svg";
import menu from "../assets/menu.svg";
import message_icon from "../assets/message.svg";
import user_icon from "../assets/default_user_icon.svg";
import back_icon from "../assets/detail_back_icon.svg";

import { GlobalStyle } from "../pages/homePage";
import { PageLayout, ContentBox } from "./schedule_page";
import Menu from "./menu_layout";
import { apiRequest, getAuthToken } from "../utils/api";

export const Layout = styled.div`
    display: flex;
    height: 100%;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

export const SearchWapper = styled.div`
    display: flex;
    width: 100%;
    height: 52px;
    padding: 13px 20px 13px 22px;
    gap: 10px;
    border-radius: 100px;
    border: 1px solid #c0da58;
    background: #fff;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);

    @media (max-width: 480px) {
      height: 44px;
    }
`;

export const SearchBox = styled.input`
    flex: 1;
    border: none;
    outline: none;
`;

export const SearchIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export const InfoWapper = styled.div`
    margin: 10% 0;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
`;

export const UserIcon = styled.img`
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 50%;

    @media (max-width: 480px) {
      width: ${({ $size }) => Math.min($size, 80)}px;
      height: ${({ $size }) => Math.min($size, 80)}px;
    }
`;

export const NameText = styled.span`
    color: var(--black-1, #000);
    font-size: 26px;
    font-weight: 600;
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
    border-radius: 50px;
    margin: 0 5px 0 0;
    background: #${({ $color }) => $color || "B9B9B9"};
`;

export const StateText = styled.span`
    color: var(--black-1, #000);
    font-size: 14px;
    font-weight: 400;
`;

export const DetailIcon = styled.img`
    width: 18px;
    height: 18px;
    cursor: pointer;
`;

export const HorizontalLine = styled.div`
    width: ${({ $length }) => $length}%;
    height: 1px;
    background: #C9C9C8;
`;

export const VerticalLine = styled.div`
    width: 1px;
    height: 100%;
    background: #c9c9c8;

    @media (max-width: 480px) {
        display: none;
    }
`;

export const StateMenu = styled.div`
    display: flex;
    width: 150px;
    padding: 14px 13px;
    flex-direction: column;
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
    width: 350px;
    overflow-y: auto;

    @media (max-width: 480px) {
        width: 100%;
        margin: 0;
        padding: 16px;
        display: ${({ $isOpen }) => $isOpen ? "none" : "block"};
    }
`;

export const TopBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
`;

const UserWapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const UserName = styled.span`
    color: var(--black-1, #000);
    font-size: 26px;
    font-weight: 600;
`;

export const UserCharge = styled.span`
    margin-left: 10px;
    color: var(--Gray-7, #70716F);
    font-size: 16px;
    font-weight: 400;
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

    &:hover {
        background: #f6f6f4;
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
    cursor: pointer;
`;

export const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;

    @media (max-width: 480px) {
        width: 100%;
        height: 100%;
        display: ${({ $isOpen }) => $isOpen ? "flex" : "none"};
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
    border-radius: 100px;
    background: ${({ $isMine }) => $isMine ? "var(--Light-Green-4, #D3EB73)" : "var(--Gray-4, #E0E0E0)"};
    max-width: 600px;

    @media (max-width: 480px) {
      max-width: 75%;
      padding: 12px 18px;
    }
`;

const BubbleText = styled.span`
    color: var(--black-1, #000);
    font-size: 20px;
    font-weight: 400;
    white-space: pre-wrap;
    word-break: break-word;

    @media (max-width: 480px) {
      font-size: 14px;
    }
`;

const TimeText = styled.span`
    color: var(--Gray-7, #70716F);
    font-size: 10px;
`;

const UserMessageBox = styled.div`
    display: flex;
    height: 60px;
    padding: 13px 30px 13px 22px;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    border: 1px solid var(--Light-Green-2, #C0DA58);
    background: var(--white-1, #FFF);
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
    flex-shrink: 0;
    margin: 0 20px 20px;
    box-sizing: border-box;

    @media (max-width: 480px) {
      height: 48px;
      padding: 0 20px 0 16px;
      margin: 10px 12px 0;
    }
`;

const MessageIcon = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;

    @media (max-width: 480px) {
        width: 20px;
        height: 20px;
    }
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

const BackIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const BackButton = styled.button`
  display: none;

  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
  }
`;

const EmptyText = styled.p`
    padding: 16px 8px;
    color: #70716f;
    font-size: 14px;
`;

export const states = [
    { color: "3AB92C", label: "활동 중", value: "ONLINE" },
    { color: "F0CF19", label: "자리 비움", value: "IDLE" },
    { color: "F04419", label: "방해 금지", value: "DND" },
    { color: "B9B9B9", label: "오프라인", value: "OFFLINE" },
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
    const [openMenu, setOpenMenu] = useState(false);
    const [currentState, setCurrentState] = useState(states[0]);
    const menuRef = useRef();
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
    const [sendChat, setSendChat] = useState("");
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const chatBoxRef = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    useEffect(() => {
        const loadConversations = async () => {
            if (!getAuthToken()) {
                setError("로그인이 필요합니다.");
                return;
            }

            setLoading(true);
            try {
                const [profile, conversations] = await Promise.all([
                    apiRequest("/api/users/profile"),
                    apiRequest("/api/chats/conversations"),
                ]);
                const list = [
                    ...(conversations.conversations || []).map(mapDirectConversation),
                    ...(conversations.groups || []).map(mapGroupConversation),
                ];
                setProfileData(profile);
                setChatList(list);
                setSelectedChat((prev) => prev || list[0] || null);
                setError("");
            } catch (err) {
                setError(err.message || "채팅 목록을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadConversations();
    }, []);

    useEffect(() => {
        const loadMessages = async () => {
            if (!selectedChat || !profileData?.id) {
                setMessages([]);
                return;
            }

            try {
                const path = selectedChat.type === "group"
                    ? `/api/chats/groups/${selectedChat.targetId}/messages`
                    : `/api/chats/${selectedChat.targetId}`;
                const data = await apiRequest(path);
                setMessages((Array.isArray(data) ? data : []).map((item) => mapMessage(item, profileData.id)));
            } catch (err) {
                setError(err.message || "메시지를 불러오지 못했습니다.");
            }
        };

        loadMessages();
    }, [selectedChat, profileData?.id]);

    useEffect(() => {
        if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages, selectedChat]);

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

    const sendMessage = async () => {
        const message = sendChat.trim();
        if (!message || !selectedChat) return;

        setSendChat("");
        try {
            const data = selectedChat.type === "group"
                ? await apiRequest(`/api/chats/groups/${selectedChat.targetId}/messages`, {
                    method: "POST",
                    body: JSON.stringify({ message }),
                })
                : await apiRequest("/api/chats", {
                    method: "POST",
                    body: JSON.stringify({ receiverId: selectedChat.targetId, message }),
                });
            const created = data.chat || data;
            setMessages((prev) => [...prev, mapMessage(created, profileData.id)]);
            setChatList((prev) => prev.map((item) => item.id === selectedChat.id ? {
                ...item,
                lastMsg: message,
                time: formatTime(created.timestamp || new Date()),
            } : item));
        } catch (err) {
            alert(err.message || "메시지 전송에 실패했습니다.");
        }
    };

    return (
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu />
                <ContentBox>
                    <Layout>
                        <SideBox $isOpen={isMobileChatOpen}>
                            <SearchWapper>
                                <SearchBox type="search" aria-label="채팅 검색" />
                                <SearchIcon src={search} alt="" />
                            </SearchWapper>
                            <InfoWapper>
                                <UserIcon $size={126} src={user_icon} />
                                <NameWapper>
                                    <NameText>{profileData?.name || profileData?.userid || "사용자"}</NameText>
                                    <UserCharge>{profileData?.job || ""}</UserCharge>
                                </NameWapper>
                                <StateBox onClick={() => setOpenMenu((prev) => !prev)}>
                                    <StateDot $color={currentState.color} />
                                    <StateText>{currentState.label}</StateText>
                                    <DetailIcon src={detail_down_icon} />
                                </StateBox>
                            </InfoWapper>
                            {openMenu && (
                                <StateMenu ref={menuRef}>
                                    {states.filter((s) => s.value !== currentState.value).map((state, i, arr) => (
                                        <div key={state.value}>
                                            <StateWapper onClick={() => handleStateChange(state)} style={{ cursor: "pointer" }}>
                                                <StateDot $color={state.color} />
                                                <StateText>{state.label}</StateText>
                                            </StateWapper>
                                            {i < arr.length - 1 && <StateLine />}
                                        </div>
                                    ))}
                                </StateMenu>
                            )}
                            <HorizontalLine $length={100} />

                            <UserBox>
                                {loading && <EmptyText>채팅 목록을 불러오는 중입니다.</EmptyText>}
                                {error && <EmptyText>{error}</EmptyText>}
                                {!loading && !error && chatList.length === 0 && <EmptyText>대화가 없습니다.</EmptyText>}
                                {chatList.map((item) => (
                                    <ChatItem
                                        key={item.id}
                                        onClick={() => {
                                            setSelectedChat(item);
                                            setIsMobileChatOpen(true);
                                        }}
                                    >
                                        <ChatItemIconWrapper>
                                            <UserIcon $size={60} src={user_icon} />
                                        </ChatItemIconWrapper>
                                        <ChatItemInfo>
                                            <ChatItemTop>
                                                <StateDot $color={states.find((s) => s.value === item.state)?.color} />
                                                <ChatItemName>{item.name}</ChatItemName>
                                            </ChatItemTop>
                                            <ChatItemBottom>
                                                <ChatItemMsg>{item.lastMsg}{item.time ? ` · ${item.time}` : ""}</ChatItemMsg>
                                            </ChatItemBottom>
                                        </ChatItemInfo>
                                    </ChatItem>
                                ))}
                            </UserBox>
                        </SideBox>
                        <VerticalLine />
                        <RightBox $isOpen={isMobileChatOpen}>
                            <TopBox>
                                <BackButton onClick={() => setIsMobileChatOpen(false)}>
                                    <BackIcon src={back_icon} />
                                </BackButton>

                                <UserWapper>
                                    <UserIcon $size={60} src={user_icon} />
                                    <UserName>{selectedChat?.name || "채팅"}</UserName>
                                    <UserCharge>{selectedChat?.charge || ""}</UserCharge>
                                </UserWapper>
                                {selectedChat && <MenuIcon src={menu} onClick={() => navigate("/chatinfo", { state: { selectedChat, chatList } })} />}
                            </TopBox>
                            <HorizontalLine $length={100} />
                            <ChatBox ref={chatBoxRef}>
                                {!selectedChat && <EmptyText>대화를 선택해 주세요.</EmptyText>}
                                {selectedChat && messages.length === 0 && <EmptyText>아직 메시지가 없습니다.</EmptyText>}
                                {messages.map((msg) => (
                                    <MessageRow key={msg.id} $isMine={msg.isMine}>
                                        {!msg.isMine && <UserIcon $size={60} src={user_icon} />}
                                        {!msg.isMine && <BubbleBox $isMine={msg.isMine}><BubbleText>{msg.text}</BubbleText></BubbleBox>}
                                        {!msg.isMine && <TimeText>{msg.time}</TimeText>}

                                        {msg.isMine && <TimeText>{msg.time}</TimeText>}
                                        {msg.isMine && <BubbleBox $isMine={msg.isMine}><BubbleText>{msg.text}</BubbleText></BubbleBox>}
                                        {msg.isMine && <UserIcon $size={60} src={user_icon} />}
                                    </MessageRow>
                                ))}
                            </ChatBox>
                            <UserMessageBox>
                                <MessageInput
                                    type="text"
                                    value={sendChat}
                                    disabled={!selectedChat}
                                    onChange={(e) => setSendChat(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                                />
                                <MessageIcon src={message_icon} onClick={sendMessage} />
                            </UserMessageBox>
                        </RightBox>
                    </Layout>
                </ContentBox>
            </PageLayout>
        </>
    )
}
