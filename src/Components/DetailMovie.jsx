import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/MovieContext';

const DetailMovie = () => {
  const { state, getGenre } = useContext(DataContext);
  const { id } = useParams();

  const movieDetail = state.data.find(movie => movie.id === parseInt(id));

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  const genres = getGenre(movieDetail.genre_ids);

  return (
    <div>
      {!movieDetail? <h2>Loading...</h2> : 
      <>
              <h2>{movieDetail.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`} alt={movieDetail.title} />
      <div>
        <h3>Genres:</h3>
        <ul>
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </div>
      
      <p>{movieDetail.overview}</p></>

      }
      
    </div>
  );
};

export default DetailMovie;
