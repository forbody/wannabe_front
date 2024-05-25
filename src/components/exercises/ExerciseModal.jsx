// 운동 썸네일을 눌렀을 때 url 영상, 디테일 알려주는 곳으로 팝업 시켜주는 컴포넌트

import Modal from "react-modal";
import React, { useState } from "react";

function ExerciseModal () {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100vh",
            zIndex : "10",
            position: "fixed",
            top:"0",
            left: "0"
        },
        content: {
            width: "300px",
            height: "400px",
            margin: "auto",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            zIndex: "150",
            position: "absolute",
            overflow: "auto",
            justifyContent: "center"
        }
    };

    return (
        <div>
            <button onClick={openModal}>모달 열기</button>

            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <h1>운동이름</h1>
                <p>내용</p>
                <p>영상</p>
                {/* <p>(exercise.url)</p> */}
                {/* <p>(exercise.detail)</p> */}
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </div>
    )


}

// 얘를 이제 각 운동마다 집어넣어야해
// 버튼말고 이미지 위에 point cusor + hover 효과를 줘서 이동 되게끔

export default ExerciseModal;