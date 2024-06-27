import React from 'react';
import MovieCard from './MovieCard';
import style from '../styles/movieCard.module.css';

const MoviesList = ({ moviesList }) => {
  return (
    <div className={style.movieListStyle}>
      {moviesList.map((item) => (
        <MovieCard movie={item} key={item.id} showButton={true} />
      ))}
    </div>
  );
};

export default MoviesList;
