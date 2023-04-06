import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../../Styles/Utilisateur/User/ListUser.css"
import axios from 'axios';
import Loading from '../../Composant/Utilisateur/Loading';

const ListUser = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get("/api/user/liste-user");

                if(response.data.status === 200) {

                    setUsers(response.data.personnel)
                    setLoading(false)

                 } else if (response.data.status === 404) {

                      // swal("Error",response.data.message)
                 }
            } catch (error) {
                 console.log(error);
            }
       })();
    }, [])

    return (
        <div className='users_container'>
            <div className='header_projet'>
                <div className='button_action'>
                    <button className='active'>Tous</button>
                    <button>Membre de mn service</button>
                    <button>Membre Libre</button>
                    <button>Membre Occupe</button>
                </div>
                <div className='rechercher_div'>
                    <input type="text" placeholder='Entrer votre recherche ici ...'/>
                </div>
            </div>
            <div className='cards_projet'>
                {
                    loading ? <Loading /> : users.map((user) => {
                        return (
                            <div className='card_user' key={user.personnel.id}>
                                <div className='card_head'>
                                    <div className='profil'>
                                        <img src={`http://127.0.0.1:8000/${user.personnel.photo_profil}`} alt="" />
                                    </div>
                                    <div className='data_user'>
                                        <p className='user_nom'>{user.personnel.name+ ' '+ (user.personnel.prenom).split(0, 2)}</p>
                                        <p className='fonction'>{user.personnel.fonction}</p>
                                        <p className={user.status == 0 ? 'statut' : 'statut occuper'}>{user.status == 0 ? 'personnel libre' : 'personnel occuper'}</p>
                                    </div>
                                </div>
                                <div className='cards_techno'>
                                    <p className='techno_titre'>Technologies utilisées</p>
                                    <div className='card_techno'>
                                        <p>HTML</p>
                                        <p>Css</p>
                                        <p>React js</p>
                                        <p>Javascript</p>
                                        <p>Php</p>
                                        <p>Laravel</p>
                                        <p>Node js</p>
                                        <p>Mysql</p>
                                    </div>
                                </div>
                                <div className='stat_user'>
                                    <p>{user.nb_projet == 0 || user.nb_projet == 1 ? user.nb_projet + ' projet' : user.nb_projet + ' projets'}</p>
                                    <p>{user.personnel.service.nom_service}</p>
                                </div>
                                <div className='btn_user'>
                                    <Link to={""} className="btn">Voir plus</Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ListUser;
