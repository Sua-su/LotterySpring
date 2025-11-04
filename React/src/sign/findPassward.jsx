import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [foundPassword, setFoundPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 입력 시 에러 메시지 클리어
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 이름과 이메일 입력 확인
    if (!formData.name || !formData.email) {
      setError('이름과 이메일을 모두 입력해주세요.');
      setIsLoading(false);
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      // 여기에 실제 데이터베이스 조회 API 호출을 추가하세요
      console.log('비밀번호 찾기 요청:', formData);
      
      // 임시 데이터베이스 시뮬레이션 (실제 구현 시 Spring Boot API와 연동)
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
      
      // 임시 사용자 데이터베이스 (실제로는 서버에서 조회)
      const mockDatabase = [
        { name: '홍길동', email: 'hong@example.com', password: 'mypassword123' },
        { name: '김철수', email: 'kim@example.com', password: 'password456' },
        { name: '이영희', email: 'lee@example.com', password: 'securepass789' }
      ];
      
      // 이름과 이메일이 일치하는 사용자 찾기
      const foundUser = mockDatabase.find(
        user => user.name === formData.name && user.email === formData.email
      );
      
      if (foundUser) {
        // 일치하는 사용자를 찾았을 때
        setFoundPassword(foundUser.password);
      } else {
        // 일치하는 사용자를 찾지 못했을 때
        setError('입력하신 이름과 이메일에 해당하는 계정을 찾을 수 없습니다.');
      }
      
    } catch (err) {
      setError('비밀번호 찾기에 실패했습니다. 다시 시도해주세요.');
      console.error('비밀번호 찾기 에러:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (foundPassword) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h2>비밀번호를 찾았습니다</h2>
            <p>아래 정보를 확인해주세요</p>
          </div>

          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <div style={{ 
              fontSize: '3rem', 
              color: '#667eea', 
              marginBottom: '20px' 
            }}>
              🔑
            </div>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                color: '#666', 
                marginBottom: '10px'
              }}>
                <strong>이름:</strong> {formData.name}
              </p>
              <p style={{ 
                color: '#666', 
                marginBottom: '15px'
              }}>
                <strong>이메일:</strong> {formData.email}
              </p>
              <p style={{ 
                color: '#333', 
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}>
                <strong>비밀번호:</strong> {foundPassword}
              </p>
            </div>
            <p style={{ 
              fontSize: '0.85rem', 
              color: '#888' 
            }}>
              보안을 위해 로그인 후 비밀번호를 변경하시기 바랍니다.
            </p>
          </div>

          <button 
            type="button" 
            className="login-button"
            onClick={handleBackToLogin}
          >
            로그인 페이지로 돌아가기
          </button>

          <div className="login-footer">
            <div className="signup-link">
              <button 
                type="button"
                onClick={() => setFoundPassword('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                다른 계정으로 다시 찾기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>비밀번호 찾기</h2>
          <p>가입하신 이름과 이메일을 입력해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="가입하신 이름을 입력하세요"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="가입하신 이메일을 입력하세요"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                비밀번호 찾는 중...
              </>
            ) : (
              '비밀번호 찾기'
            )}
          </button>
        </form>

        <div className="login-footer">
          <div className="signup-link">
            <span>이미 계정 정보를 기억하셨나요? </span>
            <button 
              type="button"
              onClick={handleBackToLogin}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
