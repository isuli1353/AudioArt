import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { signupUser } from '../Api/api';

function SignupPage() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !email || !password || !confirmPassword) {
      setErrorMessage('모든 요소를 입력해주세요.');
      return;
    } 
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const newUser = await signupUser(id, email, password);
      console.log('Signup successful:', newUser);
    } catch (error) {
      setErrorMessage('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: 400 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          회원가입
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="아이디"
            variant="outlined"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />

          <TextField
            label="이메일"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />

          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />

          <TextField
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 확인하세요"
          />

          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ marginTop: -1, marginBottom: -1, fontSize: '0.9rem' }}>
              {errorMessage}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ padding: 1.5, fontSize: '1.2rem' }}>
            회원가입
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          이미 계정이 있으신가요? <Link href="/login" underline="hover">로그인</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SignupPage;
