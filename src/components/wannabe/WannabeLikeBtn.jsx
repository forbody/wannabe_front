import * as React from 'react';
import { Button, IconButton } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const WannabeLikeBtn = ({liking, wannabe_id, like, unlike}) => {
    const { loginUser } = useAuth()

    const handleLike = () => {
        like(wannabe_id, loginUser)
    }
    const handleUnlike = () => {
        unlike(wannabe_id, loginUser)
    }

    // 이미 좋아요 된 사람인지?
    const isLiked = liking?.findIndex((f) => f.id == wannabe_id) !== -1;

    return ( 
        <IconButton
            color="error"
            onClick={isLiked ? handleUnlike : handleLike}
        >
            {isLiked ? <IoHeart /> : <IoHeartOutline />}
        </IconButton>
    );
}

export default WannabeLikeBtn;