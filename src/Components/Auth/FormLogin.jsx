import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import style from '../../styles/authStyles/formLogin.module.css';

const FormLogin = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [errorLogin, setErrorLogin] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setEmailLogin(user.email);
            navigate('/home'); 
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const validateEmail = (email) => {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(email);
        };

        if (passwordConfirmation.length <= 6 || passwordRegister.length <= 6) {
            setError('Password must have at least 7 characters.');
        } else if (passwordConfirmation !== passwordRegister) {
            setError('Make sure you wrote the same password.');
        } else if (!validateEmail(emailRegister)) {
            setError('The format of the Email is incorrect.');
        } else {
            try {
                const result = await auth.register(emailRegister, passwordRegister);
                if (result.success) {
                    navigate('/home');
                } else {
                    throw result.error;
                }
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setError('The email you provided is already in use.');
                } else {
                    setError('An error occurred during registration.');
                }
            }
        }
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        setErrorLogin('');
        try {
            const result = await auth.login(emailLogin, passwordLogin);
            if (result.success) {
                navigate('/home');
            } else {
                setErrorLogin(result.message);
            }
        } catch (error) {
            setErrorLogin('Invalid email or password.');
        }
    };

    return (
        <div className={style.containerForms}>
            <div className={style.card}>
                <h3 className={style.h3}>Register</h3>
                <form className={style.form}>
                    <input 
                        className={style.input} 
                        onChange={(e) => setEmailRegister(e.target.value)} 
                        type='email' 
                        placeholder='Email' 
                        required 
                    />
                    <input 
                        className={style.input} 
                        onChange={(e) => setPasswordRegister(e.target.value)} 
                        type='password' 
                        placeholder='Password' 
                        required 
                    />
                    <input 
                        className={style.input} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)} 
                        type='password' 
                        placeholder='Confirm password' 
                        required 
                    />
                    {error && <p className={style.textError}>{error}</p>}
                    <button className={style.buttonLogin} onClick={handleRegister}>Create Account</button>
                </form>
            </div>
            <div className={style.card}>
                <h3 className={style.h3}>Log In</h3>
                <form className={style.form}>
                    <input 
                        className={style.input} 
                        onChange={(e) => setEmailLogin(e.target.value)} 
                        value={emailLogin} 
                        type='email' 
                        placeholder='Email' 
                        required 
                    />
                    <input 
                        className={style.input} 
                        onChange={(e) => setPasswordLogin(e.target.value)} 
                        value={passwordLogin} 
                        type='password' 
                        placeholder='Password' 
                        required 
                    />
                    {errorLogin && <p className={style.textError}>{errorLogin}</p>}
                    <button className={style.buttonLogin} onClick={handleLogIn}>Log In</button>
                </form>
            </div>
        </div>
    );
}

export default FormLogin;
