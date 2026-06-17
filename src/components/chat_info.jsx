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
//components
import Menu from "./menu_layout";

import { GlobalStyle } from "../pages/homePage";
import { PageLayout, ContentBox } from "./schedule_page";

// chat_page에서 기존 컴포넌트들 임포트
import { 
  Layout as BaseLayout, 
  SideBox as BaseSideBox, 
  RightBox as BaseRightBox, 
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
  VerticalLine as BaseVerticalLine, 
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
  states 
} from "./chat_page";

//css
const UserWapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 0;
`;
const BackIcon = styled.img`
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  stroke-width: 2px;
  stroke: var(--Gray-8, #575856);
  cursor: pointer;
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;
const AlarmWapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 480px) {
    margin-top: 30px;
  }
`;
const AlarmIcon = styled.img`
  width: 42px;
  height: 42px;
  aspect-ratio: 1/1;
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
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

  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: 10px;
  }
`;
const OutButton = styled.button`
  margin-top: 20%;
  display: flex;
  width: 80%;
  max-width: 400px; /* 무한정 늘어나지 않게 맥스치 차단 */
  height: 80px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid var(--Light-Green-2, #c0da58);
  background: var(--white-1, #fff);
  box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.2);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 480px) {
    margin-top: 40px; /* 모바일에서 퍼센트 마진 대신 픽셀로 고정 */
    height: 56px;
    border-radius: 12px;
    font-size: 15px;
    width: 90%;
  }
`;

// ★ 모바일 반응형 대응을 위한 스타일 오버라이딩 상속
const Layout = styled(BaseLayout)`
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 64px); /* 모바일 하단 탭바 제외 높이 전체 채움 */
    margin: 0;
    padding: 0;
  }
`;

const SideBox = styled(BaseSideBox)`
  @media (max-width: 480px) {
    display: none; /* ★ 모바일일 때 좌측 사이드바 미표시 */
  }
`;

const VerticalLine = styled(BaseVerticalLine)`
  @media (max-width: 480px) {
    display: none; /* ★ 모바일일 때 중간 분할선 미표시 */
  }
`;

const RightBox = styled(BaseRightBox)`
  @media (max-width: 480px) {
    width: 100% !important; /* ★ 모바일일 때 우측 박스가 화면 너비 전체 점유 */
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default function ChatInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const chatList = location.state?.chatList || [];
  const selectedChat = location.state?.selectedChat || chatList[0] || { name: "사용자", charge: "멤버", state: "ONLINE" };

  const [openMenu, setOpenMenu] = useState(false);
  const [currentState, setCurrentState] = useState(states[0]);
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

  const handleStateChange = (state) => {
    setCurrentState(state);
    setOpenMenu(false);
  };

  const handleOut = () => {
    const updatedList = chatList.filter((item) => item.id !== selectedChat.id);
    navigate("/chat", { state: { chatList: updatedList } });
  };

  return (
    <>
        <GlobalStyle />
        <PageLayout>
            <Menu />
            <ContentBox style={{ padding: 0 }}>
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
                              <div key={state.label}>
                                  <StateWapper
                                  onClick={() => handleStateChange(state)}
                                  style={{ cursor: "pointer" }}
                                  >
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
                          {chatList.map((item) => (
                          <ChatItem key={item.id} onClick={() => navigate("/chat-info", { state: { selectedChat: item, chatList } })}>
                              <ChatItemIconWrapper>
                              <UserIcon $size={60} src={user_icon} />
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
                                  {item.lastMsg} · {item.time}
                                  </ChatItemMsg>
                              </ChatItemBottom>
                              </ChatItemInfo>
                          </ChatItem>
                          ))}
                      </UserBox>
                    </SideBox>
                    
                    <VerticalLine />
                    
                    {/* ★ 모바일 화면 전체를 독점할 우측 본문 박스 */}
                    <RightBox>
                      <TopBox>
                          <BackIcon src={back_icon} onClick={() => navigate("/chat")} />
                          <MenuIcon src={menu} />
                      </TopBox>
                      <HorizontalLine $length={100} />
                      <MainBox>
                          <UserIcon $size={window.innerWidth <= 480 ? 120 : 200} src={user_icon} />
                          <UserWapper>
                            <UserName>{selectedChat.name}</UserName>
                            <UserCharge>{selectedChat.charge}</UserCharge>
                          </UserWapper>
                          <StateWapper>
                            <StateDot
                                $color={
                                states.find((s) => s.value === selectedChat.state)?.color
                                }
                            />
                            <StateText>
                                {states.find((s) => s.value === selectedChat.state)?.label}
                            </StateText>
                          </StateWapper>
                          <AlarmWapper>
                            <AlarmIcon src={alarm_off_icon} />
                            <AlarmText>알림 해제</AlarmText>
                          </AlarmWapper>
                          <OutButton onClick={handleOut}>채팅방에서 나가기</OutButton>
                      </MainBox>
                    </RightBox>
                </Layout>
            </ContentBox>
        </PageLayout>
    </>
  );
}