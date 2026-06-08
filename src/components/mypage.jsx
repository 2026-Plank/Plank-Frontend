import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "./menu_layout";
import { GlobalStyle } from "../pages/homePage";
import { apiRequest,  } from "../utils/api";

// ★ schedule_page에서 가져온 공통 레이아웃 컴포넌트
import { PageLayout, ContentBox } from "./schedule_page";
import setting from "../assets/setting.svg";
import profile from "../assets/profile.svg";

const ProfileTextContainer = styled.div`
    flex: 1;
    min-width: 0;
`;

const TopBar = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    
    @media (max-width: 480px) {
        margin-bottom: 12px;
    }
`;

const ManageIcon = styled.img`
    position: absolute !important; /* ⭐️ 무조건 absolute로 고정 */
    top: 50% !important;
    transform: translateY(-50%) !important;
    right: 28px !important; /* 오른쪽 패딩 구역에 강제 고정 */
    
    /* ⭐️ 모바일에서 찌그러지는 현상을 원천 차단하기 위해 고정 크기 강제 */
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;  /* flex-shrink가 안 먹힐 때를 대비한 최소 크기 강제 */
    min-height: 32px !important;
    cursor: pointer;

    @media (max-width: 480px) {
        right: 20px !important;
        width: 24px !important;
        height: 24px !important;
        min-width: 24px !important;
        min-height: 24px !important;
    }
`;

const ProfileCard = styled.section`
    position: relative; /* 아이콘의 기준점 역할은 유지 */
    display: flex;
    align-items: center;
    gap: 20px;
    border: 1px solid #e4e4e3;
    border-radius: 24px;
    padding: 28px;
    background: #fff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
    margin-top: 12px;
    
    /* ⭐️ 패딩과 테두리가 너비 계산에 포함되도록 기본 설정 (데스크톱 깨짐 방지) */
    box-sizing: border-box; 

    @media (max-width: 480px) {
        padding: 20px;
        gap: 16px;
        border-radius: 16px;
        padding-right: 60px; /* 모바일에서 우측 아이콘 공간 확보 */
        
        /* ⭐️ 모바일 화면(480px 이하)에서만 부모 상자를 뚫고 나가지 못하게 강제 고정 */
        width: 100%;
        max-width: 100%;
        overflow: hidden; 
    }
`;

const ProfileImg = styled.img`
    width: 88px;
    height: 88px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 480px) {
        width: 52px;
        height: 52px;
    }
`;

const ProfileName = styled.div`
    color: #333;
    font-size: 28px;
    font-weight: 700;
    word-break: break-all;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const ProfileSub = styled.div`
    margin-top: 8px;
    color: #777;
    font-size: 15px;
    word-break: break-all;

    @media (max-width: 480px) {
        font-size: 13px;
        margin-top: 4px;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 24px;
    margin-top: 24px;
    
    /* ⭐️ 추가: Grid 자체와 자식 요소들이 화면 밖으로 늘어나는 것을 방지 */
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    min-width: 0; 

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
    @media (max-width: 480px) {
        gap: 16px;
        margin-top: 16px;
        width: 100% !important; /* 모바일에서 무조건 부모 너비에 맞춤 */
    }
`;

const Card = styled.section`
    border: 1px solid #e4e4e3;
    border-radius: 24px;
    padding: 24px;
    background: #fff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
    
    /* ⭐️ 핵심 추가: 패딩이 늘어나도 전체 너비(100%) 안에 포함되도록 계산 방식 변경 */
    width: 100%;
    max-width: 100%;
    box-sizing: border-box !important; 
    min-width: 0; /* 내부 텍스트 밀림으로 인한 카드 늘어남 방지 */

    @media (max-width: 480px) {
        padding: 18px;
        border-radius: 16px;
        width: 100% !important;
    }
`;

const CardTitle = styled.h2`
    margin: 0;
    color: #333;
    font-size: 24px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;

const CardSub = styled.p`
    margin: 8px 0 0;
    color: #8a8a89;
    font-size: 14px;

    @media (max-width: 480px) {
        font-size: 12px;
        margin-top: 6px;
    }
`;

const SearchRow = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    
    /* ⭐️ 추가: 검색줄 전체가 카드 너비를 절대 넘지 못하도록 제어 */
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
`;

