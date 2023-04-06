import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../../../Styles/Utilisateur/Projet/DetailProjet.css"
import AddTache from '../../Composant/Utilisateur/AddTache';
import moment from 'moment';
import AddUserProjet from '../../Composant/Utilisateur/AddUserProjet';
import axios from 'axios';
import Loading from '../../Composant/Utilisateur/Loading';
import { RingProgress, Text, SimpleGrid, Paper, Center, Group } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

const DetailProjet = () => {

    const [add, setAdd] = useState(false)
    const [adduser, setAdduser] = useState(false)
    const [projetinfo, setProjetinfo] = useState()
    const [participants, setParticapants] = useState([])
    const [taches, setTaches] = useState([])
    const [pourcentage, setPourcentage] = useState(0)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()



    useEffect(() => {

        (async function () {
            try {
                const response = await axios.get(`/api/user/projet/liste-projet/detail-projet/${id}`);

                if(response.data.status === 200) {

                    setProjetinfo(response.data.infoprojet)
                    setParticapants(response.data.participant)
                    setTaches(response.data.totaltaches)
                    setPourcentage(response.data.pourcentage)
                    setLoading(false)

                 } else if (response.data.status === 404) {

                      navigate("/")

                 }
            } catch (error) {
                 console.log(error);
            }
       })();
    },[])

    const validerTache = async (id) => {

        try {
            const response = await axios.patch(`/api/user/tache/detail-tache/${id}`, {status : "valider"})

            if(response.data.status == 200) {

                alert(response.data.message)
            }
        } catch (error) {

            console.log(error);
        }
    }

    const icons = {
        up: IconArrowUpRight,
        down: IconArrowDownRight,
    };

    return (
        <div>
            <div className='header_projet'>
                <div className='button_action'>
                    <button className='active'>Tous</button>
                    <button>Docs</button>
                    <button>Doc uploadé</button>
                    <button>Doc annulé</button>
                    <button>Doc validé</button>
                    {
                        pourcentage == 100 ? "" :
                        <div className='lien_ajout'>
                            <Link to="" onClick={() => setAdduser(true)} className='ajout'>+</Link>
                        </div>
                    }
                </div>
                {adduser && <AddUserProjet projet={projetinfo.id} modal={() => setAdduser(false)}/>}
                <div className='rechercher_div'>
                    <input type="text" placeholder='Entrer votre recherche ici ...'/>
                </div>
            </div>
            <div className='taches'>
                {
                    loading ? <Loading /> :
                    <>
                        <div className='header_tache'>
                            <div className='header_nom'>
                                <p className='titre_projet'>{projetinfo && projetinfo.nom_projet}</p>
                                <p className='date'>{"Date de debut : " + moment(`${projetinfo && projetinfo.date_debut}`).locale("fr").format('dddd, MMMM YYYY')}</p>
                                <p className='date'>{"Date de fin : " + moment(`${projetinfo && projetinfo.date_fin}`).locale("fr").format('dddd, MMMM YYYY')}</p>
                            </div>
                            {/* <div className='header_evolution'> */}
                                {/* <div className={projetinfo && projetinfo.statut_projet === "Terminer" ? "cercle vert" : "cercle rouge"}>
                                    <p>{pourcentage.toFixed(2) + "%"}</p>
                                </div> */}
                                <SimpleGrid cols={1} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                    <Paper withBorder radius="md" p="xs">
                                        <Group>
                                            <RingProgress
                                                size={80}
                                                roundCaps
                                                thickness={8}
                                                sections={[{ value: pourcentage.toFixed(2),  color: `${projetinfo.statut_projet === "Terminer" ? "green" : "red"}` }]}
                                                label={
                                                <Center>
                                                    {
                                                        projetinfo.statut_projet === "Terminer" ?
                                                        <IconArrowUpRight stroke={1.5} weight={900} color='green' size="2.3rem" />
                                                        :
                                                        <IconArrowDownRight color='red' size="2.3rem" strok={1.5} />
                                                    }
                                                </Center>
                                                }
                                            />
                                            <div>
                                                <Text color={projetinfo.statut_projet === "Terminer" ? "green" : "red"} size="1.1rem" transform="uppercase" weight={700}>
                                                    {projetinfo && projetinfo.statut_projet}
                                                </Text>
                                                <Text weight={700} size="xl">
                                                {pourcentage.toFixed(2) + " %"}
                                                </Text>
                                            </div>
                                        </Group>
                                    </Paper>
                                </SimpleGrid>
                            {/* </div> */}
                        </div>
                        <div className='container_information'>
                            <div className='tache_infos'>
                                <div>
                                    <p className="title">Product owner</p>
                                    <p>{projetinfo && projetinfo.chef_projet}</p>
                                </div>
                                <div>
                                    <p className="title">Chef de l'equipe</p>
                                    <p>{projetinfo && projetinfo.user.name + ' ' + projetinfo.user.prenom}</p>
                                </div>
                                <div>
                                    <p className="title">Description du projet</p>
                                    <p>
                                        {
                                            projetinfo && projetinfo.description_projet
                                        }
                                    </p>
                                </div>
                                <div>
                                    <p className="title">La team projet</p>
                                    {
                                        participants && participants.map((participant, index) => {
                                            return (
                                                <p key={index}>{participant.name + " " + participant.prenom}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='container_tache'>
                                {
                                    pourcentage == 100 ? "" :
                                    <div className='add_btn'>
                                        <Link to="" className='add' onClick={() => setAdd(true)}>Ajouter tache</Link>
                                        <Link to="" className='add'>Ajouter document</Link>
                                    </div>
                                }
                                {add && <AddTache projet={`${projetinfo && projetinfo.id}`} modal={() => setAdd(false)}/>}
                                <div className='cards_tache'>
                                    {
                                        taches.length == 0 ? "Pas de tache pour ce projet" :

                                        taches.map((tache, index) => {

                                            return (
                                                <div className="card_tache" key={index}>
                                                    <div className='numero_tache'>
                                                        <h2>{"Tache" + " " + `${index}`}</h2>
                                                    </div>
                                                    <div className='nom_title'>
                                                        <p className="title">Nom de la tache</p>
                                                        <p>{tache && tache.taches.titre}</p>
                                                    </div>
                                                    <div className='description'>
                                                        <p className="title">Description</p>
                                                        <p>
                                                        {tache && tache.taches.description_tache}
                                                        </p>
                                                    </div>
                                                    <div className='date_tache'>
                                                        <div>
                                                            <p className="title">Date de debut</p>
                                                            <p>{tache && tache.taches.date_debut}</p>
                                                        </div>
                                                        <div>
                                                            <p className="title">Date de fin</p>
                                                            <p>{tache && tache.taches.date_fin}</p>
                                                        </div>
                                                    </div>
                                                    <div className='realisation'>
                                                        <p className="title">Team de realisation</p>
                                                        <div className='liste_user'>
                                                            {
                                                                tache && tache.totaux.map((user, index) => {
                                                                    return (
                                                                        <p key={index}>{user.name + ' ' + user.prenom}</p>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='btn_valider'>
                                                        {
                                                            tache.taches.status_tache === "valider" ? "Tache terminer" :
                                                            <>
                                                                <button className='valider' onClick={() =>validerTache(tache.taches.id)}>Valider</button>
                                                                <Link to={""} className="modifier">Modifier</Link>
                                                                <button className='supprimer'>Supprimer</button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default DetailProjet;
