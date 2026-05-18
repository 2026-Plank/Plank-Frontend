import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import menu from "../assets/menu.svg";
import search from "../assets/search_icon.png";
import user_icon from "../assets/default_user_icon.svg";
import detail_down_icon from "../assets/down_icon.svg";
import back_icon from "../assets/back_icon.svg";
import alarm_off_icon from "../assets/alarm_off.svg";

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
import {
  Layout,
  SideBox,
  RightBox,
  TopBox,
  SearchWapper,
  SearchBox,
  SearchIcon,
  InfoWapper,
  NameWapper,
  NameText,
  UserCharge,
  StateBox,
  StateDot,
  StateText,
  DetailIcon,
  StateMenu,
  StateLine,
  StateWapper,
  MenuIcon,
  HorizontalLine,
  VerticalLine,
  UserBox,
  ChatItem,
  ChatItemIconWrapper,
  UserIcon,
  ChatItemInfo,
  ChatItemTop,
  ChatItemName,
  ChatItemBottom,
  ChatItemMsg,
  UserName,
  states,
} from "./chat_page";
import { apiRequest } from "../utils/api";

const UserWapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackIcon = styled.img`
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const AlarmWapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AlarmIcon = styled.img`
  width: 42px;
  height: 42px;
`;

const AlarmText = styled.span`
  margin-top: 18px;
  color: var(--Gray-7, #70716f);
  text-align: center;
  font-size: 18px;
`;

const OutButton = styled.button`
  margin-top: 20%;
  display: flex;
  width: 80%;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  background: var(--white-1, #fff);
  box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.2);
  cursor: pointer;
`;

const menus = [
  { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
  { path: "/schedule", icon: calendar, activeIcon: in_calendar, label: "SCHEDULE" },
  { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
  { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
  { path: "/mypage", icon, activeIcon: in_icon, label: "MY PAGE" },
];

const getProfileSrc = (profile) => profile || user_icon;

const hiddenChatStorageKey = (userId) => `hiddenChatIds:${userId || "guest"}`;
const selectedChatStorageKey = (userId) => `selectedChatId:${userId || "guest"}`;
const presenceStorageKey = (userId) => `presenceStatus:${userId || "guest"}`;

const addHiddenChatId = (userId, chatId) => {
  if (!chatId) return;
  try {
    const current = JSON.parse(localStorage.getItem(hiddenChatStorageKey(userId)) || "[]").map(Number);
    const next = [...new Set([...current, Number(chatId)])];
    localStorage.setItem(hiddenChatStorageKey(userId), JSON.stringify(next));
  } catch {
    localStorage.setItem(hiddenChatStorageKey(userId), JSON.stringify([Number(chatId)]));
  }
};

const clearSelectedChatId = (userId) => {
  localStorage.removeItem(selectedChatStorageKey(userId));
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

export default function ChatInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedChat = location.state?.selectedChat || null;
  const chatList = location.state?.chatList || [];
  const currentUserId = location.state?.currentUserId || null;

  const [profile, setProfile] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [currentState, setCurrentState] = useState(states[0]);
  const [query, setQuery] = useState("");
  const menuRef = useRef();

  useEffect(() => {
    apiRequest("/api/users/profile")
      .then((data) => {
        setProfile(data);
        const savedPresenceValue = getSavedPresenceValue(data?.id);
        const initialPresenceState =
          states.find((state) => state.value === savedPresenceValue) ||
          states.find((state) => state.value === data?.presenceStatus) ||
          states[0];
        setCurrentState(initialPresenceState);
        syncPresenceState(data?.id, initialPresenceState, data?.presenceStatus);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredChatList = chatList.filter((item) =>
    `${item.name} ${item.charge} ${item.lastMsg}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleStateChange = (state) => {
    setCurrentState(state);
    savePresenceState(profile?.id || currentUserId, state);
    apiRequest("/api/users/presence", {
      method: "PUT",
      body: JSON.stringify({ presenceStatus: state.value }),
    }).catch(() => {});
    setOpenMenu(false);
  };

  const handleOut = () => {
    const userId = profile?.id || currentUserId;
    addHiddenChatId(userId, selectedChat?.id);
    clearSelectedChatId(userId);
    navigate("/chat", { state: { selectedChat: null } });
  };

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
            <Background $active={location.pathname === "/notification"} />
            <Icon src={alarm} />
            <Text className="text">NOTIFICATIONS</Text>
          </Item>
        </Menu>

        <ContentBox>
          <Layout>
            <SideBox>
              <SearchWapper>
                <SearchBox type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
                <SearchIcon src={search} />
              </SearchWapper>

              <InfoWapper>
                <UserIcon $size={126} src={getProfileSrc(profile?.profile)} />
                <NameWapper>
                  <NameText>{profile?.name || profile?.userid || "내 프로필"}</NameText>
                  <UserCharge>{profile?.email || "디자이너"}</UserCharge>
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
                {filteredChatList.map((item) => (
                  <ChatItem key={item.id} $active={selectedChat?.id === item.id} onClick={() => navigate("/chat", { state: { selectedChat: item } })}>
                    <ChatItemIconWrapper>
                      <UserIcon $size={60} src={getProfileSrc(item.profile)} />
                    </ChatItemIconWrapper>
                    <ChatItemInfo>
                      <ChatItemTop>
                        <StateDot $color={states.find((state) => state.value === item.state)?.color} />
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
              <TopBox>
                <BackIcon src={back_icon} onClick={() => navigate("/chat", { state: { selectedChat } })} />
                <MenuIcon src={menu} />
              </TopBox>
              <HorizontalLine $length={100} />

              <MainBox>
                {selectedChat ? (
                  <>
                    <UserIcon $size={200} src={getProfileSrc(selectedChat.profile)} />
                    <UserWapper>
                      <UserName>{selectedChat.name}</UserName>
                      <UserCharge>{selectedChat.charge}</UserCharge>
                    </UserWapper>
                    <StateWapper>
                      <StateDot $color={states.find((state) => state.value === selectedChat.state)?.color} />
                      <StateText>{states.find((state) => state.value === selectedChat.state)?.label}</StateText>
                    </StateWapper>
                    <AlarmWapper>
                      <AlarmIcon src={alarm_off_icon} />
                      <AlarmText>알림 해제</AlarmText>
                    </AlarmWapper>
                    <OutButton onClick={handleOut}>채팅방에서 나가기</OutButton>
                  </>
                ) : (
                  <UserName>선택된 채팅방이 없습니다.</UserName>
                )}
              </MainBox>
            </RightBox>
          </Layout>
        </ContentBox>
      </PageLayout>
    </>
  );
}
