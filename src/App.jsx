import React from 'react';
import AuthProvider from './context/AuthContext.jsx';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./Components/Layout.jsx";
import routes from './services/routes.js';
import DetailMovie from './Components/DetailMovie.jsx';
import { DataContextProvider } from './context/MovieContext.jsx';

function App() {
  return (
    <AuthProvider>
      <DataContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.login} element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path={routes.home} element={<HomePage />} />
              <Route path={routes.details + '/:id'} element={<DetailMovie />} />
            </Route>
            <Route path='*' element={<h1 style={{color: 'red', fontSize: '7rem'}}>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </DataContextProvider>
    </AuthProvider>
  );
}

export default App;

