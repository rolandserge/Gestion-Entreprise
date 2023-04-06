import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { createContext } from 'react';

export const AuthContext = createContext()

function AuthProvider({children}) {

        const [isLogin, setIsLogin] = useState(false)
        const [user, setUser] = useState([])

        const checkLogin = async () => {

            const cookie = new Cookies();

            if(cookie.get('is_auth')) {

                try {

                    const response = await axios.post('/api/me')

                    if(response.data.status == 200) {

                        setIsLogin(true)
                        setUser(response.data.user)

                    } else {

                        setIsLogin(false);
                        setUser(null)
                        alert("Veillez vous re-connecter s'il vous plait")
                    }
                } catch (error) {
                    console.log(error);
                }

            } else {
                // setUserdata({signedIn: false, user: null});
                setIsLogin(false);
                setUser(null)
                // console.log('user deconnecter');
            }

        }
        useEffect(() => {

            checkLogin()

        }, [])

        const setSession = async (data) => {

            const cookie = new Cookies();
            cookie.set('is_auth', true, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
            // setUserdata({signedIn: true, user});
            setIsLogin(true)
            setUser(data)

            // console.log('ca marche bien');
        }

        function getAuthCookieExpiration()
        {
            let date = new Date();
            date.setTime(date.getTime() + (30 * 60 * 1000));  // 7 days
            return date;
        }

        const logout = async () => {

            const cookie = new Cookies();
            cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
            try {
                const response = await axios.post('/api/logout')

                if(response.data.status == 200) {

                    setIsLogin(false)
                    setUser(null)
                }
            } catch (error) {

                console.log(error);
            }
        }

        const getUser = async () => {
            return user
        }

        return(
            <AuthContext.Provider value={{user, setIsLogin, setUser, setSession, getAuthCookieExpiration, logout, getUser, isLogin}}>
                {children}
            </AuthContext.Provider>
        )
    }
export default AuthProvider

