import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import search from "../assets/search_icon.png";
import detail_down_icon from "../assets/state_down.svg";
import menu from "../assets/menu.svg";
import messageIcon from "../assets/message.svg";
import userIcon from "../assets/default_user_icon.svg";
import plusIcon from "../assets/plus_icon.svg";

import symbol from "../assets/symbol.svg";
import home from "../assets/home.svg";
import in_home from "../assets/in_home.svg";
import calendar from "../assets/calendar.svg";
import in_calendar from "../assets/in_calendar.svg";
import pen from "../assets/pen.svg";
import in_pen from "../assets/in_pen.svg";
import chat from "../assets/chat.svg";
import in_chat from "../assets/in_chat.svg";
import icon from "../assets/icon.svg";
import in_icon from "../assets/in_icon.svg";
import alarm from "../assets/alarm.svg";
import logo from "../assets/logo.svg";

import { GlobalStyle, Menu, Symbol, Logo, Item, Background, Icon, Text, Line } from "../pages/homePage";
import { PageLayout, ContentBox } from "./schedule_page";
import { apiRequest } from "../utils/api";

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
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  background: var(--white-1, #fff);
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const AddChatButton = styled.button`
  width: 52px;
  height: 52px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddChatIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const AddChatPanel = styled.div`
  position: absolute;
  top: 64px;
  right: 0;
  width: 260px;
  max-height: 320px;
  overflow-y: auto;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.12);
  z-index: 20;
`;

const AddChatTitle = styled.div`
  color: #333;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const AddChatEmpty = styled.div`
  color: #70716f;
  font-size: 13px;
  padding: 16px 4px;
  text-align: center;
`;

const GroupCreateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ececeb;
`;

const GroupNameInput = styled.input`
  height: 36px;
  border: 1px solid #e1e1e0;
  border-radius: 8px;
  padding: 0 10px;
  outline: none;
`;

const GroupMemberRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 13px;
`;

const GroupCreateButton = styled.button`
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: #c0da58;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

export const SearchBox = styled.input`
  width: 330px;
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
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 5px;
  background: #${({ $color }) => $color || "b9b9b9"};
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
  background: #c9c9c8;
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 100%;
  background: #c9c9c8;
`;

export const StateMenu = styled.div`
  display: flex;
  width: 150px;
  padding: 12px 13px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 310px;
  left: 17%;
  z-index: 10;
  border-radius: 12px;
  background: var(--white-1, #fff);
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
`;

export const StateLine = styled.div`
  width: 124px;
  height: 0.5px;
  background: #c9c9c8;
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
  font-weight: 600;
`;

export const UserCharge = styled.span`
  margin-left: 10px;
  color: var(--Gray-7, #70716f);
  font-size: 16px;
  font-weight: 400;
  align-self: flex-end;
`;

export const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  overflow-y: auto;
  max-height: calc(100vh - 360px);
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 8px;
  cursor: pointer;
  border-radius: 12px;
  background: ${({ $active }) => ($active ? "rgba(192, 218, 88, 0.16)" : "transparent")};
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

const UnreadBadge = styled.span`
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #f04419;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const ChatItemBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChatItemMsg = styled.span`
  color: var(--Gray-7, #70716f);
  font-size: 13px;
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
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  gap: 16px;
`;

const MessageRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  justify-content: ${({ $isMine }) => ($isMine ? "flex-end" : "flex-start")};
`;

const BubbleBox = styled.div`
  display: flex;
  padding: 14px 28px;
  border-radius: 100px;
  background: ${({ $isMine }) => ($isMine ? "var(--Light-Green-4, #d3eb73)" : "var(--Gray-4, #e0e0e0)")};
  max-width: 600px;
`;

const BubbleText = styled.span`
  color: var(--black-1, #000);
  font-size: 18px;
  font-weight: 400;
  white-space: pre-wrap;
  word-break: break-word;
`;

const TimeText = styled.span`
  color: var(--Gray-7, #70716f);
  font-size: 10px;
`;

const SenderName = styled.span`
  color: #70716f;
  font-size: 12px;
  margin: 0 0 4px 10px;
`;

const MessageStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isMine }) => ($isMine ? "flex-end" : "flex-start")};
`;

const DeleteMessageButton = styled.button`
  border: 0;
  background: transparent;
  color: #70716f;
  font-size: 11px;
  cursor: pointer;
