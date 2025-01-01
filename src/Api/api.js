import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

// 로그인
export const loginUser = async (id, password) => {
  try {
    const response = await axios.get(API_URL, {
      params: { username: id, password: password }
    });
    return response.data;
  } catch (error) {
    throw new Error('아이디나 비밀번호가 잘못되었습니다.');
  }
};

// 회원가입
export const signupUser = async (id, email, password) => {
  try {
    const response = await axios.post(API_URL, { username: id, email, password });
    return response.data;
  } catch (error) {
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};
