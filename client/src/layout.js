import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
const layout = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
        <Footer/>
    </main>
  )
}

export default layout