`;

const UserMessageBox = styled.div`
  display: flex;
  height: 60px;
  padding: 13px 30px 13px 22px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  background: var(--white-1, #fff);
  box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  margin: 0 20px 20px;
`;

const MessageIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const MessageInput = styled.input`
  flex: 1;
  height: 50px;
  border: 0;
  outline: 0;
`;

const EmptyText = styled.div`
  color: #70716f;
  font-size: 16px;
  text-align: center;
  margin: auto;
`;

const EmptyFriendPanel = styled.div`
  width: min(520px, 100%);
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyFriendTitle = styled.div`
  color: #333;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

const EmptyFriendSub = styled.div`
  color: #70716f;
  font-size: 14px;
  text-align: center;
  margin-bottom: 8px;
`;

const EmptyFriendItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid #ececeb;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.05);
`;

export const NameWapper = styled.div`
  display: flex;
  height: 40px;
  margin-bottom: 5px;
`;

export const states = [
  { color: "3AB92C", label: "활동 중", value: "ONLINE" },
  { color: "F0CF19", label: "자리 비움", value: "IDLE" },
  { color: "F04419", label: "방해 금지", value: "DND" },
  { color: "B9B9B9", label: "오프라인", value: "OFFLINE" },
];

const menus = [
  { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
  { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
  { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
  { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
  { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" },
];

const formatTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

const formatRelative = (value) => {
  if (!value) return "대화 없음";
  const diff = Date.now() - new Date(value).getTime();
  if (Number.isNaN(diff)) return "";
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
};

const getProfileSrc = (profile) => profile || userIcon;

const hiddenChatStorageKey = (userId) => `hiddenChatIds:${userId || "guest"}`;
const selectedChatStorageKey = (userId) => `selectedChatId:${userId || "guest"}`;
const presenceStorageKey = (userId) => `presenceStatus:${userId || "guest"}`;

const getHiddenChatIds = (userId) => {
  try {
    return JSON.parse(localStorage.getItem(hiddenChatStorageKey(userId)) || "[]").map(Number);
  } catch {
    return [];
  }
};

const removeHiddenChatId = (userId, chatId) => {
  const hiddenIds = getHiddenChatIds(userId).filter((id) => id !== Number(chatId));
  localStorage.setItem(hiddenChatStorageKey(userId), JSON.stringify(hiddenIds));
};

const getSavedSelectedChatId = (userId) => {
  const value = localStorage.getItem(selectedChatStorageKey(userId));
  if (!value) return null;
  if (value.includes(":")) {
    const [type, id] = value.split(":");
    return { type, id: Number(id) };
  }
  return { type: "direct", id: Number(value) };
};

const saveSelectedChatId = (userId, chat) => {
  if (!chat?.id) return;
  localStorage.setItem(selectedChatStorageKey(userId), `${chat.type || "direct"}:${chat.id}`);
};

const getSavedPresenceState = (userId) => {
  const value = localStorage.getItem(presenceStorageKey(userId));
  return states.find((state) => state.value === value) || states[0];
};

const getSavedPresenceValue = (userId) => (
  localStorage.getItem(presenceStorageKey(userId)) ||
  localStorage.getItem(presenceStorageKey("guest"))
);

const savePresenceState = (userId, state) => {
  if (!state?.value) return;
  localStorage.setItem(presenceStorageKey(userId), state.value);
};

const syncPresenceState = (userId, state, serverValue) => {
  if (!userId || !state?.value) return;
  savePresenceState(userId, state);
  if (state.value !== serverValue) {
    apiRequest("/api/users/presence", {
      method: "PUT",
      body: JSON.stringify({ presenceStatus: state.value }),
    }).catch(() => {});
  }
};

const normalizeConversation = (item) => ({
  type: "direct",
  id: Number(item.userId || item.id),
  name: item.name || item.userid || item.email || "이름 없음",
  charge: item.email || "사용자",
  lastMsg: item.lastMessage || "아직 대화가 없습니다.",
  time: formatRelative(item.lastTimestamp),
  lastTimestamp: item.lastTimestamp || null,
  state: item.presenceStatus || "ONLINE",
  profile: item.profile,
  unreadCount: Number(item.unreadCount || 0),
});

const normalizeGroup = (item) => ({
  type: "group",
  id: Number(item.groupId || item.id),
  name: item.name || "그룹 채팅",
  charge: "그룹",
  lastMsg: item.lastMessage || "아직 대화가 없습니다.",
  time: formatRelative(item.lastTimestamp),
  lastTimestamp: item.lastTimestamp || null,
  state: "ONLINE",
  profile: null,
  unreadCount: Number(item.unreadCount || 0),
});

const normalizeFriend = (friend) => {
  const user = friend.user || friend;
  return {
    type: "direct",
    id: Number(user.id),
    name: user.name || user.userid || user.email || "이름 없음",
    charge: user.email || "사용자",
    lastMsg: "아직 대화가 없습니다.",
    time: "대화 없음",
    lastTimestamp: null,
    state: user.presenceStatus || "ONLINE",
    profile: user.profile,
    unreadCount: 0,
  };
};

export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();
  const chatBoxRef = useRef();

  const [openMenu, setOpenMenu] = useState(false);
  const [currentState, setCurrentState] = useState(states[0]);
  const [profile, setProfile] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [selectedChat, setSelectedChat] = useState(location.state?.selectedChat || null);
  const [messages, setMessages] = useState([]);
  const [sendChat, setSendChat] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [hiddenVersion, setHiddenVersion] = useState(0);
  const [hiddenChatIds, setHiddenChatIds] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupMemberIds, setGroupMemberIds] = useState([]);

  const isAlarmActive = location.pathname === "/notification";

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const loadChatList = async () => {
    const [profileData, friendsData, conversationsData] = await Promise.all([
      apiRequest("/api/users/profile"),
      apiRequest("/api/users/friends"),
      apiRequest("/api/chats/conversations"),
    ]);

    setProfile(profileData);
    const savedPresenceValue = getSavedPresenceValue(profileData?.id);
    const initialPresenceState =
      states.find((state) => state.value === savedPresenceValue) ||
      states.find((state) => state.value === profileData?.presenceStatus) ||
      states[0];
    setCurrentState(initialPresenceState);
    syncPresenceState(profileData?.id, initialPresenceState, profileData?.presenceStatus);

    const hiddenIdList = getHiddenChatIds(profileData?.id);
    const hiddenIds = new Set(hiddenIdList);
    setHiddenChatIds(hiddenIdList);
    const conversations = (conversationsData.conversations || []).map(normalizeConversation);
    const groups = (conversationsData.groups || []).map(normalizeGroup);
    const conversationById = new Map(conversations.map((item) => [item.id, item]));
    const visibleConversations = conversations.filter((item) => item.id && !hiddenIds.has(item.id));
    const visibleConversationIds = new Set(visibleConversations.map((item) => item.id));
    const normalizedFriends = (friendsData.friends || [])
      .map(normalizeFriend)
      .filter((item) => item.id)
      .map((item) => ({
        ...item,
        ...(conversationById.get(item.id) || {}),
      }));
    setAllFriends(normalizedFriends);
    const friends = normalizedFriends
      .filter((item) => !hiddenIds.has(item.id) && !visibleConversationIds.has(item.id));

    const nextList = [...groups, ...visibleConversations, ...friends];
    setChatList(nextList);
    setSelectedChat((current) => {
      if (current && nextList.some((item) => item.id === current.id && item.type === current.type)) return current;
      const saved = getSavedSelectedChatId(profileData?.id);
      const savedChat = nextList.find((item) => item.id === saved?.id && item.type === saved?.type);
      if (savedChat) return savedChat;
      if (current) return current;
      return null;
    });
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadChatList()
      .catch((err) => {
        if (mounted) setError(err.message || "채팅 정보를 불러오지 못했습니다.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedChat?.id) {
      setMessages([]);
      return undefined;
    }

    let mounted = true;
    const loadMessages = async () => {
      const data = selectedChat.type === "group"
        ? await apiRequest(`/api/chats/groups/${selectedChat.id}/messages`)
        : await apiRequest(`/api/chats/${selectedChat.id}`);
      if (mounted) setMessages(data || []);
    };

    loadMessages().catch((err) => setError(err.message || "메시지를 불러오지 못했습니다."));
    const timer = window.setInterval(() => {
      loadMessages().catch(() => {});
      loadChatList().catch(() => {});
    }, 5000);

    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [selectedChat?.id]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, selectedChat]);

  useEffect(() => {
    if (profile?.id && selectedChat?.id) {
      saveSelectedChatId(profile.id, selectedChat);
    }
  }, [profile?.id, selectedChat?.id]);

  const filteredChatList = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return chatList;
    return chatList.filter((item) => `${item.name} ${item.charge} ${item.lastMsg}`.toLowerCase().includes(keyword));
  }, [chatList, query]);

  const addableFriends = useMemo(() => {
    const visibleIds = new Set(chatList.map((item) => item.id));
    return allFriends.filter((item) => !visibleIds.has(item.id));
  }, [allFriends, chatList, hiddenVersion]);

  const inlineAddableFriends = useMemo(() => {
    const hiddenIds = new Set(hiddenChatIds);
    return addableFriends.filter((item) => !hiddenIds.has(item.id));
  }, [addableFriends, hiddenChatIds]);

  const handleStateChange = (state) => {
    setCurrentState(state);
    savePresenceState(profile?.id, state);
    apiRequest("/api/users/presence", {
      method: "PUT",
      body: JSON.stringify({ presenceStatus: state.value }),
    }).catch(() => {});
    setOpenMenu(false);
  };

  const handleSelectChat = (item) => {
    setSelectedChat(item);
    saveSelectedChatId(profile?.id, item);
  };

  const handleSendChat = async () => {
    const message = sendChat.trim();
    if (!message || !selectedChat?.id) return;

    setSendChat("");
    try {
      if (selectedChat.type !== "group") removeHiddenChatId(profile?.id, selectedChat.id);
      const data = selectedChat.type === "group"
        ? await apiRequest(`/api/chats/groups/${selectedChat.id}/messages`, {
            method: "POST",
            body: JSON.stringify({ message }),
          })
        : await apiRequest("/api/chats", {
            method: "POST",
            body: JSON.stringify({ receiverId: selectedChat.id, message }),
          });
      setMessages((prev) => [...prev, data.chat]);
      await loadChatList();
    } catch (err) {
      setError(err.message || "메시지를 보내지 못했습니다.");
      setSendChat(message);
    }
  };

  const handleAddChat = async (item) => {
    removeHiddenChatId(profile?.id, item.id);
    setHiddenVersion((version) => version + 1);
    setShowAddPanel(false);
    handleSelectChat(item);
    await loadChatList();
  };

  const handleToggleGroupMember = (id) => {
    setGroupMemberIds((prev) => (
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    ));
  };

  const handleCreateGroup = async () => {
    const name = groupName.trim();
    if (!name || groupMemberIds.length === 0) return;
    const data = await apiRequest("/api/chats/groups", {
      method: "POST",
      body: JSON.stringify({ name, memberIds: groupMemberIds }),
    });
    const group = normalizeGroup(data.group);
    setGroupName("");
    setGroupMemberIds([]);
    setShowAddPanel(false);
    setSelectedChat(group);
    await loadChatList();
  };

  const handleDeleteMessage = async (msg) => {
    if (!msg?.id || Number(msg.senderId) !== currentUserId) return;
    const deletedMessage = { ...msg, message: "삭제된 메시지입니다.", deletedAt: new Date().toISOString() };
    if (selectedChat.type === "group") {
      await apiRequest(`/api/chats/groups/messages/${msg.id}`, { method: "DELETE" });
    } else {
      await apiRequest(`/api/chats/messages/${msg.id}`, { method: "DELETE" });
    }
    setMessages((prev) => prev.map((item) => (item.id === msg.id ? deletedMessage : item)));
    await loadChatList();
  };

  const showInlineAddFriends = !query.trim() && filteredChatList.length === 0 && inlineAddableFriends.length > 0;
  const visibleLeftItems = showInlineAddFriends ? inlineAddableFriends : filteredChatList;
  const showEmptyFriendPanel = !loading && !error && !selectedChat && chatList.length === 0 && addableFriends.length > 0;

  const currentUserId = Number(profile?.id);
  const myName = profile?.name || profile?.userid || "내 프로필";
  const myCharge = profile?.email || "디자이너";

  return (
    <>
      <GlobalStyle />
      <PageLayout>
        <Menu>
          <Symbol className="symbol" src={symbol} />
          <Logo className="logo" src={logo} />

          {menus.map((menuItem) => {
            const isActive = location.pathname.toLowerCase() === menuItem.path.toLowerCase();
            return (
              <Item key={menuItem.path} onClick={() => navigate(menuItem.path)}>
                <Background $active={isActive} />
                <Icon src={isActive ? menuItem.activeIcon : menuItem.icon} />
                <Text className="text">{menuItem.label}</Text>
              </Item>
            );
          })}

          <Line />
          <Item onClick={() => navigate("/notification")}>
            <Background $active={isAlarmActive} />
            <Icon src={alarm} />
            <Text className="text">NOTIFICATIONS</Text>
          </Item>
        </Menu>

        <ContentBox>
          <Layout>
            <SideBox>
              <SearchArea>
                <SearchWapper>
                  <SearchBox type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
                  <SearchIcon src={search} />
                </SearchWapper>
                <AddChatButton type="button" onClick={() => setShowAddPanel((open) => !open)} aria-label="채팅 추가">
                  <AddChatIcon src={plusIcon} />
                </AddChatButton>
                {showAddPanel && (
                  <AddChatPanel>
                    <AddChatTitle>채팅 추가</AddChatTitle>
                    <GroupCreateBox>
                      <GroupNameInput
                        value={groupName}
                        onChange={(event) => setGroupName(event.target.value)}
                        placeholder="그룹 이름"
                      />
                      {allFriends.map((item) => (
                        <GroupMemberRow key={item.id}>
                          <input
                            type="checkbox"
                            checked={groupMemberIds.includes(item.id)}
                            onChange={() => handleToggleGroupMember(item.id)}
                          />
                          {item.name}
                        </GroupMemberRow>
                      ))}
                      <GroupCreateButton type="button" onClick={handleCreateGroup}>그룹 만들기</GroupCreateButton>
                    </GroupCreateBox>
                    {addableFriends.length ? (
                      addableFriends.map((item) => (
                        <ChatItem key={item.id} onClick={() => handleAddChat(item)}>
                          <ChatItemIconWrapper>
                            <UserIcon $size={44} src={getProfileSrc(item.profile)} />
                          </ChatItemIconWrapper>
                          <ChatItemInfo>
                            <ChatItemTop>
                              <ChatItemName>{item.name}</ChatItemName>
                            </ChatItemTop>
                            <ChatItemBottom>
                              <ChatItemMsg>{item.lastMsg} · {item.time}</ChatItemMsg>
                            </ChatItemBottom>
                          </ChatItemInfo>
                        </ChatItem>
                      ))
                    ) : (
                      <AddChatEmpty>추가할 친구가 없습니다.</AddChatEmpty>
                    )}
                  </AddChatPanel>
                )}
              </SearchArea>

              <InfoWapper>
                <UserIcon $size={126} src={getProfileSrc(profile?.profile)} />
                <NameWapper>
                  <NameText>{myName}</NameText>
                  <UserCharge>{myCharge}</UserCharge>
                </NameWapper>
                <StateBox onClick={() => setOpenMenu((prev) => !prev)}>
                  <StateDot $color={currentState.color} />
                  <StateText>{currentState.label}</StateText>
                  <DetailIcon src={detail_down_icon} />
                </StateBox>
              </InfoWapper>

              {openMenu && (
                <StateMenu ref={menuRef}>
                  {states
                    .filter((state) => state.value !== currentState.value)
                    .map((state, index, array) => (
                      <div key={state.value}>
                        <StateWapper onClick={() => handleStateChange(state)} style={{ cursor: "pointer" }}>
                          <StateDot $color={state.color} />
                          <StateText>{state.label}</StateText>
                        </StateWapper>
                        {index < array.length - 1 && <StateLine />}
                      </div>
                    ))}
                </StateMenu>
              )}

              <HorizontalLine $length={100} />

              <UserBox>
                {visibleLeftItems.map((item) => (
                  <ChatItem key={`${item.type}-${item.id}`} $active={selectedChat?.id === item.id && selectedChat?.type === item.type} onClick={() => showInlineAddFriends ? handleAddChat(item) : handleSelectChat(item)}>
                    <ChatItemIconWrapper>
                      <UserIcon $size={60} src={getProfileSrc(item.profile)} />
                    </ChatItemIconWrapper>
                    <ChatItemInfo>
                      <ChatItemTop>
                        {item.type === "group" ? <StateDot $color="C0DA58" /> : <StateDot $color={states.find((state) => state.value === item.state)?.color} />}
                        <ChatItemName>{item.name}</ChatItemName>
                        {item.unreadCount > 0 && <UnreadBadge>{item.unreadCount}</UnreadBadge>}
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
              <TopBox>
                {selectedChat ? (
                  <UserWapper>
                    <UserIcon $size={60} src={getProfileSrc(selectedChat.profile)} />
                    <UserName>{selectedChat.name}</UserName>
                    <UserCharge>{selectedChat.charge}</UserCharge>
                  </UserWapper>
                ) : (
                  <UserName>채팅</UserName>
                )}
                {selectedChat && (
                  <MenuIcon src={menu} onClick={() => navigate("/chatinfo", { state: { selectedChat, chatList, currentUserId: profile?.id } })} />
                )}
              </TopBox>
              <HorizontalLine $length={100} />

              <ChatBox ref={chatBoxRef}>
                {loading && <EmptyText>채팅을 불러오는 중입니다.</EmptyText>}
                {!loading && error && <EmptyText>{error}</EmptyText>}
                {showEmptyFriendPanel && (
                  <EmptyFriendPanel>
                    <EmptyFriendTitle>친구를 선택해 채팅을 시작하세요</EmptyFriendTitle>
                    <EmptyFriendSub>친구를 누르면 왼쪽 대화 목록에 추가됩니다.</EmptyFriendSub>
                    {addableFriends.map((item) => (
                      <EmptyFriendItem key={item.id} type="button" onClick={() => handleAddChat(item)}>
                        <UserIcon $size={52} src={getProfileSrc(item.profile)} />
                        <ChatItemInfo>
                          <ChatItemTop>
                            <StateDot $color={states.find((state) => state.value === item.state)?.color} />
                            <ChatItemName>{item.name}</ChatItemName>
                          </ChatItemTop>
                          <ChatItemBottom>
                            <ChatItemMsg>{item.lastMsg} · {item.time}</ChatItemMsg>
                          </ChatItemBottom>
                        </ChatItemInfo>
                      </EmptyFriendItem>
                    ))}
                  </EmptyFriendPanel>
                )}
                {!loading && !error && !selectedChat && !showEmptyFriendPanel && <EmptyText>왼쪽에서 대화 상대를 선택하세요.</EmptyText>}
                {!loading && selectedChat && messages.length === 0 && <EmptyText>아직 메시지가 없습니다.</EmptyText>}
                {selectedChat && messages.map((msg) => {
                  const isMine = Number(msg.senderId) === currentUserId;
                  const isDeleted = Boolean(msg.deletedAt);
                  return (
                    <MessageRow key={msg.id || `${msg.senderId}-${msg.timestamp}-${msg.message}`} $isMine={isMine}>
                      {!isMine && <UserIcon $size={60} src={getProfileSrc(selectedChat.profile)} />}
                      {isMine && <TimeText>{formatTime(msg.timestamp)}</TimeText>}
                      <MessageStack $isMine={isMine}>
                        {!isMine && selectedChat.type === "group" && <SenderName>{msg.senderName}</SenderName>}
                        <BubbleBox $isMine={isMine}>
                          <BubbleText>{msg.message}</BubbleText>
                        </BubbleBox>
                        {isMine && !isDeleted && <DeleteMessageButton type="button" onClick={() => handleDeleteMessage(msg)}>삭제</DeleteMessageButton>}
                      </MessageStack>
                      {!isMine && <TimeText>{formatTime(msg.timestamp)}</TimeText>}
                      {isMine && <UserIcon $size={60} src={getProfileSrc(profile?.profile)} />}
                    </MessageRow>
                  );
                })}
              </ChatBox>

              <UserMessageBox>
                <MessageInput
                  type="text"
                  value={sendChat}
                  disabled={!selectedChat}
                  placeholder={selectedChat ? "메시지를 입력하세요" : "대화 상대를 선택하세요"}
                  onChange={(event) => setSendChat(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSendChat();
                  }}
                />
                <MessageIcon src={messageIcon} onClick={handleSendChat} />
              </UserMessageBox>
            </RightBox>
          </Layout>
        </ContentBox>
      </PageLayout>
    </>
  );
}
