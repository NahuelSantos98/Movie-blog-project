import React, { useContext } from 'react';
import MoviesList from './MoviesList';
import { DataContext } from '../context/MovieContext';
import style from '../styles/movieListContainer.module.css'

const MovieListContainer = () => {
  const { state } = useContext(DataContext);

  return (
    <div className={style.containerMovieList}>
      <MoviesList  moviesList={state.searchMovie.length > 0 ? state.searchMovie : state.data} />
    </div>
  );
};

export default MovieListContainer;
