import React, { useContext} from 'react'
import MoviesList from './MoviesList'
import { DataContext } from '../context/MovieContext'

const MovieListContainer = () => {

    const {state} = useContext(DataContext)

    return (
        <div>
            <MoviesList moviesList={state.data} />
        </div>
    )
}

export default MovieListContainer
