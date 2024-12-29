// src/Page/LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css'; // 별도로 스타일을 작성할 경우

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 추가
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">로그인</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">이메일</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">비밀번호</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button type="submit" className="submit-button">로그인</button>
        </form>
        <div className="signup-link">
          <p>계정이 없으신가요? <a href="/signup">회원가입</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
