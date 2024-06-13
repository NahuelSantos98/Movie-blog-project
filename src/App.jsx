import React from "react";
import AuthProvider from './context/AuthContext.jsx';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
// import MovieListContainer from "./Components/MovieListContainer.jsx";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} /> 
          {/* <Route path="/prueba" element={<MovieListContainer />} />  */}
          <Route path="*" element={<h1 style={{color: 'red', fontSize: '7rem'}}>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
