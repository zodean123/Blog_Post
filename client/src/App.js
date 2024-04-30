import './App.css';
import IndexPage from './pages/indexpage';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Login from './pages/Login';
import Register from './pages/Register';
import UserContextProvider from './UserContext';

function App() {
  return (
    <UserContextProvider>
        <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path={'/register'} element={<Register/>} />
      </Route>
    </Routes>
    </UserContextProvider>
  

  );
}

export default App;
