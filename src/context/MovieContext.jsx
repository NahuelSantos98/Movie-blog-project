import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react';

export const initialState = { data: [], searchMovie: [], bannerData: [], detailMovie: [], detailVideo: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SEARCH_MOVIES':
      return { ...state, searchMovie: action.payload };
    case 'SET_DATA_BANNER':
      return {...state, bannerData: action.payload }
    case 'DETAIL_MOVIE':
      return {...state, detailMovie: action.payload }
    case 'DETAIL_MOVIE_VIDEO':
      return {...state, detailVideo: action.payload}
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [errorMoviesSearched, setErrorMoviesSearched] = useState(false)

  const urlGetMovies = `${import.meta.env.VITE_BASE_API}/movie/now_playing?${import.meta.env.VITE_API_KEY_MOVIE}&language=en-US&page=${page}`;
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

  const getDetail = (id) => {
    const urlDetail = `${import.meta.env.VITE_BASE_API}/movie/${id}?${import.meta.env.VITE_API_KEY_MOVIE}&language=en-US`;
    const urlVideo = `${import.meta.env.VITE_BASE_API}/movie/${id}/videos?${import.meta.env.VITE_API_KEY_MOVIE}&language=en-US`
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_BEARER}`
      }
    };
  
    axios.get(urlDetail, options)
      .then(res => dispatch({ type: 'DETAIL_MOVIE', payload: res.data }))
      .catch(err => console.log(err));

      axios.get(urlVideo)
      .then(res => dispatch({ type: 'DETAIL_MOVIE_VIDEO', payload: res.data.results }))
      .catch(err => console.log(err));
  };
  
  const searchMovie = (valueMovie) => {
    const urlSearch = `${import.meta.env.VITE_BASE_API}/search/movie?&query=${valueMovie}`;
  
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_BEARER}`
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

  return (
    <DataContext.Provider value={{ state, page,setPage, errorMoviesSearched, getDetail, dispatch, handlePageNext, handlePagePrev, searchMovie }}>
      {children}
    </DataContext.Provider>
  );
};
