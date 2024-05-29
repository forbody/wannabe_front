import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Top 5 게시물</h2>
            <div className="top-post">
                <img src="image1.jpg" alt="게시물 이미지" />
                <p>운동 루틴</p>
            </div>
            <div className="top-post">
                <img src="image2.jpg" alt="게시물 이미지" />
                <p>식단 계획</p>
            </div>
            {/* 추가 상위 게시물 */}
        </div>
    );
};

export default Sidebar;