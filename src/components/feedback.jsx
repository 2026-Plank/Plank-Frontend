import styled from "styled-components";
import { useState } from "react";
import { apiRequest } from "../utils/api";

const FeedbackModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 400px;
    max-width: 90%;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    resize: vertical;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
`;

const SubmitButton = styled(Button)`
    background: #C0DA58;
    color: white;
`;

const CancelButton = styled(Button)`
    background: #ccc;
    color: black;
`;

export default function FeedbackForm({ teamId, onClose, onSubmit }) {
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        if (!content.trim()) {
            alert("피드백 내용을 입력해주세요.");
            return;
        }

        try {
            await apiRequest("/api/feedbacks", {
                method: "POST",
                body: JSON.stringify({
                    teamId,
                    content
                }),
            });
            alert("피드백이 등록되었습니다.");
            onSubmit?.();
            onClose();
        } catch (err) {
            console.error(err);
            alert("피드백 작성 실패: " + (err.message || "알 수 없는 오류"));
        }
    };

    return (
        <FeedbackModal onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>피드백 남기기</Title>
                <TextArea
                    placeholder="프로젝트에 남길 내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <ButtonGroup>
                    <CancelButton onClick={onClose}>취소</CancelButton>
                    <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
                </ButtonGroup>
            </ModalContent>
        </FeedbackModal>
    );
}
