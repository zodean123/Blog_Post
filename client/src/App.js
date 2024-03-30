import './App.css';
import Post from './post';
import  Header  from './header';
import  {Route, Routes} from 'react-router-dom';
import { Discovery } from 'aws-sdk';
function App() {
  return (
<Routes>
  <Route index element = {
<main>
  <Header/>
  <Post/>
  <Post/>
  <Post/>
</main>
  }/>
<Route path={'/login'} element = {
  <div>Login</div>
}/>
<Route path={'/register'} element = {
  <div>Register</div>
}/>
</Routes>
  
  );
}

export default App;
