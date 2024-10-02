import React from 'react'
import { isAuthenticated } from '.'

const Profile = () => {
    const { user } = isAuthenticated()
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div>
                        <h1>User Information</h1>
                        <h3>{user.name}</h3>
                        <h4>{user.email}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile