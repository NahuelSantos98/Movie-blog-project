import React, { useContext } from 'react';
import MoviesList from './MoviesList';
import { DataContext } from '../context/MovieContext';

const MovieListContainer = () => {
  const { state } = useContext(DataContext);

  return (
    <div>
      <MoviesList moviesList={state.searchMovie.length > 0 ? state.searchMovie : state.data} />
    </div>
  );
};

export default MovieListContainer;
