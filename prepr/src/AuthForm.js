import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import './App.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        history.push('/home');
      } catch (e) {
        alert(e.message);
      }
    };

    const handleSignup = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        history.push('/new-profile');
      } catch (e) {
        alert(e.message);
      }
    };

    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="email"
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="toggle-auth">
          {isLogin ? 'Need an account?' : 'Already have an account?'}
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
