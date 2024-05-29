import * as React from 'react';
import { IconButton } from "@mui/material";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';

const WannabeLikeBtn = ({alreadyliked, like_id, like, unlike}) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (alreadyliked) {
            like(like_id)
            setIsLiked(true);
        }
    }
    const handleUnlike = () => {
        if (alreadyliked) {
            unlike(like_id)
            setIsLiked(false);
        }
    }

    // 이미 좋아요 된 사람인지?
    useEffect(() => {
        if (alreadyliked) {
            setIsLiked(alreadyliked.findIndex((f) => f.id == like_id) !== -1);
        }
    }, [alreadyliked, like_id]);

    // 아직 alreadyliked를 못 가져온 상태처리
    if (alreadyliked === null) {
        return <div>Loading...</div>;
    } 

    return ( 
        <IconButton
            color="coral"
            onClick={isLiked ? handleUnlike : handleLike}
        >
            {isLiked ? <IoHeart /> : <IoHeartOutline />}
        </IconButton>
    );
}

export default WannabeLikeBtn;