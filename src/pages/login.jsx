import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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
`

const Logo = styled.img`
    width: 324px;
    height: 136px;
    margin-top: 5%;
    margin-bottom: 50px;
`

const InputWrapper = styled.div`
    position: relative;
    width: 538px;
    margin-top: 30px;
    border-radius: 16px;
    box-shadow: 0 0 11.9px 2px rgba(0, 0, 0, 0.09);
    transition: all 0.2s ease;

    &:focus-within {
        box-shadow: 0 0 30px 2px rgba(192, 218, 88, 0.5);
    }

    &:focus-within label {
        color: #C0DA58;
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
`

const FloatingWrapper = styled(InputWrapper)`
    input:focus + label,
    input:not(:placeholder-shown) + label {
        top: 15px;
        font-size: 12px;
    }
`

// 🔥 버튼으로 변경 (중요)
const LoginButton = styled.button`
    width: 538px;
    height: 90px;
    border-radius: 16px;
    margin-top: 30px;
    font-size: 28px;
    color: white;
    background-color: ${({ disabled }) => disabled ? '#ccc' : '#C0DA58'};
    border: none;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`

const LinkGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    justify-content: center;
`

const SubLink = styled(Link)`
    text-decoration: none;
    color: #70716F;
    font-size: 16px;

    &:hover {
        text-decoration: underline;
    }
`

const Divider = styled.span`
    color: #ccc;
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
            const response = await axios.post('/api/auth/login', { email, password });
            alert('로그인 성공');
            localStorage.setItem('token', response.data.token);
            navigate('/homepage');
        } catch (error) {
            alert('로그인 실패: ' + (error.response?.data?.message || '서버 오류'));
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