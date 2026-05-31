//packages
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
//assets
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
import setting from "../assets/setting.svg";
import logo from "../assets/logo.svg";
//components
import { Menu } from "../pages/homePage";
import { Symbol } from "../pages/homePage";
import { Logo } from "../pages/homePage";
import { Item } from "../pages/homePage";
import { Background } from "../pages/homePage";
import { Icon } from "../pages/homePage";
import { Text } from "../pages/homePage";
import { Line } from "../pages/homePage";

import { GlobalStyle } from "../pages/homePage";
import { PageLayout } from "./schedule_page";
import { ContentBox } from "./schedule_page";
import { Layout } from "./chat_page";
import { SideBox } from "./chat_page";
import { RightBox } from "./chat_page";
import { TopBox } from "./chat_page";
import { SearchWapper } from "./chat_page";
import { SearchBox } from "./chat_page";
import { SearchIcon } from "./chat_page";
import { InfoWapper } from "./chat_page";
import { NameWapper } from "./chat_page";
import { NameText } from "./chat_page";
import { UserCharge } from "./chat_page";
import { StateBox } from "./chat_page";
import { StateDot } from "./chat_page";
import { StateText } from "./chat_page";
import { DetailIcon } from "./chat_page";
import { StateMenu } from "./chat_page";
import { StateLine } from "./chat_page";
import { StateWapper } from "./chat_page";
import { MenuIcon } from "./chat_page";
import { HorizontalLine } from "./chat_page";
import { VerticalLine } from "./chat_page";
import { UserBox } from "./chat_page";
import { ChatItem } from "./chat_page";
import { ChatItemIconWrapper } from "./chat_page";
import { UserIcon } from "./chat_page";
import { ChatItemInfo } from "./chat_page";
import { ChatItemTop } from "./chat_page";
import { ChatItemName } from "./chat_page";
import { ChatItemBottom } from "./chat_page";
import { ChatItemMsg } from "./chat_page";
import { UserName } from "./chat_page";
import { states } from "./chat_page";
import { apiRequest } from "../utils/api";
//css
const UserWapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;
`;
const DetailUserCharge = styled(UserCharge)`
  margin-left: 0;
