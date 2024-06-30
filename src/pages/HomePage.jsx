import React from 'react'
import Home from '../Components/Home'
import Banner from '../Components/Banner'

const HomePage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Banner/>
        <Home />
    </div>
  )
}

export default HomePage;