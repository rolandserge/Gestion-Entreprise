import React, { useEffect, useRef, useState } from 'react';
import { MultiSelect } from '@mantine/core';
import "../../../Styles/Utilisateur/Projet/AddProjet.css"
import axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const AddProjet = ({modal}) => {

    const [users, setUsers] = useState([])
    const [value, setValue] = useState([]);

    const nomRef = useRef()
    const ownerRef = useRef()
    const chefRef = useRef()
    const debutRef = useRef()
    const finRef = useRef()
    const descriptionRef = useRef()

    const { user } = useContext(AuthContext)

    useEffect(() => {

        (async function () {
            try {
                const response = await axios.get("/api/user/liste-user");

                if(response.data.status === 200) {

                      setUsers(response.data.personnel)
                    //   console.log(response.data.personnel);

                 } else if (response.data.status === 404) {

                      // swal("Error",response.data.message)
                 }
            } catch (error) {
                 console.log(error);
            }
       })();
    }, [])
    const Addprojet = async(e) => {

        e.preventDefault()
        const name = nomRef.current.value
        const owner = ownerRef.current.value
        const chef = chefRef.current.value
        const debut = debutRef.current.value
        const fin = finRef.current.value
        const description = descriptionRef.current.value

        const date = new Date().toLocaleDateString()
        // console.log("date actuelle " + date);
        var error = ""

        // console.log("debut " + moment(debut).locale("fr").format('DD/MM/YYYY'));
        var filter = value.filter((x) => x == chef)

        if(filter.length == 0) {

            error = "Le chef d'equipe doit apparaitre dans la liste des participantts"
        }

        if(error) {

            alert(error)

        }else if(debut >  fin ) {

            alert("la date de debut est superieur a la date de fin")

        }else if(moment(debut).locale("fr").format('DD/MM/YYYY') < date ) {

            alert("La date de debut est deja passée " + debut)

        } else if(value.length < 4) {

            alert('Il doit avoir au mininum 4 particpant par projet')
        } else {

            try {
                const response = await axios.post("/api/user/projet/add-projet", {
                    name: name, owner: owner, description: description, service: user[0].service_id, participant: value, fin: fin, debut: debut, chef: chef
                });

                if(response.data.status === 200) {

                    //   setUsers(response.data.personnel)
                    alert(response.data.message);
                    //   console.log(response.data.personnel);

                 } else if (response.data.status === 422) {

                      // swal("Error",response.data.message)
                      console.log(response.data.error);
                 }

            } catch (error) {
                 console.log(error);
            }
        }
    }

    return (
        <div className='add_projet_container'>
            <form action="" className='add_projet' onSubmit={Addprojet}>
                <div className='fermer'>
                    <p>Ajouter un projet</p>
                    <p onClick={modal} className='modal'>X</p>
                </div>
                <div className='projet_nom'>
                    <label htmlFor="">Entrer le nom du projet</label>
                    <input type="text" ref={nomRef} placeholder='Entrer le nom du projet'/>
                </div>
                <div className='division'>
                    <label htmlFor="">Entrer le Product Owner</label>
                    <input type="text" ref={ownerRef} placeholder="Entrer le nom de l'entreprise"/>
                </div>
                <div className='division'>
                    <label htmlFor="">Choissez le chef de projet</label>
                    <select name="" ref={chefRef}>
                        <option value="">--- Choisissez le chef ---</option>
                        {
                            users.map((user) => {
                                return (
                                    <option key={user.personnel.id} value={user.personnel.id}>{user.personnel.name+ " "+ user.personnel.prenom}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='division'>
                    <label htmlFor="">Choisissez la date debut</label>
                    <input type="date" ref={debutRef} />
                </div>
                {/* <div className='add_projet_date'> */}
                <div className='division'>
                    <label htmlFor="">Choisissez la date de fin</label>
                    <input type="date" ref={finRef} />
                </div>
                <div className='multi_div'>
                    <MultiSelect
                        data={users.map((user) => ({value: user.personnel.id, label: user.personnel.name + ' ' + user.personnel.prenom}))}
                        label="Choisissez vos participants"
                        placeholder="Choisissez les participants"
                        searchable
                        required="required"
                        value={value}
                        onChange={setValue}
                        // clearButtonLabel="Aucun particpant choisi"
                        clearable
                        // nothingFound="Nothing found"
                    />
                </div>
                {/* </div> */}
                <div className='description_add_projet'>
                    <label htmlFor="">Entrer la description du projet</label>
                    <textarea name="" ref={descriptionRef} cols="30" placeholder='Entrer la description du projet' rows="10"></textarea>
                </div>
                <div className='add_projet_btn'>
                    <button>Ajouter projet</button>
                </div>
            </form>
        </div>
    );
};

export default AddProjet;
