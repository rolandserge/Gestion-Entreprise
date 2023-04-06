import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "../../../Styles/Utilisateur/Projet/VoirProjet.css"
import AddProjet from '../../Composant/Utilisateur/AddProjet';
import { Text, Progress, Card, Group, createStyles } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../../Composant/Utilisateur/Loading';

const useStyles = createStyles((theme) => ({

    card: {
        position: "relative",
        zIndex: 1,
        // background: 'transparent',
        // color: 'transparent',
        // color: 'white',
        // border: "1px solid",
        // backgroundColor: "white",
    }
}));

const ProjetUser = () => {

    const [add, setAdd] = useState(false)
    const [projets, setProjets] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get("/api/user/projet/liste-projet");

                if(response.data.status == 200) {

                      setProjets(response.data.projets)
                      setLoading(false)

                 } else if (response.data.status === 404) {

                      // swal("Error",response.data.message)
                 }
            } catch (error) {
                 console.log(error);
            }
       })();

    }, [])


    const { classes } = useStyles()

    return (
        <div className='user_projet'>
            <div className='header_projet'>
                <div className='button_action'>
                    <button className='active'>Tous</button>
                    <button>En cour</button>
                    <button>Finis</button>
                    <button>Particper</button>
                    <button>Annuler</button>
                    <div className='lien_ajout'>
                        <Link to="" onClick={() => setAdd(true)} className='ajout'>+</Link>
                    </div>
                    {
                        add ? <AddProjet modal={() => setAdd(false) }/> : ''
                    }
                </div>
                <div className='rechercher_div'>
                    <input type="text" placeholder='Entrer votre recherche ici ...'/>
                </div>
            </div>
            <div>
                <div className='cards_projet'>
                    {
                        loading ? <Loading /> : projets.map((projet, index) => {

                            return (
                                <div className='card' key={index}>
                                    <div className='name_entreprise'>
                                        {projet.projet.chef_projet}
                                    </div>
                                    <div className='card_infos'>
                                        <div className='intitule'>
                                            <p>{projet.projet.nom_projet}</p>
                                        </div>
                                        <Card className='card_evolution'>
                                            <Group position="apart" className={classes.card}>
                                                <Text size="sm" color="dimmed">
                                                    Evolution du projet
                                                </Text>
                                                <Text size="sm" color="dimmed">
                                                    {projet.pourcentage.toFixed(2) + " %"}
                                                </Text>
                                            </Group>
                                            <Progress className={classes.card} value={projet.pourcentage.toFixed(2)} mt="10px" size="lg" color={projet.projet.statut_projet === "Terminer" ? "green" : 'red'} radius="xl" />
                                        </Card>
                                        <div className='status_div'>
                                            <div className={projet.projet.statut_projet === "Terminer" ? "terminer" : 'status'}>
                                                {projet.projet.statut_projet}
                                            </div>
                                            <div className='etat'>
                                                Je participe pas
                                            </div>
                                        </div>
                                        <div className='voir_div'>
                                            <Link to={`/user/projets/detail-projet/${projet.projet.id}`} className='voirplus'>Voir plus</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ProjetUser;
