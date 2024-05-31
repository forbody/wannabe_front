import { useEffect, useState, useRef } from "react";
import FloatingActionButtons from "../exercises/NavigationButton";

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
