import React from 'react';
import { useAuth } from '../context/AuthContext';
import style from '../styles/navBar.module.css';

const NavBar = () => {
    const { user, logOut } = useAuth();


    return (
        <div className={style.navBar}>
            {user ? (<>
                <h2 className={style.navBarTitle}>Welcome</h2>
                    <div className={style.searchAndLogOut}> 
                        <form>
                            <input type='text' placeholder='Search' />
                        </form>
                    <button onClick={logOut}>Log Out</button>
                    </div>
            </>
            ) : (
                <div>
                    <span>You are not logged in.</span>
                </div>
            )}
        </div>
    );
};

export default NavBar;
