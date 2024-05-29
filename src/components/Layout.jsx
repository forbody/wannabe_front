import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';

const Layout = ({ children }) => {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <Content />
                </div>
                {children}
            </div>
        </Router>
    );
};

export default Layout;