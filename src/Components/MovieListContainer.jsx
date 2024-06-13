import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MoviesList from './MoviesList'

const MovieListContainer = () => {
    const url = `${import.meta.env.VITE_BASE_API}${import.meta.env.VITE_API_MOVIE_URL}${import.meta.env.VITE_API_KEY_MOVIE}`
    const [moviesList, setMoviesList] = useState([])

    useEffect(() => {
        axios(url)
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setMoviesList(res.data.results)
                } else {
                    console.log('No content in response:', res)
                }
            })
            .catch((err) => {
                console.error('Error:', err)
            })
    }, [url]) 

    return (
        <div>
            <MoviesList moviesList={moviesList} />
        </div>
    )
}

export default MovieListContainer
