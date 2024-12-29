import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Page/MainPage';
import LoginPage from './Page/LoginPage';
import SignupPage from './Page/SignupPage';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
