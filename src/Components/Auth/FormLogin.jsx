import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import style from '../../styles/authStyles/formLogin.module.css' 


const FormLogin = () => {

    const auth = useAuth()  
    const {email} = auth.user 

    const [emailRegister, setEmailRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState(null)

    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [errorLogin, setErrorLogin] = useState(null)

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
                await auth.register(emailRegister, passwordRegister);
                setError('');
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
        const response = await auth.login(emailLogin, passwordLogin);
        if (!response.success) {
            setErrorLogin(response.message);
        }
    };

    const handleLogOut = ()=>{
        auth.logOut()
    }

return (
    <div className={style.containerForms}>
        <div className={style.card}>
            <h3 className={style.h3}>Register</h3>
            <form className={style.form}>
                <input className={style.input} onChange={(e)=>setEmailRegister(e.target.value)} type='email' placeholder='Email'  required/>
                <input className={style.input} onChange={(e)=> setPasswordRegister(e.target.value)} type='password' placeholder='Password'  required/>
                <input className={style.input} onChange={(e)=>setPasswordConfirmation(e.target.value)} type='password' placeholder='Confirm password' required />
                {error && <p style={{color: 'red', textDecoration: 'underline'}}>{error}</p>}
                <button onClick={(e)=>handleRegister(e)}>Create Account</button>
            </form>
        </div>
        <div className={style.card}>
            <h3 className={style.h3}>Log In</h3>
            <form className={style.form}>
                <input className={style.input} onChange={(e)=>setEmailLogin(e.target.value)} type='email' placeholder='Email'  required/>
                <input className={style.input} onChange={(e)=>setPasswordLogin(e.target.value)} type='password' placeholder='Password'  required/>
                {errorLogin && <p style={{color: 'red', textDecoration: 'underline'}}>{errorLogin}</p>}
                <button onClick={e=>handleLogIn(e)}>Log In</button>
            </form>
        </div>
        {email && <button onClick={()=>handleLogOut()}>Log out</button>}
    </div>
)
}

export default FormLogin