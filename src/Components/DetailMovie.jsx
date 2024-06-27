import React, { useContext} from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/MovieContext';
import imgNoPoaster from '../assets/img/There Is no poster.png'
import YouTube from 'react-youtube';
import style from '../styles/detailMovie.module.css'

const DetailMovie = () => {
  const { state, getGenre } = useContext(DataContext);
  const { id } = useParams();


  const movieDetail = state.data.find(movie => movie.id === parseInt(id)) || state.searchMovie.find(movie => movie.id === parseInt(id)) || state.bannerData.find(movie => movie.id === parseInt(id));
  
  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  const genres = getGenre(movieDetail.genre_ids);

  return (
    <div>
      <h2>{movieDetail.title}</h2>
      { movieDetail.backdrop_path && <img src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`} alt={movieDetail.title} />}
      {!movieDetail.backdrop_path && <img src={imgNoPoaster} style={{width: '200px', height: '300px'}} />}
      
      <div>
        <h3>Genres:</h3>
        <ul>
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </div>
      <p>{movieDetail.overview}</p>
    </div>
  );
};

export default DetailMovie;
