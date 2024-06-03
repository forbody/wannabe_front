import { Box, Grid } from "@mui/material";
import BottomNavi from "./BottomNavi";
import Header from "./Header";
import TopButton from "./TopButton";
import { useEffect, useRef, useState } from "react";

const Main = ({ children }) => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    const [timeColor, setTimeColor] = useState('linear-gradient(135deg, #fdf00e, #33cc33)')
    
    // 아침, 점심, 저녁 결정
    useEffect(() => {
        const today = new Date();
        const today_time = today.getHours();
        if (today_time >= 0 && today_time <= 10) {
            setTimeColor('linear-gradient(135deg, #ff9b00, #fdf00e)');
        } else if (today_time >= 11 && today_time <= 15) {
            setTimeColor('linear-gradient(135deg, #fdf00e, #33cc33)');
        } else if (today_time >= 16 && today_time <= 23) {
            setTimeColor('linear-gradient(135deg, #33cc33, #0044bb)');
        }
        }, []);

    return (
        <>
            <Grid
                container
                margin= "0 auto"
                direction="column"
                justify="center"
                justifyContent='flex-start'
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
                style={{
                    maxWidth: '430px',
                    background: timeColor,
                }}
            >
                <Header setShowTopBtn={setShowTopBtn} />
                {children}
                <BottomNavi />
            </Grid>
            <TopButton showTopBtn={showTopBtn} />
        </>
    );
}

export default Main;
