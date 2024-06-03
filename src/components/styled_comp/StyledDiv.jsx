import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BackgroundBox = styled.div`
    width: ${props => (props.half ? '45%' : '90%')};
    height: fit-content;
    padding: 32px 16px;
    margin: 4px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;

    border-radius: 24px;

    background-color: #ffffff70
`

export const TitleBox = styled.div`
    width: 100%;

    margin: 4px;
    
    font-size: x-large;
    font-weight: bold;
`

export const ForegroundBox = styled.div`
    height: fit-content;
    padding: 16px;
    margin: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border-radius: 16px;

    background-color: #fff
`

export const PageBox = ({children}) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                overflowY: "scroll",
                scrollbarWidth: "none",
                justifyContent: "flex-start",
                alignItems: "center",
                position: 'relateve',
                margin: "16px 0",
                flexDirection: "column"
            }}
        >
        {children}
        </Box>
    )
}