import styled from "styled-components";
import { useState } from "react";

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

const RatingSelect = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
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

export default function FeedbackForm({ toUserId, teamId, onClose, onSubmit }) {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);

    const handleSubmit = async () => {
        if (!content.trim()) {
            alert("피드백 내용을 입력해주세요.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch("/api/feedbacks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    toUserId,
                    teamId,
                    content,
                    rating: parseInt(rating)
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert("피드백 작성 실패: " + (errorData.error || "알 수 없는 오류"));
            } else {
                alert("피드백이 작성되었습니다.");
                onSubmit();
                onClose();
            }
        } catch (err) {
            console.error(err);
            alert("피드백 작성 중 오류 발생");
        }
    };

    return (
        <FeedbackModal onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>피드백 작성</Title>
                <TextArea
                    placeholder="피드백 내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <RatingSelect value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value={1}>1점</option>
                    <option value={2}>2점</option>
                    <option value={3}>3점</option>
                    <option value={4}>4점</option>
                    <option value={5}>5점</option>
                </RatingSelect>
                <ButtonGroup>
                    <CancelButton onClick={onClose}>취소</CancelButton>
                    <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
                </ButtonGroup>
            </ModalContent>
        </FeedbackModal>
    );
}