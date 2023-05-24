import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthForm from './auth/pages/AuthForm';
import Btc from './btc/pages/Btc';
import AuthContext from './context/auth-context';
import Layout from './shared/components/Layout/Layout';

function App() {
    const authCtx = useContext(AuthContext);
    return (
            <BrowserRouter>
                <Layout>
                    {authCtx.isLoggedIn}
                    <Routes>
                        {!authCtx.isLoggedIn && (
                            <Route path='/auth' element={<AuthForm />} />
                        )}
                        {authCtx.isLoggedIn && (
                            <Route path='/btc' element={<Btc />} />
                        )}
                        <Route path='*' element={<Navigate replace to={authCtx.isLoggedIn ? '/btc' : '/auth'} />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
    );
}

export default App;
