import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">홈</Link>
            <Link to="/exercise">운동</Link>
            <Link to="/diet">식단</Link>
            <Link to="/wannabe">워너비</Link>
            <Link to="/mypage">마이 페이지</Link>
        </div>
    );
};

export default Navbar;