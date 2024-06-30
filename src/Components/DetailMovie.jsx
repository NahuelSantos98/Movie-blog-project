import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/MovieContext';
import YouTube from 'react-youtube';
import style from '../styles/detailMovie.module.css';
import noImage from '../assets/img/There is no image.png';
import noPoster from '../assets/img/There Is no poster.png';
import noImageCompany from '../assets/img/No Image Company.png';
import LoadingSpinner from './LoadingSpinner';

const DetailMovie = () => {
  const { state, getDetail } = useContext(DataContext);
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const movieDetail = state.detailMovie;
  const genres = movieDetail.genres || [];

  useEffect(() => {
    getDetail(id);
  }, [id]);

  useEffect(() => {
    if (state.detailVideo) {
      const foundTrailers = state.detailVideo.filter(
        vid => vid.name.includes('Trailer') || vid.name.includes('Official Trailer')
      );
      setTrailers(foundTrailers);
    }
  }, [state.detailVideo]);

  if (!movieDetail || movieDetail.id !== parseInt(id)) {
    return (
      <div className={style.loadingContainer}>
        <p className={style.loadingText}>Loading:</p>
        <LoadingSpinner />
      </div>
    );
  }

  console.log(movieDetail);

  return (
    <div className={style.containerMovieDetail}>
      <div className={style.leftColumn}>
        {movieDetail.poster_path ? 
          <img className={style.posterDetail} src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt={`Poster for the movie: ${movieDetail.title}`} /> 
          : <img className={style.posterDetail} src={noPoster} alt={`There is no poster for the movie: ${movieDetail.title}`} />
        }
        {movieDetail.homepage &&  <p><span>Official Page: </span><a className={style.homepageLinkDetail} href={movieDetail.homepage}>{movieDetail.homepage}</a></p>}
        <div className={style.division}>
          <p><span>Duration:</span> {movieDetail.runtime} minutes</p>
          <p><span>Budget:</span> {movieDetail.budget} USD </p>
          <p><span>Revenue:</span> {movieDetail.revenue} USD </p>
          <p><span>Release date:</span> {movieDetail.release_date}</p>
        </div>
        <h3>Genres:</h3>
        <div className={style.genreContainer}>
          {genres.map((genre, index) => (
            <li key={index}>{genre.name}</li>
          ))}
        </div>
      </div>
      <div className={style.rightColumn}>
        <h2>{movieDetail.title}</h2>
        <div className={style.textMovieContainer}>
          <p className={style.textMovie}>{movieDetail.overview}</p>
        </div>
        <h3>Trailers</h3>
        <div className={style.trailersContainer}>
        {trailers.length > 0 && trailers.map(trailer => (
          <YouTube key={trailer.id} videoId={trailer.key} className={style.trailer} />
        ))}
        </div>
        <h3 className={style.marginBottom}> Companies:</h3>
        <div className={style.companyContainer}>
          {movieDetail.production_companies.map(item => (
            <div key={item.id} className={style.companyCard}>
              <h4>{item.name}</h4>
              {item.logo_path ? (
                <img className={style.companyImage} src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} alt={`Logo Company: ${item.name}`} />
              ) : (
                <img className={style.noImageCompany} src={noImageCompany} alt={`No logo available for ${item.name}`} />
              )}
            </div>
          ))}
        </div>
        {movieDetail.backdrop_path ? (
          <img className={style.backdropImage} src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`} alt={movieDetail.title} />
        ) : (
          <img className={style.noImageCompany} src={noImage} alt='There is NO image for this movie' />
        )}
      </div>
    </div>
  );
};

export default DetailMovie;
