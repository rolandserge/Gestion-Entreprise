import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const AddUser = () => {

    const [roles, setRoles] = useState([])
    const [services, setServices] = useState([])

    useEffect(() => {

        (async function () {
            try {
                const response = await axios.get("/api/admin/adduser/data-partial");

                if(response.data.status === 200) {

                      setRoles(response.data.roles)
                      setServices(response.data.services)

                 } else if (response.data.status === 404) {

                      // swal("Error",response.data.message)
                 }
            } catch (error) {
                 console.log(error);
            }
       })();

    }, [])

    const nomRef = useRef()
    const prenomRef = useRef()
    const emailRef = useRef()
    const roleRef = useRef()
    const fonctionRef = useRef()
    const serviceRef = useRef()
    const numeroRef = useRef()
    const imageRef = useRef()
    const sexeRef = useRef()
    const passwordRef = useRef()

    const AddUser = async(e) => {

        e.preventDefault()

        const formData = new FormData();

        formData.append("nom", nomRef.current.value)
        formData.append("prenom", prenomRef.current.value)
        formData.append("email", emailRef.current.value)
        formData.append("role", roleRef.current.value)
        formData.append("fonction", fonctionRef.current.value)
        formData.append("service", serviceRef.current.value)
        formData.append("numero", numeroRef.current.value)
        formData.append("sexe", sexeRef.current.value)
        formData.append("image", imageRef.current.files[0])
        formData.append("password", passwordRef.current.value)
        // formData.append('_method', 'POST');

        axios.get('/sanctum/csrf-cookie').then()
        try {

            const response = await axios.post('/api/admin/user/add-user', formData)

            if(response.data.status == 422) {

                console.log(response.data.errors)

            } else if(response.data.status == 200) {

                alert(response.data.message)
                document.getElementById('form').reset();
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <form action="" onSubmit={AddUser} id="form">
                <div>
                    <input type="text" required name="" ref={nomRef} placeholder="Entrer votre nom"/>
                </div>
                <div>
                    <input type="text" required name="" ref={prenomRef} placeholder="Entrer votre prenom"/>
                </div>
                <div>
                    <input type="email" required name="" ref={emailRef} placeholder="Entrer votre adresse e-mail"/>
                </div>
                <div>
                    <select name='' ref={roleRef}>
                        <option value="">--- Choississez votre role ---</option>
                        {
                            roles && roles.map((role) => {
                                return (

                                    <option key={role.id} value={role.id}>{role.nom_role}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <select name="" ref={serviceRef}>
                        <option value="">--- Choississez votre service ---</option>
                        {
                            services && services.map((service) => {
                                return (

                                    <option key={service.id} value={service.id}>{service.nom_service}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <select name="" ref={fonctionRef}>
                        <option value="">--- Choississez votre fonction ---</option>
                        <option value="Developpeur Front-End">Developpeur Front-End</option>
                        <option value="Developpeur Back-End">Developpeur Back-End</option>
                        <option value="Developpeur FullStack">Developpeur FullStack</option>
                        <option value="UI/UX Designeur">UI/UX Designeur</option>
                        <option value="Modeliseur 2d/3d">Modeliseur 2d/3d</option>
                        <option value="Community manager">Community manager</option>
                    </select>
                </div>
                <div>
                    <input type="number" required ref={numeroRef} name="" placeholder='Entrer votre numero de telephone'/>
                </div>
                <div>
                    <input type="file" required ref={imageRef} name=""/>
                </div>
                <div>
                    <select name="" ref={sexeRef}>
                        <option value="">-- Votre genre --</option>
                        <option value="Femme">Femme</option>
                        <option value="Homme">Homme</option>
                    </select>
                </div>
                <div>
                    <input type="password" required ref={passwordRef} name="" placeholder='Entrer votre mot de passe'/>
                </div>
                <div>
                    <button>Ajouter un user</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
