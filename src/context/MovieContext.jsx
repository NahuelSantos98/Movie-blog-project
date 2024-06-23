import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react';

export const initialState = { data: [], genres: [], selectedGenre: null };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_GENRES':
      return { ...state, genres: action.payload };
    case 'SET_SELECTED_GENRE':
      return { ...state, selectedGenre: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);

  const urlGetMovies = `${import.meta.env.VITE_BASE_API}/movie/now_playing?${import.meta.env.VITE_API_KEY_MOVIE}&language=en-US&page=${page}`;
  const urlGetGenres = `${import.meta.env.VITE_BASE_API}/genre/movie/list?${import.meta.env.VITE_API_KEY_MOVIE}&language=en-US`;

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(urlGetMovies)
      .then((res) => {
        if (res.data.results) {
          dispatch({ type: 'SET_DATA', payload: res.data.results });
        } else {
          console.log('Unexpected response structure:', res);
        }
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
      });
  }, [urlGetMovies, page]);

  useEffect(() => {
    axios.get(urlGetGenres)
      .then((res) => {
        if (res.data.genres) {
          dispatch({ type: 'SET_GENRES', payload: res.data.genres });
        } else {
          console.log('Unexpected response structure:', res);
        }
      })
      .catch((err) => {
        console.error('Error fetching genres:', err);
      });
  }, [urlGetGenres]);

  const getGenre = (genreIds) => {
    return genreIds.map(id => {
      const genre = state.genres.find(g => g.id === id);
      return genre ? genre.name : '';
    });
  };

  const handlePageNext = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePagePrev = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <DataContext.Provider value={{ state, dispatch, getGenre, handlePageNext, handlePagePrev }}>
      {children}
    </DataContext.Provider>
  );
};