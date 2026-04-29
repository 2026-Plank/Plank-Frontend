import logo from '../assets/logo.svg';
import styled, { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

const SignForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

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

const LoginLink = styled.button`
    margin-top: 20px;
    text-decoration: none;
    color: #70716F;
    font-size: 16px;
    background-color: #fff;
    border: none;
    &:hover {
        text-decoration: underline;
    }
`

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        if (!email || !id || !password) {
            return '모든 항목을 입력해주세요';
        }
        if (!email.includes('@')) {
            return '이메일 형식이 올바르지 않습니다';
        }
        if (password.length < 4) {
            return '비밀번호는 4자 이상 입력해주세요';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errMsg = validate();
        if (errMsg) {
            alert(errMsg);
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/sign", 
                { method: "POST", headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ userId: id, pw: password, email, name: id }), });

            //
            if (!res.ok) {
                alert("아이디,비밀번호 또는 이메일이 형식에 맞지 않습니다.\n다시 입력해주세요!");
                console.log("API 접근 실패");
                return;
            }
            alert("회원가입 성공");
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (err) {
            alert("회원가입 실패");
            console.log("정보 저장 실패", err);
        }
    };

    const isDisabled = !email || !id || !password;

    return (
        <>
            <GlobalStyle />
            <Container>
                <Logo src={logo} alt="logo" />

                <SignForm onSubmit={handleSubmit}>
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

                    <LoginButton type="submit" disabled={isDisabled}>회원가입</LoginButton>
                </SignForm>
                <LoginLink onClick={() => navigate("/")}>로그인</LoginLink>
            </Container>
        </>
    )
}