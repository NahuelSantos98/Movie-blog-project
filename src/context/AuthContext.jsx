import { auth } from "../services/firebaseConfig";
import { useContext, createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
    const contextAuthorization = useContext(authContext);
    
    if (!contextAuthorization) {
        console.log("Error creating auth context");
    }

    return contextAuthorization;
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [navigateConfirmation, setConfirmNavigateConfirmation] = useState(false);

    useEffect(() => {
        const subscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                setUser(null);
            } else {
                setUser(currentUser);
            }
        });
        return () => subscribed();
    }, []);

    const register = async (email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("register: ", response);
            setConfirmNavigateConfirmation(true);
            return { success: true }; // Return success status
        } catch (error) {
            console.log(error);
            setConfirmNavigateConfirmation(false);
            return { success: false, error };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log("login: ", response);
            setConfirmNavigateConfirmation(true);
            return { success: true }; // Return success status
        } catch (error) {
            console.log(error);
            setConfirmNavigateConfirmation(false);
            return { success: false, message: 'The password or email that you provided is incorrect. Try again' };
        }
    };

    const logOut = async () => {
        try {
            const response = await signOut(auth);
            setUser(null);
            console.log("logOut:", response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <authContext.Provider value={{ register, login, logOut, navigateConfirmation, user }}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider;
