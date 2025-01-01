import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { loginUser } from '../Api/api';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setIsLogin }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const user = await loginUser(id, password);
      setIsLogin(true);
      navigate('/');
    } catch (error) {
      setErrorMessage('아이디나 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: 400 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          로그인
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
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />

          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ marginTop: -1, marginBottom: -1, fontSize: '0.9rem' }}>
              {errorMessage}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ padding: 1.5, fontSize: '1.2rem' }}>
            로그인
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          계정이 없으신가요? <Link href="/signup" underline="hover">회원가입</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;
