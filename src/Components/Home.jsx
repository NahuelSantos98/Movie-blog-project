import React, { useContext } from 'react';
import MovieListContainer from './MovieListContainer';
import { DataContext } from '../context/MovieContext';

const Home = () => {
  const { handlePageNext, handlePagePrev, page } = useContext(DataContext);

  return (
    <div>
      <h1>Discover Movies</h1>
      <MovieListContainer />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
        <button onClick={handlePagePrev} style={{ padding: '1rem', backgroundColor: 'red', borderRadius: '1rem' }}>Prev</button>
        <p>{page}</p>
        <button onClick={handlePageNext} style={{ padding: '1rem', backgroundColor: 'red', borderRadius: '1rem' }}> Next </button>
      </div>
    </div>
  );
};

export default Home;
