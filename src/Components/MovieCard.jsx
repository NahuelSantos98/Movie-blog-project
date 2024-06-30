import React from 'react';
import style from '../styles/movieCard.module.css';
import routes from '../services/routes';
import { Link } from 'react-router-dom';
import NoPoster from '../assets/img/There Is no poster.png'

const MovieCard = ({ movie, showButton }) => {

  const handleTitle = () => {
    let titleWithoutSpaces = movie.title.trim();

    if (titleWithoutSpaces.length > 12) {
      return `${titleWithoutSpaces.substring(0, 16)}...`;
    }
    return titleWithoutSpaces;
  };

  return (
    <div className={style.movieCardStyle}>
      <p className={style.movieCardTitle}>{handleTitle()}</p>
      {movie.poster_path?       <img
        className={style.movieCardPoster}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`Poster for the Movie: ${movie.title}`}
      /> : <img src={NoPoster} alt={`There is not a poster for ${movie.title} `} style={{width: '15rem', height: '22.3rem', borderRadius: '.3rem' }} /> }
      <p className={style.releaseDateCard}>Release Date: {movie.release_date}</p>
      {showButton && <Link to={routes.details + `/${movie.id}`}><button className={style.movieCardButton}>See More</button></Link>}
    </div>
  );
};

export default MovieCard;

