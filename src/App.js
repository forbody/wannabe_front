import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginContext } from './contexts/LoginContext';
import { useProvideAuth } from './hooks/useProvideAuth';
import Layout from "./components/layouts/Layout";
import Exercise from './pages/Exercise';
import Food from './pages/Food';
import TodoList from './pages/TodoList';
import Wannabe from './pages/Wannabe';
import My from './pages/My';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import Login from './pages/Login';

import { useState } from 'react';
import TodoForm from './pages/TodoForm';



function App() {
  
  const auth = useProvideAuth(); 
  // 로그인 하지 않은 경우: 무조건 path='/' 로 이동 하는 것 추가
  return (
    <LoginContext.Provider value={auth}>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/exercise' element={<Exercise/>} />
          <Route path='/food' element={<Food />} />
          <Route path='/todolist' element={<TodoList/>} />
          <Route path='/wannabe' element={<Wannabe />} />
          <Route path='/my' element={<My />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/todolist/form' element={<TodoForm />} />
          {/* <Route path='/error' element={<h1>에러</h1>} />
          <Route path='*' element={<h1>Not Found</h1>} /> */}
        </Routes>
      </Layout>
    </LoginContext.Provider>
  );
}

export default App;
