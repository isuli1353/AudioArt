import React, { useState } from 'react';
import './SignupPage.css';

function SignupPage() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('Signing up with:', id, email, password);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">회원가입</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="id" className="input-label">아이디</label>
            <input
              type="text"
              id="id"
              className="input-field"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 확인하세요"
            />
          </div>
          <button type="submit" className="submit-button">회원가입</button>
        </form>
        <div className="login-link">
          <p>이미 계정이 있으신가요? <a href="/login">로그인</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
