import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react';

export const initialState = { data: [], genres: [], searchMovie: [], bannerData: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_GENRES':
      return { ...state, genres: action.payload };
    case 'SEARCH_MOVIES':
      return { ...state, searchMovie: action.payload };
    case 'SET_DATA_BANNER':
      return {...state, bannerData: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [errorMoviesSearched, setErrorMoviesSearched] = useState(false)

  const urlGetMovies = `${import.meta.env.VITE_BASE_API}/movie/now_playing?${import.meta.env.VITE_API_KEY_MOVIE}&language=en-US&page=${page}`;
  const urlGetGenres = `${import.meta.env.VITE_BASE_API}/genre/movie/list?${import.meta.env.VITE_API_KEY_MOVIE}&language=en-US`;
  const urlPage2 =`${import.meta.env.VITE_BASE_API}/movie/now_playing?${import.meta.env.VITE_API_KEY_MOVIE}&language=en-US&page=2`;


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

  useEffect(()=>{
    axios.get(urlPage2)
    .then(res=> {
      if(res.data){
        dispatch({type: 'SET_DATA_BANNER', payload: res.data.results})
      }else{
        console.log('Unexpected response structure:', res)
      }
    })
    .catch(err=> console.log(err))
  }, [urlPage2])

  const searchMovie = (valueMovie) => {
    const urlSearch = `${import.meta.env.VITE_BASE_API}/search/movie?&query=${valueMovie}`;
  
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTc3NmEzYWMyYjY2YmJiNjFhM2Y0ZWQxOTNlMzMxNCIsInN1YiI6IjY2NTY5MThiOThkMjYzOTc4MTRmN2Q2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xXcEzfrysjc4Sls0EqIwKpZEez_A_aadgCN7xRQU1Bg'
      }
    };
  
    axios.get(urlSearch, options)
      .then(res => {
        dispatch({ type: 'SEARCH_MOVIES', payload: res.data.results });
      })
      .catch(err => {
        console.error('Error searching movies:', err);
        setErrorMoviesSearched(true); 
      });
  };
  const handlePageNext = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePagePrev = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const getGenre = (genreIds) => {
    return genreIds.map(id => {
      const genre = state.genres.find(g => g.id === id);
      return genre ? genre.name : '';
    });
  };

  return (
    <DataContext.Provider value={{ state, page, errorMoviesSearched, dispatch, getGenre, handlePageNext, handlePagePrev, searchMovie }}>
      {children}
    </DataContext.Provider>
  );
};
