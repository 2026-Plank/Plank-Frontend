import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Menu from "./menu";
import { GlobalStyle } from "../pages/homePage";

// ★ schedule_page에서 가져온 공통 레이아웃 컴포넌트
import { PageLayout, ContentBox } from "./schedule_page";
import setting from "../assets/setting.svg";
import profile from "../assets/profile.svg";

const TopBar = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    
    @media (max-width: 480px) {
        margin-bottom: 12px;
    }
`;

const ManageIcon = styled.img`
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

const ProfileCard = styled.section`
    display: flex;
    align-items: center;
    gap: 20px;
    border: 1px solid #e4e4e3;
    border-radius: 24px;
    padding: 28px;
    background: #fff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);

    @media (max-width: 480px) {
        padding: 20px;
        gap: 16px;
        border-radius: 16px;
    }
`;

const ProfileImg = styled.img`
    width: 88px;
    height: 88px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 480px) {
        width: 64px;
        height: 64px;
    }
`;

const ProfileName = styled.div`
    color: #333;
    font-size: 28px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const ProfileSub = styled.div`
    margin-top: 8px;
    color: #777;
    font-size: 15px;

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

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
    @media (max-width: 480px) {
        gap: 16px;
        margin-top: 16px;
    }
`;

const Card = styled.section`
    border: 1px solid #e4e4e3;
    border-radius: 24px;
    padding: 24px;
    background: #fff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);

    @media (max-width: 480px) {
        padding: 18px;
        border-radius: 16px;
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
`;

const Input = styled.input`
    flex: 1;
    height: 52px;
    padding: 0 16px;
    border: 1px solid #e1e1e0;
    border-radius: 14px;
    font-size: 15px;
    outline: none;
    &:focus {
        border-color: #c0da58;
        box-shadow: 0 0 0 4px rgba(192, 218, 88, 0.16);
    }

    @media (max-width: 480px) {
        height: 46px;
        font-size: 14px;
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

    @media (max-width: 480px) {
        height: 46px;
        padding: 0 14px;
        font-size: 13px;
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

const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
};

export default function MyPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileData, setProfileData] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
    const [sentFeedbacks, setSentFeedbacks] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadData = async () => {
        const config = getAuthConfig();
        if (!config) {
            setError("로그인이 필요합니다.");
            return;
        }

        try {
            setError("");
            const [profileRes, friendsRes, requestsRes] = await Promise.all([
                axios.get("/api/users/profile", config),
                axios.get("/api/users/friends", config),
                axios.get("/api/users/friends/requests", config)
            ]);
            setProfileData(profileRes.data);
            setFriends(friendsRes.data.friends || []);
            setRequests(requestsRes.data.requests || []);
            const [receivedRes, sentRes] = await Promise.all([
                axios.get("/api/feedbacks/mine/received", config),
                axios.get("/api/feedbacks/mine/sent", config)
            ]);
            setReceivedFeedbacks(receivedRes.data.feedbacks || []);
            setSentFeedbacks(sentRes.data.feedbacks || []);
        } catch (loadError) {
            setError(loadError.response?.data?.error || loadError.response?.data?.message || "친구 정보를 불러오지 못했습니다.");
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
        const config = getAuthConfig();
        if (!config) {
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
            const response = await axios.get(`/api/users/search?keyword=${encodeURIComponent(keyword)}`, config);
            setSearchResults(response.data.users || []);
        } catch (searchError) {
            setError(searchError.response?.data?.error || "사용자 검색에 실패했습니다.");
        }
    };

    const handleAddFriend = async (friendId) => {
        const config = getAuthConfig();
        if (!config) return;
        try {
            await axios.post("/api/users/friends", { friendId }, config);
            setMessage("친구 요청을 보냈어요.");
            setError("");
            await loadData();
        } catch (requestError) {
            setError(requestError.response?.data?.error || "친구 요청에 실패했습니다.");
        }
    };

    const handleAccept = async (relationId) => {
        const config = getAuthConfig();
        if (!config) return;
        try {
            await axios.put(`/api/users/friends/${relationId}/accept`, {}, config);
            setMessage("친구 요청을 수락했어요.");
            setError("");
            await loadData();
        } catch (acceptError) {
            setError(acceptError.response?.data?.error || "친구 요청 수락에 실패했습니다.");
        }
    };

    const handleDelete = async (relationId) => {
        const config = getAuthConfig();
        if (!config) return;
        try {
            await axios.delete(`/api/users/friends/${relationId}`, config);
            setMessage("친구를 삭제했어요.");
            setError("");
            await loadData();
        } catch (deleteError) {
            setError(deleteError.response?.data?.error || "친구 삭제에 실패했습니다.");
        }
    };

    return (
        <>
            <GlobalStyle />
            <PageLayout>
                <Menu />
                <ContentBox>
                    <TopBar>
                        <ManageIcon src={setting} onClick={() => navigate("/mypage_user")} />
                    </TopBar>

                    <ProfileCard>
                        <ProfileImg src={profile} alt="profile" />
                        <div>
                            <ProfileName>{profileData?.name || profileData?.userid || "내 프로필"}</ProfileName>
                            <ProfileSub>{profileData?.email || "로그인 정보를 불러오는 중입니다."}</ProfileSub>
                        </div>
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