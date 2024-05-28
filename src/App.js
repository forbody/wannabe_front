import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginContext } from './contexts/LoginContext';
import { useProvideAuth } from './hooks/useProvideAuth';
import Layout from "./components/layouts/Layout";

import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

import Exercise from './pages/Exercise';

import Food from './pages/Food';

import TodoList from './pages/TodoList';
import TodoForm from './pages/TodoForm';
import TodoShare from './pages/TodoShare';

import Wannabe from './pages/Wannabe';

import My from './pages/My';
import MyInfoModify from './components/my/MyInfoModify';
import MyInfoUpdate from './components/my/MyInfoUpdate';
import MyShareList from './components/my/MyShareList';



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
          <Route path='/todolist/form' element={<TodoForm />} />
          <Route path='/todolist/share' element={<TodoShare />} />
          <Route path='/wannabe' element={<Wannabe />} />
          <Route path='/my' element={<My />} />
          <Route path='/my/update' element={<MyInfoUpdate />} />
          <Route path='/my/modify' element={<MyInfoModify />} />
          <Route path='/my/shareList' element={<MyShareList />} />
          {/*<Route path='*' element={<h1>Not Found</h1>} /> */}
        </Routes>
      </Layout>
    </LoginContext.Provider>
  );
}

export default App;
