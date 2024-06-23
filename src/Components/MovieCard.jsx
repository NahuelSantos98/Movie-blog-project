import React from 'react';
import style from '../styles/movieCard.module.css';
import routes from '../services/routes';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, showButton }) => {

  const handleTitle = () => {
    let titleWithoutSpaces = movie.title.trim();

    if (titleWithoutSpaces.length > 12) {
      return `${titleWithoutSpaces.substring(0, 16)}...`;
    }
    return titleWithoutSpaces;
  }

  return (
    <div className={style.movieCardStyle}> 
      <p className={style.movieCardTitle}>{handleTitle()}</p>
      <img
        className={style.movieCardPoster}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`There is not a poster for the movie: ${movie.title}`}
      />
      {showButton && <Link to={routes.details + `/${movie.id}`}><button className={style.movieCardButton}>See More</button></Link>}
    </div>
  );
}

export default MovieCard;
