import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import style from '../styles/navBar.module.css';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    return (
        <div className={style.navBar}>
            {user ? (
                <div>
                    <h2>Welcome haaa</h2>
                    
                    <button onClick={logOut}>Log Out</button>
                </div>
            ) : (
                <div>
                    <span>You are not logged in.</span>
                </div>
            )}
        </div>
    );
};

export default NavBar;
