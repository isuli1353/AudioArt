import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Page/MainPage';
import LoginPage from './Page/LoginPage';
import SignupPage from './Page/SignupPage';
import AudioCreatePage from './Page/AudioCreatePage';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <AppContent isLogin={isLogin} setIsLogin={setIsLogin} />
    </Router>
  );
}

function AppContent({ isLogin, setIsLogin }) {
  const location = useLocation();
  const isAudioCreatePage = location.pathname === '/audioCreate';

  return (
    <div className="App">
      {!isAudioCreatePage && <Header isLogin={isLogin} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/audioCreate" element={<AudioCreatePage />} />
      </Routes>
      {!isAudioCreatePage && <Footer />}
    </div>
  );
}

export default App;
