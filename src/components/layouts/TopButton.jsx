import { useEffect, useState, useRef } from "react";
import FloatingActionButtons from "../exercises/NavigationButton";
import { useLocation } from "react-router-dom";

// 맨 위로 올리는 버튼
const TopButton = ({showTopBtn}) => {
  
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowSize = () => setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowSize);
    return () => window.removeEventListener('resize', handleWindowSize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  };

  const location = useLocation();

  // 여기에 페이지 주소를 넣으면 탑 버튼이 사라집니다.
  const noShowTopButton = ['/', '/login', '/signup'] 
  if (noShowTopButton.includes(location.pathname)) {
      return null;
  }
  
  const style = {
    cursor: "pointer",
    border: "none",
    outline: "none",
    border: "none",
    background: "none",
    padding: 0,
    margin: 0,
    position: "sticky",
    left: (innerWidth - 430)/2 + 430 - 60 - 5,
    bottom: `56px`,
    zIndex: 999,
  };
  return (
    <>
      {showTopBtn && (
        <button onClick={scrollToTop} type="button" style={style}>
          <FloatingActionButtons />
        </button>
      )}
    </>
  );
};

export default TopButton;
