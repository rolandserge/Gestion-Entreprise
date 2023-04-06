import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddRole from '../Page/Administrateur/Role/AddRole';
import AddService from '../Page/Administrateur/Service/AddService';
import AddUser from '../Page/Administrateur/User/AddUser';
import Login from '../Page/Auth/Login';
import DetailProjet from '../Page/Utilisateur/DetailProjet';
import Home from '../Page/Utilisateur/Home';
import ListService from '../Page/Utilisateur/ListService';
import ListUser from '../Page/Utilisateur/ListUser';
import ProjetUser from '../Page/Utilisateur/ProjetUser';
import axios from 'axios';
import ProtectedRoute from '../Routes/ProtectedRoute';
import PublicRoute from '../Routes/PublicRoute';
import Profile from '../Page/Utilisateur/Profile';

axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : window.csrf_token
};

axios.defaults.withCredentials = true

const Navigation = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute />} >
                    <Route path='/' element={<Login />} />
                </Route>
                <Route element={<ProtectedRoute />} >
                    <Route path='/admin/service/add-service' element={<AddService />} />
                    <Route path='/admin/role/add-role' element={<AddRole />} />
                    <Route path='/admin/user/add-user' element={<AddUser />} />

                    {/* route de la page Utilisateur */}
                    <Route element={<Home />}>
                        <Route path='/user/projets/view-projets' element={<ProjetUser />} />
                        <Route path='/user/personnel/view-personnel' element={<ListUser />} />
                        <Route path='/user/service/view-service' element={<ListService />} />
                        <Route path='/user/projets/detail-projet/:id' element={<DetailProjet />} />
                        <Route path='/user/mon-profil' element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;
