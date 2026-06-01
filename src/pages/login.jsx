import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { setAuthSession } from '../utils/api';
import logo from "../assets/logo.svg";

export const GlobalStyle = createGlobalStyle`
    *{
        font-family: Pretendard;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        background-color: #FFF;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px; /* ★ 모바일 화면에서 양옆에 최소한의 여백 확보 */
    box-sizing: border-box;
`

const Logo = styled.img`
    width: 324px;
    height: 136px;
    margin-top: 5%;
    margin-bottom: 50px;

    @media (max-width: 480px) {
        width: 200px;  /* 모바일 로고 크기 축소 */
        height: auto;
        margin-top: 40px;
        margin-bottom: 60px;
    }
`

const InputWrapper = styled.div`
    position: relative;
    width: 100%; /* ★ 고정 너비 해제 */
    max-width: 538px; /* 데스크톱 최대 크기 제한 */
    margin-top: 30px;
    border-radius: 16px;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus-within {
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.5);
    }

    @media (max-width: 480px) {
        margin-top: 16px;
        border-radius: 12px;
    }
`

const Input = styled.input`
    width: 100%;
    height: 90px;
    border-radius: 16px;
    border: none;
    outline: none;
    font-size: 22px;
    padding: 25px;
    background: transparent;

    @media (max-width: 480px) {
        height: 60px; /* ★ 모바일 맞춤 슬림 높이 */
        font-size: 16px;
        padding: 16px;
        border-radius: 12px;
    }
`

const Label = styled.label`
    position: absolute;
    left: 25px;
    top: 50%;
    transform: translateY(-50%);
    color: #70716F;
    font-size: 16px;
    pointer-events: none;
    transition: all 0.2s ease;

    @media (max-width: 480px) {
        left: 16px;
        font-size: 14px;
    }
`

const FloatingWrapper = styled(InputWrapper)`
    input:focus + label,
    input:not(:placeholder-shown) + label {
        top: 15px;
        font-size: 12px;
    }

    @media (max-width: 480px) {
        margin: 15px 0px;
        /* ★ 모바일 높이(60px)에 맞춰 글자가 위로 뜰 때의 정렬 위치 최적화 */
        input:focus + label,
        input:not(:placeholder-shown) + label {
            top: 8px;
            font-size: 10px;
        }
    }
`

const LoginButton = styled.button`
    width: 100%; /* ★ 고정 너비 해제 */
    max-width: 538px;
    height: 90px;
    border-radius: 16px;
    margin-top: 30px;
    font-size: 28px;
    color: white;
    background-color: ${({ disabled }) => disabled ? '#ccc' : '#C0DA58'};
    border: none;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s;

    @media (max-width: 480px) {
        height: 56px; /* ★ 모바일 맞춤 버튼 크기 */
        font-size: 18px;
        border-radius: 12px;
        margin-top: 36px;
    }
`

const LinkGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    justify-content: center;
    flex-wrap: wrap; /* 오버플로우 방지 균등 줄바꿈 허용 */
`

const SubLink = styled(Link)`
    text-decoration: none;
    color: #70716F;
    font-size: 16px;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        font-size: 13px; /* 모바일 하단 링크 글씨 조정 */
    }
`

const Divider = styled.span`
    color: #ccc;
    @media (max-width: 480px) {
        font-size: 13px;
    }
`

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        if (!email || !password) {
            return '이메일과 비밀번호를 입력해주세요';
        }
        if (!email.includes('@')) {
            return '이메일 형식이 올바르지 않습니다';
        }
        if (password.length < 4) {
            return '비밀번호는 4자 이상 입력해주세요';
        }
        return '';
    };

    const handleLogin = async () => {
        const err = validate();
        if (err) {
            alert(err);
            return;
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                alert('로그인 실패: ' + (data.message || '서버 오류'));
                return;
            }
            const data = await res.json();
            setAuthSession({ token: data.token, user: data.user });
            alert('로그인 성공');
            navigate('/homepage');
        } catch (err) {
            alert("로그인 실패");
            console.error(err);
        }
    };

    const isDisabled = !email || !password;

    return (
        <>
            <GlobalStyle />
            <Container>
                <Logo src={logo} alt="logo" />

                <FloatingWrapper>
                    <Input
                        type="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Label>이메일</Label>
                </FloatingWrapper>
                <FloatingWrapper>
                    <Input
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Label>비밀번호</Label>
                </FloatingWrapper>

                <LoginButton onClick={handleLogin} disabled={isDisabled}>
                    로그인
                </LoginButton>

                <LinkGroup>
                    <SubLink to="/#">아이디 찾기</SubLink>
                    <Divider>|</Divider>
                    <SubLink to="/#">비밀번호 찾기</SubLink>
                    <Divider>|</Divider>
                    <SubLink to="/signup">회원가입</SubLink>
                </LinkGroup>
            </Container>
        </>
    );
}