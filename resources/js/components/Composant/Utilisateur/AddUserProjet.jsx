import React, { useEffect, useState } from 'react';
import { MultiSelect } from '@mantine/core';

const AddUserProjet = ({projet, modal}) => {

    const [users, setUsers] = useState([])

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

    return (
        <div className='add_tache_container'>
            <form action="" className='add_tache_user'>
                <div className='header_tache_div'>
                    <p>Ajouter un personnel</p>
                    <p onClick={modal} className="x_btn">X</p>
                </div>
                <div className='tache_user_part'>
                    <MultiSelect
                            data={['Serge-Roland Koffi Komenan','Kouakou kouamé Aime Venance', 'Adou Landry Jules Koffi', 'Serge-Roland Komenan', 'Serge-Roland Koffi Komenan', 'Serge-Roland Koffi tache Komenan', 'Serge-Roland Bonjour Komenan', 'Serge-Roland Bonsoir Komenan']}
                            label="Choisissez vos participants"
                            placeholder="Choisissez les participants"
                            searchable
                            className="select"
                            required="required"
                            // clearButtonLabel="Aucun particpant choisi"
                            clearable
                            // nothingFound="Nothing found"
                        />
                </div>
                <div className='add_tache_btn'>
                    <button>Ajouter un personnel</button>
                </div>
            </form>
        </div>
    );
};

export default AddUserProjet;
