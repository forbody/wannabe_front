// 운동 썸네일을 눌렀을 때 url 영상, 디테일 알려주는 곳으로 팝업 시켜주는 컴포넌트
import Modal from "react-modal";
import React, { useState } from "react";
import YouTube from "react-youtube";


function ExerciseModal ({
    exercise = {},
    isOpen,
    onClose,
}) {

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100vh",
            zIndex : "10",
            position: "fixed",
            top:"0",
            left: "0",
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
            justifyContent: "center",
        }
    };
    
    return (
        <div>
            <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
                <h2>{exercise.name}</h2>
                <h4>운동 설명</h4>
                <p>{exercise.description}</p>
                <h4>영상</h4>
                {
                    isOpen && 
                    <YouTube
                    videoId={exercise.url}           
                    opts={{
                        width: "100%",
                        height: "500px",
                        playerVars: {
                            autoplay: 0, //자동 재생 여부 
                            modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                            },
                        }}
                    onReady={(e) => {
                        e.target.mute(); //소리 끔
                    }}                  
                    />
                }
                
                전체화면 시 음소거 해제 가능!
                <br />
                <button onClick={onClose}>닫기</button>
            </Modal>

        </div>
    )

    
}

export default ExerciseModal;