import { auth } from "../services/firebaseConfig";
import { createContext, useState, useEffect, useContext } from "react";
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

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser ? currentUser : null);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const register = async (email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("register: ", response);
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false, error };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log("login: ", response);
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'The password or email that you provided is incorrect. Try again' };
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            console.log("logOut: success");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <authContext.Provider value={{ register, login, logOut, user }}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider;
