import React from 'react'
import { NavLink } from 'react-router-dom'
import { isAuthenticated,signout } from '../auth'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate=useNavigate()
    return (
        <>
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <NavLink to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <img src='/images/Daraz.png' alt='Daraz' width={'50'} />
                        </NavLink>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><NavLink exact='true' activeclassname='active' to="/" className="nav-link px-2 text-white">Home</NavLink></li>
                            <li><NavLink activeclassname='active' to="/product" className="nav-link px-2 text-white">Products</NavLink></li>
                            <li><NavLink activeclassname='active' to="/faq" className="nav-link px-2 text-white">FAQs</NavLink></li>
                            <li><NavLink activeclassname='active' to="/about" className="nav-link px-2 text-white">About</NavLink></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
                        </form>

                        <div className="text-end">
                            {!isAuthenticated() && (
                            <>
                             <NavLink to='/signin' className="btn btn-outline-light me-2">Login</NavLink>
                             <NavLink to='/register' className="btn btn-warning">Sign-up</NavLink>
                            </>
                        )}

                        {isAuthenticated() && (
                            <li className='list-unstyled'>
                                <button className='btn btn-danger'
                                onClick={()=>signout(()=>{
                                    navigate('/signin')

                                })}
                                >Logout</button>
                            </li>
                        )}
                           
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header