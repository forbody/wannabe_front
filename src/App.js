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
  // 로그인 하지 않은 경우: 무조건 <Landing />으로 이동
  return (
    <LoginContext.Provider value={auth}>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/exercise' element={auth.loginUser ? <Exercise/> : <Landing />}/>
          <Route path='/food' element={auth.loginUser ? <Food /> : <Landing />} />
          <Route path='/todolist' element={auth.loginUser ? <TodoList/> : <Landing />} />
          <Route path='/todolist/form' element={auth.loginUser ? <TodoForm /> : <Landing />} />
          <Route path='/todolist/share' element={auth.loginUser ? <TodoShare /> : <Landing />} />
          <Route path='/wannabe' element={auth.loginUser ? <Wannabe /> : <Landing />} />
          <Route path='/my' element={auth.loginUser ? <My /> : <Landing />} />
          <Route path='/my/update' element={auth.loginUser ? <MyInfoUpdate /> : <Landing />} />
          <Route path='/my/modify' element={auth.loginUser ? <MyInfoModify /> : <Landing />} />
          <Route path='/my/shareList' element={auth.loginUser ? <MyShareList />: <Landing />} />
          {/*<Route path='*' element={<h1>Not Found</h1>} /> */}
        </Routes>
      </Layout>
    </LoginContext.Provider>
  );
}

export default App;
