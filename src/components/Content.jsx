import React, { useState, useEffect } from 'react';
import Post from './Post';

const Content = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="content">
            <div className="featured">
                <img src="featured1.jpg" alt="주요 이미지" />
                <img src="featured2.jpg" alt="주요 이미지" />
                <Post
                    category="운동" 
                    user="user@example.com" 
                    comment="000의 운동 루틴입니다!" 
                    image="image1.jpg" 
                />
            </div>
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    category={post.category}
                    user={post.user}
                    comment={post.comment}
                    image={post.image}
                    initialLikes={post.likes}
                />
            ))}
        </div>
    );
};

export default Content;