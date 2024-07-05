import React from 'react'
import Home from '../Components/Home'
import Banner from '../Components/Banner'
import style from '../styles/homePage.module.css'

const HomePage = () => {
  return (
    <div className={style.homeContainer}>
        <Banner/>
        <Home />
    </div>
  )
}

export default HomePage;