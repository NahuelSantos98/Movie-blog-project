import React, { useContext, useState } from 'react';
import { DataContext } from '../context/MovieContext';
import style from '../styles/navBar.module.css';
import { Link } from 'react-router-dom';
import routes from '../services/routes';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const { dispatch, state } = useContext(DataContext);
    const [selectedGenre, setSelectedGenre] = useState(null); 

    const handleGenreChange = (event) => {
    const genreId = parseInt(event.target.value);
    setSelectedGenre(genreId);
    dispatch({ type: 'SET_SELECTED_GENRE', payload: genreId }); 
    };

    return (
    <div className={style.navBar}>
        {user ? (
        <>
            <Link to={routes.home}><h2 className={style.navBarTitle}>Welcome</h2></Link>
            <div className={style.searchAndLogOut}>
                <form>
                <input type='text' placeholder='Search' />
                </form>
                <div className={style.genreSelect}>
                    <label>Select Genre:</label>
                <select  onChange={handleGenreChange} value={selectedGenre || ''}>
                <option value="">Any Genre</option>
                {state.genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
                </select>
                </div>
                <button onClick={logOut} className={style.buttonLogOut}>Log Out</button>
            </div>
        </>
        ) : (
        <div className={style.accessDeniedNavBar}>
            <p>To have access to all our services, you must be logged in</p>
            <Link to={routes.login}>
                <button className={style.buttonLogInNavBar}>Log In</button>
            </Link>
        </div>
        )}
    </div>
    );
};

export default NavBar;
