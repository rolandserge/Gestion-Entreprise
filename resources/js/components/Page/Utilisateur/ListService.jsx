import React from 'react';
import { Link } from 'react-router-dom';
import "../../../Styles/Utilisateur/Service/ListService.css"

const ListService = () => {
    return (
        <div>
            <div className='header_projet'>
                <div className='button_action'>
                    <button className='active'>Tous</button>
                    <button>Communication</button>
                    <button>Developpement web</button>
                    <button>2d / 3d</button>
                </div>
                <div className='rechercher_div'>
                    <input type="text" placeholder='Entrer votre recherche ici ...'/>
                </div>
            </div>
            <div>
                <div className='departements'>
                    <div className='departement'>
                        <p>Communication digitale</p>
                    </div>
                    <div className='services_cards'>
                        <div className='service_card'>
                            <div className='nom_service_card'>
                                <div className='rond'>

                                </div>
                                <p>Commnity management</p>
                            </div>
                            <div className='description'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Earum veritatis, ullam quibusdam natus assumenda cupiditate
                                    culpa magni delectus corrupti eaque unde molestias eum cumque debitis similique
                                    necessitatibus rerum dignissimos ipsa ex, totam vel praesentium odio voluptatibus
                                    velit! Fugiat inventore perspiciatis assumenda? Eos, magni exercitationem perspiciatis
                                    adipisci minima omnis cumque hic.
                                </p>
                            </div>
                        </div>
                        <div className='service_card'>
                            <div className='nom_service_card'>
                                <div className="rond">

                                </div>
                                <p>Infographie</p>
                            </div>
                            <div className='description'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Earum veritatis, ullam quibusdam natus assumenda cupiditate
                                    culpa magni delectus corrupti eaque unde molestias eum cumque debitis similique
                                    necessitatibus rerum dignissimos ipsa ex, totam vel praesentium odio voluptatibus
                                    velit! Fugiat inventore perspiciatis assumenda? Eos, magni exercitationem perspiciatis
                                    adipisci minima omnis cumque hic.
                                </p>
                            </div>
                        </div>
                        <div className='service_card'>
                            <div className='nom_service_card'>
                                <div className="rond">

                                </div>
                                <p>Videographie</p>
                            </div>
                            <div className='description'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Earum veritatis, ullam quibusdam natus assumenda cupiditate
                                    culpa magni delectus corrupti eaque unde molestias eum cumque debitis similique
                                    necessitatibus rerum dignissimos ipsa ex, totam vel praesentium odio voluptatibus
                                    velit! Fugiat inventore perspiciatis assumenda? Eos, magni exercitationem perspiciatis
                                    adipisci minima omnis cumque hic.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='departement'>
                        <p>Developpement web</p>
                    </div>
                    <div className='services_cards'>
                        <div className='service_card'>
                            <div className='nom_service_card'>
                                <div className='rond'>

                                </div>
                                <p>Developpement Fron-end</p>
                            </div>
                            <div className='description'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Earum veritatis, ullam quibusdam natus assumenda cupiditate
                                    culpa magni delectus corrupti eaque unde molestias eum cumque debitis similique
                                    necessitatibus rerum dignissimos ipsa ex, totam vel praesentium odio voluptatibus
                                    velit! Fugiat inventore perspiciatis assumenda? Eos, magni exercitationem perspiciatis
                                    adipisci minima omnis cumque hic.
                                </p>
                            </div>
                        </div>
                        <div className='service_card'>
                            <div className='nom_service_card'>
                                <div className="rond">

                                </div>
                                <p>Developpement Back-end</p>
                            </div>
                            <div className='description'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Earum veritatis, ullam quibusdam natus assumenda cupiditate
                                    culpa magni delectus corrupti eaque unde molestias eum cumque debitis similique
                                    necessitatibus rerum dignissimos ipsa ex, totam vel praesentium odio voluptatibus
                                    velit! Fugiat inventore perspiciatis assumenda? Eos, magni exercitationem perspiciatis
                                    adipisci minima omnis cumque hic.
                                </p>
                            </div>
                        </div>
                        <div className='service_card'>
                            <div className='nom_service_card'>
                                <div className="rond">

                                </div>
                                <p>Developpement Back-end</p>
                            </div>
                            <div className='description'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Earum veritatis, ullam quibusdam natus assumenda cupiditate
                                    culpa magni delectus corrupti eaque unde molestias eum cumque debitis similique
                                    necessitatibus rerum dignissimos ipsa ex, totam vel praesentium odio voluptatibus
                                    velit! Fugiat inventore perspiciatis assumenda? Eos, magni exercitationem perspiciatis
                                    adipisci minima omnis cumque hic.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='departement'>
                        <p>Modelisation d'objet</p>
                    </div>
                    <div className='services_cards'>
                        <div className='service_card'>
                            <div className='nom_service_card'>
                                <div className='rond'>

                                </div>
                                <p>Modelisation 2d</p>
                            </div>
                            <div className='description'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Earum veritatis, ullam quibusdam natus assumenda cupiditate
                                    culpa magni delectus corrupti eaque unde molestias eum cumque debitis similique
                                    necessitatibus rerum dignissimos ipsa ex, totam vel praesentium odio voluptatibus
                                    velit! Fugiat inventore perspiciatis assumenda? Eos, magni exercitationem perspiciatis
                                    adipisci minima omnis cumque hic.
                                </p>
                            </div>
                        </div>
                        <div className='service_card'>
                            <div className='nom_service_card'>
                                <div className="rond">

                                </div>
                                <p>Modelisation 3d</p>
                            </div>
                            <div className='description'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Earum veritatis, ullam quibusdam natus assumenda cupiditate
                                    culpa magni delectus corrupti eaque unde molestias eum cumque debitis similique
                                    necessitatibus rerum dignissimos ipsa ex, totam vel praesentium odio voluptatibus
                                    velit! Fugiat inventore perspiciatis assumenda? Eos, magni exercitationem perspiciatis
                                    adipisci minima omnis cumque hic.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListService;
