import React, { useContext, useState } from 'react';
import style from '../styles/navBar.module.css';
import { Link } from 'react-router-dom';
import routes from '../services/routes';
import { useAuth } from '../context/AuthContext';
import { DataContext } from '../context/MovieContext';

const NavBar = () => {
  const [searchedMovie, setSearchedMovie] = useState('');
  const { user, logOut } = useAuth();
  const { searchMovie, errorMoviesSearched } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovie(searchedMovie);
  };

  return (
    <div className={style.navBar}>
      {user ? (
        <div className={style.navBarAcces}>
        <Link to={routes.home}><h2 className={style.navBarTitle}>Welcome</h2></Link>
          <div className={style.searchAndLogOut}>
            <form onSubmit={handleSubmit} className={style.formSearch}>
              <input type='text' placeholder='Search' value={searchedMovie} onChange={e => setSearchedMovie(e.target.value)} />
              <button type="submit" className={style.searchSubmitButton}>Search</button>
              {errorMoviesSearched && <p>We cannot found a movie with this title</p>}
            </form>
            <button onClick={logOut} className={style.buttonLogOut}>Log Out</button>
          </div>
        </div>
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
