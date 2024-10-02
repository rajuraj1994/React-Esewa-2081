import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'


const AdminSidebar = () => {
    const { user } = isAuthenticated()
    const navigate=useNavigate()
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex justify-content-end">
                    <div className="col-md-1 mt-3">
                        <button className="btn btn-success" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight">
                            Menu
                        </button>
                        <div className="offcanvas offcanvas-end bg-dark text-white" tabindex="-1" id="offcanvasRight"
                            aria-labelledby="offcanvasRightLabel" style={{ width: '300px' }}>
                            <div className="offcanvas-header">
                                <h5 id="offcanvasRightLabel">Admin Dashboard</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="list-unstyled">
                                    <li><NavLink activeclassname='active' to="#" className="text-decoration-none text-white">Dashboard</NavLink></li>
                                    <li><NavLink to="#" className="text-decoration-none text-white">Users</NavLink></li>
                                    <li><NavLink to="/admin/add-product" className="text-decoration-none text-white">Add Products</NavLink></li>
                                    <li><NavLink to="/admin/all-product" className="text-decoration-none text-white">All Products</NavLink></li>
                                    <li><NavLink to="/admin/add-category" className="text-decoration-none text-white"> Add Categories</NavLink></li>
                                    <li><NavLink to="#" className="text-decoration-none text-white">Orders</NavLink></li>
                                </ul>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="list-unstyled">
                                    <li><NavLink to="#" className="text-decoration-none text-white">
                                        <b>Name : </b> {user.name}
                                    </NavLink></li>
                                    <li><NavLink to="#" className="text-decoration-none text-white">
                                        <b>Email : </b> {user.email}
                                    </NavLink></li>
                                </ul>
                                <li className='list-unstyled'>
                                    <button className='btn btn-danger'
                                        onClick={() => signout(() => {
                                            navigate('/signin')

                                        })}
                                    >Logout</button>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminSidebar