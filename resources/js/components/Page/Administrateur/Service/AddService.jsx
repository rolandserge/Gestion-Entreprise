import axios from 'axios';
import React, { useRef, useState } from 'react';
import "../../../../Styles/Utilisateur/Service/AddService.css"

const AddService = () => {

    const serviceRef = useRef()
    const statutRef = useRef()
    const descriptionRef = useRef()
    const [errors, setErrors] = useState([])

    const AddService = async (e) => {

        e.preventDefault()

        const service = serviceRef.current.value
        const statut = statutRef.current.value
        const description = descriptionRef.current.value

        try {

            const response = await axios.post("/api/admin/add-service", {service: service, statut: statut, description: description})

            if(response.data.status == 422) {
                setErrors(response.data.error)
            } else if(response.data.status == 200) {

                alert(response.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={AddService}>
                <div>
                    <input type="text" name='service' ref={serviceRef}/>
                </div>
                <div>
                    <span>{errors?.service}</span>
                </div>
                <div>
                    <select name="statut" id="" ref={statutRef}>
                        <option value="">-- Choississez votre statut</option>
                        <option value="Afficher">Afficher</option>
                        <option value="Masquer">Masquer</option>
                        <option value="Neutre">Neutre</option>
                    </select>
                </div>
                <div>
                    <textarea name="description" id="" ref={descriptionRef} cols="30" rows="10">
                    </textarea>
                </div>
                <div>
                    <button>Ajouter le service</button>
                </div>
            </form>
        </div>
    );
};

export default AddService;
