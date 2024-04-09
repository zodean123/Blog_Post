import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';



function Header() {
  const [curLogin, setCurLogin] = useState()
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    console.log(token)
    setCurLogin(token);
  }, []); 

  useEffect(() => {
    setTimeout(() => {
      console.log(curLogin);
    }, 3000);
  }, [curLogin]); 
  
  return (
    <>
    <header>
    <Link to="/" className = "logo">MyBlog</Link>
    <nav>
      <Link to="/login">
        {
          curLogin ? "Logout" : 'Login'
        }
        
        </Link>
      <Link to="/register">Register</Link>
    </nav>
  </header>
  </>
  )
}

export default Header

