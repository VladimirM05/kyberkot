import { createContext, FC, useContext, useState } from "react";

interface AuthContextType {
    isAuth: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                login: () => setIsAuth(true),
                logout: () => setIsAuth(false),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
