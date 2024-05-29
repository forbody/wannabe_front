import React, { useState } from 'react';

const Post = ({ id, category, user, comment, image, initialLikes }) => {
    const [likeCount, setLikeCount] = useState(initialLikes);

    const editPost = () => {
        alert('게시물 수정');
    };

    const deletePost = () => {
        alert('게시물 삭제');
    };

    const likePost = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setLikeCount(data.likes);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <div className="post">
            <img src={image} alt="게시물 이미지" />
            <p>카테고리: {category}</p>
            <p>사용자: {user}</p>
            <p>댓글: {comment}</p>
            <div className="buttons">
                <button onClick={editPost}>수정</button>
                <button onClick={deletePost}>삭제</button>
            </div>
            <div className="likes">
                <button onClick={likePost}>좋아요</button>
                <span>{likeCount}</span> 좋아요
            </div>
        </div>
    );
};

export default Post;