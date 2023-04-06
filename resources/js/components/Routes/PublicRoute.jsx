import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {

    const [auth, setAuth] = useState(false)
    const [Loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)

    useEffect(() => {

        if(user) {
            setAuth(true)
            setLoading(false)
        } else {
            setAuth(false)
            setLoading(false)
        }

    }, [user])

    if(Loading) {
        return <div>Loading ...</div>
    }

    return (
        auth ? <Navigate to='/user/projets/view-projets' /> : <Outlet />
    );


};

export default PublicRoute;
