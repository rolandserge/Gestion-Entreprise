import React from 'react';
import "../../../Styles/Utilisateur/Sidebar.css"
import Image from "../../../Assets/money.png"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Deconnexion from "../../../Assets/deconnexion.png"
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Cookies } from "react-cookie"

const Sidebar = () => {

    const {user, setIsLogin, setUser, getAuthCookieExpiration} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const logout = async () => {

        const cookie = new Cookies();
        cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});

        try {

            await axios.post('/api/logout').then((res) => {

                if(res.data.status == 200) {
                    setIsLogin(null)
                    setUser(null)
                    navigate('/')
                }
            }

            )
        } catch (error) {

            console.log(error);
        }
    }

    return (
        <div className='sidebar_div'>
            <div className='container_logo'>
                <div className="logo">
                   <h3>Banane</h3>
                </div>
            </div>
            <div className='elements'>
                <div>
                    <div className='user_profil'>
                        <div className='photo'>
                            <img src={user?.length > 0 ? `http://127.0.0.1:8000/${user[0]?.photo_profil}` : ''} alt="" />
                        </div>
                        <div>
                            <h3>{user?.length > 0 ? user[0]?.name : "" } {user?.length > 0 ? user[0]?.prenom : ''}</h3>
                        </div>
                        <div>
                            <p>{user?.length > 0 ? user[0]?.fonction : ""}</p>
                        </div>
                    </div>
                    <div className='listes_elements'>
                        <Link to="/user/projets/view-projets" className={location.pathname === "/user/projets/view-projets" ? "element_div active" : "element_div"}>
                            <div className="image_div">
                                <img src={Image} alt="" />
                            </div>
                            <div className='title'>
                                Projets
                            </div>
                        </Link>
                        <Link to="/user/service/view-service" className={location.pathname === "/user/service/view-service" ? "element_div active" : "element_div"}>
                            <div className="image_div">
                                <img src={Image} alt="" />
                            </div>
                            <div className='title'>
                                Services
                            </div>
                        </Link>
                        <Link to="/user/personnel/view-personnel" className={location.pathname === "/user/personnel/view-personnel" ? "element_div active" : "element_div"}>
                            <div className="image_div">
                                <img src={Image} alt="" />
                            </div>
                            <div className='title'>
                                Membres
                            </div>
                        </Link>
                        <Link to="/user/mon-profil" className={location.pathname === "/user/mon-profil" ? "element_div active" : "element_div"}>
                            <div className="image_div">
                                <img src={Image} alt="" />
                            </div>
                            <div className='title'>
                                Mon profil
                            </div>
                        </Link>
                        </div>
                    </div>
                    <div className='infos_div'>
                        <p className='service'>{user?.length > 0 ? user[0]?.service.nom_service : ''}</p>
                        <p className='titre'>{user?.length > 0 ? user[0]?.role.nom_role : ''}</p>
                    </div>

                <div className='deconnexion'>
                    <div className='user_deco' onClick={() => logout()}>
                        <img src={Deconnexion} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
