import React, { useContext } from 'react'
import MovieListContainer from './MovieListContainer';
import { DataContext } from '../context/MovieContext';

const Home = () => {

  const {handlePageNext, handlePagePrev} = useContext(DataContext)



  return (
    <div>
      <h1>Discover Movies</h1>
      <MovieListContainer />
      <div style={{display: 'flex', justifyContent: 'center', gap: '3rem'}}>
      <button onClick={handlePagePrev} style={{padding: '1rem', backgroundColor: 'red'}}>Prev</button>
      <button onClick={handlePageNext} style={{padding: '1rem', backgroundColor: 'red'}}> Next </button>
      </div>

    </div>
  )
}

export default Home;