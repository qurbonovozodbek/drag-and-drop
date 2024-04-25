import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function Layout() {
    const navigate = useNavigate()
  return (
    <div className='container'>
        <header>
            <NavLink to="/"> Drag and Drop </NavLink>
            <NavLink to="/Pagination"> Pagination </NavLink>
            <NavLink to="/Scrol"> Scroll </NavLink>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
    </div>
  )
}

export default Layout