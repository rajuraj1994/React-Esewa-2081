import React from 'react'
import { isAuthenticated } from '.'
import { Navigate, Outlet } from 'react-router-dom'
import AdminSidebar from '../admin/AdminSidebar'


const AdminRoute = () => (
    isAuthenticated() && isAuthenticated().user.role === 1 ?
        <>
            <AdminSidebar />
            <Outlet />
        </>
        : (
            <Navigate to='/signin' />
        )
)

export default AdminRoute