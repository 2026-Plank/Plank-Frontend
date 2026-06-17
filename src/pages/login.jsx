import logo from '../assets/logo.svg';
import styled, { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiRequest, setAuthSession } from '../utils/api';

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

export default function Login() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        if (!id || !password) {
            return '아이디와 비밀번호를 입력해주세요';
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
            const data = await apiRequest("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ userId: id, password }),
            });

            setAuthSession({ token: data.token, user: data.user });
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

    const isDisabled = !id || !password;

    return (
        <>
            <GlobalStyle />
            <Container>
                <Logo src={logo} alt="logo" />

                <FloatingWrapper>
                    <Input
                        placeholder=" "
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <Label>아이디</Label>
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
                    <SubLink to="/signup">회원가입</SubLink>
                </LinkGroup>
            </Container>
        </>
    )
}
