import React from 'react'
import { isAuthenticated } from '.'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'


const UserRoute = () => (
    isAuthenticated() && isAuthenticated().user.role === 0 ?
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
        : (
            <Navigate to='/signin' />
        )
)

export default UserRoute