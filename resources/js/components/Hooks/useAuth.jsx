import React, { useContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const useAuth = () => {

    // const navigate = useNavigate()

    const [userData, setUserdata] = useState({signedIn: false, user: null})

    const { setAuthData } = useContext(AuthContext);
    // console.log( typeof setAuthData);

    // useEffect(() => {

    //     setAuthData(userData);

    // }, [userData.signedIn]);



    function setAsLogged(user) {

        const cookie = new Cookies();
        cookie.set('is_auth', true, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
        setUserdata({signedIn: true, user});

        // navigate('/user/projets/view-projets');
        console.log('ca marche bien');
    }

    function setLogout() {

        const cookie = new Cookies();

        cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
        setUserdata({signedIn: false, user: null});
        // navigate('/');
        return console.log('deconnexion');
    }

    function loginUserOnStartup()
    {
        const cookie = new Cookies();

        if(cookie.get('is_auth')) {

            axios.post('/api/me').then(response => {

                setUserdata({signedIn: true, user: response.data.user});

                // navigate('/user/projets/view-projets');
                return console.log('user connecter');

            }).catch(error => {

                setUserdata({signedIn: false, user: null});
                return setLogout();

            });
        } else {

            setUserdata({signedIn: false, user: null});
            // navigate('/');
            console.log('user deconnecter');

        }
    }
    return (
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup
    );
};

export default useAuth;
