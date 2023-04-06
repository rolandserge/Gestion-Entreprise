import React from 'react';
import AuthContext from './Context/AuthContext';
import Navigation from './Navigator/Navigation';

function Example() {

    return (
        <AuthContext>
            <Navigation />
        </AuthContext>
    );
}

export default Example;
