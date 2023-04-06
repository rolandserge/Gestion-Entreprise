import React, { useContext, useEffect, useRef, useState } from 'react';
import { MultiSelect } from '@mantine/core';
import "../../../Styles/Utilisateur/Tache/AddTache.css"
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../Context/AuthContext';

const AddTache = ({projet, modal}) => {

    const nomRef = useRef()
    const debutRef = useRef()
    const finRef = useRef()
    const descriptionRef = useRef()
    const [value, setValue] = useState([])
    const [users, setUsers] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {

            (async function () {
                try {
                    const response = await axios.get(`/api/user/projet/liste-user/${projet}`);

                    if(response.data.status === 200) {

                        setUsers(response.data.users)

                     } else if (response.data.status === 404) {
                     }
                } catch (error) {
                     console.log(error);
                }
           })();

    }, [])

    const AddTache = async (e) => {

        e.preventDefault();
        const nom = nomRef.current.value
        const debut = debutRef.current.value
        const fin = finRef.current.value
        const description = descriptionRef.current.value

        const date = new Date().toLocaleDateString()

        if(debut >  fin ) {

            alert("la date de debut est superieur a la date de fin")

        }else if (value.length < 2) {

            alert("Il doit avoir au mininum 2 participants sur un projet")

        }else if(moment(debut).locale("fr").format('DD/MM/YYYY') < date ) {

            alert("La date de debut est deja passée " + debut)

        }else {

            try {
                const response = await axios.post("/api/user/taches/add-tache", {
                    titre: nom, description: description, participant: value, fin: fin, debut: debut, scrum: user[0].id, projet: projet
                });

                if(response.data.status == 200) {

                    alert(response.data.message);
                  document.querySelector('#form').reset()


                 } else if (response.data.status === 422) {

                      console.log(response.data.error);
                 }

            } catch (error) {

                 console.log(error);
            }
        }
    }

    return (
        <div className='add_tache_container'>
            <form action="" className='add_tache_user' id='form' onSubmit={AddTache}>
                <div className='header_tache_div'>
                    <p>Ajouter une tache</p>
                    <p onClick={modal} className="x_btn">X</p>
                </div>
                <div className='tache_div_identique_nom'>
                    <label htmlFor="">Entrer le nom de la tache</label>
                    <input type="text" ref={nomRef} placeholder='Entrer le nom de la tache'/>
                </div>
                <div className='tache_div_identique'>
                    <label htmlFor="">Entrer la date de debut</label>
                    <input type="date" name="" ref={debutRef}/>
                </div>
                <div className='tache_div_identique'>
                    <label htmlFor="">Entrer la date de fin</label>
                    <input type="date" name="" ref={finRef} />
                </div>
                <div className='tache_user_part'>
                    <MultiSelect
                            data={users.map((user) => ({value: user.id, label: user.name + " " + user.prenom}))}
                            label="Choisissez vos participants"
                            placeholder="Choisissez les participants"
                            searchable
                            className="select"
                            required="required"
                            value={value}
                            onChange={setValue}
                            clearable
                        />
                </div>
                <div className='description_tache'>
                    <label htmlFor="">Entrer la description</label>
                    <textarea name="" ref={descriptionRef} cols="30" rows="10" placeholder='Entrer la description de la tache'></textarea>
                </div>
                <div className='add_tache_btn'>
                    <button>Ajouter la tache</button>
                </div>
            </form>
        </div>
    );
};

export default AddTache;