const Input = styled.input`
    flex: 1;
    min-width: 0; /* ⭐️ 핵심 추가: flex 박스 안에서 input이 부모를 뚫고 늘어나는 현상 방지 */
    height: 52px;
    padding: 0 16px;
    border: 1px solid #e1e1e0;
    border-radius: 14px;
    font-size: 15px;
    outline: none;
    box-sizing: border-box; /* ⭐️ 추가 */
    
    &:focus {
        border-color: #c0da58;
        box-shadow: 0 0 0 4px rgba(192, 218, 88, 0.16);
    }

    @media (max-width: 480px) {
        height: 46px;
        font-size: 14px; /* 모바일에서 텍스트가 너무 크면 입력창이 밀리므로 약간 축소 */
        padding: 0 12px;
    }
`;

const Button = styled.button`
    height: 52px;
    padding: 0 18px;
    border: none;
    border-radius: 14px;
    background: ${({ $secondary }) => $secondary ? "#fff" : "#c0da58"};
    color: ${({ $secondary }) => $secondary ? "#666" : "#fff"};
    border: ${({ $secondary }) => $secondary ? "1px solid #ddd" : "none"};
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0; /* ⭐️ 추가: 화면이 좁아져도 버튼 글자가 찌그러지거나 잘리지 않게 고정 */
    box-sizing: border-box; /* ⭐️ 추가 */

    @media (max-width: 480px) {
        height: 46px;
        padding: 0 16px;
        font-size: 14px;
    }
`;

const Message = styled.div`
    margin-top: 14px;
    color: ${({ $error }) => $error ? "#d9534f" : "#7e9640"};
    font-size: 14px;
    font-weight: 600;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 18px;
`;

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 18px;
    border: 1px solid #ececeb;
    border-radius: 18px;
    background: #fdfdfc;

    @media (max-width: 480px) {
        padding: 14px;
        border-radius: 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
`;

const UserBlock = styled.div`
    min-width: 0;
    width: 100%;
`;

const UserName = styled.div`
    color: #333;
    font-size: 17px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 15px;
    }
`;

const UserMeta = styled.div`
    margin-top: 6px;
    color: #8b8b8a;
    font-size: 13px;
    line-height: 1.5;
    word-break: break-all;

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

const ActionRow = styled.div`
    display: flex;
    gap: 8px;
    flex-shrink: 0;

    @media (max-width: 480px) {
        width: 100%;
        justify-content: flex-end;
    }
`;

const EmptyState = styled.div`
    margin-top: 18px;
    padding: 28px 20px;
    border: 1px dashed #d8d8d7;
    border-radius: 18px;
    text-align: center;
    color: #90908f;
    font-size: 14px;
`;

const FeedbackCard = styled.div`
    border: 1px solid #ececeb;
    border-radius: 18px;
    padding: 18px;
    background: #fdfdfc;

    @media (max-width: 480px) {
        padding: 14px;
        border-radius: 12px;
    }
`;

const FeedbackHead = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
`;

const FeedbackTitle = styled.div`
    color: #333;
    font-size: 16px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const FeedbackMeta = styled.div`
    margin-top: 6px;
    color: #8b8b8a;
    font-size: 13px;
`;

const FeedbackBody = styled.div`
    margin-top: 10px;
    color: #555;
    font-size: 14px;
    line-height: 1.6;

    @media (max-width: 480px) {
        font-size: 13px;
    }
`;

const StatsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 20px;

    @media (max-width: 480px) {
        gap: 8px;
        margin-top: 14px;
    }
`;

const StatCard = styled.div`
    border-radius: 18px;
    background: #f2f7dc;
    padding: 18px;
    text-align: center;

    @media (max-width: 480px) {
        padding: 12px 6px;
        border-radius: 12px;
    }
`;

const StatCount = styled.div`
    color: #90a442;
    font-size: 28px;
    font-weight: 800;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const StatLabel = styled.div`
    margin-top: 8px;
    color: #6f6f6e;
    font-size: 14px;

    @media (max-width: 480px) {
        font-size: 11px;
        margin-top: 4px;
    }
`;

