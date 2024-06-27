import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/MovieContext'
import style from '../styles/banner.module.css'
import routes from '../services/routes'

const Banner = () => {
    const { state } = useContext(DataContext)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % state.bannerData.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [state.bannerData.length])

    if (!state.bannerData || state.bannerData.length === 0) {
        return <div>No banner data available</div>
    }

    const currentBanner = state.bannerData[currentIndex]

    return (
        <section className={style.banner} aria-label="Banner">
            <div className={style.bannerBackdrop}>
                <img className={style.imgBanner} src={`https://image.tmdb.org/t/p/w500${currentBanner.backdrop_path}`} alt={currentBanner.title} />
            </div>
            <div className={style.bannerContent}>
                <Link to={`${routes.details}/${currentBanner.id}`} className={style.link}>
                <h2 className={style.bannerTitle}>{currentBanner.title}</h2>
                <p className={style.bannerOverview}>{currentBanner.overview}</p>
                </Link>
            </div>
        </section>
    )
}

export default Banner
