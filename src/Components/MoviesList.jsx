import React from 'react'
import MovieCard from './MovieCard'
import style from '../styles/movieCard.module.css'

const MoviesList = ({ moviesList }) => {


  return (
    <div className={style.movieListStyle}>
      {moviesList.map((item, index) => (
          <MovieCard movie={item} key={index}/>
      ))}
    </div>
  )
}

export default MoviesList
