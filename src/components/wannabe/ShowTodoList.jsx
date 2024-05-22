import { Box, IconButton } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { useEffect, useState } from "react";
import { userApi } from "../../api/services/user";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { orange, red, cyan } from "@mui/material/colors";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useAuth } from "../../hooks/useAuth";

const ShowTodoList = ({e}) => {
    const { loginUser, login, logout } = useAuth();
    const  userId = loginUser.id;
    const uploadUserId = e.Users[0]?.id;
    console.log(e);
    const [userProfile, setUserProfile] = useState(null);
    const getInfo = async () => {
        try {
            const res = await userApi.getUser(`${uploadUserId}`);
            console.log(res);
            setUserProfile(res.payload);
        } catch (err) {
            console.error("Error: ", err);
        }
    };
    useEffect(() => {
        getInfo();
    }, []);

    if (userProfile === null) {
        return <div>Loading...</div>;
    }

    const userImg = userProfile.UserDetail[0]?.img;

    return (
        <ForegroundBox
            style={{
                backgroundColor: "#ffffff99",
                width: "300px",
                flexDirection: "column",
                marginTop: "10px",
            }}
        >
            <Box>
                {userImg && (
                    <img
                        src={`http://localhost:8000/${userImg}`}
                        width="60"
                        alt={"img"}
                        style={{ borderRadius: "240px" }}
                    />
                )}
                {userProfile?.user_name}

                {userId ==uploadUserId ?
                <>
                <IconButton sx={{ margin: "0", padding: "0" }}>
                    <EditIcon fontSize="small" sx={{ color: orange[400] }} />
                </IconButton>
                <IconButton sx={{ margin: "0", padding: "0" }}>
                    <DeleteIcon fontSize="small" sx={{ color: red[400] }} />
                </IconButton>
                </>
                :
                <IconButton
                    sx={{ margin: "0", padding: "0" }}
                >
                    <FileUploadIcon
                        sx={{ color: cyan[400] }}
                        fontSize="small"
                    />
                </IconButton>
                }
            </Box>
            <Box
                sx={{
                    marginTop: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 0px 1px #888888dd",
                }}
            >
                엘리먼트들 들어온다
            </Box>
            <Box
                sx={{
                    marginTop: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 0px 1px #888888dd",
                }}
            >
                {e.Share_comments[0]?.comment}
            </Box>
        </ForegroundBox>
    );
}

export default ShowTodoList;