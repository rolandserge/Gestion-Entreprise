import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Login from "../Page/Auth/Login"

const ProtectedRoute = () => {

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


        auth ? <Outlet /> : <Navigate to='/' />
    )

};

export default ProtectedRoute;
