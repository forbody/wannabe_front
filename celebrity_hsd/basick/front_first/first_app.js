import React from 'react';
import './App.css';

function App() {
return (
    <div className="app">
    <header className="app-header">
        <h1 className="logo"><span className="star">*</span> Wanna Be</h1>
    </header>
    <main className="app-main">
        <button className="continue-button">계속하기</button>
        <button className="kakao-button">카카오로 시작하기</button>
        <button className="instagram-button">인스타그램으로 시작하기</button>
    </main>
    </div>
);
}

export default App;
