import React, { useContext } from 'react';
import MovieCard from './MovieCard';
import { DataContext } from '../context/MovieContext';
import style from '../styles/movieCard.module.css';

const MoviesList = () => {
  const { state } = useContext(DataContext);
  const { data, selectedGenre } = state;

  const filteredMovies = selectedGenre ? 
    data.filter(movie => movie.genre_ids.includes(selectedGenre)) : data;

  return (
    <div className={style.movieListStyle}>
      {filteredMovies.map((item) => (
        <MovieCard movie={item} key={item.id} showButton={true} />
      ))}
    </div>
  );
};

export default MoviesList;
