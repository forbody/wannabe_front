import { Grid } from "@mui/material";
import BottomNavi from "./BottomNavi";
import Header from "./Header";
import TopButton from "./TopButton";
import { useEffect, useRef, useState } from "react";

const Main = ({ children }) => {
    const [showTopBtn, setShowTopBtn] = useState(false);

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
                    background: 'linear-gradient(135deg, #fdf00e, #33cc33)',
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
