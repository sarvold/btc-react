import React, { PropsWithChildren, useState } from 'react';
type AuthContextProps = {
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
};
const AuthContext = React.createContext<AuthContextProps>({
    token: '',
    isLoggedIn: false,
    login: (_token) => {},
    logout: () => {},
});

// See React 18 types: https://stackoverflow.com/a/71800185/8430632
export const AuthContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState<string | null>(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (t: string) => {
        setToken(t);
        localStorage.setItem('token', t);
    };
    
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const contextValue: AuthContextProps = {
        token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
