import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MoviePage from './pages/moviePage.jsx';
import HomePage from './pages/homePage.jsx';
import SignIn from './Authenticate/SignIn.jsx';
import SignUp from './Authenticate/sighnUp.jsx';
import SignOut from './Authenticate/signOut.jsx';
import ProtectedRoute from './Authenticate/ProtectedRoute.jsx';
import About from './Authenticate/aboutUs.jsx';
import GoogleSuccess from './Authenticate/GoogleSuccess.jsx';
import ForgotPassword from './Authenticate/ForgotPassword.jsx';
import ResetPassword from './Authenticate/ResetPassword.jsx';



function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        {/* default landing redirects to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* home page should be public so visitors can see start button */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
       <Route path='about' element={<About/>}/>
        <Route path="/google-success" element={<GoogleSuccess />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/moviespage"
          element={
            <ProtectedRoute>
              <MoviePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
