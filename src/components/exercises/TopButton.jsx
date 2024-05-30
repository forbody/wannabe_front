import { useEffect, useState, useRef } from "react";
import FloatingActionButtons from "./NavigationButton";

// 맨 위로 올리는 버튼
const TopButton = ({ scrollContainerRef }) => {
const [showButton, setShowButton] = useState(false);

const scrollToTop = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
};

// 모바일 화면인지 확인여부
const mobileCheck = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEModbile|Opeara Mini/i.test(navigator.userAgent);
}

useEffect(() => {
    console.log(mobileCheck());
    const handleScroll = () => {
    if (scrollContainerRef.current.scrollTop > 800) {
    setShowButton(true);
    } else {
        setShowButton(false);
    }
    };

    if (scrollContainerRef.current) {
        scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
        if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
        }
    };
    }, [scrollContainerRef]);

const style = {
    cursor: "pointer",
    border: "none",
    outline: "none",
    border: "none",
    background: "none",
    padding: 0,
    margin: 0,
    position: "sticky",
    left: "82%",
    bottom: `56px`,
    zIndex: 999,
    };
return (
    <>
    {showButton && (
        <button onClick={scrollToTop} type="button" style={style}>
            <FloatingActionButtons />
        </button>
    )}
    </>
    );
};

export default TopButton;
