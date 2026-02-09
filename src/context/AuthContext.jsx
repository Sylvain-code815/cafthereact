import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider ({children}) { // Permet qu'on soit soit logé, soit pas logé ou qu'on soit dans la page
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Au montage du composant, on restauration la session si elle existe
    // du localStorage (pas secure), on met le token dedans

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUsed = localStorage.getItem("user");

        if (storedUsed && storedToken) {
            setToken(storedToken)
            setUser(storedUsed)
        }
    }, []);

// Synchronise le localStorage pour chaque changement de token ou user
    useEffect(() => {
        if (token && user) {
            localStorage.setItem("token");
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [user, token]);

    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);
    }

    const logout = () => {
        setToken(null);
        setUser(null);
    }

    const value = {
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token, // Booléan, qu'il y est un token ou non
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}