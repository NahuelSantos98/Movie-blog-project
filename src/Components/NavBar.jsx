import React from 'react';
import { useAuth } from '../context/AuthContext';
import style from '../styles/navBar.module.css';
import { Link } from 'react-router-dom';

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
                <div style={{textAlign: 'center', padding: '3rem'}}>
                    <span>To have acces to all our services, you must be logged in</span>
                    <Link to='/'><button>Log In</button></Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;