`;
const BackIcon = styled.img`
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  stroke-width: 2px;
  stroke: var(--Gray-8, #575856);
  cursor: pointer;
`;
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
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
  aspect-ratio: 1/1;
`;
const AlarmText = styled.span`
  margin-top: 18px;
  align-self: stretch;
  color: var(--Gray-7, #70716f);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const OutButton = styled.button`
  margin-top: 20%;
  display: flex;
  width: 80%;
  height: 80px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  background: var(--white-1, #fff);
  box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.2);
  cursor: pointer;
`;


const getProfileSrc = (profile) => profile || user_icon;

const formatRelative = (value) => {
  if (!value) return "\uB300\uD654 \uC5C6\uC74C";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "\uBC29\uAE08 \uC804";
  if (minutes < 60) return minutes + "\uBD84 \uC804";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "\uC2DC\uAC04 \uC804";
  return Math.floor(hours / 24) + "\uC77C \uC804";
};

const normalizeGroup = (item) => ({
  type: "group",
  id: Number(item.groupId || item.id),
  name: item.name || "\uADF8\uB8F9 \uCC44\uD305",
  charge: "\uADF8\uB8F9",
  lastMsg: item.lastMessage || "\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
  time: formatRelative(item.lastTimestamp),
  lastTimestamp: item.lastTimestamp || null,
  state: "ONLINE",
  profile: item.profile || null,
  unreadCount: Number(item.unreadCount || 0),
});

const normalizeDirect = (item) => ({
  type: "direct",
  id: Number(item.userId || item.id),
  name: item.name || item.userid || item.email || "\uC774\uB984 \uC5C6\uC74C",
  charge: item.job || "\uC9C1\uBB34 \uBBF8\uC785\uB825",
  lastMsg: item.lastMessage || "\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
  time: formatRelative(item.lastTimestamp),
  lastTimestamp: item.lastTimestamp || null,
  state: item.presenceStatus || "ONLINE",
  profile: item.profile,
  unreadCount: Number(item.unreadCount || 0),
});

const normalizeFriend = (friend) => {
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

const getDisplayTime = (item) => {
  if (item?.lastTimestamp) return formatRelative(item.lastTimestamp);
  const time = String(item?.time || "");
  if (!time || time.includes("?") || time.includes("�")) return "\uB300\uD654 \uC5C6\uC74C";
  return time;
};

export default function ChatInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { path: "/homePage", icon: home, activeIcon: in_home, label: "HOME" },
    {
      path: "/schedule",
      icon: calendar,
      activeIcon: in_calendar,
      label: "SCHEDULE",
    },
    { path: "/project", icon: pen, activeIcon: in_pen, label: "PROJECT" },
    { path: "/chat", icon: chat, activeIcon: in_chat, label: "CHATTING" },
    { path: "/mypage", icon: icon, activeIcon: in_icon, label: "MY PAGE" },
  ];

  const isAlarmActive = location.pathname === "/notification";
  const [openMenu, setOpenMenu] = useState(false);
  const [currentState, setCurrentState] = useState(states[0]);
  const [profile, setProfile] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(location.state?.selectedChat || null);
  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const loadData = async () => {
    const [profileData, friendsData, conversationData] = await Promise.all([
      apiRequest("/api/users/profile"),
      apiRequest("/api/users/friends"),
      apiRequest("/api/chats/conversations"),
    ]);
    const groups = (conversationData.groups || []).map(normalizeGroup);
    const conversations = (conversationData.conversations || []).map(normalizeDirect);
    const conversationById = new Map(conversations.map((item) => [item.id, item]));
    const friends = (friendsData.friends || [])
      .map(normalizeFriend)
      .filter((item) => item.id)
      .map((item) => ({
        ...item,
        ...(conversationById.get(item.id) || {}),
      }));
    const friendIds = new Set(friends.map((item) => item.id));
    const extraConversations = conversations.filter((item) => !friendIds.has(item.id));
    const nextList = location.state?.chatList?.length
      ? location.state.chatList
      : [...groups, ...friends, ...extraConversations];

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
    loadData().catch(() => {
      setProfile(null);
      setChatList([]);
      setSelectedChat(null);
    });
  }, []);

  const handleStateChange = (state) => {
    setCurrentState(state);
    apiRequest("/api/users/presence", {
      method: "PUT",
      body: JSON.stringify({ presenceStatus: state.value }),
    }).catch(() => {});
    setOpenMenu(false);
  };

  const handleOut = () => {
    navigate("/chat", { state: { selectedChat: null } });
  };

  const myName = profile?.name || profile?.userid || "\uB0B4 \uD504\uB85C\uD544";
  const myCharge = profile?.job || "\uC9C1\uBB34 \uBBF8\uC785\uB825";

  return (
    <>
        <GlobalStyle />
        <PageLayout>
            <Menu>
            <Symbol className="symbol" src={symbol} />
            <Logo className="logo" src={logo} />

            {menus.map((menu) => {
                const isActive = location.pathname === menu.path;

                return (
                <Item key={menu.path} onClick={() => navigate(menu.path)}>
                    <Background $active={isActive} />

                    <Icon src={isActive ? menu.activeIcon : menu.icon} />

                    <Text className="text">{menu.label}</Text>
                </Item>
                );
            })}

            <Line />

            {/* ?뵒 ?뚮┝ */}
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
                        <StateBox onClick={() => setOpenMenu((prev) => !prev)}>
                        <StateDot $color={currentState.color} />
                        <StateText style={{ cursor: "pointer" }}>
                            {currentState.label}
                        </StateText>
                        <DetailIcon src={detail_down_icon} />
                        </StateBox>
                    </InfoWapper>
                    {openMenu && (
                        <StateMenu ref={menuRef}>
                        {states
                            .filter((s) => s.label !== currentState.label)
                            .map((state, i, arr) => (
                            <>
                                <StateWapper
                                key={state.label}
                                onClick={() => handleStateChange(state)}
                                style={{ cursor: "pointer" }}
                                >
                                <StateDot $color={state.color} />
                                <StateText>{state.label}</StateText>
                                </StateWapper>
                                {i < arr.length - 1 && <StateLine />}
                            </>
                            ))}
                        </StateMenu>
                    )}
                    <HorizontalLine $length={100} />

                    {/* ?닿쾶 chatlist 蹂寃쎌떆 諛붾뚮뒗 ?댁슜 */}
                    <UserBox>
                        {chatList.map((item) => (
                        <ChatItem key={item.type + "-" + item.id} onClick={() => setSelectedChat(item)}>
                            <ChatItemIconWrapper>
                            <UserIcon $size={60} src={getProfileSrc(item.profile)} />
                            </ChatItemIconWrapper>
                            <ChatItemInfo>
                            <ChatItemTop>
                                <StateDot
                                $color={
                                    states.find((s) => s.value === item.state)?.color
                                }
                                />
                                <ChatItemName>{item.name}</ChatItemName>
                            </ChatItemTop>
                            <ChatItemBottom>
                                <ChatItemMsg>
                                {item.lastMsg}{" \u00B7 "}{getDisplayTime(item)}
                                </ChatItemMsg>
                            </ChatItemBottom>
                            </ChatItemInfo>
                        </ChatItem>
                        ))}
                    </UserBox>
                    </SideBox>
                    <VerticalLine />
                    <RightBox>
                    {/* ?ш린媛 梨꾪똿 ?ъ슜?먯쓽 ?뺣낫媛 ?ㅼ뼱媛?쇰맖. */}
                    <TopBox>
                        <BackIcon src={back_icon} onClick={() => navigate("/chat", { state: { selectedChat } })} />
                        <MenuIcon src={menu} />
                    </TopBox>
                    <HorizontalLine $length={100} />
                    <MainBox>
                        <UserIcon $size={200} src={getProfileSrc(selectedChat?.profile)} />
                        <UserWapper>
                        <UserName>{selectedChat?.name || "\uCC44\uD305"}</UserName>
                        <DetailUserCharge>{selectedChat?.charge || ""}</DetailUserCharge>
                        </UserWapper>
                        <StateWapper>
                        <StateDot
                            $color={
                            states.find((s) => s.value === selectedChat?.state)?.color
                            }
                        />
                        <StateText>
                            {states.find((s) => s.value === selectedChat?.state)?.label}
                        </StateText>
                        </StateWapper>
                        <AlarmWapper>
                        <AlarmIcon src={alarm_off_icon} />
                        <AlarmText>{"\uC54C\uB9BC \uD574\uC81C"}</AlarmText>
                        </AlarmWapper>
                        <OutButton onClick={handleOut}>{"\uCC44\uD305\uBC29\uC5D0\uC11C \uB098\uAC00\uAE30"}</OutButton>
                    </MainBox>
                    </RightBox>
                </Layout>
            </ContentBox>
        </PageLayout>
    </>
  );
}

