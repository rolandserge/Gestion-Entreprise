import axios from 'axios';
import React, { useRef } from 'react';

const AddRole = () => {

    const roleRef = useRef()
    const statusRef = useRef()
    const descriptionRef = useRef()

    const AddRole = async (e) => {
        e.preventDefault()

        const role = roleRef.current.value
        const status = statusRef.current.value
        const description = descriptionRef.current.value

        try {
            const response = await axios.post("/api/admin/add-role", {role: role, status: status, description: description})

            if(response.data.status == 422) {

                alert(response.data.error)

            } else if(response.data.status == 200) {

                alert(response.data.message)
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={AddRole}>
                <div>
                    <select name="" ref={roleRef} id="">
                        <option value="PDG founder">PDG founder</option>
                        <option value="Personnel">Personnel</option>
                        <option value="Chef de service">Chef de service</option>
                        <option value="Directeur General">Directeur General</option>
                        <option value="Secretaire Generale">Secretaire Generale</option>
                        <option value="Tresoriere">Tresorier(e)</option>
                    </select>
                </div>
                <div>
                    <select name="statut" id="" ref={statusRef}>
                        <option value="">-- Choississez votre statut</option>
                        <option value="Afficher">Afficher</option>
                        <option value="Masquer">Masquer</option>
                        <option value="Neutre">Neutre</option>
                    </select>
                </div>
                <div>
                    <textarea name="description" id="" ref={descriptionRef} cols="50" rows="5">
                    </textarea>
                </div>
                <div>
                    <button>Ajouter le role</button>
                </div>
            </form>
        </div>
    );
};

export default AddRole;
