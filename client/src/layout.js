import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';
const layout = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default layout