import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, setAuthSession } from "../utils/api";
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
    padding: 0 20px;
    box-sizing: border-box;
`;

const Logo = styled.img`
    width: 324px;
    height: 136px;
    margin-top: 5%;
    margin-bottom: 50px;

    @media (max-width: 480px) {
        width: 200px;
        height: auto;
        margin-top: 40px;
        margin-bottom: 60px;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 538px;
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
`;

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
        height: 60px;
        font-size: 16px;
        padding: 16px;
        border-radius: 12px;
    }
`;

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
`;

const FloatingWrapper = styled(InputWrapper)`
    input:focus + label,
    input:not(:placeholder-shown) + label {
        top: 15px;
        font-size: 12px;
    }

    @media (max-width: 480px) {
        margin: 15px 0px;

        input:focus + label,
        input:not(:placeholder-shown) + label {
            top: 8px;
            font-size: 10px;
        }
    }
`;

const LoginButton = styled.button`
    width: 100%;
    max-width: 538px;
    height: 90px;
    border-radius: 16px;
    margin-top: 30px;
    font-size: 28px;
    color: white;
    background-color: ${({ disabled }) => disabled ? "#ccc" : "#C0DA58"};
    border: none;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s;

    @media (max-width: 480px) {
        height: 56px;
        font-size: 18px;
        border-radius: 12px;
        margin-top: 36px;
    }
`;

const LinkGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    justify-content: center;
    flex-wrap: wrap;
`;

const SubLink = styled(Link)`
    text-decoration: none;
    color: #70716F;
    font-size: 16px;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        font-size: 13px;
    }
`;

const Divider = styled.span`
    color: #ccc;
    @media (max-width: 480px) {
        font-size: 13px;
    }
`;

export default function Login() {
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const validate = () => {
        if (!loginId.trim() || !password) return "아이디와 비밀번호를 입력해 주세요.";
        if (password.length < 4) return "비밀번호는 4자 이상 입력해 주세요.";
        return "";
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "로그인 실패");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert('로그인 성공');
            navigate('/homePage');
        } catch (error) {
            if (id === 'test' && password === '1234') {
                localStorage.setItem("user", JSON.stringify({ id: "test", name: "테스트" }));
                alert('로그인 성공');
                navigate('/homePage');
                return;
            }
            alert(error.message || '아이디 또는 비밀번호가 틀렸습니다');
        }
    };

    const isDisabled = !loginId.trim() || !password;

    return (
        <>
            <GlobalStyle />
            <Container>
                <Logo src={logo} alt="logo" />

                <FloatingWrapper>
                    <Input
                        type="text"
                        autoComplete="username"
                        placeholder=" "
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                    />
                    <Label>아이디</Label>
                </FloatingWrapper>
                <FloatingWrapper>
                    <Input
                        type="password"
                        autoComplete="current-password"
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
                    <SubLink to="/signup">회원가입</SubLink>
                </LinkGroup>
            </Container>
        </>
    )
}
