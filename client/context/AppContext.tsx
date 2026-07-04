"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
    name: string;
    creditBalance: number;
}

interface AppContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoggedIn: boolean;
    logout: () => void;
    isAuthLoading: boolean;
    showAuthModal: boolean;
    setShowAuthModal: (show: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
    token: null,
    setToken: () => {},
    user: null,
    setUser: () => {},
    isLoggedIn: false,
    logout: () => {},
    isAuthLoading: true,
    showAuthModal: false,
    setShowAuthModal: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [hasCheckedLocalStorage, setHasCheckedLocalStorage] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Persist token to localStorage whenever it changes
    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const fetchUserInfo = async (authToken: string) => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const { data } = await axios.get(`${API_URL}/api/user/info`, {
                headers: { token: authToken },
            });
            if (data.success) {
                setUser(data.user);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            logout();
        } finally {
            setIsAuthLoading(false);
        }
    };

    // Re-hydrate from localStorage on first mount
    useEffect(() => {
        const stored = localStorage.getItem("token");
        if (stored) {
            setTokenState(stored);
        } else {
            setIsAuthLoading(false);
        }
        setHasCheckedLocalStorage(true);
    }, []);

    // Fetch user info when token changes and user is null
    useEffect(() => {
        if (!hasCheckedLocalStorage) return;

        if (token && !user) {
            fetchUserInfo(token);
        } else if (!token) {
            setIsAuthLoading(false);
        }
    }, [token, user, hasCheckedLocalStorage]);

    const value: AppContextType = {
        token,
        setToken,
        user,
        setUser,
        isLoggedIn: !!token,
        logout,
        isAuthLoading,
        showAuthModal,
        setShowAuthModal,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