export default function MyPage() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
    const [sentFeedbacks, setSentFeedbacks] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
    };

    const loadData = async () => {
        const headers = getAuthHeaders();
        if (!headers) {
            setError("로그인이 필요합니다.");
            return;
        }

        try {
            setError("");
            const [profileRes, friendsRes, requestsRes] = await Promise.all([
                apiRequest("/api/users/profile", { headers }),
                apiRequest("/api/users/friends", { headers }),
                apiRequest("/api/users/friends/requests", { headers }),
            ]);
            setProfileData(profileRes);
            setFriends(friendsRes.friends || []);
            setRequests(requestsRes.requests || []);

            const [receivedRes, sentRes] = await Promise.all([
                apiRequest("/api/feedbacks/mine/received", { headers }),
                apiRequest("/api/feedbacks/mine/sent", { headers }),
            ]);
            setReceivedFeedbacks(receivedRes.feedbacks || []);
            setSentFeedbacks(sentRes.feedbacks || []);
        } catch (loadError) {
            setError(loadError.message || "친구 정보를 불러오지 못했습니다.");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleSearch = async () => {
        const headers = getAuthHeaders();
        if (!headers) {
            setError("로그인이 필요합니다.");
            return;
        }
        if (!keyword.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            setMessage("");
            setError("");
            const res = await apiRequest(`/api/users/search?keyword=${encodeURIComponent(keyword)}`, { headers });
            setSearchResults(res.users || []);
        } catch (searchError) {
            setError(searchError.message || "사용자 검색에 실패했습니다.");
        }
    };

    const handleAddFriend = async (friendId) => {
        const headers = getAuthHeaders();
        if (!headers) return;
        try {
            await apiRequest("/api/users/friends", {
                method: "POST",
                headers,
                body: JSON.stringify({ friendId }),
            });
            setMessage("친구 요청을 보냈어요.");
            setError("");
            await loadData();
        } catch (requestError) {
            setError(requestError.message || "친구 요청에 실패했습니다.");
        }
    };

    const handleAccept = async (relationId) => {
        const headers = getAuthHeaders();
        if (!headers) return;
        try {
            await apiRequest(`/api/users/friends/${relationId}/accept`, {
                method: "PUT",
                headers,
            });
            setMessage("친구 요청을 수락했어요.");
            setError("");
            await loadData();
        } catch (acceptError) {
            setError(acceptError.message || "친구 요청 수락에 실패했습니다.");
        }
    };

    const handleDelete = async (relationId) => {
        const headers = getAuthHeaders();
        if (!headers) return;
        try {
            await apiRequest(`/api/users/friends/${relationId}`, {
                method: "DELETE",
                headers,
            });
            setMessage("친구를 삭제했어요.");
            setError("");
            await loadData();
        } catch (deleteError) {
            setError(deleteError.message || "친구 삭제에 실패했습니다.");
        }
    };

    return (
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu />
                <ContentBox>
                    <ProfileCard>
                        <ProfileImg src={profile} alt="profile" />
                        <ProfileTextContainer>
                            <ProfileName>{profileData?.name || profileData?.userid || "내 프로필"}</ProfileName>
                            <ProfileSub>{profileData?.email || "로그인 정보를 불러오는 중입니다."}</ProfileSub>
                        </ProfileTextContainer>
                        <ManageIcon src={setting} onClick={() => navigate("/mypage_user")} />
                    </ProfileCard>

                    <StatsRow>
                        <StatCard>
                            <StatCount>{friends.length}</StatCount>
                            <StatLabel>친구 수</StatLabel>
                        </StatCard>
                        <StatCard>
                            <StatCount>{requests.length}</StatCount>
                            <StatLabel>받은 요청</StatLabel>
                        </StatCard>
                        <StatCard>
                            <StatCount>{searchResults.length}</StatCount>
                            <StatLabel>검색 결과</StatLabel>
                        </StatCard>
                    </StatsRow>

                    {error ? <Message $error>{error}</Message> : null}
                    {!error && message ? <Message>{message}</Message> : null}

                    <Grid>
                        <Card>
                            <CardTitle>친구 찾기</CardTitle>
                            <CardSub>이름, 아이디, 이메일로 사용자를 검색해서 친구 요청을 보낼 수 있어요.</CardSub>
                            <SearchRow>
                                <Input
                                    value={keyword}
                                    onChange={(event) => setKeyword(event.target.value)}
                                    placeholder="이름, 아이디, 이메일 검색"
                                />
                                <Button type="button" onClick={handleSearch}>검색</Button>
                            </SearchRow>

                            {searchResults.length ? (
                                <List>
                                    {searchResults.map((user) => (
                                        <ListItem key={user.id}>
                                            <UserBlock>
                                                <UserName>{user.name || user.userid}</UserName>
                                                <UserMeta>{user.userid} · {user.email}</UserMeta>
                                            </UserBlock>
                                            <ActionRow>
                                                <Button type="button" onClick={() => handleAddFriend(user.id)}>친구 추가</Button>
                                            </ActionRow>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <EmptyState>검색 결과가 여기에 표시됩니다.</EmptyState>
                            )}
                        </Card>

                        <Card>
                            <CardTitle>받은 친구 요청</CardTitle>
                            <CardSub>들어온 요청을 수락하거나 바로 정리할 수 있어요.</CardSub>
                            {requests.length ? (
                                <List>
                                    {requests.map((request) => (
                                        <ListItem key={request.relationId}>
                                            <UserBlock>
                                                <UserName>{request.user.name || request.user.userid}</UserName>
                                                <UserMeta>{request.user.userid} · {request.user.email}</UserMeta>
                                            </UserBlock>
                                            <ActionRow>
                                                <Button type="button" onClick={() => handleAccept(request.relationId)}>수락</Button>
                                                <Button $secondary type="button" onClick={() => handleDelete(request.relationId)}>삭제</Button>
                                            </ActionRow>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <EmptyState>새로운 친구 요청이 없어요.</EmptyState>
                            )}
                        </Card>
                    </Grid>

                    <Card style={{ marginTop: "24px" }}>
                        <CardTitle>내 친구 목록</CardTitle>
                        <CardSub>메시지 기능과 분리해서 친구 추가/관리만 할 수 있게 구성했습니다.</CardSub>
                        {friends.length ? (
                            <List>
                                {friends.map((friend) => (
                                    <ListItem key={friend.relationId}>
                                        <UserBlock>
                                            <UserName>{friend.user.name || friend.user.userid}</UserName>
                                            <UserMeta>{friend.user.userid} · {friend.user.email}</UserMeta>
                                        </UserBlock>
                                        <ActionRow>
                                            <Button $secondary type="button" onClick={() => handleDelete(friend.relationId)}>친구 삭제</Button>
                                        </ActionRow>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <EmptyState>아직 친구가 없어요. 위에서 먼저 친구를 찾아보세요.</EmptyState>
                        )}
                    </Card>

                    <Grid style={{ marginTop: "24px" }}>
                        <Card>
                            <CardTitle>내가 받은 피드백</CardTitle>
                            <CardSub>개인 피드백과 팀 피드백이 함께 보입니다.</CardSub>
                            {receivedFeedbacks.length ? (
                                <List>
                                    {receivedFeedbacks.map((feedback) => (
                                        <FeedbackCard key={feedback.id}>
                                            <FeedbackHead>
                                                <FeedbackTitle>{feedback.fromUser?.name || feedback.fromUser?.userid || "알 수 없는 사용자"}</FeedbackTitle>
                                                <FeedbackTitle>{feedback.rating}/5</FeedbackTitle>
                                            </FeedbackHead>
                                            <FeedbackMeta>{feedback.category === "team" ? "팀원 피드백" : "개인 피드백"}</FeedbackMeta>
                                            <FeedbackBody>{feedback.content}</FeedbackBody>
                                        </FeedbackCard>
                                    ))}
                                </List>
                            ) : (
                                <EmptyState>아직 받은 피드백이 없어요.</EmptyState>
                            )}
                        </Card>

                        <Card>
                            <CardTitle>내가 보낸 피드백</CardTitle>
                            <CardSub>내가 남긴 피드백 기록을 확인할 수 있어요.</CardSub>
                            {sentFeedbacks.length ? (
                                <List>
                                    {sentFeedbacks.map((feedback) => (
                                        <FeedbackCard key={feedback.id}>
                                            <FeedbackHead>
                                                <FeedbackTitle>{feedback.toUser?.name || feedback.toUser?.userid || "알 수 없는 사용자"}</FeedbackTitle>
                                                <FeedbackTitle>{feedback.rating}/5</FeedbackTitle>
                                            </FeedbackHead>
                                            <FeedbackMeta>{feedback.category === "team" ? "팀원 피드백" : "개인 피드백"}</FeedbackMeta>
                                            <FeedbackBody>{feedback.content}</FeedbackBody>
                                        </FeedbackCard>
                                    ))}
                                </List>
                            ) : (
                                <EmptyState>아직 보낸 피드백이 없어요.</EmptyState>
                            )}
                        </Card>
                    </Grid>

                    <TopBar style={{ justifyContent: "flex-start", marginTop: "24px" }}>
                        <Button $secondary type="button" onClick={handleLogout}>로그아웃</Button>
                    </TopBar>
                </ContentBox>
            </PageLayout>
        </>
    );
}