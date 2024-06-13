import React from 'react';
import style from '../styles/movieCard.module.css';

const MovieCard = ({ movie }) => {

  return (
    <div className={style.movieCardStyle}> 
      <p className={style.movieCardTitle}>{movie.title}</p>
      <img
        className={style.movieCardPoster}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="Movie Poster"
      />
      <button className={style.movieCardButton}>See More</button>
    </div>
  );
}

export default MovieCard;


