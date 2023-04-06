import React from 'react';
import { Outlet } from 'react-router-dom';
import "../../../Styles/Utilisateur/HomeUser.css"
import Sidebar from '../../Composant/Utilisateur/Sidebar';

const Home = () => {
    return (
        <div className="home_user">
            <aside>
                <Sidebar />
            </aside>
            <main>
                <section>
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Home;
