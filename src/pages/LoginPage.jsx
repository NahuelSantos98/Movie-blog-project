import React from 'react';
import FormLogin from '../Components/Auth/FormLogin';
import style from '../styles/authStyles/loginPage.module.css';
import movieChairsImage from '../assets/img/movie-chairs.jpeg'

const LoginPage = () => {
  return (
    <div>
      <h1 className={style.title}>Welcome to our Movie Blog</h1>
      <h3 className={style.subtitle}>To continue you have to Log in or if you do not have an account register</h3>
      <FormLogin />
      <div className={style.imageContainer}>
        <img className={style.chairs} src={movieChairsImage} alt="Movie Chairs" />
      </div>
    </div>
  );
};

export default LoginPage;
